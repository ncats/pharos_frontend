/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule,
  MatListModule, MatSliderModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatSidenavModule,
  MatSlideToggleModule, MatRadioModule, MatCheckboxModule, MatCardModule, MatTooltipModule,
  MatSelectModule, MatExpansionModule, MatPaginatorModule
} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {LayoutModule} from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';






@NgModule({
  imports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule, MatPaginatorModule,
    MatChipsModule, MatGridListModule, MatDividerModule, MatDialogModule, ScrollingModule,
    LayoutModule, MatProgressBarModule, MatStepperModule],
  exports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule, MatPaginatorModule,
    MatChipsModule, MatGridListModule, MatDividerModule, MatDialogModule, ScrollingModule,
    LayoutModule, MatProgressBarModule, MatStepperModule],
})
export class MaterialModule { }

