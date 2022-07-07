import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnInit,
    PLATFORM_ID,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3v7';
import {DynamicPanelComponent} from '../../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {AnatomogramHoverService} from '../../anatomogram/anatomogram-hover.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HeatMapData} from '../heat-map/heat-map.component';

@Component({
    selector: 'pharos-expression-heat-map',
    templateUrl: './expression-heat-map.component.html',
    styleUrls: ['./expression-heat-map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpressionHeatMapComponent extends DynamicPanelComponent implements OnInit, OnChanges {
    filterControl = new FormControl();
    filteredOptions: Observable<string[]>;

    constructor(
        private anatomogramHoverService: AnatomogramHoverService,
        public dynamicServices: DynamicServicesService,
        @Inject(PLATFORM_ID) private platformID: any,
        private changeRef: ChangeDetectorRef) {
        super(dynamicServices);
    }

    /**
     * donut chart component holder
     */
    @ViewChild('twoDChartTarget', {static: true}) chartContainer: ElementRef;

    @Input()
    heatmapData: HeatMapData = new HeatMapData('xlabel', 'ylabel');

    @Input() clickedTissue = '';
    @Input() dataSourceClicked;
    @Input() heatmapClicked;
    sortedYVals: string[] = [];

    /**
     * margin of space around the donut chart
     * @type {{top: number; bottom: number; left: number; right: number}}
     */
    private margin: any = {top: 150, bottom: 175, left: 200, right: 250};

    /**
     * height of component
     */
    height: number;
    svg: any;
    chartArea: any;
    tooltip: any;
    filterTextValue = '';
    filterTissue = null;
    tissueAncestors: TissueCount[] = [];
    selectedAncestor = '';
    tissueSearchOn = true;
    showCells = true;
    showTissues = true;

    /**
     * width of component
     */
    width: number;
    blockSize = 20;

    ngOnInit() {
        this.filteredOptions = this.filterControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        this.sortedYVals = this.heatmapData.yValues.filter(o => !!o.data).map(o => o.val).sort((a, b) => {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        this.redraw();
        this.loadingComplete();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.heatmapData) {
        this.redraw();
      }
      if (changes.clickedTissue) {
        if (changes.clickedTissue.currentValue?.length > 0) {
          this.filterBySelectedTissue(changes.clickedTissue.currentValue);
        } else {
          this.clearFilter();
        }
      }
    }

    private _filter(value: string): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            this.sortedYVals = this.heatmapData.yValues.filter(o => !!o.data).map(o => o.val).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            return this.sortedYVals.filter(option => option.toLowerCase().includes(filterValue));
        } else {
            return this.heatmapData.yValues.filter(o => !!o.data).map(o => o.val).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
        }
    }

    filterBySelectedTissue(tissue: string) {
        const selectedTissue = this.heatmapData.yValues.find(v => {
            return v.val === tissue;
        });
        if (selectedTissue.data) {
            const ancestorMap: Map<string, string[]> = new Map<string, string[]>();
            this.heatmapData.yValues.filter(d => d.data).forEach(o => {
                ancestorMap.set(o.data.name, o.data.ancestors.map(p => p.name));
            });
            this.tissueAncestors = [new TissueCount(selectedTissue.data.name, selectedTissue.data.uid, 1, [selectedTissue.data.name])];
            selectedTissue.data.ancestors.forEach(a => {
                const tissueList = [];
                let count = 0;
                ancestorMap.forEach((v, k) => {
                    if (v.includes(a.name)) {
                        count++;
                        tissueList.push(k);
                    }
                });
                this.tissueAncestors.push(new TissueCount(a.name, a.uid, count, tissueList));
            });
            this.tissueAncestors.sort((a, b) => a.count - b.count);
            this.selectedAncestor = this.tissueAncestors[0].name;
            this.filterTissue = selectedTissue.data.name;
            this.filterTextValue = selectedTissue.data.name;
        } else {
            this.tissueAncestors = [];
            this.filterTissue = null;
            this.filterTextValue = tissue;
        }
        this.updateChart();
    }

    tissueSelected(event) {
        if (event.isUserInput) {
            this.filterBySelectedTissue(event.source.value);
        }
    }

    /**
     * listener to resize the chart on page resize
     */
    @HostListener('window:resize', [])
    onResize() {
        this.redraw();
    }

    getZ(dataObj) {
        return 1;
    }

    public redraw() {
        if (this.heatmapData) {
            this.drawChart();
            this.updateChart();
        }
    }

    setSize() {
        this.width = this.blockSize * this.heatmapData.xValues.length + this.margin.left + this.margin.right;
        this.height = this.blockSize * this.heatmapData.yDisplayValues.length + this.margin.top + this.margin.bottom;

        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
    }

    /**
     * draw chart svg and labels
     */
    drawChart(): void {
        const element = this.chartContainer.nativeElement;
        d3.select(element).selectAll('svg').remove();
        this.svg = d3.select(element).append('svg');
    }

    tissueTextSearch(event) {
        this.filterTextValue = event.target.value;
        this.updateChart();
    }

    clearFilter() {
        this.selectedAncestor = '';
        this.tissueAncestors = [];
        this.filterTextValue = '';
        this.filterTissue = null;
        this.updateChart();
    }

    /**
     * update chart as data changes
     */
    updateChart(): void {
        if (!this.svg) {
            return;
        }

        this.heatmapData.updateDataMap(
            (f: any, args: { tissueSearch: boolean, filterValue: string, tissuesToShow: TissueCount[],
              selectedAncestor: string, showCells: boolean, showTissues: boolean }) => {
            if (!args.tissueSearch) {
              if (!args.showCells && !f.data?.uid) {
                return false;
              }
              if (!args.showTissues && f.data?.uid) {
                return false;
              }
              if (args.filterValue.length > 0) {
                return f.val.toLowerCase().indexOf(args.filterValue.toLowerCase()) >= 0;
              }
              return true;
            } else if (args.tissueSearch && args.selectedAncestor && args.selectedAncestor.length > 0) {
                const whiteList = args.tissuesToShow.find(t => t.name === args.selectedAncestor).list;
                return whiteList.includes(f.val);
            } else {
                return true;
            }
        }, {
            tissueSearch: this.tissueSearchOn,
            filterValue: this.filterTextValue,
            tissuesToShow: this.tissueAncestors,
            selectedAncestor: this.selectedAncestor,
            showCells: this.showCells,
            showTissues: this.showTissues
        });

        this.setSize();
        this.svg.selectAll('.plot-container').remove();
        this.chartArea = this.svg.append('g')
            .attr('class', 'plot-container');
        this.chartArea.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.chartArea.append('g')
            .attr('class', 'blocks');

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, this.heatmapData.xValues.length])
            .range([0, this.heatmapData.xValues.length * (this.blockSize + 1)]);

        const yScale = d3.scaleLinear()
            .domain([0, this.heatmapData.yDisplayValues.length])
            .range([0, this.heatmapData.yDisplayValues.length * (this.blockSize + 1)]);

        const zScale = d3.scaleLinear()
            .domain([0, 1])
            .range(['#ffffff', '#23364e']);

        // Add scales to axes
        const xAxis = d3.axisTop()
            .scale(xScale);

        xAxis.ticks(this.heatmapData.xValues.length).tickFormat(d => {
            return this.heatmapData.xValues.map(o => o.val)[d];
        });

        const yAxis = d3.axisLeft()
            .scale(yScale);
        yAxis.ticks(this.heatmapData.yDisplayValues.length).tickFormat(d => {
            return this.heatmapData.yDisplayValues.map(o => o.val)[d];
        });

        // Append group and insert axis
        this.chartArea.append('g').attr('class', 'xAxis')
            .call(xAxis);

        this.chartArea.append('g').attr('class', 'yAxis')
            .call(yAxis);

        const selection = this.chartArea.select('.blocks').selectAll('.block')
            .data(this.heatmapData.plot)
            .enter().append('rect')
            .attr('x', d => xScale(d.x) + 0.5)
            .attr('fill', d => d.metadata.color || zScale(d.z.val))
            .attr('width', this.blockSize)
            .attr('y', d => yScale(d.y) + 0.5)
            .attr('height', this.blockSize)
            // .classed('hovered', (a, b, c) => {
            //   return this.clickedTissue && this.clickedTissue === a.data;
            // })
            .style('stroke', d => d.metadata.color || 'gray')
            .style('cursor', 'pointer')
            .style('pointer-events', 'all');

        selection.on('mouseover', (event, d) => {
            const blocks = selection.nodes();
            const i = blocks.indexOf(event.currentTarget);
            const tissue = this.heatmapData.yDisplayValues[blocks[i].__data__.y].val;
            const dataSource = this.heatmapData.xValues[blocks[i].__data__.x].val;
            if (this.heatmapData.yDisplayValues[blocks[i].__data__.y].data) {
                this.anatomogramHoverService.setTissue(this.heatmapData.yDisplayValues[blocks[i].__data__.y].data.uid);
            }

            this.tooltip.transition()
                .duration(200)
                .style('opacity', 0.9);
            if (tissue === 'Expression Type') {
              this.tooltip.html(`
        <span>
            <b>${this.heatmapData.xLabel}: </b>${dataSource}<br />
            <b>Type: </b> ${d.z.rawVal?.replace('\n', ', ')}<br />
        </span>`)
                .style('left', event.pageX + 'px')
                .style('top', event.pageY + 'px');
            } else {
              d3.select(blocks[i]).classed('hovered', true);
              this.tooltip.html(`
        <span>
            <b>${this.heatmapData.yLabel}: </b>${tissue}<br />
            <b>${this.heatmapData.xLabel}: </b>${dataSource}<br />
            <b>${d.metadata.valueLabel || 'Value'}:</b> ${d.z.rawVal?.replace('\n', ', ')}<br />
            ${d.metadata.hideRank ? '' : '<b>Source Rank:</b> ' + d.z.val + '<br />'}
        </span>`)
                .style('left', event.pageX + 'px')
                .style('top', event.pageY + 'px');

            }
        }).on('mouseout', (event, d) => {
                this.anatomogramHoverService.setTissue(null);
                const blocks = selection.nodes();
                const i = blocks.indexOf(event.currentTarget);
                this.tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', 0);
                d3.select(blocks[i]).classed('hovered', false);
            }).on('click', (event, d) => {
            this.tissueClickedInternal(event, d);
        });

        this.chartArea.selectAll('.xAxis text')
            .attr('transform', d => `translate(${this.blockSize * .75}, 0) rotate(-45)`)
            .attr('style', 'text-anchor: start');

        this.chartArea.selectAll('.yAxis text')
            .attr('transform', d => `translate(0, ${this.blockSize * .5})`)
            .attr('style', 'text-anchor: end');

      const yTicks = this.chartArea.select('.yAxis').selectAll('.tick').attr('class', 'tick yAxisLabel');
      yTicks.on('mouseover', (event, d) => {
        const hoveredTissue = this.heatmapData.yDisplayValues[d].val;
        if (hoveredTissue !== 'Expression Type') {
          if (this.heatmapData.yDisplayValues[d].data) {
            this.anatomogramHoverService.setTissue(this.heatmapData.yDisplayValues[d].data.uid);
          }
          const blocks = selection.nodes().filter(b => {
            return b.__data__.data === hoveredTissue;
          });
          blocks.forEach(b => {
            d3.select(b).classed('hovered', true);
          });
        }
      }).on('mouseout', (event, d) => {
        this.anatomogramHoverService.setTissue(null);
        const blocks = selection.nodes().forEach(b => {
          d3.select(b).classed('hovered', false);
        });
      }).on('click', (event, d) => {
        this.tissueClickedInternal(event, d);
      });

      const xTicks = this.chartArea.select('.xAxis').selectAll('.tick').attr('class', 'tick xAxisLabel');
      xTicks.on('mouseover', (event, d) => {
        const hoveredDataSource = this.heatmapData.xValues[d].val;
        const blocks = selection.nodes().filter(b => {
          return b.__data__.x === d;
        });
        blocks.forEach((b) => {
          if (!b.__data__.metadata.color) {
            d3.select(b).classed('hovered', true);
          }
        });
      }).on('mouseout', (event, d) => {
        const blocks = selection.nodes().forEach(b => {
          d3.select(b).classed('hovered', false);
        });
      }).on('click', (event, d) => {
        this.dataSourceClickedInternal(event, d);
      });

        this.tooltip = d3.select('body').append('div')
            .attr('class', 'twodtooltip')
            .style('opacity', 0);
    }

    dataSourceClickedInternal(event, d) {
      const dataSource = this.heatmapData.xValues[d].val;
      this.heatmapData.ySort = dataSource;
      if (this.dataSourceClicked) {
        this.dataSourceClicked(dataSource, 'heatmap');
      }
      this.updateChart();
    }

    tissueClickedInternal(event, d) {
        if (this.heatmapClicked) {
            const tissue = d.data || event.target.textContent;
            this.heatmapClicked(tissue, 'heatmap');
        }
    }
}

export class TissueCount {
    name: string;
    uid: string;
    count: number;
    list: string[];

    constructor(name: string, uid: string, count: number, list: string[]) {
        this.name = name;
        this.uid = uid;
        this.count = count;
        this.list = list;
    }

    toString() {
        return `${this.name} (${this.count} tissues)`;
    }
}

