$(function(){
	width = $("#header").width();
	height = $("#header").height();
  tmp = $("#header div").css("background-color").replace("rgb(","").replace(")","").split(",");
  hd_col = "#"+parseInt(tmp[0]).toString(16)+parseInt(tmp[1]).toString(16)+parseInt(tmp[2]).toString(16);

  $('#b_header').attr('width', width);
  $('#b_header').attr('height', height);
  WebFont.load({
    custom:{
      families:["chogokubosogothic","Majoram"],
      urls:["css/font.css"]
    },
    loading:function(){
      log("header: fontload");
    },

    active:function(){
      blurdraw();
      log("header: fontactived");
    },

    inactive:function(){
      blurdraw();
      log("header: fontnotactived");
    }

  });
});

function blurdraw() {
  var stage = new createjs.Stage("b_header");
  stage.enableMouseOver();

  createjs.Ticker.setFPS(60);  
  createjs.Ticker.addEventListener("tick", function(e){
    stage.update();
  });

  var icon = new createjs.Shape(); // 左アイコンのアニメーション追加。 
  icon.graphics.beginFill(hd_col);
  icon.graphics.drawCircle(0, 0, 100); 
  icon.graphics.endFill();
  icon.x = 0;
  icon.y = 0;
  icon.scaleX = width/100;
  icon.scaleY = width/100;
  stage.addChild(icon); //ステージに追加
  createjs.Tween.get(icon)
    .to({scaleX:1, scaleY:1}, 2000, createjs.Ease.quintInOut);

  var menu = new Array("Forums", "RequiestCreators", "UserSearch", "Couses", "Distridution");

  for (var i = menu.length - 1; i >= 0; i--) { //メニューバー
    tmp = new createjs.Text(menu[i], "20px chogokubosogothic", "#52656B");
    tmp.textAlign = "center";
    tmp.textBaseline = "middle";
    tmp.x = 200*(i+1);
    tmp.y = 50;
    stage.addChild(tmp);
  };
ws
  icon.addEventListener("mouseover", function(e){ //mouseover
    createjs.Tween.get(icon,{override:true})
    .to({scaleX:2.5, scaleY:2.5}, 1000, createjs.Ease.elasticOut);

   });
   icon.addEventListener("mouseout", function(e){ //mouseout
    createjs.Tween.get(icon,{override:true})
    .to({scaleX:1, scaleY:1}, 700, createjs.Ease.quintOut);

   });
   icon.addEventListener("click", function(e){ //click
    createjs.Tween.get(icon.ref,{override:true})
    .to({}, 600, createjs.Ease.bounceOut);

   });
  
  
  

  stage.update();
}