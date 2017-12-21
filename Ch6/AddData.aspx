<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="gb2312" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>
<%
    string strName = System.Web.HttpUtility.UrlDecode(Request["name"]); //解码点评用户名称
    string strContent = System.Web.HttpUtility.UrlDecode(Request["content"]); //解码点评提交内容
    string strFileName = "CommentData.xml";
    //定义xml文档变量
    XmlDocument xmlDoc = new XmlDocument();
    //打开指定的xml文档
    xmlDoc.Load(Server.MapPath(strFileName));
    //查找根节点元素
    XmlNode xmlN = xmlDoc.SelectSingleNode("Comment");
    //加入一个节点元素 
    XmlElement xmlE = xmlDoc.CreateElement("Data");
    
    //创建一个子节点
    XmlElement xmlEn = xmlDoc.CreateElement("name");
    //设置节点文本
    xmlEn.InnerText = strName;
    //添加到节点中
    xmlE.AppendChild(xmlEn);
    //创建一个子节点
    XmlElement xmlEc = xmlDoc.CreateElement("content");
    //设置节点文本
    xmlEc.InnerText = strContent;
    //添加到节点中
    xmlE.AppendChild(xmlEc);
    //创建一个子节点
    XmlElement xmlEd = xmlDoc.CreateElement("date");
    //获取时间的时分秒
    string strSendTime = DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
    xmlEd.InnerText =strSendTime;
    //添加到节点中
    xmlE.AppendChild(xmlEd);
    
    //将节点加入根节点中   
    xmlN.AppendChild(xmlE);
    //保存创建好的xml文档 
    xmlDoc.Save(Server.MapPath(strFileName));
    Response.Write("您的点评已成功发表！");
%>