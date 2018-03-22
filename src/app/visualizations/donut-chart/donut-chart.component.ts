import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from "@angular/core";
import * as d3 from 'd3';

@Component({
  selector: 'pharos-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  @ViewChild('donutChartTarget') chartContainer: ElementRef;
  @Input() data: any[] = [];
  private margin: any = {top: 20, bottom: 20, left: 10, right: 10};
  height: number;
  width: number;
  radius: number;
  donutChart: any = {
    pie: d3.pie()
      .sort(function (a, b) {
        return a.count - b.count;
      })
      .value(function (d) {
        return d.count;
      }),
    arc: d3.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(this.radius * 0.6)
      .cornerRadius(3)
      .padAngle(0.015),
    outerArc: d3.arc()
      .outerRadius(this.radius * 0.9)
      .innerRadius(this.radius * 0.9),
    key: function (d) {
      return d.data.label
    },
    color: d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']),
  };

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    d3.select('svg').remove();
  //  this.donutChartm();
  //  this.updateChart2();
  }

  ngOnInit() {
    console.log(this);
  //  this.donutChartm();
  //  this.updateChart2();
  //  this.updateData();
  }

/*  drawGraph(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    const svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('class', 'curve-container');
    svg.append('g')
      .attr('class', 'slices');
    svg.append('g')
      .attr('class', 'labels');
    svg.append('g')
      .attr('class', 'lines');
    svg.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  updateGraph(): void {

    const pie = d3.pie()
      .sort(function (a, b) {
        return a.count - b.count;
      })
      .value(function (d) {
        return d.count;
      });

    const arc = d3.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(0.5);


    const key = (d => d.data.label);

    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);


// Define the div for the tooltip
    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    /!* ------- PIE SLICES -------*!/

    const slice = d3.select('.slices').selectAll('path.slice')
      .data(pie(this.data), key);

    slice.enter()
      .insert('path')
      .style('fill', function (d) {
        return color(d.data.label);
      })
      .attr('class', 'slice')
      .attr('d', arc)
      .on('mouseover', function (d) {
        div.transition()
          .duration(200)
          .style('opacity', .9);
        div.html('<span>Class </span>' + d.data.label + '<br/>' + d.value)
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function (d) {
        div.transition()
          .duration(500)
          .style('opacity', 0);
      })
      .on('click', function (d) {
        // todo this will be expanded to filter table
        //  console.log(d);
      });
    slice.exit()
      .transition()
      .duration(750)
      .attrTween("d", this.arcTween)
      .remove();
  }*/


  donutChartm() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    const svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('class', 'curve-container');
    svg.append('g')
      .attr('class', 'slices');
    svg.append('g')
      .attr('class', 'labels');
    svg.append('g')
      .attr('class', 'lines');
    svg.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');


  }


  updateChart2(): void {
   /* const pie = d3.pie()
      .sort(function (a, b) {
        return a.count - b.count;
      })
      .value(function (d) {
        return d.count;
      });

    // contructs an arc generator. This will be used for the donut. The difference between outer and inner
    // radius will dictate the thickness of the donut
    var arc = d3.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(this.radius * 0.6)
      .cornerRadius(3)
      .padAngle(0.015);

    // this arc is used for aligning the text labels
    var outerArc = d3.arc()
      .outerRadius(this.radius * 0.9)
      .innerRadius(this.radius * 0.9);

    const key = (d => d.data.label);

    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
*/
    const slice = d3.select('.slices')
      .selectAll('path')
      .data(this.donutChart.pie(this.data), this.donutChart.key)
      .enter().append('path')
      .attr('fill', (d => this.donutChart.color(d.data.label)))
      .attr('d', this.donutChart.arc);

    // add text labels
    const label = d3.select('.labels').selectAll('text')
      .data(this.donutChart.pie(this.data), this.donutChart.key)
      .enter().append('text')
      .attr('dy', '.35em')
      .html(this.donutChart.key)
      .attr('transform', this.labelTransform)
      .style('text-anchor', function (d) {
        // if slice centre is on the left, anchor text to start, otherwise anchor to end
        return (this.midAngle(d)) < Math.PI ? 'start' : 'end';
      });
    // ===========================================================================================

    // ===========================================================================================
    // add lines connecting labels to slice. A polyline creates straight lines connecting several points
    var polyline = d3.select('.lines')
      .selectAll('polyline')
      .data(this.donutChart.pie(this.data), this.donutChart.key)
      .enter().append('polyline')
      .attr('points', this.calculatePoints);
    // ===========================================================================================

    // ===========================================================================================
    // add tooltip to mouse events on slices and labels
      d3.selectAll('.labelName text, .slices path').call(this.toolTip);
    // ===========================================================================================

    // ===========================================================================================
  }

  // FUNCTION TO UPDATE CHART
  updateData() {

    var updatePath = d3.select('.slices').selectAll('path');
    var updateLines = d3.select('.lines').selectAll('polyline');
    var updateLabels = d3.select('.labelName').selectAll('text');

    var data0 = this.donutChart.path.data(), // store the current data before updating to the new
      data1 = this.donutChart.pie(this.data), key;

    // update data attached to the slices, labels, and polylines. the key function assigns the data to
    // the correct element, rather than in order of how the data appears. This means that if a category
    // already exists in the chart, it will have its data updated rather than removed and re-added.
    updatePath = updatePath.data(data1, key);
    updateLines = updateLines.data(data1, key);
    updateLabels = updateLabels.data(data1, key);

    // adds new slices/lines/labels
    updatePath.enter().append('path')
      .each(function (d, i) {
        this._current = this.findNeighborArc(i, data0, data1, key) || d;
      })
      .attr('fill', function (d) {
        return this.donutChart.color(d.data.label);
      })
      .attr('d', this.donutChart.arc);

    updateLines.enter().append('polyline')
      .each(function (d, i) {
        this._current = this.findNeighborArc(i, data0, data1, key) || d;
      })
      .attr('points', this.calculatePoints);

    updateLabels.enter().append('text')
      .each(function (d, i) {
        this._current = this.findNeighborArc(i, data0, data1, key) || d;
      })
      .html(this.updateLabelText)
      .attr('transform', this.labelTransform)
      .style('text-anchor', function (d) {
        return (this.midAngle(d)) < Math.PI ? 'start' : 'end';
      });

    // removes slices/labels/lines that are not in the current dataset
    updatePath.exit()
      .transition()
      .duration(750)
      .attrTween("d", this.arcTween)
      .remove();

    updateLines.exit()
      .transition()
      .duration(750)
      .attrTween("points", this.pointTween)
      .remove();

    updateLabels.exit()
      .remove();

    // animates the transition from old angle to new angle for slices/lines/labels
    updatePath.transition().duration(750)
      .attrTween('d', this.arcTween);

    updateLines.transition().duration(750)
      .attrTween('points', this.pointTween);

    updateLabels.transition().duration(750)
      .attrTween('transform', this.labelTween)
      .styleTween('text-anchor', this.labelStyleTween);

    updateLabels.html(this.updateLabelText); // update the label text

    // add tooltip to mouse events on slices and labels
    d3.selectAll('.labelName text, .slices path').call(this.toolTip);

  };

  // ===========================================================================================
  // Functions
  // calculates the angle for the middle of a slice
  midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  // function that creates and adds the tool tip to a selected element
         toolTip(selection) {

         // add tooltip (svg circle element) when mouse enters label or slice
          selection.on('mouseenter', function (data) {

            d3.append('text')
              .attr('class', 'toolCircle')
              .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
              .html(this.toolTipHTML(data)) // add text to the circle.
              .style('font-size', '.7em')
              .style('text-anchor', 'middle'); // centres text in tooltip

            d3.append('circle')
              .attr('class', 'toolCircle')
              .attr('r', this.radius * 0.55) // radius of tooltip circle
              .style('fill', this.donutChart.color(data.data.label)) // colour based on category mouse is over
              .style('fill-opacity', 0.35);

          });

          // remove the tooltip when mouse leaves the slice/label
          selection.on('mouseout', function () {
            d3.selectAll('.toolCircle').remove();
          });
        }

        // function to create the HTML string for the tool tip. Loops through each key in data object
        // and returns the html string key: value
         toolTipHTML(data) {

          var tip = '',
            i   = 0;

          for (var key in data.data) {

            // if value is a number, format it as a percentage
            var value = (!isNaN(parseFloat(data.data[key]))) ? data.data[key] : data.data[key];

            // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
            // tspan effectively imitates a line break.
            if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
            else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
            i++;
          }

          return tip;
        }


  // calculate the points for the polyline to pass through
  calculatePoints(d) {
    // see label transform function for explanations of these three lines.
    var pos = this.donutChart.outerArc.centroid(d);
    pos[0] = this.radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
    return [this.donutChart.arc.centroid(d), this.donutChart.outerArc.centroid(d), pos]
  }

  labelTransform(d) {
    console.log(this.donutChart);
    const pos = this.donutChart.outerArc().centroid(d);
    // changes the point to be on left or right depending on where label is.
    pos[0] = this.radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
  }

  updateLabelText(d) {
    return d.data.label + ': <tspan>' + (d.data.count) + '</tspan>';
  }

  // function that calculates transition path for label and also it's text anchoring
  labelStyleTween(d) {
    let _current;
    _current = _current || d;
    const interpolate = d3.interpolate(_current, d);
    _current = interpolate(0);
    return function (t) {
      var d2 = interpolate(t);
      return this.midAngle(d2) < Math.PI ? 'start' : 'end';
    };
  }

  labelTween(d) {
    let _current;
    _current = _current || d;
    var interpolate = d3.interpolate(_current, d);
    _current = interpolate(0);
    return function (t) {
      var d2 = interpolate(t),
        pos = this.donutChart.outerArc.centroid(d2); // computes the midpoint [x,y] of the centre line that would be
      // generated by the given arguments. It is defined as startangle + endangle/2 and innerR + outerR/2
      pos[0] = this.radius * (this.midAngle(d2) < Math.PI ? 1 : -1); // aligns the labels on the sides
      return 'translate(' + pos + ')';
    };
  }

  pointTween(d) {
    let _current;
    _current = _current || d;
    var interpolate = d3.interpolate(_current, d);
    _current = interpolate(0);
    return function (t) {
      var d2 = interpolate(t),
        pos = this.donutChart.outerArc.centroid(d2);
      pos[0] = this.radius * 0.95 * (this.midAngle(d2) < Math.PI ? 1 : -1);
      return [this.donutChart.arc.centroid(d2), this.donutChart.outerArc.centroid(d2), pos];
    };
  }

  // function to calculate the tween for an arc's transition.
  // see http://bl.ocks.org/mbostock/5100636 for a thorough explanation.
  arcTween(d) {
    let _current;
    var i = d3.interpolate(_current, d);
    _current = i(0);
    return function (t) {
      return this.donutChart.arc(i(t));
    };
  }

  findNeighborArc(i, data0, data1, key) {
    var d;
    return (d = this.findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
      : (d = this.findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
        : null;
  }

  // Find the element in data0 that joins the highest preceding element in data1.
  findPreceding(i, data0, data1, key) {
    var m = data0.length;
    while (--i >= 0) {
      var k = key(data1[i]);
      for (var j = 0; j < m; ++j) {
        if (key(data0[j]) === k) return data0[j];
      }
    }
  }

  // Find the element in data0 that joins the lowest following element in data1.
  findFollowing(i, data0, data1, key) {
    var n = data1.length, m = data0.length;
    while (++i < n) {
      var k = key(data1[i]);
      for (var j = 0; j < m; ++j) {
        if (key(data0[j]) === k) return data0[j];
      }
    }
  }

}
