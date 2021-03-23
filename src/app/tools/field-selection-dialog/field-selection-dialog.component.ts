import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {format} from 'sql-formatter';
import {ActivatedRoute} from '@angular/router';
import {TargetListService} from '../../pharos-services/target-list.service';
import {saveAs} from 'file-saver';
import {Parser} from 'json2csv';
import {FieldList} from '../../models/fieldList';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SelectedFacetService} from '../../pharos-main/data-list/filter-panel/selected-facet.service';
import { version, tcrd_version } from '../../../../package.json';
import {PharosProfileService} from '../../auth/pharos-profile.service';
import JSZip from 'jszip';

@Component({
  selector: 'pharos-field-selection-dialog',
  templateUrl: './field-selection-dialog.component.html',
  styleUrls: ['./field-selection-dialog.component.scss']
})
export class FieldSelectionDialogComponent implements OnInit {

  profile: any;

  constructor(public dialogRef: MatDialogRef<FieldSelectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { model: string, count: number , route: any},
              private pharosApiService: PharosApiService,
              private changeDetectorRef: ChangeDetectorRef,
              private targetListService: TargetListService,
              private snackBar: MatSnackBar,
              private profileService: PharosProfileService,
              private selectedFacetService: SelectedFacetService) {
  }

  get displayColumns() {
    return ['id', ...this.selectedFields];
  }

  associatedTarget: string;
  associatedDisease: string;

  lists: FieldList[] = [];
  singles: FieldList;
  selectedGroup: FieldList = null;

  defaults: string[] = [];
  selectedFields: string[] = [];


  previewData: any[] = [];
  sql = '';
  sqlDirty = true;
  dataDirty = true;
  loading = false;

  ngOnInit(): void {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile && profile.data() ? profile.data() : profile;
    });

    this.associatedTarget = this.data.route.snapshot.queryParamMap.get('associatedTarget');
    this.associatedDisease = this.data.route.snapshot.queryParamMap.get('associatedDisease');
    const variables = {
      model: 'Target',
      associatedModel: this.associatedTarget ? 'Target' : this.associatedDisease ? 'Disease' : ''
    };
    this.pharosApiService.adHocQuery(this.pharosApiService.FieldQuery, variables).subscribe({
        next: res => {
          this.singles = new FieldList(res.data.configuration.downloadLists.find(list => list.listName === 'Single Value Fields'));
          this.lists = res.data.configuration.downloadLists.filter(list => list.listName !== 'Single Value Fields').map(list => {
            return new FieldList(list);
          });
          this.selectedFields = this.defaults.slice();
        },
      error: err => {
          alert(err);
        }
      }
    );
  }


  groupChanged(event: MatCheckboxChange, parentGroup: FieldList) {
    this.sqlDirty = true;
    this.dataDirty = true;
    if (event.checked) {
      if (!parentGroup.equals(this.singles)) {
        this.selectedGroup = parentGroup;
        this.selectedFields = parentGroup.field.map(f => f.name);
      } else {
        // push all singles
        const multiNames = this.selectedFields.filter(f => !this.singles.asFieldList().includes(f));
        this.selectedFields = [...this.singles.asFieldList(), ...multiNames];
      }
    } else {
      this.selectedFields = this.selectedFields.filter(f => !this.getListOfFields(parentGroup).includes(f));
      if (!parentGroup.equals(this.singles)) {
        this.selectedGroup = null;
      }
    }

    // this.changeDetectorRef.detectChanges();
  }

  fieldChanged(event: MatCheckboxChange, parentGroup: any) {
    this.sqlDirty = true;
    this.dataDirty = true;
    const field: string = event.source.value;
    if (event.checked) {
      if (parentGroup) {
        this.selectedGroup = parentGroup;
      }
      if (!this.selectedFields.includes(field)) {
        this.selectedFields.push(field);
        const singleNames = this.singles.asFieldList().filter(f => this.selectedFields.includes(f));
        const multiNames = [];
        if (this.selectedGroup) {
          multiNames.push(...this.selectedGroup.asMultiFieldList(this.singles));
        }
        this.selectedFields = [
          ...singleNames,
          ...multiNames
        ];
      }
    } else {
      this.selectedFields = this.selectedFields.filter(f => f !== field);

      if (this.allSingles()) {
        this.selectedGroup = null;
      }
    }
  }

  groupComplete(list: FieldList) {
    const fieldNames = this.getListOfFields(list);
    let retVal = true;
    fieldNames.forEach(field => {
      if (!this.selectedFields.includes(field)) {
        retVal = false;
      }
    });
    return retVal;
  }

  groupIncomplete(list: FieldList) {
    const fieldNames = this.getListOfFields(list);
    let hasChecked = false;
    let hasUnchecked = false;
    fieldNames.forEach(fieldInList => {
      if (this.selectedFields.includes(fieldInList)) {
        hasChecked = true;
      } else {
        hasUnchecked = true;
      }
    });
    return hasChecked && hasUnchecked;

  }

  private getListOfFields(list: FieldList) {
    let fieldNames: string[];
    if (list.equals(this.singles)) {
      fieldNames = list.asFieldList();
    } else {
      fieldNames = list.asMultiFieldList(this.singles);
    }
    return fieldNames;
  }

  isSingleValued(field: any) {
    return this.singles.field.map(f => f.name).includes(field.name);
  }

  fieldDisabled(parentGroup: any) {
    if (!this.selectedGroup) {
      return false;
    }
    return !this.selectedGroup.equals(parentGroup);
  }

  allSingles(): boolean {
    let allSingles = true;
    this.singles.asFieldList().forEach(t => {
      if (!this.selectedFields.includes(t)) {
        allSingles = false;
      }
    });
    return allSingles;
  }

  sqlTabSelected(event: MatTabChangeEvent) {
    if (this.selectedFields.length > 0) {
      if (event.index === 1) {
        if (this.sqlDirty) {
          this.sql = '';
          this.updateSQL();
        }
      }
      if (event.index === 2) {
        if (this.dataDirty) {
          this.previewData = [];
          this.updatePreviewData();
        }
      }
    }
  }

  cancel() {
    this.dialogRef.close('canceled!');
  }

  doDownload() {
    const params = {
      model: 'Targets',
      fields: this.selectedFields,
      sqlOnly: false
    };
    this.runDownloadQuery(params, true);
    this.dialogRef.close();
  }

  updatePreviewData() {
    const params = {
      model: 'Targets',
      fields: this.selectedFields,
      sqlOnly: false,
      top: 20
    };
    this.runDownloadQuery(params);
  }

  updateSQL() {
    const params = {
      model: 'Targets',
      fields: this.selectedFields,
      sqlOnly: true
    };
    this.runDownloadQuery(params);
  }

  private runDownloadQuery(params: { model: string; fields: string[], sqlOnly: boolean }, save: boolean = false) {
    if (!save) {
      this.loading = true;
    } else {
      this.snackBar.open('Your download query is being executed. Don\'t leave Pharos!', '', {duration: 10000000});
    }
    this.pharosApiService.downloadQuery(this.data.route.snapshot, params).then((res: any) => {
      if (!params.sqlOnly) {
        if (save) {
          if (res.data.download.result){
            this.sql = format(res.data.download.sql, {language: 'mysql', uppercase: true});

            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(res.data.download.data);
            const csvBlob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
            const metaBlob = new Blob([this.getMetadata()], {type: 'text/plain;charset=utf-8'});

            const zip = new JSZip();
            zip.file('query results.csv', csvBlob);
            zip.file('query metadata.txt', metaBlob);
            zip.generateAsync({type: 'blob'}).then((content) => {
              saveAs(content, 'pharos data download.zip');
            });

          }
          else {
            alert('Error: ' + res.data.download.errorDetails);
          }
          this.snackBar.dismiss();
        } else {
          this.previewData = res.data.download.data;
          this.dataDirty = false;
        }
      } else {
        if (res.data.download.result){
          this.sql = format(res.data.download.sql, {language: 'mysql', uppercase: true});
        }
        else {
          this.sql = res.data.download.errorDetails;
        }
        this.sqlDirty = false;
      }
      if (!save) {
        this.loading = false;
      }
    });
  }

  abbrev(data: any, field: string) {
    if (!data) {
      return '';
    }
    if (!data[field]) {
      return '';
    }
    if (data[field].toString().length > 20) {
      return data[field].toString().substring(0, 17) + '...';
    }
    return data[field];
  }

  getMetadata(){
    const metadata = `User: ${this.profile ? this.profile.name : 'not logged in'}
${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
TCRD Version: ${tcrd_version}
Pharos Version: ${version}

${this.selectedFacetService.newTitle(this.data.route)}
${this.selectedFacetService.newDescription(this.data.route)}

Selected Fields for Download:
  ${this.selectedFields.join('\n  ')}

SQL Query:
${this.sql}`;
    return  metadata;
  }

}
