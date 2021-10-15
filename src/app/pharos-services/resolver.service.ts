import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MolChangeService} from '../tools/marvin-sketcher/services/mol-change.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(
    private http: HttpClient,
    private molChangeService: MolChangeService) {
    this.checkStatus();
  }

  resolverIsUp = false;
  responseDetails: any = {};
  fields = ['pt', 'lychi', 'smiles', 'inchikey', 'smilesParent', 'unii', 'cas'];
  batchFields = ['pt', 'inchikey', 'lychi'];

  resolve(input: string) {
    if (input && input.trim().length > 0) {
      this.http.get<string>(`https://tripod.nih.gov/servlet/resolver/${this.fields.join('/')}?structure=${encodeURIComponent(input)}`,
        // @ts-ignore
        {responseType: 'text' as const})
        .subscribe({
          next: response => {
            const responseObj: any = {};
            if (this.tryParse(response.toString(), responseObj)) {
              this.molChangeService.updateSmiles(responseObj.smilesParent, 'resolver');
              this.responseDetails = responseObj;
            } else {
              this.responseDetails = {};
            }
          },
          error: err => {
            alert(err.message);
          }
        });
    } else {
      this.responseDetails = {};
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
          list = [];
          len = 0;
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
                responseObj.success = true;
              } else {
                responseObj.save = response[0];
                responseObj.success = false;
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
}
