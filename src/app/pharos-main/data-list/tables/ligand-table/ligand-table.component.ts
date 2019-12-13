import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {PageData} from '../../../../models/page-data';
import {MatTableDataSource} from '@angular/material';
import {PharosConfig} from '../../../../../config/pharos-config';
import {Ligand} from '../../../../models/ligand';
import {ActivatedRoute} from '@angular/router';

/**
 * table/list view of ligand overviews
 */
@Component({
  selector: 'pharos-ligand-table',
  templateUrl: './ligand-table.component.html',
  styleUrls: ['./ligand-table.component.css']
})
export class LigandTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  path = 'ligands';

  ligands: Ligand[];
  /**
   * event emitter of sort event on table
   * @type {EventEmitter<string>}
   */
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * event emitter for page change on table
   * @type {EventEmitter<string>}
   */
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

  /**
   * url for structure rendering
   */
  private _STRUCTUREURLBASE: string;

  /**
   * set up config and change detection
   * @param ref
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    private _route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private pharosConfig: PharosConfig
  ) {
    super();
  }

  /**
   * set image url and subscribe to data changes
   */
  ngOnInit() {
    this._STRUCTUREURLBASE = this.pharosConfig.getStructureImageUrl();
    this._data.subscribe(d => {
      if (this.data && this.data.ligands) {
        this.pageData = new PageData({
          top: this._route.snapshot.queryParamMap.has('rows') ? +this._route.snapshot.queryParamMap.get('rows') : 10,
          skip: (+this._route.snapshot.queryParamMap.get('page') - 1) * +this._route.snapshot.queryParamMap.get('rows'),
          total: this.data.count
        });
        this.ligands = this.data.ligands;
        console.log(this.ligands);
        this.loading = false;
        this.ref.detectChanges();
      }
    });
  }

  /**
   * this changes the sort order
   * @param $event
   */
  changeSort($event): void {
    this.sortChange.emit($event);
  }

  /**
   * emits pagination event
   * @param $event
   */
  changePage($event): void {
    this.pageChange.emit($event);
  }

  /**
   * set ligand overview data and map activity data
   */
  setterFunction(): void {
    const ligandsArr = [];
/*
    this.data.forEach(ligand => {
          const mappedLig = this.ligandsMap.get(ligand.id);
          if (!mappedLig) {
            // placeholder to block repetitive calls
            this.ligandsMap.set(ligand.id, {});
          } else {
            ligandsArr.push(mappedLig);
            this.ligandsDataSource.data = ligandsArr;
          }
          let activity: any[] = [];
          let refid = '';

          if (ligand.links) {
            activity = ligand.links.filter(link => link.kind === 'ix.idg.models.Target').map(target => this._getActivity(target));
            ligand.links.forEach(link => {
              if (link.kind === 'ix.core.models.Structure') {
                refid = link.refid;
              }
            });
          }
            const newLigand = {
              name: ligand.name,
              refid: refid,
              activities: activity,
              internalLink: ['/ligands', ligand.id],
              imageUrl: this.parseImageUrl(ligand, refid)
            };

            if (ligand.target) {
              newLigand['target'] = ligand.target;
            }
            this.ligandsMap.set(ligand.id, newLigand);
            ligandsArr.push(newLigand);
            this.ligandsDataSource.data = ligandsArr;
        });
*/
  }

  /**
   * fetch and parse ligand sctivities
   * @param ligand
   * @returns {any}
   * @private
   */
  private _getActivity(ligand: any): any {
    const otherActivity = [];
    const ret: any[] = [];
    const na = {label: 'N/A', numval: ''};
    ligand.properties.filter(prop => {
      if (prop.label === 'Ligand Activity') {
        otherActivity.push({
            activity: ligand.properties.filter(p => p.label === prop.term)[0],
            target: ligand.properties.filter(p => p.label === 'IDG Target')[0].term,
            targetFamily: ligand.properties.filter(p => p.label === 'IDG Target Family')[0].term,
            idgLevel: ligand.properties.filter(p => p.label === 'IDG Development Level')[0].term,
          }
        );
      }
    });
        return otherActivity ? otherActivity[0] : na;
      }

  private parseImageUrl(ligand: any, refid: string): string {
    if (refid || ligand.structureId) {
      return this._STRUCTUREURLBASE + refid + '.svg?size=250';
    } else if (ligand.image && (ligand.image.split(this._STRUCTUREURLBASE).length > 1)) {
      return ligand.image;
    } else if (ligand.image && (ligand.image.split(this._STRUCTUREURLBASE).length <= 1)) {
      return `${this._STRUCTUREURLBASE}${ligand.image.split('/structure/')[1]}`;
    } else {
      return null;
    }
  }

  /**
   * clean up on destroy
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
