<%@ WebHandler Language="C#" Class="UploadFile" %>
using System;
using System.IO;
using System.Web;

public class UploadFile : IHttpHandler {
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Charset = "utf-8";
        HttpPostedFile file = context.Request.Files["Filedata"];
        //获取传回的保存文件地址
        string uploadPath = HttpContext.Current.Server.MapPath(@context.Request["folder"]) + "\\";
        //如果有文件
        if (file != null)
        {
            if (!Directory.Exists(uploadPath))//目录不存在
            {
                Directory.CreateDirectory(uploadPath);//新创建目录
            }
            file.SaveAs(uploadPath + file.FileName);//逐个保存文件
            //返回一个值，确保上传成功后，在前台的文件队列自动消失
            context.Response.Write("1");
        }
        else
        {
            context.Response.Write("0");
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}