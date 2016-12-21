function render_fig2(cams){

    d3.select("body").append("div")
        .attr("id", "tooltip_fig2")
        .style("opacity", 1e-6);

    var margin = {top: 20, right: 20, bottom: 60, left: 170},
        width = 600 - margin.left - margin.right,
        height = 2800 - margin.top - margin.bottom;

    var x = d3.scale.linear().range([5, width]);
    var y = d3.scale.ordinal().rangeRoundBands([0, height], .05);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("s"));
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var container1 = d3.select('body').append('div')
        .attr('id','container1')

    var xAxisContainer = d3.select('body').append('div')
        .attr('id','xAxisCont')  

    var svg = container1.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Brands/Models vs Number of images");
    
    var xaxis_svg = d3.select('#xAxisCont')
      .append('svg')
        .attr("id", "svg_fig2")
      .attr("width", width + margin.left + margin.right)
      .attr("height", margin.bottom)
      .append('g')
        .attr('transform', "translate(" + margin.left + "," + 0 +")");

    data = [];

  for (var c in  cams) {
    var mybrand = c.toLowerCase();
        dc = {}
        dc['model'] = mybrand
        dc['value'] = cams[mybrand]['count']
        data.push(dc)
  }

  data.sort(function(a, b) { return b.value - a.value; });

  y.domain(data.map(function(d) { return d.model; }));
  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  xaxis_svg.append("g")
      .attr("class", "x_axis_fig2")
      .attr("transform", "translate(0," + 0 + ")")
      .call(xAxis)
  svg.append("g")
      .attr("class", "y_axis_fig2")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Brands");
    var bars = svg.selectAll("#fig2_bars")
        .data(data)
        .enter().append("rect")
            .attr("id", "fig2_bars")
            .style('opacity', 0.7)
            .style('fill', function(d) { return fig_color(d.model); })
            .attr("x", 1)
            .attr("y", function(d) { return y(d.model); })
            .attr("width", 0)
                .transition()
                .duration(200)
                .delay(function (d, i) {
                    return i * 20;
                })
                .attr("width", function(d) { return x(d.value); })
                .attr("height", y.rangeBand())

    d3.selectAll("#fig2_bars")
        .on("mouseover", function(d){
            highlight_fig1_brand(d.model.toLowerCase());
            highlight_fig2(d.model.toLowerCase());
            highlight_fig3(d.model.toLowerCase());
            highlight_fig4_brands(d.model.toLowerCase());
            mouseover(d);
        })
        .on("mouseout", function(d){
            unhighlight_fig1_brand(d.model.toLowerCase());
            unhighlight_fig2(d.model.toLowerCase());
            unhighlight_fig3(d.model.toLowerCase());
            unhighlight_fig4_brands(d.model.toLowerCase());
            mouseout(d)
        })
        
//    d3.selectAll("#fig2_bars").on("mouseover", mouseover).on("mouseout", mouseout)
    
}


function mouseover(name) {
    
    var tooltip_fig2 = d3.select("#tooltip_fig2");
    var myname = name.model.toLowerCase();
    var mymodels = cams[myname]['model'];
    data = [];
    
    for (var m in mymodels ) {
        dc = {}
        dc['model'] = m
        dc['value'] = mymodels[m]
        data.push(dc)
    }
    sortedData = [];
    data.sort(function(a, b) { return b.value - a.value; });
    sortedData = data.filter(function(d,i){ // keep top 10.
        if(i < 25) {return d;}
    });
    data = sortedData;
    var margin = {top: 20, right: 50, bottom: 0, left: 140}
    var width = 250,
    height = 300;

    
    tooltip_fig2.transition()
      .duration(300)
      .style("opacity", 1);
    tooltip_fig2.html("<h1>"+name.model.toUpperCase()+"</h1><br> <svg class='subgraph'></svg>")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 20) + "px");

    var x = d3.scale.linear()
    .range([5, width])
    .domain([0, d3.max(data, function(d) { return d.value; })]);

    var y = d3.scale.ordinal().rangeRoundBands([0, height], .05);
    y.domain(data.map(function(d) { return d.model; }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks('8')
        .tickFormat(d3.format("s"));
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    var svg = d3.select(".subgraph")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    svg.append("g")
        .attr("class", "x_axis_fig2")
        .attr("transform", "translate("+ margin.left + "," + (height) + ")")
        .call(xAxis)

    svg.append("g")
      .attr("class", "y_axis_fig2")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(yAxis)

  var bars = svg.selectAll("#bar_fig2")
      .data(data)
      .enter().append("rect")
        .attr("id", "bar_fig2")
        .style("fill", function(d) { return fig_color(name.model); } )
        .style("opacity", 0.7)

    bars.attr("x", margin.left+1)
        .attr("width", 0)
        .transition()
        .duration(400)
        .delay(function (d, i) {return i * 20;})
            .attr("width", function(d) { return x(d.value); }) 
            .attr("y", function(d) { return y(d.model); })
            .attr("height", 10)
            .attr('transform', 'translate(0,'+(y.rangeBand()/2 - 5) +')')
    
    
}

function mouseout() {
    d3.select("#tooltip_fig2").transition()
        .duration(300)
        .style("opacity", 1e-6);
}
