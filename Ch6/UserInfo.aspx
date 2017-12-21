<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="gb2312" %>
<% 
    string strName = System.Web.HttpUtility.UrlDecode(Request["name"]);//解码姓名字符
    string strHTML = "<div class='clsShow'>"; //初始化保存内容变量
    if (strName == "陶国荣")
    {
        strHTML += "姓名：陶国荣<br>";
        strHTML += "性别：男<br>";
        strHTML += "邮箱：tao_guo_rong@163.com<hr>";
    }
    else if (strName == "李建洲")
    {
        strHTML += "姓名：李建洲<br>";
        strHTML += "性别：女<br>";
        strHTML += "邮箱：xiaoli@163.com<hr>";
    }
    strHTML += "</div>";
    Response.Write(strHTML);
%>
