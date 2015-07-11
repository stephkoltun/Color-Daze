var img = document.createElement('img');
img.setAttribute('src', 'images/dogs.jpg')


$("#test").load(function() {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches();
    console.log(swatches);
    /*for (swatch in swatches)
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
            //console.log(swatch, swatches[swatch].getHex());
        	console.log(swatch);
        $("body").append("<div class='box'><div>");
        $(".box").css("background-color", "black");*/
    //console.log(swatches.Vibrant.getHex());
    var useColor = swatches.Vibrant.getHex();
    console.log(useColor);
    $("#testzone").append("<div class='box'><div>");
        $(".box").css("background-color", useColor);
});







var dir = "images/20131207/";
var fileextension = ".jpg";
$.ajax({
    url: dir,
    success: function (data) {
        //List all png file names in the page
        $(data).find("a:contains(" + fileextension + ")").each(function () {
            var filename = this.href.replace(window.location, "").replace("http:///", "");
            //var testImg = document.createElement('img');
            //testImg.setAttribute('src', 'dir + filename');
            var testImage = $("body").append($("<img src=" + dir + filename + "></img>"));
            console.log(testImage);

            //var vibrant = new Vibrant(testImg);
            //var swatches = vibrant.swatches();
            //console.log(swatches);

        });
    }
});