





var dir = "images/20131207/";
var fileextension = ".jpg";

$.ajax({
    url: dir,
    success: function (data) {

        //List all png file names in the page
        $(data).find("a:contains(" + fileextension + ")").each(function () {
        	
            var filename = this.href.replace(window.location, "").replace("http:///", "");
            $("body").append($("<img id='" + filename.substring(5,6) + "'" +"src=" + dir + filename + "></img>"));
        });
    }
});





$( document ).ajaxComplete(function() {
	console.log("ajax complete!");


    for (i = 0; i < document.images.length; i++) {
    		//var idSelector = idList[i];
    		//console.log(idSelector);
    		var imageSelector = document.images[i].id;

    		var image = document.getElementById(imageSelector);
    		console.log(image);

    		var vibrant = new Vibrant(image);
    		var swatches = vibrant.swatches();
    		var dominantColor = swatches.Vibrant.getHex();
    		console.log(dominantColor);

    		$("body").append("<div class='box' id='box" + imageSelector + "'><div>");
    		$("#box" + imageSelector).css("background-color", dominantColor);

    	}
});



