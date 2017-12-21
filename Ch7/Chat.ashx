<%@ WebHandler Language="C#" Class="Chat" %>

using System;
using System.Web;
using System.Xml;
public class Chat : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //定义变量接收页面传回的参数值
        string strContent = context.Request.QueryString["c"].ToString();
        string strFromId = context.Request.QueryString["f"].ToString();
        string strSendId = context.Request.QueryString["s"].ToString();
        //定义并初始化回调变量值
        int intSuccess = 0;
        //格式化当前的时间
        string strDate = DateTime.Now.ToString("HH:mm:ss");
        //定义一个XML文档变量
        XmlDocument xmlDoc = new XmlDocument();
        try
        {
            //打开指定的XML文件
            xmlDoc.Load(context.Server.MapPath("Xml/Chat.xml"));
            //查找到根节点元素
            XmlNode root = xmlDoc.SelectSingleNode("chat");
            //创建一个根节点下的子节点元素
            XmlElement xmlE = xmlDoc.CreateElement("message");
            //设置该元素的两个相关属性
            xmlE.SetAttribute("fId", strFromId);
            xmlE.SetAttribute("sId", strSendId);           
            //创建一个子节点下的元素
            XmlElement xmlEd = xmlDoc.CreateElement("datetime");
            //设置节点文本
            xmlEd.InnerText = strDate;
            //追加至上一级节点中
            xmlE.AppendChild(xmlEd);
            //创建一个子节点下的元素
            XmlElement xmlEc = xmlDoc.CreateElement("content");
            //设置节点文本
            xmlEc.InnerText = strContent;
            //追加至上一级节点中
            xmlE.AppendChild(xmlEc);
            //将整个节点追加至根节点中
            root.AppendChild(xmlE);
            //保存创建好的XML文件
            xmlDoc.Save(context.Server.MapPath("Xml/Chat.xml"));
            //设置操作返回的值
            intSuccess = 1;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        context.Response.Write(intSuccess);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}