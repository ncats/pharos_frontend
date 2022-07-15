import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3v7';
import {ExpressionInfoService} from "../../../pharos-services/expression-info.service";
import {partition} from "lodash";

@Component({
  selector: 'pharos-pack-circle',
  templateUrl: './pack-circle.component.html',
  styleUrls: ['./pack-circle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PackCircleComponent implements OnInit, OnDestroy {

  /**
   * element container
   */
  @ViewChild('packCircleTarget', {static: true}) chartContainer: ElementRef;
  @Input() hierarchyData: any;
  selectedUberon: any;
  circles: any;
  tooltip: any;
  currentScale = 1;

  handleCircleClick(uid) {
    this.expressionInfoService.setFocusedUberon(uid, 'circleplot');
  }


  constructor(private expressionInfoService: ExpressionInfoService) {
  }

  width = 1152;
  height = 1152;

  highlightCircles(cssClass: string, uid: string) {
    const partitions = partition(this.circles.nodes(), c => {
      return c.__data__?.data?.uid?.replace(':', '_') === uid;
    });
    partitions[0].forEach(c => {
      d3.select(c).classed(cssClass, true);
    });
    partitions[1].forEach(c => {
      d3.select(c).classed(cssClass, false);
    });
  }

  ngOnInit(): void {
    this.selectedUberon = this.expressionInfoService.focusedUberon;
    this.expressionInfoService.focusedUberonChanged.subscribe(focusedUberon => {
      this.selectedUberon = focusedUberon;
      this.highlightCircles('focusedTissue', focusedUberon?.uid);
    });
    const zScale = d3.scaleLinear()
      .domain([0, 1])
      .range(['#ffffff', '#23364e']);
    if (this.hierarchyData) {
      // @ts-ignore
      const chart = this.Pack(this.hierarchyData, {
        value: d => d.value, // size of each node (file); null for internal nodes (folders)
        label: d => '',//(d, n) => [...d.name.split(/(?=[A-Z][a-z])/g), n.value.toLocaleString("en")].join("\n"),
        // title: (d, n) => [...d.name.split(/(?=[A-Z][a-z])/g), n.data.value?.toLocaleString("en")].join("\n"),//`${n.ancestors().reverse().map(({data: d}) => d.name).join(".")}\n${n.value.toLocaleString("en")}`,
        width: this.width,
        height: this.height,
        fill: (d, n) => {
          return zScale(d.value);
        },
        stroke: '#23364e',
        strokeOpacity: 0.5,
      });
    }
  }

  ngOnDestroy() {
    this.removeTooltip();
  }

  id() {
    return 'circle-pack-' + this.hierarchyData.name.replace(' ', '-');
  }

  Pack(data, { // data is either tabular (array of objects) or hierarchy (nested objects)
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? d => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? d => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    value, // given a node d, returns a quantitative value (for area encoding; null for count)
    sort = (a, b) => d3.descending(a.value, b.value), // how to sort nodes prior to layout
    label, // given a leaf node d, returns the display name
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links, if any
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    margin = 1, // shorthand for margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    padding = 3, // separation between circles
    fill, // fill for leaf circles
    fillOpacity = d => 1, // fill opacity for leaf circles
    stroke = "#bbb", // stroke for internal circles
    strokeWidth, // stroke width for internal circles
    strokeOpacity, // stroke opacity for internal circles
  }) {

    const element = this.chartContainer.nativeElement;
    // If id and parentId options are specified, or the path option, use d3.stratify
    // to convert tabular data to a hierarchy; otherwise we assume that the data is
    // specified as an object {children} with nested objects (a.k.a. the “flare.json”
    // format), and use d3.hierarchy.
    const root = path != null ? d3.stratify().path(path)(data)
      : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
        : d3.hierarchy(data, children);

    // Compute the values of internal nodes by aggregating from the leaves.
    value == null ? root.count() : root.sum(d => Math.max(0, value(d)));

    // Compute labels and titles.
    const descendants = root.descendants();
    const leaves = descendants.filter(d => !d.children);
    leaves.forEach((d, i) => d.index = i);
    const L = label == null ? null : leaves.map(d => label(d.data, d));
    const T = title == null ? null : descendants.map(d => title(d.data, d));

    // Sort the leaves (typically by descending value for a pleasing layout).
    if (sort != null) root.sort(sort);

    // Compute the layout.
    d3.pack()
      .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
      .padding(padding)
      (root);

    const svg = d3.select(element)
      .append('svg:svg')
      .attr('id', this.id())
      .attr("viewBox", [-marginLeft, -marginTop, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle");

    const chartArea = svg.append('g');
    const buttons = svg.append('g');

    this.addTooltip();

    let selectedSection = false;
    const node = chartArea.selectAll("a")
      .data(descendants)
      .join("a")
      .attr("xlink:href", link == null ? null : (d, i) => link(d.data, d))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", d => `translate(${d.x},${d.y})`);


    this.circles = node.append("circle")
      .attr("fill", d => !(d.children) ? fill(d) : '#fff')
      .attr("fill-opacity", d => fillOpacity(d))
      .attr("stroke", d => d.children ? stroke : null)
      .attr("stroke-width", d => d.children ? strokeWidth : null)
      .attr("stroke-opacity", d => d.children ? strokeOpacity : null)
      .attr("r", d => d.r)
      .on('mouseover', (event, d, n) => {
        const uObj = this.expressionInfoService.get(d.data?.uid);
        if (uObj && uObj.uid) {
          this.highlightCircles('highlightTissue', uObj.uid);
        }
      })
      .on('mouseout', (event, d, n) => {
        this.circles.nodes().forEach(c => {
          d3.select(c).classed('highlightTissue', false);
        });
      })
      .on('pointermove', (event, d, n) => {
        this.showTooltip(event, d, n);
        event.stopPropagation();
      })
      .on('click', (event, d, n) => {
        const uid = d.data.uid;
        this.handleCircleClick(uid);
      });

    if (T) node.append("title").text((d, i) => T[i]);

    svg.on('mouseout', () => {
      this.hideTooltip();
    });

    if (this.selectedUberon && this.selectedUberon.uid) {
      this.highlightCircles('focusedTissue', this.selectedUberon.uid);
    }

    let zoom = d3.zoom()
      .scaleExtent([1, 20])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        this.currentScale = event.transform.k;
        console.log(event);

        chartArea.attr("transform", `translate(${event.transform.x},${event.transform.y})scale(${event.transform.k})`);
      });
    chartArea.call(zoom);
    this.addButtons(buttons, zoom, chartArea);

    return svg.node();
  }

  private addButtons(buttons, zoom, chartArea) {

    const buttonSize = 20;
    const reset = buttons.append('g').
      on('click', (event, d, n) => {
        zoom.scaleTo(chartArea.transition().duration(500), 1);
    });

    // <g><rect class="zoombutton zoomin" rx="6" ry="6" x="0" y="0"
    // width="200" height="55" transform="scale(1)" fill="#23364e">
    //   </rect><text class="zoomtext" x="100" y="30" style="font-size:
    // 30px">Reset Zoom</text></g>
    reset.append('rect')
      .attr('class', 'zoombutton zoomin')
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 200)
      .attr("height", 55)
      .attr("transform", "scale(1)")
      .attr('fill', '#23364e');

    reset.append('text')
      .attr('class', 'zoomtext')
      .attr("x", 100)
      .attr("y", 30)
      .attr('style', `font-size: 30px`)
      .html('Reset Zoom');
  }

  removeTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
    }
  }

  addTooltip() {
    this.removeTooltip();
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'circlepack-tooltip')
      .style('opacity', 1);
  }

  showTooltip(event: any, data: any, i: any): void {
    if (!data) {
      return;
    }
    this.tooltip
      .transition()
      .duration(100)
      .style('opacity', .9);
    let span = '';
    const x = data.x + 10;
    const y = data.y;
    span = '<span>' + data?.data?.name + '</span>';
    this.tooltip.html(span)
      .style('left', event.pageX + 20 + 'px')
      .style('top', event.pageY + 'px')
      .style('width', 100);
  }

  hideTooltip() {
    this.tooltip
      .transition()
      .duration(100)
      .style('opacity', 0);
  }
}
