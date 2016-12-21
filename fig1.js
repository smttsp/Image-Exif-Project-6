function render_fig1(data, fig1, min_year, max_year, max_elem){
    
    var tooltip = d3.select("body")
        .append("div")
            .attr("id", "tooltip_fig1")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("font-family", "cursive")
            .style("background-color", "black")
            .style("color", "#fff")
            .style("opacity", 0.7)

    var marg = {left: 24, top: 20, right:20, bottom:20};
    var width = 700, height = 600;

    var fig1dotg = fig1.append("g")
        .attr("transform", "translate(" + marg.left + "," + 0 + ")");

    var xAxisGroup = fig1.append("g")
        .attr("transform", "translate(" + marg.left + "," + (height - marg.bottom) + ")");

    var yAxisGroup = fig1.append("g")
        .attr("transform", "translate(" + marg.left*2 + "," + 0 + ")");

        var xScale = d3.scale.linear()
            .range([marg.left,width-marg.right-marg.left])
            .domain([min_year-1, max_year+1])

        var yScale = d3.scale.log()
            .range([height-marg.bottom, marg.top])
            .domain([48,max_elem+10])

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .tickFormat(d3.format(".^4"))
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .tickFormat(function (d)
                {return yScale.tickFormat(1,d3.format(",d"))(d)})

        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)

        fig1.attr("width", width).attr("height",height);
        fig1dotg
            .attr("width", width-marg.left-marg.right)
            .attr("height", height-marg.top-marg.bottom)

        fig1dotg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 30)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Yearly image distribution of all models");


        var line = d3.svg.line()
            .x(function(d){return xScale(d.x);})
            .y(function(d){return yScale(d.y);});

        var group = fig1dotg.selectAll('.visline')
           .data(data)
           .enter().append('path')
                .attr('class', 'visline')
                .attr("d", function(d) {return line(d.year);})
                .attr("stroke", '#888')
                .attr("fill", 'none')
                .attr("opacity", 0.3)

        fig1dotg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id","fig1_circle")
                .attr("r", 5)
                .attr("cx", function(d){var k = maxKey(d.year); return (k >= min_year && k <= max_year) ? xScale(k) : -100})
                .attr("cy", function(d){return yScale(maxValue(d.year))})
                .attr("fill", function(d){return fig_color(d.mm.substr(0, d.mm.indexOf(';')))})
//                .style("stroke", 'red')
                .attr("opacity", 0.6)
//                .on("mouseover", function(){return tooltip.style("visibility", "visible");})
                .on("mouseover", function(d){highlight_fig1(d);})

                .on("mousemove", function(d){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px").text(tooltip_text(d));})
//                .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
                .on("mouseout", function(){unhighlight_fig1()});

}

function tooltip_text(d){
    var nl = ' '
    var str = d.mm.split(';')

    sm = 0
    for(var i = 0; i < d.year.length; i++)
        sm += d.year[i]['y']
    var mx = maxValue(d.year)
    if(str.length >= 2)
        return str[0].toLowerCase() + nl + str[1].toLowerCase() +nl+ '(' + sm + ')'
    else
        return d.mm.toLowerCase() + nl + '(' + sm + ')'
}

