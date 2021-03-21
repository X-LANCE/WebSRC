$(function(){
	function footerPosition(){
		$("section.footer").removeClass("fixed-bottom");
		var contentHeight = document.body.scrollHeight, winHeight = window.innerHeight;
		if (contentHeight < winHeight)
			$("section.footer").addClass("fixed-bottom");
		else
			$("section.footer").removeClass("fixed-bottom");
	}
	footerPosition();
	$(window).resize(footerPosition);
});