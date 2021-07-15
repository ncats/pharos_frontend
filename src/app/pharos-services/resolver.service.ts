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
  }
  responseDetails: any = {};
  fields = ['pt', 'lychi', 'smiles', 'inchikey', 'smilesParent', 'unii', 'cas'];
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
    }
    catch (error) {
      alert(error);
      return false;
    }
    return true;
  }

  checkStatus() {
    return true;
  }
}
