/**
 * Created by sheilstk on 6/16/17.
 */
import {NgModule} from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {LayoutModule} from '@angular/cdk/layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatStepperModule} from '@angular/material/stepper';
import {PortalModule} from '@angular/cdk/portal';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule} from '@angular/material/tree';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    imports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
        MatInputModule, MatIconModule, MatListModule, MatSliderModule,
        MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
        MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule, MatPaginatorModule,
        MatChipsModule, MatGridListModule, MatDividerModule, MatDialogModule, LayoutModule, DragDropModule, ScrollingModule,
        MatProgressBarModule, MatStepperModule, PortalModule, MatFormFieldModule, MatTreeModule, MatSnackBarModule],
    exports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
        MatInputModule, MatIconModule, MatListModule, MatSliderModule,
        MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
        MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule, MatPaginatorModule,
        MatChipsModule, MatGridListModule, MatDividerModule, MatDialogModule, ScrollingModule,
        LayoutModule, MatProgressBarModule, MatStepperModule, PortalModule, MatFormFieldModule, MatTreeModule, MatSnackBarModule],
})
export class MaterialModule {
}

