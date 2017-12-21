jQuery.fn.maxLength = function(max,ele) {
    this.each(function() {
        var type = this.tagName.toLowerCase();
        var inputType = this.type ? this.type.toLowerCase() : null;
        if (type == "input" && inputType == "text" || inputType == "password") {
            this.maxLength = max;
        }
        else if (type == "textarea") {
            this.onkeypress = function(e) {
                var ev = e || event;
                var keyCode = ev.keyCode;
                return !(this.value.length >= max && (keyCode == 32 || keyCode == 13) && !ev.ctrlKey && !ev.altKey);
            };
            this.onkeyup = function() {
                if (this.value.length > max) {
                    this.value = this.value.substring(0, max);
                }
                $("#"+ele).html(max - this.value.length);
            };
            this.onchange = this.onkeyup;
        }
    });
};