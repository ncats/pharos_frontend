import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import {DynamicPanelComponent} from '../../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {AnatamogramHoverService} from '../../anatamogram/anatamogram-hover.service';

@Component({
  selector: 'pharos-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatMapComponent extends DynamicPanelComponent implements OnInit {

  constructor(
    private anatamogramHoverService: AnatamogramHoverService,
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
  heatmapData: HeatMapData;

  @Input()
  highlightedValue = '';

  @Input() heatmapClicked;

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
  filterValue = '';

  /**
   * width of component
   */
  width: number;
  blockSize = 20;

  ngOnInit() {
    this.redraw();
    this.loadingComplete();
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

  filterChanged(event) {
    this.filterValue = event.target.value;
    this.updateChart();
  }
  clearFilter() {
    this.filterValue = '';
    this.updateChart();
  }

  /**
   * update chart as data changes
   */
  updateChart(): void {
    this.heatmapData.updateDataMap(this.filterValue);

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
      .attr('width', this.blockSize)
      .attr('y', d => yScale(d.y) + 0.5)
      .attr('height', this.blockSize)
      .classed('hovered', (a, b, c) => {
        return this.highlightedValue && this.highlightedValue === a.data;
      })
      .style('fill', d => zScale(d.z.val))
      .style('stroke', 'gray')
      .style('pointer-events', 'all');

    selection.on('mouseover', (event, d) => {
      const blocks = selection.nodes();
      const i = blocks.indexOf(event.currentTarget);
      this.anatamogramHoverService.setTissue(this.heatmapData.yDisplayValues[blocks[i].__data__.y].data);
      d3.select(blocks[i]).classed('hovered', true);
      this.tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      this.tooltip.html(`
        <span>
            <b>${this.heatmapData.yLabel}: </b>${this.heatmapData.yDisplayValues[blocks[i].__data__.y].val}<br />
            <b>${this.heatmapData.xLabel}: </b>${this.heatmapData.xValues[blocks[i].__data__.x].val}<br />
            <b>Value:</b> ${d.z.rawVal.replace('\\n', ', ')}<br />
            <b>Source Rank:</b> ${d.z.val}<br />
        </span>`)
        .style('left', event.pageX + 'px')
        .style('top', event.pageY + 'px');
    })
      .on('mouseout', (event, d) => {
        this.anatamogramHoverService.setTissue(null);
        const blocks = selection.nodes();
        const i = blocks.indexOf(event.currentTarget);
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', 0);
        d3.select(blocks[i]).classed('hovered', false);
      }).on('click', (event, d) => {
        this.heatmapClickedInternal(event, d);
    });

    this.chartArea.selectAll('.xAxis text')
      .attr('transform', d => `translate(${this.blockSize * .75}, 0) rotate(-45)`)
      .attr('style', 'text-anchor: start');

    this.chartArea.selectAll('.yAxis text')
      .attr('transform', d => `translate(0, ${this.blockSize * .5})`)
      .attr('style', 'text-anchor: end');

    const yTicks = this.chartArea.select('.yAxis').selectAll('.tick');
    yTicks.on('mouseover', (event, d) => {
      this.highlightedValue = this.heatmapData.yDisplayValues[d].val;
      this.anatamogramHoverService.setTissue(this.heatmapData.yDisplayValues[d].data);
      const blocks = selection.nodes().filter(b => {
        return b.__data__.data === this.highlightedValue;
      });
      blocks.forEach(b => {
        d3.select(b).classed('hovered', true);
      });
    }).on('mouseout', (event, d) => {
      this.highlightedValue = '';
      this.anatamogramHoverService.setTissue(null);
      const blocks = selection.nodes().forEach(b => {
        d3.select(b).classed('hovered', false);
      });
    }).on('click', (event, d) => {
      this.heatmapClickedInternal(event, d);
    });

    this.tooltip = d3.select('body').append('div')
      .attr('class', 'twodtooltip')
      .style('opacity', 0);
  }

  tissueClicked(event, d) {
    const tissue = event.target.textContent || d.data;
    this.anatamogramHoverService.setTissue(tissue);
  }

  heatmapClickedInternal(event, d) {
    if (this.heatmapClicked) {
      const tissue = d.data || event.target.textContent;
      this.heatmapClicked(tissue);
    }
  }
}



export class HeatMapData {
  static separator = '!';
  xValues: { val: string, score: number }[] = [];
  yValues: { val: string, score: number, data: string }[] = [];
  yDisplayValues: {val: string, score: number, data: string}[] = [];
  sortColumn = 'Average';
  data: Map<string, { val: number, rawVal: string }> = new Map<string, { val: number, rawVal: string }>();
  plot: { x: number, y: number, z: { val: number, rawVal: string }, data: string }[] = [];
  xLabel = '';
  yLabel = '';

  constructor(xLabel: string, yLabel: string) {
    this.xLabel = xLabel;
    this.yLabel = yLabel;
  }

  key(xVal: string, yVal: string) {
    return `${xVal}${HeatMapData.separator}${yVal}`;
  }

  addPoint(xVal: string, yVal: string, val: string, numVal, data: string) {
    const rawStringVal = (val && val.length > 0) ? val : '0';
    const key = this.key(xVal, yVal);
    if (this.data.has(key)) {
      return;
    }
    this.data.set(key, {val: numVal, rawVal: rawStringVal});

    const xItem = this.xValues.find(p => p.val === xVal);
    const yItem = this.yValues.find(p => p.val === yVal);
    if (xItem) {
      xItem.score++;
    } else {
      this.xValues.push({val: xVal, score: 1});
    }
    if (yItem) {
      yItem.score++;
    } else {
      this.yValues.push({val: yVal, score: 1, data});
    }
  }

  updateDataMap(filterValue: string) {
    this.plot = [];
    if (filterValue.length > 0) {
      this.yDisplayValues = this.yValues.filter(f => {
        return f.val.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
      });
    } else {
      this.yDisplayValues = this.yValues.slice();
    }
    this.xValues.sort((a, b) => {
      if (b.val === this.sortColumn) {
        return 1;
      }
      if (a.val === this.sortColumn) {
        return -1;
      }
      return b.score - a.score;
    });
    this.yDisplayValues.sort((a, b) => {
      const bVal = this.data.get(this.sortColumn + HeatMapData.separator + b.val).val;
      const aVal = this.data.get(this.sortColumn + HeatMapData.separator + a.val).val;
      return bVal - aVal;
    });
    this.yDisplayValues.forEach((y, yIndex) => {
      this.xValues.forEach((x, xIndex) => {
        const key = this.key(x.val, y.val);
        if (this.data.has(key)) {
          const val = this.data.get(key);
          this.plot.push({
            x: xIndex,
            y: yIndex,
            z: val,
            data: y.val
          });
        }
      });
    });
  }
}

