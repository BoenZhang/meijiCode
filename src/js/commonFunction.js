function loadImages(imgList){
    var process = 0;
    for(var i=0;i<imgList.length;i++){
        var image = new Image();

        image.onload = function (){
            process ++;
            document.getElementById('isload').innerHTML = Math.floor(process/imgList.length*100);
            if(process==imgList.length){
                init();
            }
        }
        image.src = imgList[i];
    }
}

function screenResize() {
    window.scrollTo(0, 0);

    //标准屏幕尺寸
    var phoneWidth = 640;
    var phoneHeight = 1008;

    var contain = document.getElementsByClassName('contain');
    var zj = document.getElementsByClassName('zj');
    var activityMask = document.getElementById('activityMask');
    var gameSuccMask = document.getElementById('gameSuccMask');
    var gameFailMask = document.getElementById('gameFailMask');
    var inviteMask = document.getElementById('inviteMask');
    var lottery = document.getElementById('lottery');
    // var zjtn = document.getElementById('zjtn');
    var lotteryBg = document.getElementById('lotteryBg');
    var game = document.getElementById('game');
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var v = phoneWidth/phoneHeight;
    var scale = w/h>v?(h/phoneHeight):(w/phoneWidth);
    var scaleY = h/phoneHeight;

    for(var i=0;i<contain.length;i++){
        contain[i].style.transform = 'scale('+scale+')';
        contain[i].style.WebkitTransform = 'scale('+scale+')';
    }

    for(var i=0;i<zj.length;i++){
        zj[i].style.transform = 'scale('+scale+')';
        zj[i].style.WebkitTransform = 'scale('+scale+')';
    }

    activityMask.style.transform = 'scale('+scale + ',' + scaleY +')';
    activityMask.style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

    game.style.transform = 'scale('+scale + ',' + scaleY +')';
    game.style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

    gameSuccMask.style.transform = 'scale('+scale + ',' + scaleY +')';
    gameSuccMask.style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

    gameFailMask.style.transform = 'scale('+scale + ',' + scaleY +')';
    gameFailMask.style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

    inviteMask.style.transform = 'scale('+scale + ',' + scaleY +')';
    inviteMask.style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

    lottery.style.transform = 'scale('+scale+')';
    lottery.style.WebkitTransform = 'scale('+scale+')';
    lotteryBg.style.transform = 'scale('+scale + ',' + scaleY +')';
    lotteryBg.style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

    return scale;
}