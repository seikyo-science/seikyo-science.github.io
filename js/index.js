$(function(){
	console.log("loaded index.js");

// --------------------------------------------------------------------
// define functions
// --------------------------------------------------------------------
function banScroll(){var a="onwheel" in document?"wheel":"onmousewheel" in document?"mousewheel":"DOMMouseScroll";$(document).on(a,function(b){b.preventDefault()});$(document).on("touchmove.noScroll",function(b){b.preventDefault()})}
function relScroll(){var a="onwheel" in document?"wheel":"onmousewheel" in document?"mousewheel":"DOMMouseScroll";$(document).off(a);$(document).off(".noScroll")}
function rand(c,a,d){var b;if(d){b=Math.floor(Math.random()*(a-c+1))+c}else{b=Math.random()*(a-c+1)+c}return b}
$("#hide_hover").hover(function(){$("#hide").css("opacity",1)},function(){$("#hide").css("opacity",0)});
// --------------------------------------------------------------------
// define animations
// --------------------------------------------------------------------

// スクロールを初期値+スクロールを禁止
	// $(window).scrollTop(0);
	// $(body).scrollTop(0);
	
	// $(window).scrollTop(0);


// 文字をスライス
	var elmAr = [];
	var n;
	var canScroll=false;
	if(document.getElementsByClassName("slicer")!=null){
		var setElm = $('.slicer');
	    className = 'sliced';
	    setElm.children().addBack().contents().each(function(){
	        var elmThis = $(this);
	        if (this.nodeType == 3) {
	            var $this = $(this);
	            $this.replaceWith($this.text().replace(/(\S)/g, '<span>$&</span>'));
	            elmAr.push();
	        }
	        setElm.each(function(){
	            $(this).find('span').each(function(i){
	                i = i+1;
	                $(this).addClass("delay");
	                $(this).attr("id","delay_"+i);//forでやりやすいようにidで登録
	                elmAr.push(rand(-30,30,false));
	            });
	        });
	    });


// 文字ごとにアニメーション + アニメーション終了後スクロール解除
// 		(ただし一部ブラウザでscrollTop関数で設定ができないのでif使用。)
	    // $("#stop_animation").animate({opacity: "1.0"}, 800, "easeInOutExpo");//stop_animationの表示アニメ
	    if($(window).scrollTop()==0){
	    	banScroll();
		    // $(window).scrollTop(0);
		    for (var i = 0; i < $(".delay").length; i++) {
		    	$("#delay_"+(i+1)).stop(true, true)
		    		.animate({opacity: "0.1"}, 0, "easeInOutExpo")
		    		.animate({
							top: rand(-300,300,false)+"px",
							left: rand(-300,300,false)+"px"
						}, 1, "easeOutExpo")
					.delay(2000+300*i) //なぜか2秒待たないと3文字ぐらいバグる(処理落ちの可能性)
					.animate({opacity: "1.0"}, 800, "easeInOutExpo")
					.animate({
							top: 0+"px",
							left: 0+"px"
						}, 3000, "easeOutExpo");
				log('anime set');
		    };
		    setInterval(function(){ //intervalで擬似的に解除
		    	relScroll();
		    	canScroll = true;
		    	// $("#stop_animation").animate({opacity: "0.0"}, 800, "easeInOutExpo");
		    }, 2000+300*$(".delay").length+3000);
		}else{
			canScroll = true;
			relScroll();

		}


// canScrollのtrueでスクロール時のアニメーションを実行
	    $(window).scroll(function(){
			var tmp;
			var sc = $(window).scrollTop()/100;
			// log("scroll "+sc);
			if(canScroll){
				for (var i = 0; i < $(".delay").length; i++) {
					tmp = elmAr[i]*(sc);
					$("#delay_"+(i+1)).stop(false, false)
					.animate({top: tmp+"px"},500, "easeOutExpo");
					// log("setanimate: "+tmp);
				};
			}
			// log("scroll");
		});


// stop_animationのhover。開発中
		$("#stop_animation").hover(
			function(){
				// if(!canScroll){
					$("#stop_animation").animate({width: "130px",height: "130px"}, 800, "easeOutExpo");
				// }
			},
			function(){
				$("#stop_animation").animate({width: "100px",height: "100px"}, 800, "easeOutExpo");
			}
		);


// stop_animationのclick。開発中
		$("#stop_animation").click(function(){
			relScroll();
	    	canScroll = true;
	    	// $("#stop_animation").animate({opacity: "0.0"}, 800, "easeInOutExpo");
	    	for (var i = 0; i < $(".delay").length; i++) {
		    	$("#delay_"+(i+1)).stop(true, true)
					.animate({opacity: "1.0"}, 0, "easeInOutExpo")
					.animate({
							top: 0+"px",
							left: 0+"px"
						}, 0, "easeOutExpo");
		    };
		})
	}


	

// 開発途中

    // $(".vimeo-thumb").each(function(){
    //     var id = $(this).data('vimeoid');
    //     //JSONを取得してIDを代入
    //     $.getJSON('http://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', {format: "json"}, function(data) {
    //         //.vimeo***というclassのDOMに背景としてサムネイルを指定
    //         $('.vimeo' + id).css('background-image', 'url("' + data[0].thumbnail_medium + '")');
    //     });
    // });
    
	
	// $("#anime_01")
	// 	.stop(true, true)
	// 	.animate({scale: "0"}, 0, "easeOutExpo")
	// 	.delay(1000)
	// 	.animate({scale: "1"}, 800, "easeOutExpo");

	// $("#maintitle p")
	// 	.stop(true, true)
	// 	.delay(2300)
	// 	.animate({opacity:1, top: "67%"}, 1200, "easeOutExpo");

	// $("#anime_02")
	// 	.stop(true, true)
	// 	.delay(2450)
	// 	.animate({width: "400px",left: "32.5%"}, 1200, "easeOutExpo");
});