import {Component, Inject, OnInit} from '@angular/core';
import {ResolverService} from '../../pharos-services/resolver.service';
import {PharosProperty} from '../../models/pharos-property';
import {DataProperty} from '../generic-table/components/property-display/data-property';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {GenericTableComponent} from '../generic-table/generic-table.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, GenericTableComponent],
  selector: 'pharos-batch-resolve-modal',
  templateUrl: './batch-resolve-modal.component.html',
  styleUrls: ['./batch-resolve-modal.component.scss']
})
export class BatchResolveModalComponent implements OnInit {

  resolvedInputs: any[];
  resolvedInputProps: any[];
  loading = false;

  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'input',
      label: 'Input'
    }),
    new PharosProperty({
      name: 'lychi_h4',
      label: 'Resolved LyChI ID'
    }),
    new PharosProperty({
      name: 'found',
      label: 'Pharos Data Found',
      checkbox: true
    }),
    new PharosProperty({
      name: 'save',
      label: 'List to save'
    })];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BatchResolveModalComponent>,
    private resolverService: ResolverService,
    private pharosApiService: PharosApiService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.resolverService.resolveLychis(this.data.targetList).then(res => {
      this.resolvedInputs = res;
      this.pharosApiService.adHocQuery(this.pharosApiService.batchConfirmation(),
        {
          batch: res.map(r => r.save),
          top: res.length * 2
        }).toPromise()
        .then((gqlRes: any) => {
          gqlRes.data.ligands.ligands.forEach(l => {
            l.synonyms.forEach(s => {
              const matches = this.resolvedInputs.filter(r => r.save === s.value);
              matches.forEach(f => {
                f.found = true;
              });
            });
          });
          this.resolvedInputs.forEach(r => {
            if (!r.found) {
              if (r.input.startsWith('CHEMBL') || Number.parseInt(r.input, 10)) {
                r.save = r.input;
              }
            }
          });
          this.resolvedInputProps = this.resolvedInputs.map(i => this._mapField(i));
          this.loading = false;
        });
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submitList() {
    this.dialogRef.close({
      targetList: this.resolvedInputs.map(f => f.save)
    });
  }


  private _mapField(obj: any) {
    const retObj: {} = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        const val = obj[objField];
        const trimmed = val.length > 50 ? val.substring(0, 50) + '...' : val;
        retObj[objField] = new DataProperty({name: objField, label: objField, term: trimmed});
      }
    });
    return retObj;
  }
}
