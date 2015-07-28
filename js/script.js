



function generateColorBar(dir, id, date, loc, city) {
    console.log("function called")

    var fileextension = ".jpg";

    $.ajax({
        url: dir,
        success: function (data) {

            $("#bars").prepend("<section id='" + id + "' class='dayBar'><div class='info'><h3>" + date + "</h3><p>" + loc + "</p><p>" + city + "</p></div></section>");

           //$("#" + id).append("<div class='info'><h3>" + date + "</h3><p>" + loc + "<br>" + city + "</p></div>");


            //List all png file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {


                // for MAMP server
                var filename = this.href.replace(window.location, "").replace("http:///", "");

                // for live site
                //var filename = this.href.replace(window.location.host, "").replace("http:///colordaze/", "");
                
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
                    $("#box" + id + counter).css("background-color", dominantColor);

                })
            });
        }
    });
}













