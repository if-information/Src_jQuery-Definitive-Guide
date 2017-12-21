<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="gb2312" %>
<% 
    string strName = Request["username"]; //姓名字符
    string strPass = Request["userpass"]; //密码字符
    string strRetValue = "用户名：" + strName + "<br>密码：" + strPass;
    Response.Write(strRetValue);
%>