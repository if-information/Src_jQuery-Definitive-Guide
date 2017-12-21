$(function() {
    $("#indexrotateimg ul li").each(function(i) {
        $(this).bind("click", function() {
            switch (i) {
                case 0:
                    $("#bookimg").rotate(90);
                    break;
                case 1:
                    $("#bookimg").rotate(-90);
                    break;
                case 2:
                    $("#liangle").toggle();
                    break;
            }
        });
    });
    $("#txtangle").bind("change", function() {
        $("#bookimg").rotate($(this).val());
    });
});