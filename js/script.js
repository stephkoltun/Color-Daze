var img = document.createElement('img');
img.setAttribute('src', 'images/dogs.jpg')

console.log(img);


var imgTest = document.getElementById("test");
console.log(imgTest);

/*
$("#test").load(function() {
    //var vibrant = new Vibrant(imgTest);
    //var swatches = vibrant.swatches();
    //console.log(swatches);
    for (swatch in swatches)
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
            //console.log(swatch, swatches[swatch].getHex());
        	console.log(swatch);
        $("body").append("<div class='box'><div>");
        $(".box").css("background-color", "black");
    //console.log(swatches.Vibrant.getHex());
    var useColor = swatches.Vibrant.getHex();
    console.log(useColor);
    $("#testzone").append("<div class='box'><div>");
        $(".box").css("background-color", useColor);
});*/







var dir = "images/20131207/";
var fileextension = ".jpg";
$.ajax({
    url: dir,
    success: function (data) {

        //List all png file names in the page
        $(data).find("a:contains(" + fileextension + ")").each(function () {
        	
            var filename = this.href.replace(window.location, "").replace("http:///", "");
            $("body").append($("<img id='" + filename + "'" +"src=" + dir + filename + "></img>"));

            var imgSelector = document.getElementById(filename);


            var vibrant = new Vibrant(imgSelector);
            var swatches = vibrant.swatches();
            var dominantColor = swatches.Vibrant.getHex();
        	var boxID = filename + "ID";

            var box = $("#testzone").append("<div class='box' id='" + boxID + "'><div>");
        	box.css("background-color", dominantColor);

        });
    }
});