


function generateColorBar(dir, id) {

    var fileextension = ".jpg";

    $.ajax({
        url: dir,
        success: function (data) {

            $("#" + id).append("<h3>October 12, 2012</h3><p>64.1750&deg N, 51.7389&deg W<br>Nuuk, Greenland</p>");


            //List all png file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                
                var filename = this.href.replace(window.location, "").replace("http:///", "");
                var counter = filename.substring(5,6);

                // load image
                var img = document.createElement("img");
                img.setAttribute('src', dir + filename);


                // after image is loaded...
                img.addEventListener('load', function() {

                    // add image to barcode section
                    $("#" + id).append("<div class='imageWrapper' id='moment" + id + counter + "'><img class='barImage' id='image" + counter + "'" +"src=" + dir + filename + "></img><div class='box' id='box" + id + counter + "'></div>");



                    // get color data
                    var vibrant = new Vibrant(img, 60, 5);
                    var swatches = vibrant.swatches();
                    var dominantColor = swatches.Vibrant.getHex();

                    // add color to div
                    $("#box" + id + counter).css("background-color", dominantColor);

                })
            });
        }
    });
}







