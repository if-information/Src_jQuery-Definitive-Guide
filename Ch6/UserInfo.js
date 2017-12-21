var data = [
  {
      "name": "陶国荣",
      "sex": "男",
      "email": "tao_guo_rong@163.com"
  },
  {
      "name": "李建洲",
      "sex": "女",
      "email": "xiaoli@163.com"
  }
];

var strHTML = ""; //初始化保存内容变量
$.each(data, function() { //遍历获取的数据
    strHTML += "姓名：" + this["name"] + "<br>";
    strHTML += "性别：" + this["sex"] + "<br>";
    strHTML += "邮箱：" + this["email"] + "<hr>";
})
$("#divTip").html(strHTML); //显示处理后的数据