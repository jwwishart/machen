;(function($){

	var methods = {
		init: function(options) {
			$.extend($.fn.machen.defaults
				, options);
			
			// Only use the first item.
			init(this.get(0));
		
			return this;
		}
		,
		next: function() { 
			var current = getAllSlides(this).filter(":visible");
			var next = current.next(getSlideClassSelector());
			
			var handler = $.fn.machen.defaults.slideChange;
			if ( handler ) {
				var currentSlideNo = getCurrentSlideNo(this);
				var nextSlideNo = next.length == 0 ? currentSlideNo : currentSlideNo+1;
				if (false == handler.call(this, currentSlideNo, nextSlideNo)) {
					return;
				}
			}

			if (0 == next.length) 
				return;			
			
			current.hide();
			next.show();
		}
		,
		prev: function() {
			var current = getAllSlides(this).filter(":visible");
			var prev = current.prev(getSlideClassSelector());
			
			var handler = $.fn.machen.defaults.slideChange;
			if ( handler ) {
				var currentSlideNo = getCurrentSlideNo(this);
				var nextSlideNo = prev.length == 0 ? currentSlideNo : currentSlideNo-1;
				if (false == handler.call(this, currentSlideNo, nextSlideNo)) {
					return;
				}
			}
			
			if (0 == prev.length) 
				return;
			
			current.hide();
			prev.show();
		}
		,
		getSlide: function(slideNo) {
			return $(getAllSlides(this).get(slideNo));
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
		slideClass: 'slide',
		slideOrdinalAttr: 'data-panelID',
		subSlideOrdinalAttr: 'data-subPanelNo',
		slideChange: undefined
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
	
	function getCurrentSlideNo(element) { 
		var currentNumber = 1;
		
		element.find(getSlideClassSelector()).each(function(i, el) {
			var found = $(el).is(":visible");
			
			if (found)
				currentNumber = i++;
		});
		
		return currentNumber;
	}
	
	function getAllSlides(element) {
		return element.find(getSlideClassSelector());
	}
	
	function getSlideClassSelector() {
		return '.' + $.fn.machen.defaults.slideClass
	}
	
})(jQuery);


