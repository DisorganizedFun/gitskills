/**
 * Created by Administrator on 2016/9/20.
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var window_width = 1024;
var window_height = 768;
canvas.width= window_width;
canvas.height= window_height;
var Radius = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var time=new Date();
const endTime = time.getTime()+2* 60 * 60 * 1000;
var curShowTimeSeconds = 0;

//console.log(endTime)
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime - curTime.getTime();
    ret = Math.round( ret/1000 );
    console.log(ret);
    return ret >= 0 ? ret : 0;
}
function render(cxt){
    cxt.clearRect(0,0,window_width, window_height);//每次时间更新都清屏，避免最新时间与旧时间叠加在一起
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    renderDigit( MARGIN_LEFT + 15*(Radius+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(Radius + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(Radius+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(Radius+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(Radius+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(Radius+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(Radius+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
}
setInterval(function () {
    render( context );
}, 50);
function renderDigit( x , y , num , cxt){
    cxt.fillStyle = 'rgb(0,102,153)';

    for(var i = 0; i<digit[num].length;i++){
        for(var j = 0; j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc( x+j*2*(Radius+1)+(Radius+1) , y+i*2*(Radius+1)+(Radius+1) , Radius , 0 , 2*Math.PI );
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

