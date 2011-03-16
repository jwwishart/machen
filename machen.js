;(function($){

	var methods = {
		init: function(options) {
			var settings = $.extend($.fn.machen.defaults
				, options);
		
			return this.each(function(i, el) {
				init(el);
				return this;
			});
		}
		,
		next: function() { 
			var current = getAllSlides().find(":visible");
			var next = current.next(getSlideClassSelector());
			current.hide();
			next.show();
		}
		,
		prev: function() {
			alert("prev");
		}
	};
	
	$.fn.machen = function (method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.machen');
		}
	};
	
 
    $.fn.machen.defaults = {
        transition: 'none',
		slideClass: 'slide',
		slideOrdinalAttr: 'data-panelID',
		subSlideOrdinalAttr: 'data-subPanelNo'
    };
 
    // Initialization
    function init(contentArea) {
		var contents = $(contentArea);
		var slides = contents.find(getSlideClassSelector());
		
		// Add id's
		slides.each(function(i, el) {
			$(el).attr($.fn.machen.defaults.slideOrdinalAttr, 
				i.toString());
		});
		
		// Hide all and show first
		slides.hide();
		slides.first().show();
	}
	
	function getAllSlides() {
		return this.find(getSlideClassSelector());
	}
	
	function getSlideClassSelector() {
		return '.' + $.fn.machen.defaults.slideClass
	}
	
})(jQuery);


