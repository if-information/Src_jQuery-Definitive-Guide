//封面页面创建事件
function changepage() {
    window.location.href = "index.htm";
}
$('#load_index').live("pagecreate", function() {
    var id = setInterval("changepage()", 3000);
})
//首页面创建事件
$('#index_index').live("pagecreate", function() {
    var $li = "";
    var $strSubStr = "";
    var intSubNum = 0;
    var $webSite = rttophtml5mobi.website;
    var $webUrl = $webSite + '/ch15/News/NewsApi.ashx?act=index';
    var $listview = $(this).find('ul[data-role="listview"]');
    var $tpl_Index_List = function($p_array, $p_items) {
        if (rttophtml5mobi.utils.getParam('user_sub_str') != null) {
            $strSubStr = rttophtml5mobi.utils.getParam('user_sub_str');
            var $arrSubStr = new Array();
            $arrSubStr = $strSubStr.split(",");
            intSubNum = $arrSubStr.length - 1;
            for (var i = 0; i < $arrSubStr.length - 1; i++) {
                $.each($p_items.Table, function(index, item) {
                    if (item.news_cateid == $arrSubStr[i]) {
                        $li = '<li class="lst" data-icon="false"><a href="newscate.htm" data-ajax="false" data-catename="' + item.news_catename + '" data-id="' + item.news_cateid + '" style="margin:0px;padding:0px 0px 0px 55px"><img src="' + item.news_iconurl + '" alt="" /><h3>' + item.news_catename + '</h3></li>';
                        $p_array.push($li);
                    }
                })
            }
        } else {
            $li = '<li style="text-align:center">您还没有订阅任务类型新闻！</li>';
            $p_array.push($li);
        }
    }
    var $lst_Index_List = function() {
        $.getJSON($webUrl, {},
        function(response) {
            var li_array = [];
            $tpl_Index_List(li_array, response);
            var strTitle = '<li data-role="list-divider">我的订阅<span class="ui-li-count">' + intSubNum + '</span></li>';
            $listview.html(strTitle + li_array.join(''));
            $listview.listview('refresh');
            $listview.delegate('li a', 'click', function(e) {
                rttophtml5mobi.utils.setParam('cate_link_id', $(this).data('id'))
                rttophtml5mobi.utils.setParam('cate_link_name', $(this).data('catename'))
            })
        })
    }
    $lst_Index_List();
})
//订阅管理页面创建事件
$('#newsub_index').live("pagecreate", function() {
    var $li = "";
    var $strSubStr = "";
    var $webSite = rttophtml5mobi.website;
    var $webUrl = $webSite + '/ch15/News/NewsApi.ashx?act=index';
    var $listview = $(this).find('ul[data-role="listview"]');
    var $tpl_Sub_List = function($p_array, $p_items) {
        if (rttophtml5mobi.utils.getParam('user_sub_str') != null) {
            $strSubStr = rttophtml5mobi.utils.getParam('user_sub_str');
            $.each($p_items.Table, function(index, item) {
                if ($strSubStr.indexOf(item.news_cateid) == -1) {
                    $li = '<li class="lst" data-icon="false"><a href="newscate.htm" data-ajax="false" data-catename="' + item.news_catename + '" data-id="' + item.news_cateid + '" style="margin:0px;padding:0px 0px 0px 55px"><img src="' + item.news_iconurl + '" alt="" /><h3>' + item.news_catename + '</h3><p>' + item.news_catedesc + '</p></a><a data-id="' + item.news_cateid + '" class="a1" href="javascript:"></a></li>';
                    $p_array.push($li);
                }
            })
        } else {
            $.each($p_items.Table, function(index, item) {
                $li = '<li class="lst" data-icon="false"><a href="newscate.htm" data-ajax="false" data-catename="' + item.news_catename + '" data-id="' + item.news_cateid + '" style="margin:0px;padding:0px 0px 0px 55px"><img src="' + item.news_iconurl + '" alt="" /><h3>' + item.news_catename + '</h3><p>' + item.news_catedesc + '</p></a><a data-id="' + item.news_cateid + '" class="a1" href="javascript:"></a></li>';
                $p_array.push($li);
            })
        }
    }
    var $lst_Sub_List = function() {
        $.getJSON($webUrl, {},
        function(response) {
            var li_array = [];
            $tpl_Sub_List(li_array, response);
            var strTitle = '<li data-role="list-divider">精品推荐</li>';
            $listview.html(strTitle + li_array.join(''));
            $listview.listview('refresh');
            $listview.delegate('li a', 'click', function(e) {
                rttophtml5mobi.utils.setParam('cate_link_id', $(this).data('id'))
                rttophtml5mobi.utils.setParam('cate_link_name', $(this).data('catename'))
            })
            $listview.delegate('li .a1', 'click', function(e) {
                $strSubStr += $(this).data('id') + ",";
                rttophtml5mobi.utils.setParam('user_sub_str', $strSubStr);
                window.location.reload();
            })
        })
    }
    $lst_Sub_List();
})
//类别新闻页面创建事件
$('#newscate_index').live("pagecreate", function() {
    var $li = "";
    var $strId = "";
    var $strName = "";
    var $webUrl1 = "";
    var $webUrl2 = "";
    var $webSite = rttophtml5mobi.website;
    var $catename = $(this).find('[data-role="header"] h4');
    var $listview = $(this).find('ul[data-role="listview"]');
    var $adlist = $("#news_list");
    var $adinfo = $("#news_info");
    var $tpl_Cate_Ad = function($p_array, $p_items) {
        $.each($p_items.Table, function(index, item) {
            $li = '<a href="newsdetail.htm" data-ajax="false" data-catename="' + item.news_catename + '" data-id="' + item.news_id + '"><img src="' + item.imgnews_imgurl + '" alt=""/></a>';
            $adinfo.html(item.news_title);
            $p_array.push($li);
        })
    }
    var $tpl_Cate_List = function($p_array, $p_items) {
        $.each($p_items.Table, function(index, item) {
            $li = '<li class="lst" data-icon="false"><a href="newsdetail.htm" data-ajax="false" data-catename="' + item.news_catename + '" data-id="' + item.news_id + '" style="margin:0px;padding:0px"><h3>' + item.news_title + '</h3></a></li>';
            $p_array.push($li);
        })
    }
    var $lst_Cate_Ad = function() {
        $strId = rttophtml5mobi.utils.getParam('cate_link_id');
        $strName = rttophtml5mobi.utils.getParam('cate_link_name');
        $webUrl1 = $webSite + '/ch15/News/NewsApi.ashx?act=cate_img&cateid=' + $strId;
        $.getJSON($webUrl1, {},
        function(response) {
            $catename.html($strName);
            var li_array = [];
            $tpl_Cate_Ad(li_array, response);
            $adlist.html(li_array.join(''));
            $adlist.delegate('a', 'click', function(e) {
                rttophtml5mobi.utils.setParam('p_link_id', $(this).data('id'));
                rttophtml5mobi.utils.setParam('cate_link_name', $(this).data('catename'));
            })
        })
    }
    var $lst_Cate_List = function() {
        $strId = rttophtml5mobi.utils.getParam('cate_link_id');
        $strName = rttophtml5mobi.utils.getParam('cate_link_name');
        $webUrl2 = $webSite + '/ch15/News/NewsApi.ashx?act=cate_lst&cateid=' + $strId;
        $.getJSON($webUrl2, {},
        function(response) {
            var li_array = [];
            $tpl_Cate_List(li_array, response);
            $listview.html(li_array.join(''));
            $listview.listview('refresh');
            $listview.delegate('li a', 'click', function(e) {
                rttophtml5mobi.utils.setParam('p_link_id', $(this).data('id'))
                rttophtml5mobi.utils.setParam('cate_link_name', $(this).data('catename'))
            })
        })
    }
    $lst_Cate_Ad();
    $lst_Cate_List();
})
//新闻详细页面创建事件
$('#detail_index').live("pagecreate", function() {
    var $strId = "";
    var $strName = "";
    var $webSite = rttophtml5mobi.website;
    var $webUrl = "";
    var $catename = $(this).find('[data-role="header"] h4');
    var $title = $("#news_detail_title");
    var $info = $("#news_detail_info");
    var $content = $("#news_detail_content");
    var $lst_Detail_List = function() {
        $strId = rttophtml5mobi.utils.getParam('p_link_id');
        $strName = rttophtml5mobi.utils.getParam('cate_link_name');
        $webUrl = $webSite + '/ch15/News/NewsApi.ashx?act=detail&newsid=' + $strId;
        $.getJSON($webUrl, {},
        function(response) {
            $catename.html($strName);
            $.each(response.Table, function(index, item) {
                $title.html(item.news_title);
                var strHTML = item.news_adddate + "&nbsp;&nbsp;来源：" + item.news_source;
                $info.html(strHTML);
                $content.html("&nbsp;&nbsp;&nbsp;&nbsp;" + item.news_content);
            });
        })
    }
    $lst_Detail_List();
})

