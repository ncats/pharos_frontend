import { Injectable } from '@angular/core';
import {Observable, Subject, Observer, BehaviorSubject} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';


/**
 *service to create a websocket
 * receives url from connection service
 * not used -- https://medium.com/@lwojciechowski/websockets-with-angular2-and-rxjs-8b6c5be02fac
 * switched to rxjs websocket: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-webSocket
 */
@Injectable()
export class WebSocketService {
  /**
   * no args
   */
  constructor() {}

  /**
   * connects to websocket and returns subject for data connector to subscribe to
   * @param {string} url
   * @return {any}
   */
  public connect(url: string): any {
    const socket$ = webSocket(url);
    socket$.subscribe(
      (data) => {
      return JSON.stringify(data);
      },
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
    return socket$;
  }
} //  end class WebSocketService

