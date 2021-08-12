import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {PharosProperty} from '../../../../../models/pharos-property';
import {HttpClient} from '@angular/common/http';
import {PDBResult, PDBResultSerializer, PDBViewObject} from '../../../../../models/pdb-report';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PageData} from '../../../../../models/page-data';
import {Target} from '../../../../../models/target';
import {BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {PdbApiService} from '../../../../../pharos-services/pdb-api.service';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {ColorScheme, CentralStorageService, Representation} from '../../../../../pharos-services/central-storage.service';

/**
 * component to fetch data from the rcsb protein databank and display tested ligands nested in a protein structure
 */
@Component({
  selector: 'pharos-pdb-panel',
  templateUrl: './pdb-panel.component.html',
  styleUrls: ['./pdb-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdbPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  colors =  Object.keys(ColorScheme);
  reps = Object.keys(Representation);
  selectedModel = 0;

  /**
   * fields to be show in the pdb table
   * @type {PharosProperty[]}
   */
  fieldsData: PharosProperty[] = [
    new PharosProperty({
      name: 'structureId',
      label: 'PDB Structure Id',
      width: '20vw'
    }),
    new PharosProperty({
      name: 'ligands',
      label: 'Ligand',
      width: '30vw'
    }),
    new PharosProperty({
      name: 'methods',
      label: 'Method',
      width: '20vw'
    }),
    new PharosProperty({
      name: 'resolution',
      label: 'Resolution (Å)',
      width: '10vw'
    }),
    new PharosProperty( {
      name: 'residues',
      label: 'Residues',
      width: '10vw'
    }),
    new PharosProperty( {
      name: 'fraction',
      label: 'Fraction of Total Protein',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'pubYear',
      label: 'Pub Year',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'title',
      label: 'Title',
      width: '30vw'
    })
  ];

  shortFieldsData: PharosProperty[] = [
    new PharosProperty({
      name: 'structureId',
      label: 'PDB Structure Id',
    }),
    new PharosProperty( {
      name: 'fraction',
      label: 'Fraction of Total Protein',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'resolution',
      label: 'Resolution'
    }),
    new PharosProperty({
      name: 'pubYear',
      label: 'Pub Year'
    })
  ];

  @Input() target: Target;
  pdbResponses: PDBResult[] = [];
  pdbViewObjects: PDBViewObject[] = [];
  pdbIDs: string[] = [];

  /**
   * pagination data object
   */
  pageData: PageData;

  /**
   * active pdb id shown in protein structure viewer
   */
  pdbid: PDBResult;

  /**
   * set up httpservice
   * @param {NavSectionsService} navSectionsService
   * @param changeRef
   * @param {HttpClient} _http
   */
  constructor(
    public centralStorageService: CentralStorageService,
    private changeRef: ChangeDetectorRef,
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformID: any,
    private pdbApollo: PdbApiService,
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  /**
   * set up subscription to watch for data change
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.hasData()) {
          this.setterFunction();
          this.showSection();
        } else {
          this.hideSection();
        }
        this.changeRef.markForCheck();
        this.loadingComplete();
      });

  }

  hasData() {
    return this.target.pdbs && this.target.pdbs.length > 0 ||
      this.target.alphaFoldStructures && this.target.alphaFoldStructures.length > 0;
  }
  currentResidues() {
    return this.pdbid.accessionRegions(this.target.accession);
  }
  /**
   * fetch pdb data from rcsb, create pagedata object and parse first page of reports
   */
  setterFunction() {
    this.pdbIDs = this.target.pdbs.map<any>(pdb => pdb = pdb.pdbs);
    this.pageData = this.makePageData(this.target.pdbs.length);
    this.pageData.top = 5;
    if (isPlatformBrowser(this.platformID)) {
      this.fetchPDB();
    }
  }

  changeColor(event) {
    this.centralStorageService.setField('pdbColorScheme', event.value);
  }

  changeRep(event) {
    this.centralStorageService.setField('pdbRepresentation', event.value);
  }
  /**
   * paginate the pdb table. The raw data is converted into properties objects after slicing
   * @param event
   */
  pagePDB(event) {
    this.pageData.skip = event.pageIndex * event.pageSize;
    this.pageData.top = (event.pageIndex + 1) * event.pageSize;
    this.fetchPDB();
  }

  fetchPDB() {
    this.pdbApollo.getEntries(this.pdbIDs.slice(this.pageData.skip, this.pageData.top))
      .then(response => {
        this.pdbResponses = response.data.entries.map(obj => new PDBResultSerializer().fromJson(obj)).sort((a, b) => {
          return b.totalPeptideLength(this.target.accession) - a.totalPeptideLength(this.target.accession);
        });
        this.pdbViewObjects = this.pdbResponses.map(r => new PDBViewObject(r, this.target));
        this.pdbid = this.pdbResponses[0];
        this.changeRef.detectChanges();
        this.loadingComplete();
      });
  }

  /**
   * change the molecule displayed in the protein structure viewer
   * @param entry
   */
  changePdbId(entry: any) {
    if (this.pdbid?.structureId !== entry.structureId.term) {
      this.pdbid = this.pdbResponses.find(r => r.structureId === entry.structureId.term);
      this.changeRef.markForCheck();
    }
  }

  highlightRow(row) {
    return this.pdbid && (row?.structureId.term === this.pdbid?.structureId);
  }

  nViewers() {
    return (Number(this.target.alphaFoldStructures?.length > 0) + Number(this.target.pdbs?.length > 0));
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
