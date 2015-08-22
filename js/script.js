





var dataSet = [];





function makeGraph() {
    alert("all done!");

    svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", function(d) {
        return xScale(dateFn(d));
    })
    .attr("y", function(d) {
        return xScale(timeFn(d));
    })
    .attr("width","10px")
    .attr("height","10px")
    .attr("fill","black")
    .attr("transform", function() {
        return "translate(" + margin.left + "," + margin.top + ")";
    });
}





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

                // for live site
                //var filename = this.href.replace(window.location.host, "").replace("http:///colordaze/", "");

                // load image
                var img = document.createElement("img");
                img.setAttribute('src', dir + filename);
                img.setAttribute('id', filename.substring(5,7));


                // after image is loaded...
                img.addEventListener('load', function() {

                    // add image to body
                    $('#images').append(img); 

                    EXIF.getData(img, function() {
                        var imageData = {};

                        var dateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
                        imageData.dateTaken = dateTimeOriginal.substring(0,10);
                        imageData.timeTaken = dateTimeOriginal.substring(11,19);

                        dataSet.push(imageData);

                        done();
                    });
                })
                });

            var done = after(makeGraph, length);
        }
    });
}



function after(callback, count){
    var counter = 0;
    return function(){
        if(++counter === count) {
            counter = 0;

            callback();
        }
    };
}


/*
                    // get color data
                    var vibrant = new Vibrant(img, 60, 5);
                    var swatches = vibrant.swatches();

                    // use even/odd to pick from swatches
                    if (counter%2 == 0) {
                        
                        var dominantColor = swatches.Vibrant.getHex();
                        //console.log("vibrant: " + dominantColor);

                    } else {
                        
                        var dominantColor = swatches.LightVibrant.getHex();
                        //console.log("light: " + dominantColor);

                    }

                    //var dominantColor = swatches.Vibrant.getHex();


                    // add color to div
                    $("#box" + id + counter).css("background-color", dominantColor);*/












