import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {BatchUploadModalComponent} from '../../../tools/batch-upload-modal/batch-upload-modal.component';
import {PharosProfileService} from '../../../auth/pharos-profile.service';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FieldSelectionDialogComponent} from '../../../tools/field-selection-dialog/field-selection-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {BatchResolveModalComponent} from '../../../tools/batch-resolve-modal/batch-resolve-modal.component';
import {ResolverService} from '../../../pharos-services/resolver.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {FeatureTrackingService} from '../../../pharos-services/feature-tracking.service';

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

  constructor(
              private breakpointObserver: BreakpointObserver,
              private profileService: PharosProfileService,
              private changeRef: ChangeDetectorRef,
              public dialog: MatDialog,
              private targetCollection: AngularFirestore,
              private snackBar: MatSnackBar,
              private router: Router,
              private _route: ActivatedRoute,
              public dynamicServices: DynamicServicesService,
              private centralStorageService: CentralStorageService,
              private resolverService: ResolverService,
              private featureTrackingService: FeatureTrackingService)
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


  @HostListener('window:resize', [])
  onResize() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
  }

  currentQueryParams() {
    return this._route.snapshot.queryParams;
  }

  isLigandPage() {
    return this._route.snapshot.data.path === 'ligands';
  }

  isTargetPage() {
    return this._route.snapshot.data.path === 'targets';
  }

  isAnalyzePage() {
    return this._route.snapshot.data.subpath === 'analyze';
  }

  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
    this.rowSelection = this.centralStorageService.rowSelection;
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.modelCount = this.data.count;
        this.models = this.data.targets ? 'Targets' : this.data.diseases ? 'Diseases' : 'Ligands';
        this.model = this.models.slice(0, this.models.length - 1);
      });

    this.profileService.profile$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
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

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
      if (result) {
        if (this.isLigandPage() && this.resolverService.resolverIsUp) {
          const resolveDialog = this.dialog.open(BatchResolveModalComponent, {
            height: '75vh',
            width: '66vw',
            data: {
              targetList: result.targetList
            }
          });
          resolveDialog.afterClosed()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(resolveResult => {
            if (resolveResult) {
              console.log(resolveResult);
              result.targetList = resolveResult.targetList;
              this.saveCollection(result);
            }
          });
        } else {
          this.saveCollection(result);
        }
      }
    });
  }

  private saveCollection(result) {
    this.featureTrackingService.trackFeature('Save Custom List', this.centralStorageService.getModel(this._route));
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

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: this.modelCount, model: this.model, route: this._route},
      height: '77vh', width: '66vw'
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

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
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

  goToStructureSearch(){
    this.router.navigate(['/structure']);
  }

  goToSequenceSearch() {
    this.router.navigate(['/sequence']);
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
