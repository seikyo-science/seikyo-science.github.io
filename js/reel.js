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
// 

// 文字をスライス
	var elmAr = [];
	var elmArLogo = [];
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

	    for (var i = $("#logoimage div").length - 1; i >= 0; i--) {
	    	elmArLogo.push(rand(0,30,false));
	    };


// 文字ごとにアニメーション + アニメーション終了後スクロール解除
// 		(ただし一部ブラウザでscrollTop関数で設定ができないのでif使用。)
	    // $("#stop_animation").animate({opacity: "1.0"}, 800, "easeInOutExpo");//stop_animationの表示アニメ
	 //    if($(window).scrollTop()==0){
	 //    	banScroll();
		//     // $(window).scrollTop(0);

		// 		log('anime set');
		//     };
		//     setInterval(function(){ //intervalで擬似的に解除
		//     	relScroll();
		//     	canScroll = true;
		//     	// $("#stop_animation").animate({opacity: "0.0"}, 800, "easeInOutExpo");
		//     }, 2000+300*$(".delay").length+3000);
		// }else{
			canScroll = true;
			// relScroll();

		// }


// canScrollのtrueでスクロール時のアニメーションを実行
	    $(window).scroll(function(){
			var tmp;
			var w = $(window).width();
			var h = $(window).height();
			var scroll= $(window).scrollTop();
			var lsc=($(".slicer").offset().top-scroll-200)/w*2;
			// log(w/h*4)
			var lsc2= ($(window).scrollTop())/100;
			if(lsc>$(window).height()){lsc=$(window).height();};
			if(lsc2>$(window).height()){lsc2=$(window).height();};
			var sc = Math.pow(lsc,3)*1.3;
			var af = 1-Math.pow(lsc,2);

			if(af<0){af=0;};

			// log("sc: "+sc+"; af:"+af+";");
			// log("scroll "+sc);
			if(canScroll && scroll<=$(window).height()/2){
				for (var i = 0; i < $(".delay").length; i++) {
					tmp = elmAr[i]*(lsc);
					$("#delay_"+(i+1)).stop(true, true)
						.animate({top: tmp+"px",opacity: af},500, "easeOutExpo");
					
					
				};
				// log("setanimate: "+(sc));
				$("#logoimage div").each(function(i){
					tmp = elmArLogo[i]*lsc2;
					$(this).stop(true,true)
						.animate({top: tmp+"px"},500, "easeOutExpo");
				});
				

			}
			// log("scroll");
			var back=scroll+h/20;
			var dh = h+200;
			var af2 = 1-Math.pow(back,2)/scroll/100;
			var af3 = 1-Math.pow(back,2)/scroll/10;
			if(af2<0){af2=0;}
			if(af3<0){af3=0;}
			

			// log(af2+"; "+back);
			$("#back-center")
				.stop(true, true)
				.animate({top: back*0.2+"px", opacity: af2},500, "easeOutExpo");

			$("#back-01")
				// .css("background-size","auto 100%")
				.stop(true, true)
				.animate({top: back*0.16+dh/12+"px", opacity: af2},500, "easeOutExpo");
			$("#back-02")
				// .css("background-size","auto 100%")
				.stop(true, true)
				.animate({top: back*0.16-dh/12+"px", opacity: af2},500, "easeOutExpo");


			$("#back-sentence")
				.stop(true, true)
				.animate({top: back*0.25+dh/20+"px"},500, "easeOutExpo");

			$("#back-03")
				.stop(true, true)
				.animate({top: back*0.3+dh/9+"px", opacity: af2},500, "easeOutExpo");

			$("#back-04")
				.stop(true, true)
				.animate({top: back*0.3-dh/7+"px", opacity: af2},500, "easeOutExpo");

			if(back>dh/6){
				$("#back").each(function(i,e){
					$(this).animate({opacity:0},300).css("visibility","hidden");
				});
				// log("fadeout");
			}else{
				$("#back").each(function(i,e){
					$(this).animate({opacity:1},300).css("visibility","visible");
				});
				// log(back);
			}

			// $("#back-frame")
			// 	.stop(true, true)
			// 	.animate({top: scroll+"px"},0, "easeOutExpo");
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
		    	$("#delay_"+(i+1)).stop(true, false)
					.animate({opacity: "1.0"}, 0, "easeInOutExpo")
					.animate({
							top: 0+"px",
							left: 0+"px"
						}, 0, "easeOutExpo");
		    };
		});

		// $("#forum a").hover()

		$("#logo div").css("top",($("#logo div").height()/5)+"px");
		$("#anime").css("top",($("#logo div").height()/5)+"px");


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