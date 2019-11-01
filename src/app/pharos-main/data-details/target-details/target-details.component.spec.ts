import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetDetailsComponent} from './target-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {TargetHeaderComponent} from './target-header/target-header.component';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {LoadingService} from '../../../pharos-services/loading.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {TESTTARGET} from '../../../../../test/test-target';
import {APP_BASE_HREF} from '@angular/common';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {GeneSummaryComponent} from './panels/gene-summary/gene-summary.component';
import {TOKENS} from '../../../../config/component-tokens';
import {BreadcrumbComponent} from './panels/breadcrumb/breadcrumb.component';
import {SummaryPanelComponent} from './panels/summary-panel/summary-panel.component';
import {IdgResourcesPanelComponent} from './panels/idg-resources-panel/idg-resources-panel.component';
import {PublicationInfoPanelComponent} from './panels/publication-info-panel/publication-info-panel.component';
import {DiseaseSourceComponent} from './panels/disease-source-panel/disease-source-panel.component';
import {ExpressionPanelComponent} from './panels/expression-panel/expression-panel.component';
import {ProteinProteinPanelComponent} from './panels/protein-protein-panel/protein-protein-panel.component';
import {TargetFacetPanelComponent} from './panels/target-facet-panel/target-facet-panel.component';
import {AaSequencePanelComponent} from './panels/aa-sequence-panel/aa-sequence-panel.component';
import {LigandsPanelComponent} from './panels/ligands-panel/ligands-panel.component';
import {DrugsPanelComponent} from './panels/drugs-panel/drugs-panel.component';
import {PdbPanelComponent, STRUCTURE_VIEW_TOKEN} from './panels/pdb-panel/pdb-panel.component';
import {StructureViewComponent} from '../../../tools/structure-view/structure-view.component';
import {RadarChartViewerComponent} from '../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {OrthologPanelComponent} from './panels/expression-panel/ortholog-panel/ortholog-panel.component';
import {DifferentialPanelComponent} from './panels/expression-panel/differential-panel/differential-panel.component';
import {TargetTableModule} from '../../modules/targets/target-list.module';
import {LigandCardComponent} from '../../data-list/cards/ligand-card/ligand-card.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {IdgLevelSummaryModule} from './panels/level-summary-panel/idg-level-summary.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../test/test-config';

describe('TargetDetailsComponent', () => {
  let component: TargetDetailsComponent;
  let fixture: ComponentFixture<TargetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        SharedModule,
        SharedDetailsModule,
        BrowserAnimationsModule,
        CommonToolsModule,
        RouterTestingModule,
        TargetTableModule,
        IdgLevelSummaryModule
      ],
      declarations: [
        TargetDetailsComponent,
        TargetHeaderComponent,
        SummaryPanelComponent,
        RadarChartViewerComponent,
        DiseaseSourceComponent,
        PublicationInfoPanelComponent,
        ExpressionPanelComponent,
        AaSequencePanelComponent,
        ProteinProteinPanelComponent,
        OrthologPanelComponent,
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
        DataDetailsResolver,
        LoadingService,
        ComponentInjectorService,
        AngularFireAuth,
        // breadcrumb
        {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent},
        {provide: TOKENS.TARGET_GENE_SUMMARY_COMPONENT, useValue: GeneSummaryComponent},
        // targets
        {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
        {provide: TOKENS.TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent},
        {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent},
        {provide: TOKENS.IDG_RESOURCES_PANEL, useValue: IdgResourcesPanelComponent},
        {provide: TOKENS.PUBLICATION_INFO_PANEL, useValue: PublicationInfoPanelComponent},
        {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent},
        {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent},
        {provide: TOKENS.PROTEIN_PROTEIN_PANEL, useValue: ProteinProteinPanelComponent},
        {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent},
        {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent},
        {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent},
        {provide: TOKENS.DRUGS_PANEL, useValue: DrugsPanelComponent},
        {provide: TOKENS.PDB_PANEL, useValue: PdbPanelComponent},
        {provide: STRUCTURE_VIEW_TOKEN, useValue: StructureViewComponent},
        {provide: APP_BASE_HREF, useValue: '/targets' },
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
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
    fixture = TestBed.createComponent(TargetDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'targets';
    component.target = TESTTARGET;
    component.data = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
