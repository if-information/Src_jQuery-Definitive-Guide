<%@ WebHandler Language="c#" Class="CropImage" Debug="true" %>
using System;
using System.Web;
using System.Drawing;
using System.IO;

public class CropImage : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        //获取与所选择图片区域相关的属性
        string imgPath = Convert.ToString(context.Request["p"]);//图片路径
        float imgPacity = Convert.ToSingle(context.Request["l"]);//透明度
        int top = Convert.ToInt32(context.Request["y"]);//y坐标
        int left = Convert.ToInt32(context.Request["x"]);//x坐标
        int width = Convert.ToInt32(context.Request["w"]);//长度
        int height = Convert.ToInt32(context.Request["h"]);//高度
        context.Response.ContentType = "image/jpeg"; //指定页面输出格式
        imgCrop(HttpContext.Current.Server.MapPath(imgPath), imgPacity, top, left, width, height).WriteTo(context.Response.OutputStream);
    }
    /// <summary>
    /// 根据图片的坐标与长宽切割相应图片
    /// </summary>
    /// <param name="imgPath"></param>
    /// <param name="zoomLevel"></param>
    /// <param name="top"></param>
    /// <param name="left"></param>
    /// <param name="width"></param>
    /// <param name="height"></param>
    /// <returns></returns>
    public MemoryStream imgCrop(string imgPath, float imgPacity, int top, int left, int width, int height)
    {
        Image img = Image.FromFile(imgPath);
        Bitmap bitmap = new Bitmap(width, height);
        Graphics g = Graphics.FromImage(bitmap);
        g.DrawImage(img, new Rectangle(0, 0, width, height), new Rectangle((int)(left / imgPacity), (int)(top / imgPacity), (int)(width / imgPacity), (int)(height / imgPacity)), GraphicsUnit.Pixel);
        MemoryStream ms = new MemoryStream();
        bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        img.Dispose();
        g.Dispose();
        bitmap.Dispose();
        return ms;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}