
function setupViewport(fullScreenMode) {
	if (undefined == fullScreenMode)
		fullScreenMode = false;
		
	var header = $("#header");
	var content = $("#content");
	var footer = $("#footer");
	var pageNumber = $("#page_number");
	var navigation = $("#navigation");
	
	if (true == fullScreenMode) {
		header.slideUp();
		footer.slideUp();
		pageNumber.slideUp();
		navigation.slideUp();
	} else {
		header.fadeIn();
		footer.fadeIn();
		pageNumber.fadeIn();
		navigation.fadeIn();
	}
	
	// Calculate the height of the content area
	var totalHeight = $(window).height();
	
	if (false == fullScreenMode) {
		totalHeight -= header.outerHeight(true);
		totalHeight -= footer.outerHeight(true);
	}
	
	totalHeight -= parseInt(content.css("padding-top").replace("px", ""))
					 + parseInt(content.css("padding-bottom").replace("px", ""));
					 
	content.height(totalHeight);

	// Calcultae the width of the content area
	var totalWidth = $(window).width();
	totalWidth -= parseInt(content.css("padding-left").replace("px", ""))
				 + parseInt(content.css("padding-right").replace("px", ""));
	content.width(totalWidth);
}

$(document).ready(function() {
	var header = $("#header");
	var content = $("#content");
	var footer = $("#footer");
	var pageNumber = $("#page_number");
	var navigation = $("#navigation");

	setupViewport();
	
	// Setup event handler to keep our nice viewport stuff going on resize
	$(window).resize(function() {
		setupViewport();
	});
	
	content.machen({
		slideClass:'machen-panel',
		slideChange: function(current, next) {
			var currentPanel = content.machen("getSlide", current);
			var answers = currentPanel.find(".machen-answer");
			
			if (answers.length == 1) {
				if (false == $(answers.get(0)).is(":visible")) {
					$(answers.get(0)).show();
					return false;
				}
			}
			
			pageNumber.html("Page " + parseInt(next + 1));
			
			if (next > current) {
				currentPanel.next().find(".machen-answer").hide();
			}
			
			return true;
		}
	});		
	
	content.click(function() {
		content.machen("next");
	});
	
	navigation.fadeTo("fast", 0.25);
	navigation.hover(function(){
		navigation.fadeTo("slow", 1);
	}, function() { 
		navigation.fadeTo("slow", 0.25);
	});
	
	footer.fadeTo("fast", 0.25);
	footer.hover(function() {
		footer.fadeTo("slow", 1);
	}, function() {
		footer.fadeTo("slow", 0.25);
	});
	
	// NOTE: Have to use keydown event as chrome doesn't capture backspace
	$(window.document).keydown(function(event) {
		//alert(event.which);
		
		// 32 is the space key; 13 is the enter key; 39 is the right arrow key
		if ('32' == event.which || '13' == event.which || '39' == event.which ) {
			event.preventDefault();
			content.machen("next");
		}
		
		// 8 is the backspace key - 37 is left arrow key
		if ('8' == event.which || '37' == event.which) {
			event.preventDefault();
			content.machen("prev");
		}
		
		// Alternate from full screen mode and normal mode
		if ('70' == event.which) {
			setupViewport(header.is(":visible"));
		}
	});
	
	// Setup navigation links
	var navAnchors = navigation.find("a");
	navAnchors.first().click(function(e) {
		e.preventDefault();
		content.machen("prev");
	});
	
	navAnchors.last().click(function(e) {
		e.preventDefault();
		content.machen("next");
	});
	
	setupViewport();
});

