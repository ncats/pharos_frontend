import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PharosConfig} from '../../../../../../../config/pharos-config';
import {HttpClient} from '@angular/common/http';
import {catchError, map, take} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';

const URL = './assets/uniprot_IDs.csv';
const httpOptions = {
  // this is weird. https://github.com/angular/angular/issues/18586
  responseType: 'text' as 'text'
};


@Injectable({
  providedIn: 'root'
})
export class GraphDataGeneratorService {
  saved: string[] = [];
  errors: any[] = [];
  alreadySaved: any[] = [];

  constructor(private _http: HttpClient,
              private pharosConfig: PharosConfig,
              private db: AngularFirestore) {
  }

  generateTopicNodes() {
   /* this._http.get(URL, {responseType: 'text'}).subscribe(response => {
      const lines: string[] = response.split(/\r\n|\n/);
      console.log(lines);
      lines.forEach(target => {
        this.db.collection('topic-nodes').doc(target)// ref => ref.where('documentid', '==', target))
          .valueChanges().pipe(take(1))
          .subscribe(res => {
            if (!res) {
              console.log("getting new data");
              this._http.post<any>(`${this.pharosConfig.getTopicResolveUrl()}`, target, httpOptions).subscribe(response => {
                console.log(response);
                if (response.content) {
                  if (response.content[0].ligands) {
                    response.content[0].ligands = response.content[0].ligands.filter(ligand => !ligand['']);
                    console.log(response.content[0].ligands);
                  }
                  this.db.collection('topic-nodes')
                    .doc(target)
                    .set({
                      graphData: response.content[0]
                    })
                    .then(() => this.saved.push(target))
                    .catch((error) => this.errors.push(error));

                  //this._parseData(res)
                }
              });
            } else {
              this.alreadySaved.push(target);
            }
          });
      });
    });*/
    /*  map(response => this.csvJSON(response.trim())),
      catchError(this.handleError('fetch uniprot ids', []))
    ).subscribe();*/
  }

  private csvJSON(csv): void {
    console.log(csv);
    const lines: string[] = csv.split(/\r\n|\n/);
    console.log(lines);
  //  return lines;
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
}
