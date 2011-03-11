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
		lastPanelID : 0
		,		
		next : function() {
			var currentNo = this.getCurrentPanelNo();
			this.showPanel( currentNo == this.lastPanelID ? currentNo : currentNo + 1);
		}
		,
		back : function() {
			var currentNo = this.getCurrentPanelNo();
			this.showPanel( currentNo == 0 ? 0 : currentNo - 1);
		}
		,
		getCurrentPanelNo : function() {
			return parseInt($(".machen-panel:visible").attr("data-panelid"));
		}
		,
		showPanel : function(panelNo) {
			$(".machen-panel").hide();
			$(".machen-panel[data-panelid='" + panelNo +"']").show();
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