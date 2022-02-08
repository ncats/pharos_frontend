import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Facet, Field} from '../../models/facet';
import {forkJoin, Observable, Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {PharosProfileService} from '../../auth/pharos-profile.service';
import {PathResolverService} from '../../pharos-main/data-list/filter-panel/path-resolver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'pharos-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();

  @Input() user: any;

  collections: any[];
  targetCollections: any[];
  diseaseCollections: any[];
  ligandCollections: any[];
  collectionObjects: any[];

  constructor(
    private changeRef: ChangeDetectorRef,
    private router: Router,
    private _route: ActivatedRoute,
    private profileService: PharosProfileService,
    public dialog: MatDialog,
    private pathResolverService: PathResolverService,
    private pharosApiService: PharosApiService,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.profileService.profile$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
      if (user) {
        this.user = user;
        if (user.data().collection) {
          this.collections = [];
          const collections: [Observable<Field>] = user.data().collection.map(batch => {
            return this.firestore.collection<any>('target-collection')
              .doc<any>(batch)
              .valueChanges()
              .pipe(
                // @ts-ignore
                take(1),
                map((collection: any) => {
                  if (collection) {
                    collection.id = batch;
                    return collection;
                  }
                })
              );
          });
          forkJoin([...collections])
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
            this.collections = res.filter(response => response);
            this.targetCollections = this.collections?.filter(c => {
                return !c.models || c.models === 'targets';
              });
            this.diseaseCollections = this.collections?.filter(c => {
                return c.models === 'diseases';
              });
            this.ligandCollections = this.collections?.filter(c => {
                return c.models === 'ligands';
              });
            this.collectionObjects = [
              {
                collectionHeader: 'Target Collections',
                models: 'Targets',
                collection: this.targetCollections
              },
              {
                collectionHeader: 'Disease Collections',
                models: 'Diseases',
                collection: this.diseaseCollections
              },
              {
                collectionHeader: 'Ligand Collections',
                models: 'Ligands',
                collection: this.ligandCollections
              },
            ];

            this.changeRef.markForCheck();
          });
        }
      }
    });
  }

  deleteCollection(collection) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
        height: '25vh',
        width: '25vw'
      }
    );

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
      if (result) {
        this.firestore.collection<any[]>('target-collection')
          .doc<any[]>(collection.id)
          .delete()
          .then(res => {
            this.profileService.updateEntireCollection(this.user.data().collection.filter(coll => coll !== collection.id));
            this.snackBar.open('Collection deleted.', 'OK');
          });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
