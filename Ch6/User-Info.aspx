<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="gb2312" %>
<% 
    string strName = System.Web.HttpUtility.UrlDecode(Request["txtName"]); //解码姓名字符
    string strSex = System.Web.HttpUtility.UrlDecode(Request["selSex"]); //解码性别字符
    string strEmail = Request["chkEmail"]; //是否显示邮件字符
    string strHTML = "<div class='clsShow'>"; //初始化保存内容变量
    if (strName == "陶国荣" && strSex=="男")
    {
        strHTML += "姓名：陶国荣<br>";
        strHTML += "性别：男<br>";
        if (strEmail=="1")
        {
            strHTML += "邮箱：tao_guo_rong@163.com";
        }
        strHTML += "<hr>";
    }
    else if (strName == "李建洲" && strSex == "女")
    {
        strHTML += "姓名：李建洲<br>";
        strHTML += "性别：女<br>";
        if (strEmail == "1")
        {
            strHTML += "邮箱：xiaoli@163.com<hr>";
        }
        strHTML += "<hr>";
    }
    strHTML += "</div>";
    Response.Write(strHTML);
%>