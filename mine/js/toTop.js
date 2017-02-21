function ToTop(ele,speed){ //ele可为dom对象 或 jquery对象 speed可选 默认50；
    this.speed = speed || 50;
    console.log(this.speed);
    var that = this;
    window.onscroll = function(){
        var st = $(document).scrollTop();
        if(st > 300){
            ele.removeClass('none');
        }else {
            ele.addClass("none");
        }
        function toTop(){
            st -= that.speed;
            console.log(that.speed);
            if(st > 0){
                $(document).scrollTop(st);
                requestAnimationFrame(toTop);
            }
            if(st < 0 || (st<20 && st>0)){
                $(document).scrollTop(0);
            }
        }
        ele.on('click',function(){
            requestAnimationFrame(toTop);
        })
    }
}

// 使用方法如下，创建一个实例即可
// var firstTop = new ToTop(ele[,speed]);
