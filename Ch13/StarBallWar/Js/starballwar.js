//全局变量    
var imgAct = new Image(); //圆形球体 
var ctx; //2d画布   
var screenWidth; //画布宽度   
var screenHeight; //画布高度 
var speed = 2; //不变速度常量 
var horizontalSpeed = speed; //水平速度,随着碰撞会发生改变
var verticalSpeed = -speed; //垂直速度,负数向上，随碰撞发生改变
var imgActAngle = 2; //圆形球体旋转的角度

var star0 = new Image(); //第一个小星星
var gameloopId; //记住循环的变量
var checkPrize;

//定义一个公用游戏对象   
function objGame() {
    this.x = 0;
    this.y = 0;
    this.image = null;
}
//定义圆形球体继承游戏对象objGame
function objAct() { };
objAct.prototype = new objGame();
objAct.prototype.angle = 0;
var objAct = new objAct();

//定义小星星数组objStars和对象objStar，继承游戏对象objGame
var arrStar = new Array();
function objStar() { };
objStar.prototype = new objGame(); //继承游戏对象objGame
objStar.prototype.row = 0; //小星星行位置
objStar.prototype.col = 0; //小星星列位置
objStar.prototype.hit = false; //小星星是否被撞到

var ballgame = {
    HasActHitEdge: function() {
        //圆形球体碰到右边边界
        if (objAct.x > screenWidth - objAct.image.width) {
            if (horizontalSpeed > 0)//假如向右移动
                horizontalSpeed = -horizontalSpeed; //改变水平速度方向
        }
        //圆形球体碰到左边边界
        if (objAct.x < -10) {
            if (horizontalSpeed < 0)//假如向左移动
                horizontalSpeed = -horizontalSpeed; //改变水平速度方向
        }
        //圆形球体碰到下面边界
        if (objAct.y == screenHeight - objAct.image.height) {
            verticalSpeed = -speed; //改变垂直速度。也即向上移动
        }
        //圆形球体碰到上边边界
        if (objAct.y < 0) {
            verticalSpeed = -verticalSpeed;
        }
    },
    chkHitEach: function(obj1, obj2, overlap) {
        //overlap是重叠的区域值
        A1 = obj1.x + overlap;
        B1 = obj1.x + obj1.image.width - overlap;
        C1 = obj1.y + overlap;
        D1 = obj1.y + obj1.image.height - overlap;
        A2 = obj2.x + overlap;
        B2 = obj2.x + obj2.image.width - overlap;
        C2 = obj2.y + overlap;
        D2 = obj2.y + obj2.image.height - overlap;
        //假如他们在x-轴重叠
        if (A1 > A2 && A1 < B2 || B1 > A2 && B1 < B2) {
            //判断y-轴重叠
            if (C1 > C2 && C1 < D2 || D1 > C2 && D1 < D2) {
                //碰撞
                return true;
            }
        }
        return false;
    },
    InitStars: function() {
        var count = 0;
        var x = 0;
        for (var y = 0; y < 25; y++) {
            star = new objStar();
            star.image = star0;
            star.row = x;
            star.col = y;
            star.x = 18 * star.col + 10; //x轴位置
            star.y = 18 * star.row + 10; //y轴位置
            //装入小星星数组，用来描绘
            arrStar[count] = star;
            count++;
        }
    },
    DrawStars: function() {
        for (var x = 0; x < arrStar.length; x++) {
            var curStar = arrStar[x];
            //假如没有被撞击，则描绘
            if (!curStar.hit) {
                ctx.drawImage(curStar.image, arrStar[x].x, arrStar[x].y);
            }
        }
        if (ballgame.AllPrizesHit()) {
            clearInterval(gameloopId);
        }
    },
    HasActHitStar: function() {
        //取出所有小星星
        for (var x = 0; x < arrStar.length; x++) {
            var star = arrStar[x];
            //假如没有碰撞过
            if (!star.hit) {
                //判断碰撞
                if (ballgame.chkHitEach(star, objAct, 0)) {
                    star.hit = true;
                    //圆形球体反弹下沉
                    verticalSpeed = speed;
                }
            }
        }
    },
    AllPrizesHit: function() {
        for (var c = 0; c < arrStar.length; c++) {
            checkPrize = arrStar[c];
            if (checkPrize.hit == false)
                return false;
        }
        return true;

    },
    LoadImages: function() {
        imgAct.src = "images/act.png"; //圆形球体 
        star0.src = "images/star.png"; //第一个小星星
        objAct.image = imgAct;
    }
};
//初始化
$(function() {
    ballgame.LoadImages();
    ctx = document.getElementById('cnvMain').getContext('2d'); //获取2d画布      
    screenWidth = parseInt($("#cnvMain").attr("width")); //画布宽度 
    screenHeight = parseInt($("#cnvMain").attr("height"));
    //初始化圆形球体 
    objAct.x = parseInt(screenWidth / 2);
    objAct.y = parseInt(screenHeight / 2);
    //初始化小星星
    ballgame.InitStars();
    gameloopId = setInterval(function() {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        ctx.save();
        //绘制小星星
        ballgame.DrawStars();
        //改变圆形球体X和Y位置
        objAct.x += horizontalSpeed;
        objAct.y += verticalSpeed;
        //改变翻滚角度
        objAct.angle += imgActAngle;
        //以当前圆形球体的中心位置为基准
        ctx.translate(objAct.x + (objAct.image.width / 2), objAct.y + (objAct.image.height / 2));
        //根据当前圆形球体的角度轮换
        ctx.rotate(objAct.angle * Math.PI / 90);
        //描绘圆形球体 
        ctx.drawImage(objAct.image, -(objAct.image.width / 2), -(objAct.image.height / 2));
        ctx.restore();
        //检测是否碰到边界
        ballgame.HasActHitEdge();
        //检测圆形球体碰撞小星星
        ballgame.HasActHitStar();
    }, 10);
});