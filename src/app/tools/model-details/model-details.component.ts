import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {PropertyDisplayComponent} from '../generic-table/components/property-display/property-display.component';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule, PropertyDisplayComponent, MatToolbar,
    MatDialogModule],
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
