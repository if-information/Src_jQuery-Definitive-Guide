jQuery.fn.rotate = function(angle, whence) {
    var $a = this.get(0);
    if (!whence) {
        $a.angle = (($a.angle == undefined ? 0 : $a.angle) + angle) % 360;
    } else {
        $a.angle = angle;
    }
    if ($a.angle >= 0) {
        var rotation = Math.PI * $a.angle / 180;
    } else {
        var rotation = Math.PI * (360 + $a.angle) / 180;
    }
    var $cos = Math.round(Math.cos(rotation) * 1000) / 1000;
    var $sin = Math.round(Math.sin(rotation) * 1000) / 1000;

    var $cnv = document.createElement('canvas');
    if (!$a.oImage) {
        $cnv.oImage = new Image();
        $cnv.oImage.src = $a.src;
    } else {
        $cnv.oImage = $a.oImage;
    }
    $cnv.width = Math.abs($cos * $cnv.oImage.width) + Math.abs($sin * $cnv.oImage.height);
    $cnv.height = Math.abs($cos * $cnv.oImage.height) + Math.abs($sin * $cnv.oImage.width);

    var $cxt = $cnv.getContext('2d');
    $cxt.save();
    if (rotation <= Math.PI / 2) {
        $cxt.translate($sin * $cnv.oImage.height, 0);
    } else if (rotation <= Math.PI) {
        $cxt.translate($cnv.width, -$cos * $cnv.oImage.height);
    } else if (rotation <= 1.5 * Math.PI) {
        $cxt.translate(-$cos * $cnv.oImage.width, $cnv.height);
    } else {
        $cxt.translate(0, -$sin * $cnv.oImage.width);
    }
    $cxt.rotate(rotation);
    $cxt.drawImage($cnv.oImage, 0, 0, $cnv.oImage.width, $cnv.oImage.height);
    $cxt.restore();

    $cnv.id = $a.id;
    $cnv.angle = $a.angle;
    $a.parentNode.replaceChild($cnv, $a);
}