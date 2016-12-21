var unhov = 0.4;
var norm = 0.7;

var dict = new Object();
dict['Canon'] = "#377eb8"
dict['Nikon Corporation'] = "#e41a1c"
dict['Sony'] = "#ff7f00"
dict['Panasonic'] = "#4daf4a"
dict['apple'] = "#984ea3"

var tiptool = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "visible")
    .text("a simple tooltip");

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function maxKey(obj) {
    var max_yr = -1, max_cnt = -1;
    for (var i = 0; i < obj.length; i++) {
        if(obj[i]['y'] > max_cnt){
            max_cnt = obj[i]['y']
            max_yr = obj[i]['x']
        }
    }
    return max_yr;
}

function maxValue(obj){
    var max_cnt = -1;
    for(var i = 0; i < obj.length; i++){
        if(obj[i]['y'] > max_cnt){
            max_cnt = obj[i]['y']
        }
    }
    return max_cnt;
}

function sort_wrt_year(obj){
    return obj.sort(function(a,b) {return (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0);} ); 
}

function sumd( year_arr ) {
    var total = 0;

    for(var i = 0; i < year_arr.length; i++)
        total += parseInt( year_arr[i]['y'] );
    
//    console.log(total + obj)
    return total;
}

function fig_color(n) {
    var brands = ['canon', 'nikon corporation', 'sony', 'panasonic', "apple"]
    var colors = ["#377eb8", "#e41a1c", "#ff7f00", "#4daf4a", "#984ea3", "#000000"];

    var pos = 5;
    for (var i=0; i < brands.length; i++){
        if (n.toLowerCase() == (brands[i].toLowerCase()))
            pos = i;
    } 
    return colors[pos % colors.length];
}

function highlight_fig1(circ){
    var t_fig1 = d3.select("#tooltip_fig1");
    t_fig1.style("visibility", "visible");
    d3.selectAll("#fig1_circle").style("stroke", function(d){
        return d.mm == circ.mm ? "red":undefined
    })
    .style("stroke-width", function(d){
        return d.mm == circ.mm ? "3px":undefined
    })
    .style("opacity", function(d){
        return d.mm == circ.mm ? 1: unhov;
    })
    
//    console.log(circ)
    d3.selectAll('.visline').style("stroke", function(d){
        return d.mm == circ.mm ? fig_color(circ.mm.split(';')[0]):undefined  
    }).style("stroke-width", function(d){
        return d.mm == circ.mm ? 5:1  
    })
    .style("opacity", function(d){
        return d.mm == circ.mm ? 1:0.1  
    })
    
    d3.selectAll("#fig3_path").style("opacity", function(d){
        return d.name.toLowerCase() == circ.mm.split(';')[0].toLowerCase() ? 1:0.2;
    })
    
    d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === circ.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === circ.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === circ.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === circ.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 1.5:4)
     
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '')  === circ.mm.split(';')[1].toLowerCase().replace(/\s/g, '')  && d.makeName.toLowerCase().replace(/\s/g, '')  === circ.mm.split(';')[0].toLowerCase().replace(/\s/g, '')  ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === circ.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === circ.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     
     })

    highlight_fig2(circ.mm.split(';')[0].toLowerCase())
}

function unhighlight_fig1(){
    var t_fig1 = d3.select("#tooltip_fig1")
        .style("visibility", "hidden");
    d3.selectAll("#fig1_circle")
        .attr("r", 5)
        .style("stroke", undefined)
        .style("stroke-width", undefined)
        .style("opacity", norm)

    
    d3.selectAll("#fig3_path").style("opacity", norm)
    
    d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? (1.5):4)
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })

    unhighlight_fig2();
    d3.selectAll('.visline')
        .style("stroke", undefined)
        .style("stroke-width",1)
        .style("opacity", 0.3)
}

function highlight_fig2(bar){
    d3.selectAll("#fig2_bars").style("opacity", function(d){
        return bar == d.model.toLowerCase() ? 1:unhov; })
}

function unhighlight_fig2(){
    d3.selectAll("#fig2_bars").style("opacity", norm)
}

function highlight_fig3(circ){
    d3.selectAll("#fig3_path").style("opacity", function(d){
//        console.log('circ' , circ)
//        console.log("d", d)
        return d.name.toLowerCase() == circ ? 1:unhov;
    })
}

function unhighlight_fig3(){
    d3.selectAll("#fig3_path").style("opacity",norm);
    unhighlight_fig2();

}


function highlight_fig1_brand(make){

    d3.selectAll("#fig1_circle").style("stroke", function(d){
        return d.mm.split(';')[0].toLowerCase() == make.toLowerCase() ? "red":undefined
    })
    .style("stroke-width", function(d){
        return d.mm.split(';')[0].toLowerCase() == make.toLowerCase() ? "3px":undefined
    })
    .style("opacity", function(d){
        return d.mm.split(';')[0].toLowerCase() == make.toLowerCase() ? 1:unhov
    })
    
}

function unhighlight_fig1_brand(){
    d3.selectAll("#fig1_circle")
        .style("stroke",undefined)
        .style("stroke-width", undefined)
        .style("opacity", norm)
}






function highlight_fig4(model, make) {
        d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === model.replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === model.replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 1.5:4)
     
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === model.replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase().replace(/\s/g, '') === model.replace(/\s/g, '') && d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     
     })

}

function unhighlight_fig4(model, make) {
    d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? (1.5):4)
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
}

function highlight_fig4_brands(make) {
        d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName]==undefined ? 1.5:4)
     
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return d.makeName.toLowerCase().replace(/\s/g, '') === make.replace(/\s/g, '') ? 10 : (dict[d.makeName]==undefined ? 2:3)
     
     })

}

function unhighlight_fig4_brands(make) {
    d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? (1.5):4)
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
}

function highlight_figure(model, make)
{
//    var t_fig1 = d3.select("#tooltip_fig1");
//    t_fig1.style("visibility", "visible");
    d3.selectAll("#fig1_circle").style("stroke", function(d){
        return model.replace(/\s/g, '') === d.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && make.replace(/\s/g, '') === d.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? "red":undefined
    })
    .style("stroke-width", function(d){
        return model.replace(/\s/g, '') === d.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && make.replace(/\s/g, '') === d.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? "3px":undefined
    })
    .attr("r", function(d){
        return model.replace(/\s/g, '') === d.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && make.replace(/\s/g, '') === d.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? 10:5;
    })
    
    
//    d3.selectAll('.visline').style("stroke", function(d){
//        return d.mm == make+';'+model ? fig_color(make):undefined  
//    }).style("stroke-width", function(d){
//        return d.mm == make+';'+model ? 5:1  
//    })
//    .style("opacity", function(d){
//        return d.mm == make+';'+model ? 1:0.1  
//    })
//
    
    
//    d3.selectAll('.visline').style("stroke", function(d){
//        return model.replace(/\s/g, '') === d.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && make.replace(/\s/g, '') === d.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? fig_color(d.mm.split(';')[0].toLowerCase()):undefined  
//    }).style("stroke-width", function(d){
//        return model.replace(/\s/g, '') === d.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && make.replace(/\s/g, '') === d.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? 5:1  
//    })
//    .style("opacity", function(d){
//        return model.replace(/\s/g, '') === d.mm.split(';')[1].toLowerCase().replace(/\s/g, '') && make.replace(/\s/g, '') === d.mm.split(';')[0].toLowerCase().replace(/\s/g, '') ? 0.9:norm;  
//    })
    
    d3.selectAll("#fig3_path").style("opacity", function(d){
        return d.name.toLowerCase() == make.replace(/\s/g, '') ? 1:unhov;
    })
    
    d3.selectAll("#fig2_bars").style("opacity", function(d){
        return make.replace(/\s/g, '') == d.model.toLowerCase() ? 1:unhov; })
    
    d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase() === model && d.makeName.toLowerCase() === make ? 10 : (dict[d.makeName]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase() === model && d.makeName.toLowerCase() ===make ? 10 : (dict[d.makeName]==undefined ? 1.5:4)
     
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase()  === model  && d.makeName.toLowerCase()  === make  ? 10 : (dict[d.makeName]==undefined ? 2:3)
     
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return d.modelName.toLowerCase() === model && d.makeName.toLowerCase()=== make ? 10 : (dict[d.makeName]==undefined ? 2:3)
     
     })
}

function unhighlight_figure(model, make)
{
    var t_fig1 = d3.select("#tooltip_fig1")
        .style("visibility", "hidden");
    d3.selectAll("#fig1_circle")
        .attr("r", 5)
        .style("stroke", undefined)
        .style("stroke-width", undefined)
    
    d3.selectAll("#fig3_path").style("opacity", 0.7)
    d3.selectAll("#fig2_bars").style("opacity", 0.7)
    
     d3.select("svg#svg_fig4E").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4B").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? (1.5):4)
     })
     
     d3.select("svg#svg_fig4Q").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
     
     d3.select("svg#svg_fig4F").selectAll('circle').attr('r', function(d){
         return (dict[d.makeName.replace(/\s/g, '')]==undefined ? 2:3)
     })
}