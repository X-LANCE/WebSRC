$(function(){
	var images = [];
	var rectsList = [];
	var urls = ["https://websrc-pre.s3.amazonaws.com/s3/10/processed_data/1000076", "https://websrc-pre.s3.amazonaws.com/s3/03/processed_data/0300584", "https://websrc-pre.s3.amazonaws.com/s3/07/processed_data/0700001"];
	for (var i = 0; i < urls.length; i++)
	{
		images.push(new Image());
		images[i].src = urls[i] + ".png";
		$.ajax({
			type: "get",
			async: false,
			url: "json/" + urls[i].slice(-7) + ".json",
			success: function(response){
				rectsList.push(response);
			}
		});
	}
	var canvases = $(".dashboard-canvas");
	canvases.each(function(index){
		var canvas = $(this); var canvasWidth = canvas.parent().width();
		var context = canvas.get(0).getContext('2d');
		var currentImage = images[index];
		console.log(images[index].src);
		$(currentImage).load(function(){
			var ratio = currentImage.height / currentImage.width;
			canvas.attr("width", canvasWidth.toString());
			canvas.attr("height", (canvasWidth * ratio).toString());
			//context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasWidth * ratio);
			context.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height, 0, 0, canvas.width(), canvas.height());
		});
	});
	var dashboardItems = $("span.span-text");
	dashboardItems.each(function(){
		var $dashboardItem = $(this);
		var hoverCounter = 0;
		var closestCanvas = $(this).closest(".col-md-6").prev().find("canvas");
		var index = $(".dashboard-canvas").index(closestCanvas);
		var closestContext = closestCanvas.get(0).getContext('2d');
		$dashboardItem.hover(function(e)
		{
			if(hoverCounter > 0) return false;
			hoverCounter = 1;
			var tid = parseInt($dashboardItem.next().text().replace(" ", ""));
			var rects = rectsList[index];
			var rect = rects[tid].rect;
			var rectBase = rects[2].rect;
			var R = images[index].width / closestCanvas.width();
			closestContext.strokeStyle = "#FF0000";
			closestContext.strokeRect((rect.x - rectBase.x) / R, (rect.y - rectBase.y) / R, rect.width / R, rect.height/ R);
			$(this).addClass("active");
		}, function()
		{
			hoverCounter = 0;
			closestContext.drawImage(images[index], 0, 0, images[index].width, images[index].height, 0, 0, closestCanvas.width(), closestCanvas.height());
			$(this).removeClass("active");
		});
	});
});