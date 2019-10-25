import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DataDetailsComponent} from './data-details.component';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FacetRetrieverService} from '../data-list/filter-panel/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedListModule} from '../../shared/shared-list.module';
import {SharedDetailsModule} from '../../shared/shared-details.module';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {TargetHeaderComponent} from './target-details/target-header/target-header.component';
import {TargetDetailsComponent} from './target-details/target-details.component';
import {IdgLevelIndicatorComponent} from '../../tools/idg-level-indicator/idg-level-indicator.component';
import {TargetListPanelComponent} from './disease-details/target-list-panel/target-list-panel.component';
import {CommonToolsModule} from '../../tools/common-tools.module';
import {TOKENS} from '../../../config/component-tokens';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TESTTARGET} from '../../../../test/test-target';
import {GeneSummaryComponent} from './target-details/panels/gene-summary/gene-summary.component';
import {BreadcrumbComponent} from './target-details/panels/breadcrumb/breadcrumb.component';
import {ProteinProteinPanelComponent} from './target-details/panels/protein-protein-panel/protein-protein-panel.component';
import {PublicationInfoPanelComponent} from './target-details/panels/publication-info-panel/publication-info-panel.component';
import {TargetFacetPanelComponent} from './target-details/panels/target-facet-panel/target-facet-panel.component';
import {LigandsPanelComponent} from './target-details/panels/ligands-panel/ligands-panel.component';
import {IdgResourcesPanelComponent} from './target-details/panels/idg-resources-panel/idg-resources-panel.component';
import {AssayPanelComponent} from './target-details/panels/assay-panel/assay-panel.component';
import {AaSequencePanelComponent} from './target-details/panels/aa-sequence-panel/aa-sequence-panel.component';
import {SummaryPanelComponent} from './target-details/panels/summary-panel/summary-panel.component';
import {PdbPanelComponent} from './target-details/panels/pdb-panel/pdb-panel.component';
import {DiseaseSourceComponent} from './target-details/panels/disease-source-panel/disease-source-panel.component';
import {ExpressionPanelComponent} from './target-details/panels/expression-panel/expression-panel.component';
import {DrugsPanelComponent} from './target-details/panels/drugs-panel/drugs-panel.component';
import {DifferentialPanelComponent} from './target-details/panels/expression-panel/differential-panel/differential-panel.component';
import {RadarChartViewerComponent} from '../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {LigandCardComponent} from '../data-list/cards/ligand-card/ligand-card.component';
import {OrthologPanelComponent} from './target-details/panels/expression-panel/ortholog-panel/ortholog-panel.component';
import {TargetTableComponent} from '../data-list/tables/target-table/target-table.component';
import {TargetCardComponent} from '../data-list/cards/target-card/target-card.component';
import {LevelSummaryPanelComponent} from './target-details/panels/level-summary-panel/level-summary-panel.component';
import {IdgLevelSummaryModule} from './target-details/panels/level-summary-panel/idg-level-summary.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../test/test-config';

describe('DataDetailsComponent', () => {
  let component: DataDetailsComponent;
  let fixture: ComponentFixture<DataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        SharedListModule,
        SharedDetailsModule,
        RouterTestingModule,
        CommonToolsModule,
        BrowserAnimationsModule,
        IdgLevelSummaryModule
      ],
      declarations: [
        TargetDetailsComponent,
        TargetHeaderComponent,
        TargetListPanelComponent,
        TargetTableComponent,
        TargetCardComponent,
        SummaryPanelComponent,
        RadarChartViewerComponent,
        DiseaseSourceComponent,
        PublicationInfoPanelComponent,
        ExpressionPanelComponent,
        AaSequencePanelComponent,
        ProteinProteinPanelComponent,
        OrthologPanelComponent,
        AssayPanelComponent,
        PdbPanelComponent,
        GeneSummaryComponent,
        TargetFacetPanelComponent,
        IdgResourcesPanelComponent,
        LigandsPanelComponent,
        DrugsPanelComponent,
        DifferentialPanelComponent,
        LigandCardComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        LoadingService,
        FacetRetrieverService,
        SuggestApiService,
        ComponentInjectorService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
         {provide: TOKENS.TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent},
         {provide: TOKENS.TARGET_GENE_SUMMARY_COMPONENT, useValue: GeneSummaryComponent},
        {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent},
        {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent},
        {provide: TOKENS.IDG_RESOURCES_PANEL, useValue: IdgResourcesPanelComponent},
        {provide: TOKENS.PUBLICATION_INFO_PANEL, useValue: PublicationInfoPanelComponent},
        {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent},
        {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent},
        {provide: TOKENS.PROTEIN_PROTEIN_PANEL, useValue: ProteinProteinPanelComponent},
        {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent},
        {provide: TOKENS.ASSAY_PANEL, useValue: AssayPanelComponent},
        {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent},
        {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent},
        {provide: TOKENS.DRUGS_PANEL, useValue: DrugsPanelComponent},
        {provide: TOKENS.PDB_PANEL, useValue: PdbPanelComponent},
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: {
        entryComponents: [
          TargetHeaderComponent,
          TargetDetailsComponent,
          GeneSummaryComponent,
          BreadcrumbComponent,
          SummaryPanelComponent,
          RadarChartViewerComponent,
          DiseaseSourceComponent,
          PublicationInfoPanelComponent,
          ExpressionPanelComponent,
          AaSequencePanelComponent,
          ProteinProteinPanelComponent,
          OrthologPanelComponent,
          AssayPanelComponent,
          PdbPanelComponent,
          GeneSummaryComponent,
          TargetFacetPanelComponent,
          IdgResourcesPanelComponent,
          LigandsPanelComponent,
          DrugsPanelComponent,
          DifferentialPanelComponent,
          LigandCardComponent
        ]
      }
      })
  .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'targets';
    component.pharosObject = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
