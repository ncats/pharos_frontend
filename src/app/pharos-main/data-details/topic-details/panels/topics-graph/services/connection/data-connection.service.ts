import { Injectable } from '@angular/core';
import {Subject, Observable, of} from 'rxjs';
import {WebSocketService} from './websocket.service';
import {catchError, map, share} from 'rxjs/operators';

/**
 * url of database
 * todo: this should be en environment variable
 * @type {string}
 */
const DATA_URL = 'ws://localhost:1337';
// const DATA_URL = 'ws://smrtgraphdb-dev.ncats.nih.gov:1337';

@Injectable()
export class DataConnectionService {
  /**
   * RxJs subject to broadcast messages returned by the websocket
   * @type {Subject<any>}
   */
  public messages: Subject<any> = new Subject<any>();
  /**
   * websocket subject
   */
  private messagesEmitter: any;

  /**
   * create new {messageEmitter} with the websocket service
   * @param {WebSocketService} wsService
   */
  constructor(private wsService: WebSocketService) {
console.log("creating data connection")
    //  subscribe to websocket
    this.messagesEmitter  = <Subject<any>>this.wsService
      .connect(DATA_URL)
      .pipe(
      map((response: MessageEvent): string => {
        return response.data;
      }),
        catchError(this.handleError('messageEmitter', []))
      );

    this.messages = this.messagesEmitter.pipe(
      share()
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
} //  end class DataService
