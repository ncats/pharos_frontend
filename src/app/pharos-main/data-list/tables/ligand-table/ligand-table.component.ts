import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {PageData} from '../../../../models/page-data';
import {MatTableDataSource} from '@angular/material';
import {PharosConfig} from "../../../../../config/pharos-config";

/**
 * table/list view of ligand overviews
 */
@Component({
  selector: 'pharos-ligand-table',
  templateUrl: './ligand-table.component.html',
  styleUrls: ['./ligand-table.component.css']
})
export class LigandTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * map of ligands
   * @type {Map<string, any>}
   */
  ligandsMap: Map<string, any> = new Map<string, any>();

  /**
   * map of dat sources
   * @type {MatTableDataSource<any[]>}
   */
  ligandsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();

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
   * @param {ChangeDetectorRef} changeDetector
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
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
      if (this.data) {
        this.setterFunction();
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
             refid = ligand.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
          }
            const newLigand = {
              name: ligand.name,
              refid: refid,
              activities: activity,
              imageUrl: ligand.image ? ligand.image : this._STRUCTUREURLBASE + refid + '.svg?size=250'
            };

            if (ligand.target) {
              newLigand['target'] = ligand.target;
            }
            this.ligandsMap.set(ligand.id, newLigand);
            ligandsArr.push(newLigand);
            this.ligandsDataSource.data = ligandsArr;
        });
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

  /**
   * clean up on destroy
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
