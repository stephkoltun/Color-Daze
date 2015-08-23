var dataSet = [];



function makeGraph() {

    alert("wahoo!");
    

    var clockGroup = clockSvg.append("g")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    clockGroup.append("circle")
        .attr("r", outerRadius)
        .attr("class", "circle")
        .attr("fill", "lightgrey")
        .attr("stroke","black");

    clockGroup.append("circle")
        .attr("r", innerRadius)
        .attr("fill", "white")
        .attr("stroke","black");


    var timePoints = clockGroup.selectAll("circle")
        .data(dataSet)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", function (d,i) {
            var alpha = (2 * Math.PI / dataSet.length) * i ;
            return(scaleHours(timeFn(d)) * Math.cos(alpha - Math.PI / 2) )
        })
        .attr("cy", function (d,i) {
            var alpha = (2 * Math.PI / dataSet.length) * i ;
            return(scaleHours(timeFn(d)) * Math.sin(alpha - Math.PI / 2) )
        })
        .style("fill", function(d) {
            return colorFn(d);
        });

    clockGroup.selectAll("rect.tick")
        .data(d3.range(24))
        .enter()
        .append("svg:rect")
        .attr("class", "tick")
        .attr("x", -2)
        .attr("y", -outerRadius)
        .attr("width", 1)
        .attr("height", 5)
        .attr("transform", function(d, i){return "rotate("+(i*15)+")";})
        .attr("fill", "black");

}






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





















/* IMAGE PROCESSING */

function loadImages(dir) {

    var fileextension = ".jpg";

    $.ajax({
        url: dir,
        success: function (data) {

            var length = $(data).find("a:contains(" + fileextension + ")").length;

            //List all jpg file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {


                // for MAMP server
                var filename = this.href.replace(window.location, "").replace("http:///", "");

                // for live site - currently works
                //var filename = this.href.replace(window.location.host, "").replace("http:///colordaze", "");

                // for live site - does not work
                //var filename = this.href.replace(window.location.host + "/colordaze", "").replace("http:///","");

                // load image
                var img = document.createElement("img");
                img.setAttribute('src', dir + filename);
                img.setAttribute('id', filename.substring(5,7));

                

                // after image is loaded...
                img.addEventListener('load', function() {


                    // add image to body
                    $('#images').append(img); 

                    var imageData = {};
                    var vibrant = new Vibrant(img);
                    var swatches = vibrant.swatches();
                    imageData.domColor = swatches.Vibrant.getHex();

                    imageData.imgSrc = this.src;
                    imageData.imgID = this.id;

                    EXIF.getData(img, function() {
                        var dateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
                        imageData.dateTaken = dateTimeOriginal.substring(0,10);
                        imageData.timeTaken = dateTimeOriginal.substring(11,19);
                        


                        dataSet.push(imageData);
                        done();
                        
                    });
                })
                });

            var done = after(makeGraph, length);
        } // end of success function
    }); // end of AJAX functions
}



function after(callback, count){
    var counter = 0;
    return function(){
        if(++counter === count) {
            counter = 0;

            console.log("about to make graph");
            callback();
        }
    };
}











