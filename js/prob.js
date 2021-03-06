var jStat = require('jStat');
var numbers = require('numbers');

function normalDataSet(mean, std) {
  var data = [];
  for (var i = mean - 4*std; i <= mean + 4*std; i += 0.08*std) {
    el = {
      "x": i,
      "y": jStat.normal.pdf(i, mean, std)
    }
    data.push(el);
    data2.push(jStat.normal.pdf(i, mean, std));
  }
  return data;
}

function deterministicDataSet(mean) {
  var data = [];
  for (var i = 0; i <= 400; i ++) {
    el = {
      "x": i,
      "y": mean*i
    }
    data.push(el);
  }
  return data;
}

function uniformDataSet(min, max) {
  var data = [{"x":0, "y":0}, {"x":min, "y":0}];
  for (var i = min; i <= max; i += ((max-min)/400)) {
    el = {
      "x": i,
      "y": jStat.uniform.pdf( i, min, max )
    }
    data.push(el);
  }
  data.push({"x":max, "y":0}, {"x":max+5, "y":0});
  return data;
}

function logNormalDataSet(mean, std) {
  var data = [];
  for (var i = 0; i <= mean*20; i += (0.05*mean)) {
    el = {
      "x": i,
      "y": jStat.lognormal.pdf(i, mean, std)
    }
    data.push(el);
  }
  return data;
}

function triangularDataSet(min, max, likely) {
  var data = [];
  for (var i = min; i <= max; i += ((max-min)/400)) {
    el = {
      "x": i,
      "y": jStat.triangular.pdf(i, min, max, likely)
    }
    data.push(el);
  }
  return data;
}

function truncatedNormalDataSet(mean, std, min, max) {
  var data = [{"x":mean-5, "y":0}, {"x":min, "y":0}];
  for (var i = min; i <= max; i += ((max - min)/400)) {
    el = {
        "x": i,
        "y": jStat.normal.pdf(i, mean, std)
      }
    data.push(el);
    }
  data.push({"x":max, "y":0}, {"x":mean+5, "y":0});
  return data;
}

function truncatedLogNormalDataSet(mean, std, min, max) {
  var data = [{"x":0, "y":0}, {"x":min, "y":0}];
  for (var i = min; i <= max; i += ((max - min)/400)) {
    el = {
      "x": i,
      "y": jStat.lognormal.pdf(i, mean, std)
    }
    data.push(el);
  }
  data.push({"x":max, "y":0}, {"x":max+5, "y":0});
  console.log(data);
  return data;
}

function drawGraph(data) {
  cleanGraph();

  var width = 960;
  var height = 500;
  var canvas = d3.select("#d3")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

  var margin = {
    left: 100,
    top: 100,
    right: 50,
    bottom: 50
  };

  var padding = 20;

  var group = canvas.append("g")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("transform", "translate(100,100)")
    .attr("padding", padding);

  var x = d3.scaleLinear()
    .domain([d3.min(data, function(d) {
      return d.x;
    }), d3.max(data, function(d) {
      return d.x;
    })])
    .range([0, width - 200]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d.y;
    })])
    .range([height - 200, 0]);

  var xAxis = d3.axisBottom()
    .scale(x);

  var yAxis = d3.axisLeft()
    .scale(y);

  var area = d3.area()
    .x(function(d) {
      return x(d.x);
    })
    .y0(height - 200)
    .y1(function(d) {
      return y(d.y);
    });

  var line = d3.line()
    .x(function(d) {
      return x(d.x);
    })
    .y(function(d) {
      return y(d.y);
    })
    .curve(d3.curveMonotoneX);

  group.selectAll("path")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelBlue")
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
    .attr("transform", "translate (0," + (height - 200) + ")") // move down x
    .call(xAxis);

  group.append("g")
    .call(yAxis);

  canvas.append("text")
      .attr("transform","translate(" + (width/2) + " ," +
                           (height - 50) + ")")
      .style("text-anchor", "middle")
      .text("Value");

  canvas.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left/4)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Probability Density");
}

function cleanGraph(){
  d3.select("svg").remove();
}

function restartForm(){
  $("#probablistic_modal").modal("hide");
  $('input').val("");
}

function monteCarlo(mean1, std1, mean2, std2, mean3, std3, seed){
  var meanArray = [];
  for (var i = 0; i < 1000; i++) {
    var totalArray = []
    for (var j = 0; j < seed; j++) {
        var total = jStat.normal.sample(mean1, std1) + jStat.normal.sample(mean2, std2) + jStat.normal.sample(mean3, std3);
        totalArray.push(total);
    }
    meanArray.push(jStat(totalArray).mean());
  }
  console.log(jStat(meanArray).mean());
  console.log(jStat(meanArray).stdev());
}
//
monteCarlo(12.5,1.5,11.5,2.5, 18.5,1.5, 50000);

// function monteCarlo2(mean1, std1, mean2, std2, mean3, std3, seed){
//   for (var i = 0; i < 100; i++) {
//     var totalArray = []
//     for (var j = 0; j < 50000; j++) {
//         var total = 33.8 + 0.0463*(jStat.normal.sample(mean1, std1)) - 0.3152*(jStat.normal.sample(mean2, std2)) - 1.064*(jStat.normal.sample(mean3, std3)) + 0.01385*(jStat.normal.sample(mean2, std2))*(jStat.normal.sample(mean3, std3));
//         totalArray.push(total);
//     }
//   }
//   console.log(totalArray);
//   console.log(jStat(totalArray).mean());
//   console.log(jStat(totalArray).stdev());
// }
//
// monteCarlo2(112,40,92.5,12,35,11, 50000);
