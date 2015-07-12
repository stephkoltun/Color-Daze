




function generateColorBar(dir, id) {

    var fileextension = ".jpg";

    $.ajax({
        url: dir,
        success: function (data) {

            //List all png file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                
                var filename = this.href.replace(window.location, "").replace("http:///", "");
                var counter = filename.substring(5,6);

                // add wrapper and image
                $("#" + id).prepend("<div class='imageWrapper' id='moment" + counter + "'><img class='barImage' id='image" + counter + "'" +"src=" + dir + filename + "></img>");
            });
        }

    }).done(function() {

    console.log("ajax complete! color processing begin!");

            var images = $("#" + id + " img");
            var wrappers = $("#" + id + " div");

            for (i = 0; i < images.length; i++) {

                var currentImageID = images[i].id;
                var currentImage = document.getElementById(currentImageID);

                var currentWrapperID = wrappers[i].id;
                var currentWrapper = document.getElementById(currentWrapperID);

                var vibrant = new Vibrant(currentImage);
                var swatches = vibrant.swatches();
                var dominantColor = swatches.Vibrant.getHex();




                // add div with dominant color
                $(currentWrapper).append("<div class='box' id='box" + (i+1) + "'></div>");

                $("#box" + (i+1)).css("background-color", dominantColor);
            }

});
}




