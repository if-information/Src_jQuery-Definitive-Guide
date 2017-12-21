$(function() {
    $("#uploadify").uploadify({
        'uploader': 'Images/uploadify.swf',
        'script': 'Deal/UploadFile.ashx',
        'cancelImg': 'Images/cancel.png',
        'folder': 'Uploads/',
        'queueID': 'fileQueue',
        'buttonImg': 'Images/uploadify.jpg',
        'auto': true,
        'multi': true,
        'fileExt': '*.jpg;*.jpeg;*.gif;*.png;*.doc;*.docx;*.xls;*.xlsx;*.pdf;*.txt',
        'onComplete': function(event, queueID, fileObj, response, data) {
            $('ul').append(SetFileContent(fileObj));
            SetUploadFile();
        }
    })
})
function SetFileContent(objFile) { //根据上传对象返回预览的图片
    var sLi = "";
    sLi += "<li>";
    sLi += "<img src='" + objFile.filePath + "' width='100' height='100'>";
    sLi += "<input type='hidden' value='" + objFile.filePath + "'>";
    sLi += "<br />";
    sLi += "<a href='javascript:void(0)'>删除</a>";
    sLi += "</li>";
    return sLi;
}
function SetUploadFile() {
    //设置各表项ID号
    $("ul li").each(function(l_i) {
        $(this).attr("id", "li_" + l_i);
    })

    //设置各链接的rel属性值
    $("ul li a").each(function(a_i) {
        $(this).attr("rel", a_i);
    }).click(function() {//设置各链接的单击事件
        //通过自身的rel值，获取表项的ID号
        var li_id = "#li_" + this.rel;
        //根据ID号，删除某个表项
        $(li_id).remove();
    })
}