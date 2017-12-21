/// <reference path="jquery-1.8.2.js"/>
$(function() {
    //元素绑定全局ajaxStart事件
    $("#divMsg").ajaxStart(function() {
        $(this).show(); //显示元素
    })
    //元素绑定全局ajaxStop事件
    $("#divMsg").ajaxStop(function() {
        $(this).html("数据处理已完成。").hide();
    })
    //初始化点评数据
    LoadData();
    $("#Button1").click(function() { //点击"发表"按钮事件
        //获取加码后的用户名
        var strName = encodeURI($("#txtName").val());
        //获取加码后的发表内容
        var strContent = encodeURI($("#txtContent").val());
        $.ajax(
           {
               type: "GET",
               url: "AddData.aspx", //请求增加数据动态页
               dataType: "html",
               data: { name: strName, content: strContent },
               success: function(msg) {
                   alert(msg);
                   LoadData();
                   $("#txtName").val("");
                   $("#txtContent").val("");
               }
           })
    })
    /*
    *动态加载XML格式的点评数据
    */
    function LoadData() {
        $.ajax(
           {
               type: "GET",
               url: "CommentData.xml", //请求XML格式数据
               dataType: "xml",
               cache: false,
               success: function(data) {
                   $(".divContent").empty(); //先清空标记中的内容
                   var strHTML = ""; //初始化保存内容变量
                   if ($(data).find("Data").length == 0) {//如果没有找到数据
                       strHTML = "<div style='text-align:center'>目前还没有找到点评数据！</div>";
                   }
                   $(data).find("Data").each(function() { //遍历获取的数据
                       var $strUser = $(this);
                       strHTML += "<div class='clsShow'>";
                       strHTML += "<div class='ShowTitle'>荣拓网友&nbsp;&nbsp;<a href=''>" + $strUser.find("name").text() + "</a></div>";
                       strHTML += "<div class='ShowContent'>" + $strUser.find("content").text() + "</div>";
                       strHTML += "<div class='ShowBottom'>发送时间&nbsp;&nbsp;" + $strUser.find("date").text() + "</div>"
                       strHTML += "</div>"
                   })
                   $(".divContent").html(strHTML); //显示处理后的数据
               }
           })
    }
})