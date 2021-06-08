import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'pharos-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModelDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { modelChemblId: string},
              private http: HttpClient) { }

  modelDetails: any;

  ngOnInit(): void {
    this.http.get<any>(`https://predictor.ncats.io/predictor/route/predict/model/byid/${this.data.modelChemblId}`)
      .subscribe(modelDetails => {
        this.modelDetails = modelDetails;
      });
  }

  cancel(){
    this.dialogRef.close(null);
  }
}
