;
(function($) {
    $.extend($.expr[":"], {
        between: function(e, i, bt) {
            var arrSingle = bt[3].split("-");
            return arrSingle[0] <= i && i <= arrSingle[1];
        }
    })
})(jQuery);