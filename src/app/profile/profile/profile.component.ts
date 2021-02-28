import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Facet, Field} from '../../models/facet';
import {forkJoin, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {PharosProfileService} from '../../auth/pharos-profile.service';
import {PathResolverService} from '../../pharos-main/data-list/filter-panel/path-resolver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {BatchUploadModalComponent} from '../../tools/batch-upload-modal/batch-upload-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'pharos-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: any;

  collections: any[];

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
    this.profileService.profile$.subscribe(user => {
      if (user) {
        this.user = user;
        if (user.data().collection) {
          this.collections = [];
          const collections: [Observable<Field>] = user.data().collection.map(batch => {
            return this.firestore.collection<any>('target-collection')
              .doc<any>(batch)
              .valueChanges()
              .pipe(
                take(1),
                map(collection => {
                  if (collection) {
                    collection.id = batch;
                    return collection;
                  }
                })
              );
          });
          forkJoin([...collections]).subscribe(res => {
            this.collections = res.filter(response => response);
            this.changeRef.markForCheck();
          });
        }
      }
    });
  }

  deleteCollection(collection) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
        height: '20vh',
        width: '25vw'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
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
}
