import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'pharos-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModelDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { modelChemblId: string},
              private http: HttpClient,
              @Inject(PLATFORM_ID) private platformID: any) { }

  modelDetails: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
    this.http.get<any>(`https://predictor.ncats.io/predictor/route/predict/model/byid/${this.data.modelChemblId}`)
      .subscribe(modelDetails => {
        this.modelDetails = modelDetails;
      });
    }
  }

  cancel(){
    this.dialogRef.close(null);
  }
}
