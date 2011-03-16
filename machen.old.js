
(function(window, $) {
	var machen = {
		setupViewport : function(fullScreenMode) {
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
		,
		lastPanelID : 0,
		currentPanelID : 0,	
		next : function() {
			var answerSection = this.getCurrentPanel().find(".machen-answer").filter(":hidden");
			
			// Don't do anything if answer section is showing and we are on the last
			// panel
			if (this.currentPanelID == this.lastPanelID && answerSection.length == 0) {
				return;
			}
			
			// See if there is an answer panel inside the current panel and show it.
			if (answerSection.length == 0)
				this.showPanel( this.currentPanelID == this.lastPanelID ? this.currentPanelID : this.currentPanelID + 1);
			else 
				answerSection.show();				
		}
		,
		back : function() {
			this.showPanel( this.currentPanelID == 0 ? 0 : this.currentPanelID - 1);
		}
		,
		showPanel : function(panelNo) {
			var allPanels = this.getAllPanels()
			allPanels.hide();
			
			$(".machen-panel[data-panelid='" + panelNo +"']").show();
			
			this.currentPanelID = panelNo;
			this.getCurrentPanel().find(".machen-answer").hide();
			
			$("#page_number").html("Page " + parseInt(panelNo + 1));
		}
		,
		getLastPanel : function() {
			return this.getAllPanels().last();
		}
		,
		getPanelByID : function(panelNo) {
			return $(".machen-panel[data-panelid='" + panelNo +"']");
		}
		,
		getCurrentPanel : function() {
			return this.getPanelByID(this.currentPanelID);
		}
		,
		getAllPanels : function() {
			return $(".machen-panel");
		}
		,
		switchModes : function() {
			var heading = $("#header");
			this.setupViewport(heading.is(":visible"));
		}
	};
	
	
	function setupPanels() {
		machen.getAllPanels().each(function(i, el) {
			$(el).attr("data-panelid", i.toString());
		});
	}
	
	// Ensure we setup the viewport initially.
	$(window.document).ready(function() {
		var header = $("#header");
		var content = $("#content");
		var footer = $("#footer");
		var pageNumber = $("#page_number");
		var navigation = $("#navigation");
			
		// Assing ID's
		setupPanels();
	
		// Setup nice viewport stuff 
		machen.setupViewport();
		
		// Setup event handler to keep our nice viewport stuff going on resize
		$(window).resize(function() {
			machen.setupViewport();
		});
		
		// BUG: in chrome the calculations work correctly if 1. I call this twice on page load.
		// thus below.
		// 2. if I resize the window. Otherwise initially the bottom panel is up about 10px like
		// it's not considering the padding somewhere???
		machen.setupViewport();
		
		// Count the panels
		machen.lastPanelID = machen.getLastPanel().attr("data-panelid");
		
		// Hide all panels and show the first one
		machen.getAllPanels().find(".machen-answer").hide();
		machen.showPanel(0);
		
		// NOTE: Have to use keydown event as chrome doesn't capture backspace
		$(window.document).keydown(function(event) {
			//alert(event.which);
			
			// 32 is the space key; 13 is the enter key; 39 is the right arrow key
			if ('32' == event.which || '13' == event.which || '39' == event.which ) {
				event.preventDefault();
				machen.next();
			}
			
			// 8 is the backspace key - 37 is left arrow key
			if ('8' == event.which || '37' == event.which) {
				event.preventDefault();
				machen.back();
			}
			
			// Alternate from full screen mode and normal mode
			if ('70' == event.which) {
				machen.switchModes();
			}
		});
		
		// Handle someone clicking on the content area, which should
		// cause the next panel to be shown.
		// Note: selection must be disabled to prevent massive content
		// selection.
		content.mouseup(function() {
			machen.next();
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
		
		// Setup navigation links
		var navAnchors = navigation.find("a");
		navAnchors.first().click(function(e) {
			e.preventDefault();
			machen.back();
		});
		
		navAnchors.last().click(function(e) {
			e.preventDefault();
			machen.next();
		});
	});
	
	// Make machen available
	window.machen = machen;
})(window, jQuery);