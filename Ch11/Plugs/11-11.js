(function($) {
    $.fn.scrolltotop = function(options) {
        var settings = {
            startline: 1,
            scrollto: 0,
            scrollduration: 1000,
            fadeduration: [600, 200],
            isvisible: false,
            shouldvisible: false,
            controlHTML: '<div><img src="Images/totop.png" alt=""/></div>',
            controlPos: [5, 5],
            controlTitle: '点击向上滑'
        };
        var $settings = $.extend({}, settings, options || {});
        var $control = $($settings.controlHTML);
        var $body = $('html,body');
        var scroll = {
            scrollup: function() {
                var dest = isNaN($settings.scrollto) ? $settings.scrollto : parseInt($settings.scrollto)
                $body.animate({ scrollTop: dest }, $settings.scrollduration);
            },
            togglecontrol: function() {
                var scrolltop = jQuery(window).scrollTop()
                $settings.shouldvisible = (scrolltop >= $settings.startline) ? true : false
                if ($settings.shouldvisible && !$settings.isvisible) {
                    $control.stop().animate({ opacity: 1 }, $settings.fadeduration[0])
                    $settings.isvisible = true
                }
                else if ($settings.shouldvisible == false && $settings.isvisible) {
                    $control.stop().animate({ opacity: 0 }, $settings.fadeduration[1])
                    $settings.isvisible = false
                }
            },
            scrollinit: function() {
                $control.css({ position: 'fixed', bottom: $settings.controlPos[0], right: $settings.controlPos[1], opacity: 0, cursor: 'pointer' })
				.attr({ title: $settings.controlTitle })
				.click(function() { scroll.scrollup(); return false })
				.appendTo('body')
            }
        };
        $(window).bind("load", function() {
            scroll.scrollinit();
        });
        $(window).bind('scroll resize', function(e) {
            scroll.togglecontrol();
        })
    }
})(jQuery);