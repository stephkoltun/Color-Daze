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









var pi = Math.PI;
var scaleHours = d3.time.scale()
				.domain([mintime, maxtime])
				.range([0, 2 * pi]);

/*var scaleHours = d3.scale.linear()
				.domain([mintime, maxtime])
				.range([0, 2 * pi]);*/





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
