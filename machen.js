(function(window, $) {
	var machen = {
		setupViewport : function() {	
			var header = $("#header");
			var content = $("#content");
			var footer = $("#footer");
			
			// Calculate the height of the content area
			var totalHeight = $(window).height();
			totalHeight -= header.outerHeight(true);
			totalHeight -= footer.outerHeight(true);
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
			this.showPanel( this.currentPanelID == this.lastPanelID ? this.currentPanelID : this.currentPanelID + 1);
		}
		,
		back : function() {
			this.showPanel( this.currentPanelID == 0 ? 0 : this.currentPanelID - 1);
		}
		,
		showPanel : function(panelNo) {
			$(".machen-panel").hide();
			$(".machen-panel[data-panelid='" + panelNo +"']").show();
			this.currentPanelID = panelNo;
			
			$("#page_number"). html("Page " + parseInt(panelNo + 1));
		}
		,
		getLastPanel : function() {
			return $(".machen-panel").last().attr("data-panelid");
		}
	};
	
	// Ensure we setup the viewport initially.
	$(window.document).ready(function() {
		// Setup nice viewport stuff 
		machen.setupViewport();
		
		// Setup event handler to keep our nice viewport stuff going on resize
		$(window).resize(function() {
			machen.setupViewport();
		});
		
		// BUG: in chrome the calculations work correctly if 1. I call this twise on page load.
		// 2. if I resize the window. Otherwise initially the bottom panel is up about 10px like
		// it's not considering the padding somewhere???
		machen.setupViewport();
		
		// Count the panels
		machen.lastPanelID = machen.getLastPanel();
		
		// Hide all panels and show the first one
		machen.showPanel(0);
		
		// NOTE: Have to use keydown as chrome doesn't capture backspace
		$(window.document).keydown(function(event) {
			//alert(event.which);
			
			// 32 is the space key; 13 is the enter key
			if ('32' == event.which || '13' == event.which) {
				event.preventDefault();
				machen.next();
			}
			
			// 8 is the backspace key
			if ('8' == event.which) {
				event.preventDefault();
				machen.back();
			}
		});
	});
	
	// Make machen available
	window.machen = machen;
})(window, jQuery);