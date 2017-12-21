<%@ WebHandler Language="C#" Class="NewsApi" %>
using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
public class NewsApi : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Charset = "utf-8";
        string stract = context.Request.QueryString["act"];
        string strcateid = context.Request.QueryString["cateid"];
        string strnewsid = context.Request.QueryString["newsid"];
        string strsql = "";
        switch (stract)
        {
            case "index":
                strsql = "select news_cateid,news_catename,news_iconurl,news_catedesc from news_cate";
                break;
            case "cate_img":
                strsql = "SELECT dbo.imgnews_data.news_id, dbo.imgnews_data.imgnews_imgurl, dbo.news_cate.news_cateid, dbo.news_cate.news_catename, dbo.news_data.news_title FROM dbo.imgnews_data INNER JOIN dbo.news_data ON dbo.imgnews_data.news_id = dbo.news_data.news_id INNER JOIN dbo.news_cate ON dbo.news_data.news_cateid = dbo.news_cate.news_cateid where dbo.news_data.news_cateid=" + strcateid;
                break;
            case "cate_lst":
                strsql = "SELECT dbo.news_data.news_id, dbo.news_data.news_title, dbo.news_data.news_cateid, dbo.news_cate.news_catename FROM dbo.news_cate INNER JOIN dbo.news_data ON dbo.news_cate.news_cateid = dbo.news_data.news_cateid where dbo.news_cate.news_cateid=" + strcateid;
                break;
            case "detail":
                strsql = "SELECT dbo.news_data.news_title, dbo.news_data.news_content, dbo.news_data.news_source, dbo.news_data.news_adddate, dbo.news_cate.news_catename, dbo.news_data.news_id FROM dbo.news_data INNER JOIN dbo.news_cate ON  dbo.news_data.news_cateid = dbo.news_cate.news_cateid where dbo.news_data.news_id = " + strnewsid;
                break;
        }
        RetJson(strsql, context);
    }
    /// <summary>
    /// 根据SQL语句返回JSON数据
    /// </summary>
    /// <param name="strSQL"></param>
    private void RetJson(string strSQL, HttpContext context)
    {
        SqlConnection conn = new SqlConnection("Server=(local);Uid=sa;Pwd=123456;Database=news_mobile");
        conn.Open();
        string sql = strSQL;
        try
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataAdapter myda = new SqlDataAdapter(cmd);
            DataSet ds = new DataSet();
            myda.Fill(ds);
            context.Response.ContentType = "application/json";
            context.Response.Write(ToJson(ds));
            context.Response.End();
        }
        catch (Exception)
        {

        }
        finally
        {
            conn.Close();
        }
    }
    /// <summary> 
    /// DataSet转换为Json 
    /// </summary> 
    /// <param name="dataSet">DataSet对象</param> 
    /// <returns>Json字符串</returns> 
    public static string ToJson(DataSet dataSet)
    {
        string jsonString = "{";
        foreach (DataTable table in dataSet.Tables)
        {
            jsonString += "\"" + table.TableName + "\":" + ToJson(table) + ",";

        }
        jsonString = jsonString.TrimEnd(',');
        return jsonString + "}";
    }
    /// <summary> 
    /// Datatable转换为Json 
    /// </summary> 
    /// <param name="table">Datatable对象</param> 
    /// <returns>Json字符串</returns> 
    public static string ToJson(DataTable dt)
    {
        StringBuilder jsonString = new StringBuilder();
        jsonString.Append("[");
        DataRowCollection drc = dt.Rows;
        for (int i = 0; i < drc.Count; i++)
        {
            jsonString.Append("{");
            for (int j = 0; j < dt.Columns.Count; j++)
            {
                string strKey = dt.Columns[j].ColumnName;
                string strValue = drc[i][j].ToString();
                Type type = dt.Columns[j].DataType;
                jsonString.Append("\"" + strKey + "\":");
                strValue = StringFormat(strValue, type);
                if (j < dt.Columns.Count - 1)
                {
                    jsonString.Append(strValue + ",");
                }
                else
                {
                    jsonString.Append(strValue);
                }
            }
            jsonString.Append("},");
        }
        jsonString.Remove(jsonString.Length - 1, 1);
        jsonString.Append("]");
        return jsonString.ToString();
    }
    /// <summary>
    /// 格式化字符型、日期型、布尔型
    /// </summary>
    /// <param name="str"></param>
    /// <param name="type"></param>
    /// <returns></returns>
    private static string StringFormat(string str, Type type)
    {
        if (type == typeof(string))
        {
            str = String2Json(str);
            str = "\"" + str + "\"";
        }
        else if (type == typeof(DateTime))
        {
            str = "\"" + str + "\"";
        }
        else if (type == typeof(bool))
        {
            str = str.ToLower();
        }
        return str;
    }
    /// <summary>
    /// 过滤特殊字符
    /// </summary>
    /// <param name="s"></param>
    /// <returns></returns>
    private static string String2Json(String s)
    {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.Length; i++)
        {
            char c = s.ToCharArray()[i];
            switch (c)
            {
                case '\"':
                    sb.Append("\\'"); break;
                case '\\':
                    sb.Append("\\\\"); break;
                case '/':
                    sb.Append("\\/"); break;
                case '\b':
                    sb.Append("\\b"); break;
                case '\f':
                    sb.Append("\\f"); break;
                case '\n':
                    sb.Append("\\n"); break;
                case '\r':
                    sb.Append("\\r"); break;
                case '\t':
                    sb.Append("\\t"); break;
                default:
                    sb.Append(c); break;
            }
        }
        return sb.ToString();
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}