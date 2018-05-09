/**
 * Created by sheilstk on 5/22/17.
 */
"use strict";
const neo4j = require('neo4j-driver').v1;
const webSocketServer = require('websocket').server;
const http = require('http');
const uri = "bolt://localhost:7687";
//const uri = "bolt://smrtgraphdb-dev.ncats.nih.gov:7687";
//const driver = neo4j.driver(uri, neo4j.auth.basic("neo4j", "tim" ), {connectionPoolSize: 50});
const driver = neo4j.driver(uri, neo4j.auth.basic("neo4j", "Subein0weisioca2IeTe" ), {connectionPoolSize: 50});
const session = driver.session();

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'pharos';

// Port where we'll run the websocket server
const webSocketsServerPort = 1337;

// websocket and http servers
/**
 * HTTP server
 */
let server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
let wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket request is just
  // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  // accept connection - you should check 'request.origin' to make sure that
  // client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  let connection = request.accept(null, request.origin);
  console.log((new Date()) + ' Connection accepted.');

  // user sent some message
  connection.on('message', function(message) {
    let mes =  JSON.parse(message.utf8Data);
    let params;
    if(typeof(mes.params.qParam) === "number"){
      params = { qParam : neo4j.int(mes.params.qParam)};
    }else{
      params =  mes.params;
    }
    session.run(mes.message, params)
      .subscribe({
        onNext: function (result) {
          let ret;
          connection.send(JSON.stringify({type:mes.type, data:result}));
        },
        onCompleted: function () {
          if(mes.type === "counts") {
           // connection.send(JSON.stringify({type: "counts"}));
          }else{
            connection.send(JSON.stringify({type: "done"}));

          }
          session.close();
        },
        onError: function (error) {
          console.log(error);
        }
      });
  });

  // user disconnected
  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer "
        + connection.remoteAddress + " disconnected.");
  });

});
