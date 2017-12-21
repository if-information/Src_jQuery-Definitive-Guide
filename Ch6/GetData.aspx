<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="gb2312" %>
<% 
    string strName = Request["txtData"]; //返回传回的参数
    Response.Write(strName); //返回传回的参数
%>