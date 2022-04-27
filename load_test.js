const axios = require('axios');
const fs = require('fs');
const routes = fs.readFileSync('./routes.txt').toString().split('\n');
console.log(routes);

let count = 0;
async function load_test() {
  while(true) {
    await axios.get('http://localhost:4000/targets').then(res => {
      console.log(res);
    });
  }

  if (true) {
    for (let i = 0; i < routes.length; i++) {
      // console.log(routes[i]);
      await axios.get('http://localhost:4000' + routes[i]).then(res => {
        console.log('done ' + routes[i]);
      }).catch(err => {
        console.log('error on ' + count);
        // console.log(err);
      });
    }
  }
}

load_test();
// load_test();
// load_test();
// load_test();
// load_test();
// setInterval(() => {
//   load_test();
//   // load_test();
//   // load_test();
//   // load_test();
//   // load_test();
// }, 10000);

