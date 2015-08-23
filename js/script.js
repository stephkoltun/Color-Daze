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

                    console.log(this.id);

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



