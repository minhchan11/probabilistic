
var dataArray = [5,20, 40, 50,60];
var width = 500;
var height = 500;



var widthScale = d3.scaleLinear()
                    .domain([0, 60])
                    .range([0, width]);

var color = d3.scaleLinear()
                    .domain([0, 60])
                    .range(["yellow", "blue"]);

var canvas = d3.select("#d3")
               .append("svg")
               .attr("width",width)
               .attr("height",height)
               .attr("transform","scale(1,-1)");


var bars = canvas.selectAll("rect")
                 .data(dataArray)
                 .enter()
                  .append("rect")
                  .attr("height", function(d) {return widthScale(d);})
                  .attr("width", 50)
                  .attr("fill", function(d){ return color(d);})
                  .attr("x", function(d,i) { return i * 100;});
