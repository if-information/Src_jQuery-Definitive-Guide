var intSpeed = 1; //播放速率
var intInterval, intTipInterval;
var $video = document.getElementById("video");
var int_plybckrate = $video.playbackRate; //播放速率
var $canvas = document.getElementById("canvas");
var $ctx = $canvas.getContext('2d');
$(function() {
    $("#indexnav input[type='button']").each(function(i) {
        $(this).bind("click", function() {
            switch (i) {
                case 0:
                    if (!$video.paused) {
                        int_plybckrate -= 0.1
                        if (int_plybckrate < 0)
                            int_plybckrate = 0;
                        intSpeed = Math.round(int_plybckrate * 100) / 100;
                    }
                    $("#tip").html("慢放速率：" + intSpeed * 100 + "%");
                    break;
                case 1:
                    if ($video.paused) {
                        $("#tip").html("正在播放");
                        //播放视频
                        $video.play();
                        $video.playbackRate = intSpeed;
                        $(this).attr("class", "btn-pause");
                    } else {
                        $("#tip").html("已经暂停");
                        //暂停播放
                        $video.pause();
                        $(this).attr("class", "btn-play");
                    }
                    break;
                case 2:
                    if (!$video.paused) {
                        int_plybckrate += 0.1
                        intSpeed = Math.round(int_plybckrate * 100) / 100;
                    }
                    $("#tip").html("快进速率：" + intSpeed * 100 + "%");
                    break;
                case 3:
                    $("#tip").html("点击回放");
                    if (!$video.paused) {
                        intInterval = setInterval(function() {
                            if ($video.currentTime == 0) {
                                clearInterval(intInterval);
                            }
                            else
                                $video.currentTime -= 1;
                        }, 200);
                    }
                    break;
                case 4:
                    $("#tip").html("取消静音");
                    $video.muted = false;
                    $("#btnMin").removeClass("focus");
                    $("#rngVoice").attr("disabled", "");
                    $(this).addClass("focus");
                    break;
                case 5:
                    $("#tip").html("静音生效");
                    $video.muted = true;
                    $("#btnMax").removeClass("focus");
                    $("#rngVoice").attr("disabled", "true");
                    $(this).addClass("focus");
                    break;
                case 6:
                    $("#tip").html("正在截图");
                    if (!$video.paused) {
                        $canvas.width = $video.videoWidth;
                        $canvas.height = $video.videoHeight;
                        $ctx.drawImage($video, 0, 0, $canvas.width, $canvas.height);
                    }
                    break;
            }
        });
    });
    $("#rngVoice").bind("change", function() {
        $video.volume = $(this).val();
        $("#tip").html("音量：" + $(this).val() * 100 + "%");
    });
    $("#video").bind("timeupdate", function() {
        $video.playbackRate = intSpeed
    }).bind("ended", function() {
        $("#tip").html("播放结束");
        $("#btnPlay").attr("class", "btn-play");
        intSpeed = 1;
        int_plybckrate = intSpeed;
        $video.currentTime = 0;
    });
    intTipInterval = setInterval(function() {
        $("#tip").html("");
    }, 5000);
});
