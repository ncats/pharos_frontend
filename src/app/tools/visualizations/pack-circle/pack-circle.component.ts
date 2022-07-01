import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3v7';

@Component({
  selector: 'pharos-pack-circle',
  templateUrl: './pack-circle.component.html',
  styleUrls: ['./pack-circle.component.scss']
})
export class PackCircleComponent implements OnInit {

  /**
   * element container
   */
  @ViewChild('packCircleTarget', {static: true}) chartContainer: ElementRef;
  @Input() hierarchyData: any;

  constructor() {
  }

  width = 1152;
  height = 1152;
  zoom;
  scale = 1;

  ngOnInit(): void {

    const zScale = d3.scaleLinear()
      .domain([0, 1])
      .range(['#ffffff', '#23364e']);
    if (this.hierarchyData) {
      // @ts-ignore
      const chart = this.Pack(this.hierarchyData, {
        value: d => d.value, // size of each node (file); null for internal nodes (folders)
        label: d => '',//(d, n) => [...d.name.split(/(?=[A-Z][a-z])/g), n.value.toLocaleString("en")].join("\n"),
        title: (d, n) => [...d.name.split(/(?=[A-Z][a-z])/g), n.data.value.toLocaleString("en")].join("\n"),//`${n.ancestors().reverse().map(({data: d}) => d.name).join(".")}\n${n.value.toLocaleString("en")}`,
        width: this.width,
        height: this.height,
        fill: (d) => {
          return zScale(d.value);
        },
        stroke: '#23364e',
        strokeOpacity: 0.5,
      });
    }
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

    // const clipPath = svg
    //   .append('clipPath')
    //   .attr('id', `clip-${this.id()}`)
    //   .append('rect')
    //   .attr('x', 0)
    //   .attr('width', this.width)
    //   .attr('y', 0)
    //   .attr('height', this.height);

    let lastClick = false;
    const node = svg.selectAll("a")
      .data(descendants)
      .join("a")
      .attr("xlink:href", link == null ? null : (d, i) => link(d.data, d))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", d => `translate(${d.x},${d.y})`);


    node.append("circle")
      .attr("fill", d => !(d.children) ? fill(d) : '#fff')
      .attr("fill-opacity", d => fillOpacity(d))
      .attr("stroke", d => d.children ? stroke : null)
      .attr("stroke-width", d => d.children ? strokeWidth : null)
      .attr("stroke-opacity", d => d.children ? strokeOpacity : null)
      .attr("r", d => d.r)
      .on('click', (event, d) => {
        const uid = d.data.uid;
        if (uid === lastClick) {
          svg.transition().ease(d3.easeCubicInOut).duration(1000).attr("transform", `translate(0,0)scale(1)`);
          lastClick = false;
          lastPosition = [0,0];
          this.scale = 1;
        } else {
          const twidth = this.chartContainer.nativeElement.offsetWidth;
          const theight = this.chartContainer.nativeElement.offsetHeight;
          this.scale = Math.min(Math.pow(twidth / d.r, .75), 6);
          const x = (twidth - d.x) * this.scale / 2;
          const y = (theight - d.y) * this.scale / 2;
          lastPosition = [x,y];
          lastMouse = false;
          svg.transition().ease(d3.easeCubicInOut)
            .duration(1000).attr("transform", `translate(${x},${y})scale(${this.scale})`);
          lastClick = uid;
        }
      });

    if (T) node.append("title").text((d, i) => T[i]);

    // if (L) {
    //   // A unique identifier for clip paths (to avoid conflicts).
    //   const uid = `O-${Math.random().toString(16).slice(2)}`;
    //
    //   const leaf = node
    //     .filter(d => !d.children && d.r > 10 && L[d.index] != null);
    //
    //   leaf.append("clipPath")
    //     .attr("id", d => `${uid}-clip-${d.index}`)
    //     .append("circle")
    //     .attr("r", d => d.r);
    //
    //   leaf.append("text")
    //     .attr("clip-path", d => `url(#clip-path)`)
    //     .selectAll("tspan")
    //     .data(d => `${L[d.index]}`.split(/\n/g))
    //     .join("tspan")
    //     .attr("x", 0)
    //     .attr("y", (d, i, D) => `${(i - D.length / 2) + 0.85}em`)
    //     .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
    //     .text(d => d);
    // }

    let lastMouse = false;
    let lastPosition = [0,0];
    this.zoom = d3.zoom().on('zoom', (e) => {
      if (e.sourceEvent.type === 'wheel'){
        return;
      }
      const mouse = d3.pointer(e);
      if (!lastMouse) {
        lastMouse = mouse;
      }
      if (!lastPosition) {
        lastPosition = [0,0];
      }
      const x = lastPosition[0] + (mouse[0] - lastMouse[0]);
      const y = lastPosition[1] + (mouse[1] - lastMouse[1]);
      svg.attr("transform", `translate(${x},${y})scale(${this.scale})`);
    }).on("end", (e) => {
      const mouse = d3.pointer(e);
      const x = lastPosition[0] + (mouse[0] - lastMouse[0]);
      const y = lastPosition[1] + (mouse[1] - lastMouse[1]);
      lastPosition = [x,y];
      lastMouse = false;
    });

    svg.call(this.zoom);

    return svg.node();
  }
}
