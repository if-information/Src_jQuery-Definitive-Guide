jQuery.fn.rotate = function(angle, whence) {
    var p = this.get(0);
    //alert(p.id);
    // we store the angle inside the image tag for persistence  
    if (!whence) {
        p.angle = ((p.angle == undefined ? 0 : p.angle) + angle) % 360;
    } else {
        p.angle = angle;
    }

    if (p.angle >= 0) {
        var rotation = Math.PI * p.angle / 180;
    } else {
        var rotation = Math.PI * (360 + p.angle) / 180;
    }
    var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;
    var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;
    //alert(costheta+","+sintheta);  

    if (document.all && !window.opera) {
        var canvas = document.createElement('img');

        canvas.src = p.src;
        canvas.height = p.height;
        canvas.width = p.width;
    } else {
        var canvas = document.createElement('canvas');
        if (!p.oImage) {
            canvas.oImage = new Image();
            canvas.oImage.src = p.src;
        } else {
            canvas.oImage = p.oImage;
        }
        canvas.width = Math.abs(costheta * canvas.oImage.width) + Math.abs(sintheta * canvas.oImage.height);
        canvas.height = Math.abs(costheta * canvas.oImage.height) + Math.abs(sintheta * canvas.oImage.width);

        var context = canvas.getContext('2d');
        context.save();
        if (rotation <= Math.PI / 2) {
            context.translate(sintheta * canvas.oImage.height, 0);
        } else if (rotation <= Math.PI) {
            context.translate(canvas.width, -costheta * canvas.oImage.height);
        } else if (rotation <= 1.5 * Math.PI) {
            context.translate(-costheta * canvas.oImage.width, canvas.height);
        } else {
            context.translate(0, -sintheta * canvas.oImage.width);
        }
        context.rotate(rotation);
        context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
        context.restore();
    }
    canvas.id = p.id;
    canvas.angle = p.angle;
    p.parentNode.replaceChild(canvas, p);
}
var intt;
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