var jStat = require('jStat');

var width = 960;
var height = 500;
var canvas = d3.select("#d3")
               .append("svg")
               .attr("width",width)
               .attr("height",height + 100)
               .attr("class","chart");

margin = {left: 100, top: 100, right: 50, bottom: 50};

var group = canvas.append("g")
                  .attr("transform", "translate(100,100)");

var data = [];
var total = 0;
for (var i = 7.5; i <= 17.5; i += 0.025) {
  el = {
        "x": i,
        "y": jStat.normal.pdf(i, 12.5, 1.5)
    }
    data.push(el);
}



var x = d3.scaleLinear()
          .domain([d3.min(data, function(d) { return d.x; }), d3.max(data, function(d) { return d.x; })])
          .range([0, width - 200]);

var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return d.y; })])
          .range([height - 200, 0]);

var xAxis = d3.axisBottom()
              .scale(x);

var yAxis = d3.axisLeft()
              .scale(y);

var area = d3.area()
    .x(function(d) { return x(d.x); })
    .y0(height-200)
    .y1(function(d) { return y(d.y); });

var line = d3.line()
            .x(function(d){ return x(d.x);})
            .y(function(d){ return y(d.y);})
            .curve(d3.curveMonotoneX) ;



            group.selectAll("path")
                  .data([data])
                  .enter()
                    .append("path")
                    .attr("d",line)
                    .attr("fill","none")
                    .attr("stroke","steelBlue")
                    .attr("stroke-width", "1.5px");

            group.selectAll(".area")
                  .data([data])
                  .enter()
                    .append("path")
                    .attr("class", "area")
                    .attr("d", area)
                    .attr("fill", "lightsteelblue")
                    .attr("stroke-width", 0)
                    .attr("opacity", 0.4);

group.append("g")
    .attr("transform","translate (0,"+ (height-200) + ")") // move down x
    .call(xAxis);

  group.append("g")
    .call(yAxis);
