import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    QueryList, ViewChild,
    ViewChildren
} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {PharosProperty} from '../models/pharos-property';
import {DynamicPanelComponent} from '../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {DataSource} from '../models/dataSource';
import {ActivatedRoute} from '@angular/router';
import {DynamicServicesService} from '../pharos-services/dynamic-services.service';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {GenericTableComponent} from '../tools/generic-table/generic-table.component';
import {MatListModule, MatNavList} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {ReviewBannerService} from '../pharos-services/review-banner.service';

/**
 * about page component
 */
@Component({
    standalone: true,
    imports: [CommonModule, FlexLayoutModule, MatCardModule, GenericTableComponent, MatNavList, MatIconModule,
        MatListModule],
    selector: 'pharos-about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
    /**
     * default active element for menu highlighting, will be replaced on scroll
     * @type {string}
     */
    activeElement = 'introduction';

    @Input() dataSources: DataSource[];
    @Input() dataSourcesProps: any[];
    /**
     *
     */
    @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;

    @ViewChild('scrollWrapper', {static: true}) scrollWrapper: ElementRef;

    /**
     * fields to show in the sources table on the about page
     * @type {PharosProperty[]}
     */
    sourceFields: PharosProperty[] = [
        new PharosProperty({
            name: 'dataSource',
            label: 'Source',
            sortable: true,
            sorted: 'asc'
        }),
        new PharosProperty({
            name: 'targetCount',
            label: 'Targets',
            sortable: true
        }),
        new PharosProperty({
            name: 'diseaseCount',
            label: 'Diseases',
            sortable: true
        }),
        new PharosProperty({
            name: 'ligandCount',
            label: 'Ligands',
            sortable: true
        }),
    ];

    /**
     * set up change detection and scroll dispatching
     * @param {ChangeDetectorRef} changeDetector
     * @param {ScrollDispatcher} scrollDispatcher
     */
    constructor(
        private changeDetector: ChangeDetectorRef,
        private scrollDispatcher: ScrollDispatcher,
        private _route: ActivatedRoute,
        public bannerService: ReviewBannerService,
        public dynamicServices: DynamicServicesService) {
        super(dynamicServices);
    }

    /**
     * watch scrool and change active section on sidenav
     * todo could be updated to use the injectable sidenav
     */
    ngOnInit() {
        this.data = this._route.snapshot.data;
        this.initialize();
        this._data
            // listen to data as long as term is undefined or null
            // Unsubscribe once term has value
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(x => {
                if (this.data && this.data.results) {
                    this.initialize();
                }
            });
        this.scrollDispatcher.scrolled()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: CdkScrollable) => {
                if (data) {
                    let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
                    if (scrollTop === 100) {
                        this.activeElement = 'introduction';
                        this.changeDetector.detectChanges();
                    } else {
                        this.scrollSections.forEach(section => {
                            scrollTop = scrollTop - section.nativeElement.scrollHeight;
                            if (scrollTop >= 0) {
                                this.activeElement = section.nativeElement.nextSibling.id;
                                this.changeDetector.detectChanges();
                            }
                        });
                    }
                }
            });
    }

    /**
     * initialize the dataSource lists
     */
    initialize() {
        this.dataSources = this.data.results.dataSourceCounts;
        this.dataSourcesProps = this.data.results.dataSourceCountsProps;
        this.loadingComplete();
    }

    /**
     * scroll to section
     * @param el
     */
    public scroll(el: any): void {
        this.activeElement = el.id;
        const section = this.scrollSections.find(f => f.nativeElement.id === el.id);
        section.nativeElement.scrollIntoView({block: 'start', inline: 'nearest'});
    }

    sortChanged(event: any): void {
        const field = event.active;
        const dir = event.direction;

        if (field === 'dataSource') { // do string comparison
            if (dir === 'asc') {
                this.dataSourcesProps.sort((a, b) => {
                    return a[field].term.localeCompare(b[field].term);
                });
            } else {
                this.dataSourcesProps.sort((a, b) => {
                    return b[field].term.localeCompare(a[field].term);
                });
            }
        } else { // do numeric comparison
            if (dir === 'asc') {
                this.dataSourcesProps.sort((a, b) => {
                    return +a[field].term - +b[field].term;
                });
            } else {
                this.dataSourcesProps.sort((a, b) => {
                    return +b[field].term - +a[field].term;
                });
            }
        }
    }

    /**
     * check which section is active
     * @param {string} check
     * @returns {boolean}
     */
    isActive(check: string): boolean {
        return this.activeElement === check;
    }
}
