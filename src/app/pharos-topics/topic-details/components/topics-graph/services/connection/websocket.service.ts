import { Injectable } from '@angular/core';
import {Observable, Subject, Observer, BehaviorSubject} from 'rxjs';

/**
 *service to create a websocket
 * receives url from connection service
 * https://medium.com/@lwojciechowski/websockets-with-angular2-and-rxjs-8b6c5be02fac
 */
@Injectable()
export class WebSocketService {
  /**
   * no args
   */
  constructor() { }

  /**
   * RxJs subject to broadcast websocket message
   */
  private subject: Subject<MessageEvent>;

  /**
   * connects to websocket and returns subject for data connector to subscribe to
   * @param {string} url
   * @return {Subject<MessageEvent>}
   */
  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('connected');
    }
    return this.subject;
  }

  /**
   * create new websocket observable
   * @param {string} url
   * @return {Subject<MessageEvent>}
   */
  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror   = obs.error.bind(obs);
        ws.onclose   = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
} //  end class WebSocketService

