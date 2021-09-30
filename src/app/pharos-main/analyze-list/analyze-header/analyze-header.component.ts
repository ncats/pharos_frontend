import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BatchUploadModalComponent} from '../../../tools/batch-upload-modal/batch-upload-modal.component';
import {PharosProfileService} from '../../../auth/pharos-profile.service';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FieldSelectionDialogComponent} from '../../../tools/field-selection-dialog/field-selection-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../models/page-data';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'pharos-analyze-header',
  templateUrl: './analyze-header.component.html',
  styleUrls: ['./analyze-header.component.scss']
})
export class AnalyzeHeaderComponent extends DynamicPanelComponent implements OnInit {

  constructor(private profileService: PharosProfileService,
              private changeRef: ChangeDetectorRef,
              public dialog: MatDialog,
              private targetCollection: AngularFirestore,
              private snackBar: MatSnackBar,
              private router: Router,
              private _route: ActivatedRoute,
              public dynamicServices: DynamicServicesService,
              private centralStorageService: CentralStorageService)
  {
    super(dynamicServices);
  }
  loggedIn = false;
  user: any;
  modelCount: number;
  models: string;
  model: string;


  /**
   * selection model for when rows are selectable in table, used for compare and storing targets
   * @type {SelectionModel<any>}
   */
  rowSelection: SelectionModel<any>;

  currentQueryParams() {
    return this._route.snapshot.queryParams;
  }

  isAnalyzePage() {
    return this._route.snapshot.data.subpath === 'analyze';
  }

  ngOnInit(): void {
    this.rowSelection = this.centralStorageService.rowSelection;
    this._data
      // listen to data as long as term is undefined or null
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.modelCount = this.data.count;
        this.models = this.data.targets ? 'Targets' : this.data.diseases ? 'Diseases' : 'Ligands';
        this.model = this.models.slice(0, this.models.length - 1);
      });

    this.profileService.profile$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        this.changeRef.markForCheck();
        // User is signed in.
      } else {
        this.loggedIn = false;
        this.changeRef.markForCheck();
        // No user is signed in.
      }
    });
  }


  /**
   * create and open batch upload dialog,
   * fetch results on close and redirect to search by etag
   */
  batchUpload() {
    const dialogRef = this.dialog.open(BatchUploadModalComponent, {
        height: '75vh',
        width: '66vw',
        data: {
          models: this.models,
          nameable: this.loggedIn,
          saveToProfile: true
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.targetCollection.collection('target-collection').add(
          result
        ).then(doc => {
          if (this.loggedIn && result.saveList) {
            this.profileService.updateSavedCollection(doc.id);
          }
          this.snackBar.open(this.models + ' uploaded!');
          navigationExtras.state = {batchIds: result.targetList};
          navigationExtras.queryParams = {
            collection: doc.id,
          };
          this.snackBar.dismiss();
          this._navigate(navigationExtras);
        });
      }
    });
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: this.modelCount, model: this.model, route: this._route}, // TODO figure out how to do this for different models
      height: '75vh', width: '66vw'
    }).afterClosed();
  }


  /**
   * stub for target list saving
   * todo: implement
   */
  saveTargets() {
    const targetList = this.rowSelection.selected.map(target => target = target.accession);
    const dialogRef = this.dialog.open(BatchUploadModalComponent, {
        height: '50vh',
        width: '50vw',
        data: {
          title: `Saving ${targetList.length} Targets`,
          selection: targetList,
          user: this.user,
          nameable: this.loggedIn,
          models: this.models.toLowerCase()
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.targetCollection.collection('target-collection').add(
          result
        ).then(doc => {
          if (result.saveList) {
            this.profileService.updateSavedCollection(doc.id);
          }
          this.rowSelection.clear();
          this.snackBar.open('Targets saved!');
        });
      }
    });
  }

  /**
   * navigate on changes, mainly just changes url, shouldn't reload entire page, just data
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);
  }
}
