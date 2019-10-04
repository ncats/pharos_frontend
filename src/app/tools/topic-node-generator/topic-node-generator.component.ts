import { Component, OnInit } from '@angular/core';
import {bufferCount, concatAll, concatMap, map, mergeAll, mergeMap, take, windowCount, zipAll} from 'rxjs/internal/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PharosConfig} from '../../../config/pharos-config';
import {AngularFirestore} from '@angular/fire/firestore';
import {concat, forkJoin, from, interval, merge, Observable, of, pipe, zip} from 'rxjs';
const URL = './assets/uniprot_IDs.csv';


/**
 * data holder
 */
interface TopicData {
  /**
   * primary target
   */
  target: any;
  /**
   * data
   */
  data: any;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
  })
};

@Component({
  selector: 'pharos-topic-node-generator',
  templateUrl: './topic-node-generator.component.html',
  styleUrls: ['./topic-node-generator.component.scss']
})
export class TopicNodeGeneratorComponent implements OnInit {

  saved: string[] = [];
  errors: any[] = [];
  alreadySaved: any[] = [];

  constructor(private _http: HttpClient,
              private pharosConfig: PharosConfig,
              private db: AngularFirestore) {
  }

  ngOnInit() {
    // this.db.collection('topic-nodes').get().subscribe(res => console.log(res.size));
  }

getData(target) {
  return this.db.collection('topic-nodes').doc(target).valueChanges();
}

  fetchData(batch) {
    this.saved = [];
    this.errors = [];
    this.alreadySaved = [];
   const calls = from(batch.map(target => {
      const topicData: TopicData = {target: target, data: this.getData(target)};
      return topicData;
    }))
     .pipe(
      map(res => {
        return res['data']
      .pipe(
          take(1),
          mergeMap(response => {
          // return of(response);
            if (!response) {
               return this._http.post<any>(`${this.pharosConfig.getTopicResolveUrl()}`, res['target'], httpOptions)
                  .pipe(
                    map(r => {
                      //  console.log(r);
                      if (r.content) {
                        if (r.content[0].ligands) {
                          r.content[0].ligands = r.content[0].ligands.filter(ligand => !ligand['']);
                        }
                        if (r.content[0].diseases) {
                          r.content[0].diseases = r.content[0].diseases.filter(disease => disease.Data_Source === 'Monarch' ||
                            disease.Data_Source === 'DrugCentral Indication');
                        }
                        return of(r.content[0]);
                      }
                    })
                  );

                /*  this.db.collection('topic-nodes')
                    .doc(res['target'])
                    .set({
                      graphData: r.content[0]
                    })
                    .then(() =>  {
                      this.saved.push(res['target']);
                      console.log("target saved");
                      return response;
                    })
                    .catch((error) => this.errors.push(res['target']));*/
               // }
              // });
            } else {
              this.alreadySaved.push(res['target']);
              return of(res['target']);
            }
            //   });
          }));
      }),
      concatAll()
    ); // .subscribe();

 return of(calls);






   /* const firebaseobs =
      batchobs.pipe(
    map(target => {
      console.log(target);
       return this.db.collection('topic-nodes').doc(target).valueChanges().pipe(take(1))
        .subscribe(res => {
          console.log(res);
          return res;
        });
      }),
      zipAll()
    );

      console.log(firebaseobs);*/


/*      .pipe(
      mergeMap(target => {
        console.log(target);
        return this.db.collection('topic-nodes').doc(target).valueChanges()// ref => ref.where('documentid', '==', target))
          /!*.valueChanges().pipe(take(1))
          .subscribe(res => {
            console.log(res);
            if (!res) {
              console.log("getting new data");
              console.log(target);
            } else {
            }
            return of(res);
          });*!/
      })
      ))*/
/*
firebaseobs
  .subscribe(res => {
        console.log(res);
        return res;
    } ) //.subscribe(res => console.log(res));
  //  batch.subscribe(res => console.log(res));
  //  return batch;
*/
  }

  generate() {
    this._http.get(URL, {responseType: 'text'}).subscribe(response => {
      const linesobs = from(response.split(/\r\n|\n/).slice(9200, 9340));
  // this.fetchData(response.split(/\r\n|\n/).slice(0, 100));
      const result = linesobs.pipe(
        bufferCount(20),
       // map(batch => this.fetchData(batch)),
        mergeMap(batch => this.fetchData(batch))
      );

      result.subscribe(x => {
        x.subscribe(ress => {}); // console.log(ress));
      });
    /*  lines.forEach(target => {
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
      });*/
    });
    /*  map(response => this.csvJSON(response.trim())),
      catchError(this.handleError('fetch uniprot ids', []))
    ).subscribe();*/
  }

}
