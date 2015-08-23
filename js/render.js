// set up graph area
var margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = $(window).width() - margin.left - margin.right,
        yearHeight = 300 - margin.top - margin.bottom,
        clockHeight = $(window).height() - margin.top - margin.bottom,
        padding = 5
        outerRadius = clockHeight / 2 - margin.top - margin.bottom;
        innerRadius = 40;

var format = d3.time.format("%Y:%m:%d"),
mindate = format.parse("2013:01:01"),
maxdate = format.parse("2013:12:31");

var timeFormat = d3.time.format("%H:%M:%S"),
mintime = timeFormat.parse("00:00:01"),
maxtime = timeFormat.parse("23:59:59");

//Create scale functions
/*var xScale = d3.time.scale()
.domain([mindate, maxdate])
.range([0, width]);

var yScale = d3.time.scale()
.domain([mintime, maxtime])
.range([0, yearHeight]);*/


// SETTINGS FOR RADIAL PLOT
var pi = Math.PI;
var scaleHours = d3.time.scale()
				.domain([mintime, maxtime])
				.range([0, 2 * pi]);

//var scaleColors = d3.scale.linear()
//				.domain([mincolor, maxcolor])
//				.range([0, 2 * pi]);





var dateFn = function(d) {return format.parse(d.dateTaken)};
var timeFn = function(d) {return timeFormat.parse(d.timeTaken)};
var colorFn = function(d) {return d.domColor};


var yearSvg = d3.select("#plot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", yearHeight + margin.top + margin.bottom);

var clockSvg = d3.select("#clock")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", clockHeight + margin.top + margin.bottom);







//var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(12);
//var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(12);




function makeGraph() {

    alert("wahoo!");
    

    var clockGroup = clockSvg.append("g")
        .attr("transform", "translate(" + width/2 + "," + clockHeight/2 + ")");

    clockGroup.append("circle")
        .attr("r", outerRadius)
        .attr("class", "circle")
        .attr("fill", "none")
        .attr("stroke","none");


    var timePoints = clockGroup.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("class","clockPoint")
        //.attr("r", 4)
        .attr("width","7px")
        .attr("height","7px")
        .attr("x", function (d,i) {
            //var alpha = (2 * Math.PI / dataSet.length) * i ;
            //return (scaleHours(timeFn(d)) * Math.cos(alpha - Math.PI / 2) )
            //radius scale * Math.cos(angle)
            return (outerRadius-25)*Math.cos(scaleHours(timeFn(d)));
        })
        .attr("y", function (d,i) {
            //var alpha = (2 * Math.PI / dataSet.length) * i ;
            //return (scaleHours(timeFn(d)) * Math.sin(alpha - Math.PI / 2) )
            // radial scale * Math.cos(angular scale)
            return (outerRadius-25)*Math.sin(scaleHours(timeFn(d)));
        })
        .style("fill", function(d) {
            return colorFn(d);
        });




    // Time Ticks

    // incorrect ticks but it'll do for now
    clockGroup.selectAll("rect.tick")
        .data(d3.range(24))
        .enter()
        .append("rect")
        .attr("class", "tick")
        .attr("x", -2)
        .attr("y", -outerRadius)
        .attr("width", 1)
        .attr("height", 5)
        .attr("transform", function(d, i){return "rotate("+(i*15)+")";})
        .attr("fill", "black");

    clockGroup.selectAll("text.label")
        .data(d3.range(24))
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d, i){return (outerRadius+10)*Math.cos(i*0.26-1.57)})
        .attr("y", function(d, i){return (outerRadius+10)*Math.sin(i*0.26-1.57)})
        .attr("fill", "blacke")
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "middle")
        .text(function(d, i){return d});



    d3.selectAll(".clockPoint").on("click", function(d) {

        var currentObject = d.imgID;

        // fade out any loaded image
        $('img').fadeOut('1000');
        //$('.imgWrapper').fadeOut('600');

        // turn all non-clicked points white
        d3.selectAll('.clockPoint').filter(function(d) {
            return d.imgID != currentObject;
        })
        .transition()
        .duration(100)
        .style('opacity','0.5')
        .style("fill", "white");
        

        // toggle between color and white when hover
        d3.selectAll('.clockPoint').filter(function(d) {
            return d.imgID != currentObject;
        })
        .on("mouseover" , function(d) {
            d3.select(this)
            .transition()
            .duration(100)
            .style('opacity','1')
            .style("fill", function(d) {
                return colorFn(d);
            });
        })
        .on("mouseout", function(d) {
            d3.select(this)
            .transition()
            .duration(100)
            .style('opacity','0.5')
            .style("fill", "white");
        });





        // show color of clicked point
        d3.selectAll('.clockPoint').filter(function(d) {
            return d.imgID == currentObject;
        })
        .transition()
        .duration(100)
        .style('opacity','1')
        .style("fill", function(d) {
            return colorFn(d);
        });


        // fade in colored div
        $('.imgWrapper').css({"background-color": d.domColor, "height":$(window).height()});
        $('.imgWrapper').fadeTo('500','.3')
                        .delay('200')
                        .fadeTo('500','.0');

        

        // fade in associated image
        $('#' + d.imgID).fadeIn('1000');
    })



}//end of makeGraph()








/*function makeGraph() {

    var points = yearSvg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return xScale(dateFn(d));
        })
        .attr("y", function(d) {
            return yScale(timeFn(d));
        })
        .attr("class", "point")
        .attr("width","7px")
        .attr("height","7px")
        .style("fill", function(d) {
            return colorFn(d);
        });


    d3.selectAll("rect").on("click", function(d) {

        var currentObject = d.imgID;

        // fade out any loaded image
        $('img').fadeOut('1000');
        //$('.imgWrapper').fadeOut('600');

        // turn all non-clicked points white
        d3.selectAll('rect').filter(function(d) {
            return d.imgID != currentObject;
        })
        .transition()
        .duration(100)
        .style('opacity','0.5')
        .style("fill", "white");
        

        // toggle between color and white when hover
        d3.selectAll('rect').filter(function(d) {
            return d.imgID != currentObject;
        })
        .on("mouseover" , function(d) {
            d3.select(this)
            .transition()
            .duration(100)
            .style('opacity','1')
            .style("fill", function(d) {
                return colorFn(d);
            });
        })
        .on("mouseout", function(d) {
            d3.select(this)
            .transition()
            .duration(100)
            .style('opacity','0.5')
            .style("fill", "white");
        });





        // show color of clicked point
        d3.selectAll('rect').filter(function(d) {
            return d.imgID == currentObject;
        })
        .transition()
        .duration(100)
        .style('opacity','1')
        .style("fill", function(d) {
            return colorFn(d);
        });


        // fade in colored div
        $('.imgWrapper').css({"background-color": d.domColor, "height":$(window).height()});
        $('.imgWrapper').fadeTo('500','.3')
                        .delay('200')
                        .fadeTo('500','.0');

        

        // fade in associated image
        $('#' + d.imgID).fadeIn('1000');
    })


} // end of graph function


*/
