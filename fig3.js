function render_fig3(){

    var margin = {top: 10, right: 61, bottom: 50, left: 45};
    var width = 701-margin.left-margin.right, height = 320-margin.top - margin.bottom;

    //    width = 960 - margin.left - margin.right,
    //    height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%m/%d/%Y").parse;
        //formatPercent = d3.format(".0%");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(function (d){return (d/1000 + 'K');})

    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });

    var svg = d3.select("body").append("svg")
        .attr("id", "svg_fig3")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", margin.top + 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Yearly image distribution of top 5 brands");

    d3.csv("stackeddata.csv", function(error, data) {
      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
      data.forEach(function(d) {
        d.date = parseDate(d.date);
      });

      var browsers = stack(color.domain().map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {date: d.date, y: d[name] * 1};
          })
        };
      }));

      // Find the value of the day with highest total value
      var maxDateVal = d3.max(data, function(d){
        var vals = d3.keys(d).map(function(key){ return key !== "date" ? d[key] : 0 });
        return d3.sum(vals);
      });

      // Set domains for axes
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([1, maxDateVal])

      var browser = svg.selectAll(".browser")
            .data(browsers)
            .enter()
                .append("g")
                .attr("class", "browser");

      browser.append("path")
          .attr("class", "area")
          .attr("id", "fig3_path") 
          .attr("d", function(d) { return area(d.values); })
    //      .style("fill", function(d) { return color(d.name); });
          .style("fill", function(d){return fig_color(d.name)})
          .style("opacity", 0.7)
          .on("mouseover", function(d){
                highlight_fig1_brand(d.name);
                highlight_fig2(d.name.toLowerCase());
                highlight_fig3(d.name.toLowerCase())
                highlight_fig4_brands(d.name);
          })
          .on("mouseout", function(d){
                unhighlight_fig1_brand(d.name);
                unhighlight_fig2(d.name);
                unhighlight_fig3()
                unhighlight_fig4_brands(d.name);
          })
      
      browser.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
//          .attr("x", '-10px')
//          .attr("dy", ".35em")
          .attr("font-size",12)
          .attr("font-weight", "bold")
          .style("fill", function(d){return fig_color(d.name)})
          .text(function(d) { return d.name;});

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
    });
    
}
