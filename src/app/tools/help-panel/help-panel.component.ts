import {
    Component,
    EventEmitter,
    Injector,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Type,
    ViewChildren
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';
import {PanelOptions} from '../../pharos-main/pharos-main.component';
import {ActivatedRoute} from '@angular/router';
import {HelpPanelOpenerService} from './services/help-panel-opener.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {CitationComponent} from '../citation/citation.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {DataVersionCardComponent} from '../data-version-card/data-version-card.component';
import {ARTICLES} from '../../../config/help-article-tokens';
import {
    IlluminationGraphArticleComponent
} from './articles/illumination-graph-article/illumination-graph-article.component';
import {
    TargetDevelopmentArticleComponent
} from './articles/target-development-article/target-development-article.component';
import {LigandActivityArticleComponent} from './articles/ligand-activity-article/ligand-activity-article.component';
import {TinxArticleComponent} from './articles/tinx-article/tinx-article.component';
import {PubmedScoreArticleComponent} from './articles/pubmed-score-article/pubmed-score-article.component';
import {
    AssociationDataSourcesArticleComponent
} from './articles/association-data-sources-article/association-data-sources-article.component';
import {PPIDataSourcesArticleComponent} from './articles/ppidata-sources-article/ppidata-sources-article.component';
import {
    PathwayDataSourcesArticleComponent
} from './articles/pathway-data-sources-article/pathway-data-sources-article.component';
import {
    GoTermsEvidenceArticleComponent
} from './articles/go-terms-evidence-article/go-terms-evidence-article.component';

/**
 * component to hold help information
 */
@Component({
    standalone: true,
    imports: [CommonModule, MatIconButton, MatIconModule, MatAccordion, MatButtonModule, FlexLayoutModule,
        MatExpansionModule, CitationComponent, DataVersionCardComponent, CdkPortalOutlet],
    selector: 'pharos-help-panel',
    templateUrl: './help-panel.component.html',
    styleUrls: ['./help-panel.component.scss'],
    providers: [
        {provide: ARTICLES.ILLUMINATION_GRAPH_ARTICLE, useValue: IlluminationGraphArticleComponent },
        {provide: ARTICLES.TARGET_DEVELOPMENT_ARTICLE, useValue: TargetDevelopmentArticleComponent },
        {provide: ARTICLES.LIGAND_ACTIVITY_ARTICLE, useValue: LigandActivityArticleComponent },
        {provide: ARTICLES.TINX_ARTICLE, useValue: TinxArticleComponent },
        {provide: ARTICLES.PUBMED_SCORE_ARTICLE, useValue: PubmedScoreArticleComponent },
        {provide: ARTICLES.ASSOCIATION_DATA_SOURCES_ARTICLE, useValue: AssociationDataSourcesArticleComponent},
        {provide: ARTICLES.PPI_DATA_SOURCES_ARTICLE, useValue: PPIDataSourcesArticleComponent},
        {provide: ARTICLES.PATHWAY_DATA_SOURCES_ARTICLE, useValue: PathwayDataSourcesArticleComponent},
        {provide: ARTICLES.GO_TERMS_EVIDENCE_ARTICLE, useValue: GoTermsEvidenceArticleComponent}
    ]
})
export class HelpPanelComponent implements OnInit, OnDestroy {
    protected ngUnsubscribe: Subject<any> = new Subject();
    panelOptions: PanelOptions = {
        mode: 'over',
        class: 'filters-panel',
        opened: false,
        fixedInViewport: true,
        fixedTopGap: 118,
        role: 'directory'
        /* [mode]="isSmallScreen!==true ? 'side' : 'over'"
         [opened]="isSmallScreen !== true"*/
    };

    get predictionDetails(): any[] {
        return this.helpDataService.predictionDetails;
    }

    /**
     * close the help panel
     * @type {EventEmitter<boolean>}
     */
    @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * list of possible help article injection sites
     */
    @ViewChildren(CdkPortalOutlet) articlePortalOutlets: QueryList<CdkPortalOutlet>;

    /**
     * controller to search the help panel
     * todo: currently not too useful, as the help articles and definitions are loaded on demand.
     * @type {FormControl}
     */
    searchCtrl: UntypedFormControl = new UntypedFormControl();

    /**
     * helper object to hold the raw data for the view panel
     * @type {{}}
     */
    rawData: any = {};

    /**
     * main help section description
     */
    description: string;
    mainSource: string[];

    /**
     * title for help section
     */
    title: string;

    /**
     * sprovenance sources.
     * todo: currently not used
     * @type {any[]}
     */
    sources: any[] = [];

    /**
     * initialize data retrieval and component injection services
     * @param {HelpDataService} helpDataService
     * @param helpPanelOpenerService
     * @param _route
     * @param {ComponentInjectorService} componentInjectorService
     * @param {Injector} _injector
     */
    constructor(
        public helpDataService: HelpDataService,
        private helpPanelOpenerService: HelpPanelOpenerService,
        private _route: ActivatedRoute,
        private _injector: Injector) {
    }

    /**
     * specific injected article that has been selected
     */
    selectedArticle: string;

    /**
     * array to track the status of each possible injected article from the cdkportals query list
     * @type {any[]}
     */
    opened: boolean[] = [];

    loading = true;

    /**
     * subscribe to dat asource changes and parse data object
     */
    ngOnInit() {
        this._route.snapshot.data.components
            .forEach((component: any) => {
                this.addSource(component);
                if (component.panels && component.panels.length > 0) {
                    component.panels.forEach(subComponent => {
                        this.addSource(subComponent);
                    });
                }
            });

        this.helpDataService.sources$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
                if (res) {
                    this.sources = res.sources;
                    this.description = res.mainDescription;
                    this.mainSource = this.getMainSource(res.mainSource);
                    this.title = res.title;
                    if (this.sources && this.sources.length) {
                        this.sources.forEach(source => {
                            //  this.rawData[source.field] = this.helpDataService.data[source.field];
                        });
                    }
                }
            }, (error: any) => {
                console.log(error);
            });

        this.helpPanelOpenerService.toggle$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => this.toggleMenu(!this.loading));
        this.loading = false;
    }

    private addSource(component) {
        if (component.navHeader) {
            this.helpDataService.setSources(component.navHeader.section,
                {
                    sources: component.api,
                    title: component.navHeader.label,
                    mainDescription: component.navHeader.mainDescription || null,
                    mainSource: this.getMainSource(component.navHeader.mainSource)
                });
        }
    }

    getMainSource(inputSource): string[] {
        let mainSource;
        if (inputSource) {
            if (Array.isArray(inputSource)) {
                mainSource = inputSource;
            } else {
                mainSource = [inputSource];
            }
        }
        return mainSource;
    }

    /**
     * stub to handle help section search
     */
    search() {
    }

    /**
     * get readable lable for section
     * @returns {string}
     */
    getLabel() {
        return this.helpDataService.label;
    }

    /**
     * fetch and inject help articles in cdkportal
     * @param source
     * @param {number} index
     */
    showArticle(source: any, index: number) {
        if (source.article) {
            this.opened[index] = true;
            this.selectedArticle = source.label;
            if (this.articlePortalOutlets) {
                console.log(this.articlePortalOutlets);
                const comp = this._injector.get<Type<any>>(source.article);
                const outlet = this.articlePortalOutlets.toArray()[index];
                const compPortal = new ComponentPortal(comp);
                outlet.attach(compPortal);
            }
        }
    }

    /**
     * close and detach article
     * @param {number} index
     */
    closeArticle(index: number) {
        this.opened[index] = false;
        const outlet = this.articlePortalOutlets.toArray()[index];
        outlet.detach();
    }

    /**
     * close the help panel
     */
    toggleMenu(force?: boolean) {
        this.menuToggle.emit(force);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }
}
