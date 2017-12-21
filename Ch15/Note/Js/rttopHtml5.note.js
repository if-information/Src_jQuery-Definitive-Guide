//新手导航页面创建事件
$("#notenav_index").live("pagecreate", function() {
    if (rttophtml5mobi.utils.getParam('bln_look') != null) {
        $.mobile.changePage("index.htm", "slideup");
    } else {
        var $count = $("#notenav_list a").length;
        $("#notenav_list a:not(:first-child)").hide();
        $("#notenav_icon li:first-child").addClass('on').html("1");
        $("#notenav_list a img").each(function(index) {
            $(this).swipeleft(function() {
                if (index < $count - 1) {
                    var i = index + 1;
                    var s = i + 1;
                    $("#notenav_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
                    $("#notenav_icon li").eq(i).html(s);
                    $("#notenav_icon li").eq(i).toggleClass("on");
                    $("#notenav_icon li").eq(i).siblings().removeAttr("class").html("");
                    if (s == $count) {
                        rttophtml5mobi.utils.setParam('bln_look', 1);
                        $.mobile.changePage("index.htm", "slideup");
                    }
                }
            }).swiperight(function() {
                if (index > 0) {
                    var i = index - 1;
                    var s = i + 1;
                    $("#notenav_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
                    $("#notenav_icon li").eq(i).html(s);
                    $("#notenav_icon li").eq(i).toggleClass("on");
                    $("#notenav_icon li").eq(i).siblings().removeAttr("class").html("");
                }
            })
        })
    }
})
//增加记事页面创建事件
$("#addnote_index").live("pagecreate", function() {
    var $header = $(this).find('div[data-role="header"]');
    var $rdotype = $("input[type='radio']");
    var $hidtype = $("#hidtype");
    var $txttitle = $("#txt-title");
    var $txtacontent = $("#txta-content");
    $rdotype.bind("change", function() {
        $hidtype.val(this.value);
    });
    $header.delegate('a', 'click', function(e) {
        if ($txttitle.val().length > 0 && $txtacontent.val().length > 0) {
            var strnid = "note_" + RetRndNum(3);
            var notedata = new Object;
            notedata.nid = strnid;
            notedata.type = $hidtype.val();
            notedata.title = $txttitle.val();
            notedata.content = $txtacontent.val();
            var jsonotedata = JSON.stringify(notedata);
            rttophtml5mobi.utils.setParam(strnid, jsonotedata);
            window.location.href = "list.htm";
        }
    });
    function RetRndNum(n) {
        var strRnd = "";
        for (var intI = 0; intI < n; intI++) {
            strRnd += Math.floor(Math.random() * 10);
        }
        return strRnd;
    }
})
//首页页面创建事件
$("#index_index").live("pagecreate", function() {
    var $listview = $(this).find('ul[data-role="listview"]');
    var $strKey = "";
    var $m = 0, $n = 0;
    var $strHTML = "";
    for (var intI = 0; intI < localStorage.length; intI++) {
        $strKey = localStorage.key(intI);
        if ($strKey.substring(0, 4) == "note") {
            var getData = JSON.parse(rttophtml5mobi.utils.getParam($strKey));
            if (getData.type == "a") {
                $m++;
            }
            if (getData.type == "b") {
                $n++;
            } 
        }
    }
    var $sum = parseInt($m) + parseInt($n);
    $strHTML += '<li data-role="list-divider">全部记事本内容<span class="ui-li-count">' + $sum + '</span></li>';
    $strHTML += '<li><a href="list.htm" data-ajax="false" data-id="a" data-name="散文">散文<span class="ui-li-count">' + $m + '</span></li>';
    $strHTML += '<li><a href="list.htm" data-ajax="false" data-id="b" data-name="随笔">随笔<span class="ui-li-count">' + $n + '</span></li>';
    $listview.html($strHTML);
    $listview.delegate('li a', 'click', function(e) {
        rttophtml5mobi.utils.setParam('link_type', $(this).data('id'))
        rttophtml5mobi.utils.setParam('type_name', $(this).data('name'))
    })
})
//记事列表页面创建事件
$("#list_index").live("pagecreate", function() {
    var $listview = $(this).find('ul[data-role="listview"]');
    var $strKey = "", $strHTML = "", $intSum = 0;
    var $strType = rttophtml5mobi.utils.getParam('link_type');
    var $strName = rttophtml5mobi.utils.getParam('type_name');
    for (var intI = 0; intI < localStorage.length; intI++) {
        $strKey = localStorage.key(intI);
        if ($strKey.substring(0, 4) == "note") {
            var getData = JSON.parse(rttophtml5mobi.utils.getParam($strKey));
            if (getData.type == $strType) {
                $strHTML += '<li data-icon="false" data-ajax="false"><a href="notedetail.htm" data-id="' + getData.nid + '">' + getData.title + '</a></li>';
                $intSum++;
            } 
        }
    }
    var strTitle = '<li data-role="list-divider">' + $strName + '<span class="ui-li-count">' + $intSum + '</span></li>';
    $listview.html(strTitle + $strHTML);
    $listview.delegate('li a', 'click', function(e) {
        rttophtml5mobi.utils.setParam('list_link_id', $(this).data('id'))
    })
})
//记事详细页面创建事件
$("#notedetail_index").live("pagecreate", function() {
    var $type = $(this).find('div[data-role="header"] h4');
    var $strId = rttophtml5mobi.utils.getParam('list_link_id');
    var $titile = $("#title");
    var $content = $("#content");
    var listData = JSON.parse(rttophtml5mobi.utils.getParam($strId));
    var strType = listData.type == "a" ? "散文" : "随笔";
    $type.html(strType);
    $titile.html(listData.title);
    $content.html(listData.content);
    $(this).delegate('#alink_delete', 'click', function(e) {
        var yn = confirm("您真的要删除吗？");
        if (yn) {
            localStorage.removeItem($strId);
            window.location.href = "list.htm";
        }
    })
})
//修改记事页面创建事件
$("#editnote_index").live("pageshow", function() {
    var $strId = rttophtml5mobi.utils.getParam('list_link_id');
    var $header = $(this).find('div[data-role="header"]');
    var $rdotype = $("input[type='radio']");
    var $hidtype = $("#hidtype");
    var $txttitle = $("#txt-title");
    var $txtacontent = $("#txta-content");
    var editData = JSON.parse(rttophtml5mobi.utils.getParam($strId));
    $hidtype.val(editData.type);
    $txttitle.val(editData.title);
    $txtacontent.val(editData.content);
    if (editData.type == "a") {
        $("#lbl-type-0").removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
    } else {
        $("#lbl-type-1").removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
    }
    $rdotype.bind("change", function() {
        $hidtype.val(this.value);
    });
    $header.delegate('a', 'click', function(e) {
        if ($txttitle.val().length > 0 && $txtacontent.val().length > 0) {
            var strnid = $strId;
            var notedata = new Object;
            notedata.nid = strnid;
            notedata.type = $hidtype.val();
            notedata.title = $txttitle.val();
            notedata.content = $txtacontent.val();
            var jsonotedata = JSON.stringify(notedata);
            rttophtml5mobi.utils.setParam(strnid, jsonotedata);
            window.location.href = "list.htm";
        }
    })
})





