jQuery.fn.beforeload= function(options) {
    options = $.extend({
        src: ""
    }, options);
    var self = this;
    self.hide();
    var img = new Image();
    $(img).load(function() {
        self.attr("src", options.src);
        self.fadeIn("slow");
    }).attr("src", options.src);
    return self;
}