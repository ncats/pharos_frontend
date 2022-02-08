import {Inject, Injectable, OnDestroy, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MolChangeService} from '../tools/marvin-sketcher/services/mol-change.service';
import {isPlatformBrowser} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private http: HttpClient,
    private molChangeService: MolChangeService,
    @Inject(PLATFORM_ID) private platformID: any) {
    if (isPlatformBrowser(this.platformID)) {
      this.checkStatus();
    }
  }

  resolverIsUp = false;
  fields = ['pt', 'lychi', 'smiles', 'inchikey', 'smilesParent', 'unii', 'cas'];
  batchFields = ['pt', 'inchikey', 'lychi'];

  resolve(input: string): Promise<any> {
    if (input && input.trim().length > 0) {
      return this.http.get<string>(
        `https://tripod.nih.gov/servlet/resolver/${this.fields.join('/')}?structure=${encodeURIComponent(input)}`,
        // @ts-ignore
        {responseType: 'text' as const}).toPromise()
        .then(
          response => {
            const responseObj: any = {};
            if (this.tryParse(response.toString(), responseObj)) {
              this.molChangeService.updateSmiles(responseObj.smilesParent, 'resolver');
              return responseObj;
            } else {
              return {};
            }
          }).catch(err => {
          alert(err.message);
        });
    } else {
      return Promise.resolve({});
    }
  }

  tryParse(response: string, responseObj: any) {
    try {
      const responseFields = response.toString().split('\t');
      let index = 1;
      this.fields.forEach(field => {
        responseObj[field] = responseFields[index++];
      });
      if (!responseObj.smiles || responseObj.smiles.length === 0) {
        throw new Error('unable to find SMILES for this compound: ' + responseFields[0]);
      }
    } catch (error) {
      alert(error);
      return false;
    }
    return true;
  }

  resolveLychis(inputs: string[]) {
    if (inputs.length > 0) {
      const encodedInputs = inputs.map(i => encodeURIComponent(i));
      const maxLen = 2000 - 59;
      const queries = [];
      let list = [];
      let len = 0;
      encodedInputs.forEach(input => {
        const oneLen = input.length;
        if ((oneLen + 3) > maxLen) {
          queries.push(
            this.http.get<string>(`https://tripod.nih.gov/servlet/resolver/${this.batchFields.join('/')}?structure=${input}`,
              // @ts-ignore
              {responseType: 'text' as const}).toPromise()
          );
          return;
        }
        if ((len + oneLen + 3) > maxLen) {
          queries.push(
            this.http.get<string>(`https://tripod.nih.gov/servlet/resolver/${this.batchFields.join('/')}?structure=${list.join('%0A')}`,
              // @ts-ignore
              {responseType: 'text' as const}).toPromise()
          );
          list = [input];
          len = oneLen;
          return;
        } else {
          list.push(input);
          len += oneLen + 3;
        }
      });
      if (list.length > 0) {
        queries.push(
          this.http.get<string>(`https://tripod.nih.gov/servlet/resolver/${this.batchFields.join('/')}?structure=${list.join('%0A')}`,
            // @ts-ignore
            {responseType: 'text' as const}).toPromise()
        );
      }

      return Promise.all(queries).then(resultArray => {
        const returnObjects = [];

        resultArray.forEach(results => {
          const responses = results.toString().split('\n').map(r => r.split('\t'));
          responses.forEach(response => {
            if (response.length > this.batchFields.length) {
              const responseObj: any = {};
              let index = 1;
              this.batchFields.forEach(field => {
                responseObj[field] = response[index++];
              });
              responseObj.input = response[0];
              responseObj.match = responseObj.pt || responseObj.inchikey;
              const lychis = responseObj.lychi.split('-');
              if (lychis.length > 3) {
                responseObj.save = lychis[3];
                responseObj.lychi_h4 = lychis[3];
              } else {
                responseObj.save = response[0];
              }
              returnObjects.push(responseObj);
            }
          });
        });
        return returnObjects;
      });
    }
  }


  checkStatus() {
    this.http.get<string>(`https://tripod.nih.gov/servlet/resolver/lychi/smiles/inchikey?structure=C1CCC1`,
      // @ts-ignore
      {responseType: 'text' as const})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: response => {
          const responseObj: any = {};
          if (this.tryParse(response.toString(), responseObj)) {
            this.resolverIsUp = true;
          } else {
            this.resolverIsUp = false;
          }
        },
        error: err => {
          this.resolverIsUp = false;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
