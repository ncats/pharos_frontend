import {
  Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild, ViewEncapsulation,
  ViewRef
} from '@angular/core';
import * as d3 from 'd3';
import {RadarService} from "../radar-chart/radar.service";
import {MAT_DIALOG_DATA} from "@angular/material";

export class ChartOptions {
    w: number = 600;				//Width of the circle
    h: number = 600;				//Height of the circle
    margin: any = {top: 50, right: 20, bottom: 20, left: 20}; //The margins of the SVG
    levels :number =  3;				//How many levels or inner circles should there be drawn
    maxValue: number = 0; 			//What is the value that the biggest circle will represent
    labelFactor: number = 1.01; 	//How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: number = 60; 		//The number of pixels after which a label needs to be given a new line
    opacityArea: number = 0.35; 	//The opacity of the area of the blob
    dotRadius: number = 2; 			//The size of the colored circles of each blog
    opacityCircles: number = 0.1; 	//The opacity of the circles of each blob
    strokeWidth: number = 2; 		//The width of the stroke around each blob
    roundStrokes: false;	//If true the area and stroke will follow a round path (cardinal-closed)
    color: any = d3.scaleOrdinal().range(["#23364e"]);
    format: string = '.2%';
    unit: string = ' ';
    axisLabels: true;
    labels: true;
    legend: false;

  constructor(obj: any){
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}


@Component({
  selector: 'pharos-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.css']
})
export class SpiderChartComponent implements OnInit {
  @Input() id : any;
 // @Input() data? : any;
  private _data: any;

  @Input()
  set data(value: any) {
    this._data = value;
  }
  get data(): any { return this._data; }

  @Input() size?: string;
  @ViewChild('spiderChart') chartContainer: ElementRef;

  radius: number;
  private _chartOptions: ChartOptions;
  circles: any[] = [];
  svg: any;
  constructor(
    private radarDataService: RadarService,
    @Optional() @Inject(MAT_DIALOG_DATA) public modalData: any
  ) { }

  ngOnInit() {

    if(this.modalData){
      Object.keys(this.modalData).forEach(key => this[key] = this.modalData[key]);
    }

    if(this.size){
      this._chartOptions = new ChartOptions(this.radarDataService.getOptions(this.size));
    }else {
      this._chartOptions = new ChartOptions({});
    }

    this.drawChart();
   /* if(!this.data){
      this.data = this.radarDataService.getData(this.id).subscribe(res=> {
        this.data = res;
       this.radarChart();
      });
    }else{
      this.data.forEach(graph => {
        if(graph) {
        this.radarDataService.setData(graph.className, graph)
          this.radarChart();
        }
    });
    }*/
  }

  ngOnChanges(change: any){
    if (change.data.currentValue.length > 0){
    //  this.drawChart();
      this.radarChart();

    }

  }

   pointsOnCircle(num){
    const angle = (2 * Math.PI)/num;
    const points = [];
    let i=0;
    for(var a = 0; a<(2*Math.PI); a+=angle){
      i++;
      points.push({
        x:Math.cos(a),
        y:Math.sin(a),
        rotation:a,
        label:'point' + i
      })
    }
    return points;
  }

  drawChart(): void {
    //////////// Create the container SVG and g /////////////
    const element = d3.select(this.chartContainer.nativeElement);

    //Remove whatever chart with the same id/class was present before
 //   element.select("this.svg").remove();
this.svg = {};
    //Initiate the radar chart SVG
    this.svg = element.append("svg")
      .attr("width",  this._chartOptions.w + this._chartOptions.margin.left + this._chartOptions.margin.right)
      .attr("height", this._chartOptions.h + this._chartOptions.margin.top + this._chartOptions.margin.bottom)
      .attr("class", "radar")
      .append("g")
    //.style('transform', 'translate(50%, 50%)');
      .attr("transform", "translate(" + (this._chartOptions.w/2 + this._chartOptions.margin.left) + "," + (this._chartOptions.h/2 + this._chartOptions.margin.top) + ")")
    // background shapes
    this.svg.append("g").attr("class", "levelWrapper").attr("transform", "rotate(30)");
    this.svg.append("g").attr("class", "axisLabel");
    this.svg.append("g").attr("class", "axisWrapper");
   // this.svg.append("g").attr("class", "blobWrapper");
   // this.svg.append("g").attr("class", "radarCircleWrapper");

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    const filter = this.svg.append('defs').append('filter').attr('id','glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////
  }

  updateChart(): void {

  }


  radarChart() {
    const max = Math.max;
    const sin = Math.sin;
    const cos = Math.cos;
    const HALF_PI: number = Math.PI / 2;

    // todo: clean this up with es6
    //Wraps SVG text - Taken from http://bl.ocks.org/mbostock/7555321
    const wrap = (text, width) => {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        let lineHeight = 1.4; // ems
        const y = text.attr("y");
        const x = text.attr("x");
        const dy = parseFloat(text.attr("dy"));
        let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {

          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }//wrap

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    // var maxValue = max(this._chartOptions.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
    let maxValues: number[] = [this._chartOptions.maxValue];
    for(let data of this.data) {
      maxValues.push(Math.max(...data.axes.map(o => o.value)));
    }
    const maxValue: number = Math.max(...maxValues);
    const allAxis = this.data[0].axes.map((i, j) => i.axis),	//Names of each axis
      total = allAxis.length,					//The number of different axes
      radius = Math.min(this._chartOptions.w/2, this._chartOptions.h/2), 	//Radius of the outermost circle
      format = d3.format(this._chartOptions.format),			 	//Formatting
      angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //Scale for the radius
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    this.circles = this.pointsOnCircle(total);

    const polygon: any[] = [];
    this.circles.map(p => {
      polygon.push(rScale(p.x) + ',' + rScale(p.y));
    });




    //Draw the background shapes
    const levels = this.svg.select('.levelWrapper').selectAll(".levels")
      .data(d3.range(1,(this._chartOptions.levels+1)).reverse())
      .enter()
      .append("polygon")
      .attr('points', d => {
        return [polygon]
      })
      .attr('class', 'levels')
      .style("fill", "#F3F3F3")
      .style("stroke", "#CDCDCD")
      // todo: figure out how to scale the points. probably an external function
      // .attr("r", d => radius / this._chartOptions.levels * d)
      .style("fill-opacity", this._chartOptions.opacityCircles)
      .style("filter" , "url(#glow)")
      .exit()
      .remove();

    //Text indicating at what % each level is
    if(this._chartOptions.axisLabels) {
      this.svg.selectAll(".axisLabel")
        .data(d3.range(1, (this._chartOptions.levels + 1)).reverse())
        .enter().append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", d => -d * radius / this._chartOptions.levels)
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(d => format(maxValue * d / this._chartOptions.levels) + this._chartOptions.unit);
    }

    //////////////////// Draw the axes //////////////////////
    //Create the straight lines radiating outward from the center
    var axis = this.svg.select('.axisWrapper').selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

      axis.append("line")
      .attr("class", "line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => {
        return rScale(maxValue) * cos(angleSlice * i - HALF_PI)
      })
      .attr("y2", (d, i) => rScale(maxValue) * sin(angleSlice * i - HALF_PI))
      .style("stroke", "666")
      .style("stroke-width", "2px");


    //Append the labels at each axis
    // todo: rotate? https://stackoverflow.com/questions/42581308/d3-js-rotate-axis-labels-around-the-middle-point
   // if(this._chartOptions.labels) {
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(maxValue * this._chartOptions.labelFactor) * cos(angleSlice * i - HALF_PI))
        .attr("y", (d, i) => rScale(maxValue * this._chartOptions.labelFactor) * sin(angleSlice * i - HALF_PI))
        .text(d => d)
        .call(wrap, this._chartOptions.wrapWidth)
   // }

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    const radarLine = d3.radialLine()
      .curve(d3.curveLinearClosed)
      .radius(d =>  rScale(d.value))
      .angle((d,i) => i * angleSlice);

    if(this._chartOptions.roundStrokes) {
      radarLine.curve(d3.curveCardinalClosed)
    }

    //Create a wrapper for the blobs
    const blobWrapper = this.svg.selectAll(".blobWrapper")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "blobWrapper");

    //Append the backgrounds
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .attr("d", d => radarLine(d.axes))
      .style("fill", (d,i) => this._chartOptions.color(i))
      .style("fill-opacity", this._chartOptions.opacityArea)
      .on('mouseover', function(d, i) {
        //Dim all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.1);
        //Bring back the hovered over blob
        d3.select(this)
          .transition().duration(200)
          .style("fill-opacity", 0.7);
      })
      .on('mouseout', () => {
        //Bring back all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", this._chartOptions.opacityArea);
      });

    //Create the outlines
    blobWrapper.append("path")
      .attr("class", "radarStroke")
      .attr("d", function(d,i) { return radarLine(d.axes); })
      .style("stroke-width", this._chartOptions.strokeWidth + "px")
      .style("stroke", (d,i) => this._chartOptions.color(i))
      .style("fill", "none")
      .style("filter" , "url(#glow)");

    //Append the circles
    blobWrapper.selectAll(".radarCircle")
      .data(d => d.axes)
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", this._chartOptions.dotRadius)
      .attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
      .attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
      .style("fill", (d) => this._chartOptions.color(d.id))
      .style("fill-opacity", 0.8);




    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    const blobCircleWrapper = this.svg.selectAll(".radarCircleWrapper")
      .data(this.data)
      .enter().append("g")
      .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
      .data(d => d.axes)
      .enter().append("circle")
      .attr("class", "radarInvisibleCircle")
      .attr("r", this._chartOptions.dotRadius * 1.5)
      .attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
      .attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
      .style("fill", "none")
      .style("pointer-events", "all")
      // todo: make the tooltip not suck
      .on("mouseover", (d,i, circles) => {
        tooltip
          .attr('x', circles[i].cx.baseVal.value - 10)
          .attr('y', circles[i].cy.baseVal.value - 10)
          .transition()
          .style('display', 'block')
          .text(d.axis + " "+ format(d.value) + this._chartOptions.unit);
      })
      .on("mouseout", function(){
   /*     tooltip.transition()
          .style('display', 'none').text('');*/
      });

    const tooltip = this.svg.append('div')
      .attr('x', 0)
      .attr('y', 0);
      tooltip.append("text")
      .attr("class", "tooltip")

      .style("font-size", "12px")
      .style('display', 'none')
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em");

    /*if (this._chartOptions.legend !== false && typeof this._chartOptions.legend === "object") {
      let legendZone = this.svg.append('g');
      let names = data.map(el => el.name);
      if (this._chartOptions.legend.title) {
        let title = legendZone.append("text")
          .attr("class", "title")
          .attr('transform', `translate(${this._chartOptions.legend.translateX},${this._chartOptions.legend.translateY})`)
          .attr("x", this._chartOptions.w - 70)
          .attr("y", 10)
          .attr("font-size", "12px")
          .attr("fill", "#404040")
          .text(this._chartOptions.legend.title);
      }
      let legend = legendZone.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', `translate(${this._chartOptions.legend.translateX},${this._chartOptions.legend.translateY + 20})`);
      // Create rectangles markers
      legend.selectAll('rect')
        .data(names)
        .enter()
        .append("rect")
        .attr("x", this._chartOptions.w - 65)
        .attr("y", (d,i) => i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", (d,i) => this._chartOptions.color(i));
      // Create labels
      legend.selectAll('text')
        .data(names)
        .enter()
        .append("text")
        .attr("x", this._chartOptions.w - 52)
        .attr("y", (d,i) => i * 20 + 9)
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(d => d);
    }*/
    //return svg;
  }

}
