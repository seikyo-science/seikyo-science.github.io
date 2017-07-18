$(function() {
    function banScroll() {var a = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";$(document).on(a, function(b) { b.preventDefault() });$(document).on("touchmove.noScroll", function(b) { b.preventDefault() });/*log("banned scroll")*/}
    function relScroll() {var a = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";$(document).off(a);$(document).off(".noScroll");/*log("released scroll")*/}
    function rand(c, a, d) {var b;if (d) { b = Math.floor(Math.random() * (a - c + 1)) + c } else { b = Math.random() * (a - c + 1) + c }return b}
    $("#hide_hover").hover(function() { $("#hide").css("opacity", 1) }, function() { $("#hide").css("opacity", 0) });

    Array.prototype.remove = function(element) {
        for (var i = 0; i < this.length; i++)
            if (this[i] == element) this.splice(i, 1);
    };


    function preload(images, progress) {
        var total = images.length;
        $(images).each(function() {
            var src = this;
            $('<img/>')
                .attr('src', src)
                .load(function() {
                    images.remove(src);
                    progress(total, total - images.length);
                });
        });
    }
        var now_percent = 0;
        var displaying_percent = 0;
        // $(window).scrollTop(0);
        //ここに読み込む画像ファイルを入力
        if ($(window).scrollTop() == 0) {
            banScroll();
            preload([
                'media/image/reel/1.png',
                'media/image/reel/2.png',
                'media/image/reel/3.png',
                'media/image/reel/4.png',
                'media/image/reel/5.png',
                'media/image/reel/6.png',
                'media/image/reel/7.png',
                'media/image/reel/8.png',
                'media/image/reel/9.png',
                'media/image/reel/10.png',
                'media/image/reel/11.png'
                // 'media/movie/logo.mp4'
            ], function(total, loaded) {
                now_percent = Math.ceil(100 * loaded / total);
            });

            window.setInterval(function() {
                var timer = window.setInterval(function() {
                        if (displaying_percent >= 100) {
                            window.clearInterval(timer);
                            $('#loader').fadeOut('slow');
                            window.setInterval(function() {
                                video = document.getElementById('anime');
                                video.play();

                                window.setInterval(function() {
                                    $("#anime").fadeOut(1000);
                                    window.setInterval(function() {
                                        relScroll();
                                    }, 1000);
                                }, 3000);
                            }, 2000);
                        } else {
                            if (displaying_percent < now_percent) {
                                displaying_percent++;
                                $('#load-text').html(displaying_percent + '%');
                                $('#bar span').css('width', displaying_percent + '%');
                            }
                        }
                    },
                    25); // この数字を変えるとスピードを調整できる
            }, 1000);
        } else {
            $('#loader').fadeOut('slow');
            $("#anime").fadeOut('slow');
        }

});