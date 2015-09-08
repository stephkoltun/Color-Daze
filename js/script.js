var dataSet = [];


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

                    //console.log(this.id);

                    var imageData = {};
                    var vibrant = new Vibrant(img);
                    var swatches = vibrant.swatches();
                    imageData.domColor = swatches.Vibrant.getHex();
                    imageData.domRGB = swatches.Vibrant.getRgb();

                    imageData.domHue = constructColor(imageData.domRGB);

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

            var done = after(makeInstanceGraph, length);
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



// http://shanfanhuang.com/blog/2014/8/11/sorting-colors
// received rgb value
function constructColor(colorObj){

    var tempColor = {};

    // Get the RGB values to calculate the Hue. 
    var r = colorObj[0]/255;
    var g = colorObj[1]/255;
    var b = colorObj[2]/255;

    
    // Getting the Max and Min values for Chroma. 
    var max = Math.max.apply(Math, [r, g, b]);
    var min = Math.min.apply(Math, [r, g, b]);

    // Variables for HSV value of hex color. 
    var chr = max - min;
    var hue = 0;
    var val = max;
    var sat = 0;

    
    if (val > 0) {
        // Calculate Saturation only if Value isn't 0. 
        sat = chr / val;
        if (sat > 0) {
            if (r == max) {
                hue = 60 * (((g - min) - (b - min)) / chr);
                if (hue < 0) {
                    hue += 360;
                }
            } else if (g == max) {
                hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b == max) {
                hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
        }
    }


    tempColor.chroma = chr;
    tempColor.hue = hue;
    tempColor.sat = sat;
    tempColor.val = val;
    tempColor.luma = .3 * r + .59 * g + .11 * b
    tempColor.red = r*255;
    tempColor.green = g*255;
    tempColor.blue = b*255;

    //going to be sorting by hue...
    return tempColor.hue;
}


