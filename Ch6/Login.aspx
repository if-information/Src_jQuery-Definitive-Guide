<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="gb2312" %>
<% 
    string strName = System.Web.HttpUtility.UrlDecode(Request["txtName"]); //解码姓名字符
    string strPass = System.Web.HttpUtility.UrlDecode(Request["txtPass"]); //解码密码字符
    bool blnLogin = false;
    if (strName == "admin" && strPass == "123456")
    {
        blnLogin = true;
    }
    Response.Write(blnLogin);
%>