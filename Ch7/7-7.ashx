<%@ WebHandler Language="C#" Class="_7_7" %>

using System;
using System.Web;
using System.Xml;
public class _7_7 : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string strId = context.Request.QueryString["Id"].ToString();
        int intStatus = 0;
        XmlDocument xmlDoc = new XmlDocument();
        try
        {
            xmlDoc.Load(context.Server.MapPath("Xml/7-7.xml"));
            XmlNodeList xmlNodeList = xmlDoc.SelectNodes("Info/User[id='" + strId + "']");//查找
            XmlNode xmlNode = xmlNodeList.Item(0);
            xmlNode.ParentNode.RemoveChild(xmlNode);
            xmlDoc.Save(context.Server.MapPath("Xml/7-7.xml"));
            intStatus = 1;
        }
        catch (Exception)
        {
            throw;
        }
        context.Response.Write(intStatus);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}