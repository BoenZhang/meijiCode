var screenScale, startTime, endTime, tmpTime, openPandas = [], openedPandaId = '', openedPandaDom, openedPandaDom1, playtimes = 1, succUsedTime, succPercent, isMusic = true, isPlayed, isClickPlay = false;

var openPandaClassArr = [], openPandaStyleArr = [], failedPercent = (40 + Math.random() * 20).toFixed(2);

var jpType = Math.ceil(Math.random() *3) + 1, jpTypeMap = {1: 'tt_ct_one', 2: 'tt_ct_two', 3: 'tt_ct_three'};

var rankTypeMap = {1 : ".rankone", 2: ".ranktwo", 3: ".rankthree", 4 : ".rankfour", 5 : ".rankfive", 6 : ".ranksix"};
// jpType = 1 ;

// var serverUrl = "http://10.200.51.37:3900";

var serverUrl = "http://139.196.207.229:3900";

var $musicbgBtn = $('.music'),
    $musicbg = $('#musicbg'),
    $musicclick = $('#click'),
    $submitmp = $('.submitmp');

if (jpType > 3) jpType = 3;

var date = new Date();
// if (date.getMonth() == 5 && date.getDate() > 25 && date.getDate() < 32 ) {
//     if (Math.random() > 0.99) {
//         jpType = 1
//     }
// }

// jpType = 1;

isPlayed = window.localStorage.getItem(wxopenid);

function startGame() {
    startTime = tmpTime = Date.now();
    var $numGM = $('.numGM'), $percentGM = $('.percentGM'), $smhcGSM = $('.smhcGSM'), $fmhcGSM = $('.fmhcGSM'), $musicfail = $('#fail'), $musicsucc = $('#succ'),count, timeLine = 90;

    function run() {
        endTime = Date.now();

        if (count == 0) {
            $musicbg.get(0).pause();
            if (openPandas.length < 12) {
                $musicfail.get(0).play();
                $fmhcGSM.html('<div>' + failedPercent + '%的玩家已完成挑战</div><div>第一名成绩为：6.12秒</div>');

                $('#gameFailMask').css("display", "block");
                // playtimes == 2 && $('.onemoreGSM').css("display", "none");
            } else {
                $musicsucc.get(0).play();
                succUsedTime = Math.abs(Math.abs(((startTime - endTime) / 1000) - 1).toFixed(2));
                succPercent = succUsedTime < 15 ? (95 + Math.random() * 5).toFixed(2) : ((timeLine - succUsedTime) / (timeLine - 10) * 100 + Math.random()).toFixed(2);

                // console.log(((30 - succUsedTime) / 15 * 100 + Math.random()).toFixed(2))
                // $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国' + succPercent + '%的玩家</div><div>第一名成绩为：6.12秒</div>');
                // $('#gameSuccMask').css("display", "block");

                fetch(serverUrl + '/config?score=' + succUsedTime + "&img=" + headimgurl + "&username=" + nickname)
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(d){
                        if (d.isfirst == '2') {
                            $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国100%的玩家</div><div>第一名成绩为：'+ succUsedTime +'秒</div>');
                            $('#gameSuccMask').css("display", "block");
                        } else  {
                            $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国' + succPercent + '%的玩家</div><div>第一名成绩为：'+ d.isfirst +'秒</div>');
                            $('#gameSuccMask').css("display", "block");
                        }
                    })
                    .catch(function(a) { alert(a) });
            }
            return
        }

        if (openPandas.length == 12) {
            $musicbg.get(0).pause();
            $musicsucc.get(0).play();
            succUsedTime = Math.abs((Math.abs((startTime - endTime) / 1000) - 1).toFixed(2));
            // console.log(succUsedTime, timeLine - succUsedTime)
            succPercent = succUsedTime < 15 ? (95 + Math.random() * 5).toFixed(2) : ((timeLine - succUsedTime) / (timeLine - 10) * 100 + Math.random()).toFixed(2);

            fetch(serverUrl + '/config?score=' + succUsedTime + "&img=" + headimgurl + "&username=" + nickname)
                .then(function(response){
                    return response.json()
                })
                .then(function(d){
                    console.log('if', d)
                    if (d.isfirst == '2') {
                        $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国100%的玩家</div><div>第一名成绩为：'+ succUsedTime +'秒</div>');
                        $('#gameSuccMask').css("display", "block");
                    } else  {
                        $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国' + succPercent + '%的玩家</div><div>第一名成绩为：'+ d.isfirst +'秒</div>');
                        $('#gameSuccMask').css("display", "block");
                    }
                })
                .catch(function(a) { alert(a) });

            return
        }

        if(endTime - tmpTime > 1000) {
            count = Math.abs((timeLine + (startTime - endTime) / 1000).toFixed());
            $numGM.html( count + 'S');
            tmpTime = endTime;
            $percentGM.css("width", (100 - 100 / timeLine * (timeLine - count)) + "%");
            // count == 85 && (openPandas.length = 12); //5秒后默认失败
        }

        requestAnimationFrame(run);
    }

    run();

}

function setRank(rankArr) {

    // var $rankone = $('.rankone .two span'),
    //     $ranktwo = $('.ranktwo .two span'),
    //     $rankthree = $('.rankthree .two span'),
    //     $rankfour = $('.rankfour .two span'),
    //     $rankfive = $('.rankfive .two span'),
    //     $ranksix = $('.ranksix .two span');


    // console.log($rankone)
    // $rankone.css("display", "none");


    for( var i = 1; i < 7 ; i ++) {
        if (rankArr[i].length == 3) {
            $(rankTypeMap[i]).css("display", "flex");
            $(rankTypeMap[i] + " .two span").css("background-image", "url(\"" + rankArr[i][1] + "\")");
            $(rankTypeMap[i] + " .three").html(rankArr[i][2]);
            $(rankTypeMap[i] + " .four").html(rankArr[i][0]);
        } else {
            $(rankTypeMap[i]).css("display", "none");
        }
    }
    // $rankone.css("background-image", "url(\"" + rankArr['1'][1] + "\")");
    // $ranktwo.css("background-image", "url(\"" + rankArr['2'][1] + "\")");
    // $rankthree.css("background-image", "url(\"" + rankArr['3'][1] + "\")");
    // $rankfour.css("background-image", "url(\"" + rankArr['4'][1] + "\")");
    // $rankfive.css("background-image", "url(\"" + rankArr['5'][1] + "\")");
    // $ranksix.css("background-image", "url(\"" + rankArr['6'][1] + "\")");
}

function init(){
    screenScale = screenResize();
    window.onresize = screenResize;
    FastClick.attach(document.body);

    var $loadingMask = $('#loadingMask');
    var $game = $('#game'),
        $gameSuccMask = $('#gameSuccMask'),
        $gameFailMask = $('#gameFailMask'),
        $activityMask = $('#activityMask'),
        $musicfail = $('#fail'),
        $musicsucc = $('#succ'),
        $container = $('#container'),
        $lottery = $('#lottery'),
        $lotteryBg = $('#lotteryBg'),
        $ltytry = $('.buttonLt'),
        $tt = $('.tt_contentLt'),
        $zjmp = $('#zjmp'),
        $zjjd = $('#zjjd'),
        $zjtn = $('#zjtn'),
        $inviteMask = $('#inviteMask'),
        $descAM = $('.descAM'),
        $shareAM = $('.shareAM'),
        $sharezj = $('.sharezj'),
        $boardAM = $('.boardAM');


    document.addEventListener("WeixinJSBridgeReady", function () {
        $musicbg.get(0).play();
        $musicsucc.get(0).play();
        $musicfail.get(0).play();
        $musicclick.get(0).play();
        setTimeout(function () {
            $musicsucc.get(0).pause();
            $musicfail.get(0).pause();
            $musicclick.get(0).pause();
        }, 10)
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        $musicbg.get(0).play();
        $musicsucc.get(0).play();
        $musicfail.get(0).play();
        $musicclick.get(0).play();
        setTimeout(function () {
            $musicsucc.get(0).pause();
            $musicfail.get(0).pause();
            $musicclick.get(0).pause();
        }, 10)
    }, false);

    // $rankone.css("background-position", "cover");

    $loadingMask.css("display", "none");


    setTimeout(function () {
        $(".ctaTop").attr("class", "ctaTop activeCT");
        $(".ctaPanda").attr("class", "ctaPanda activeCT");
        $(".meijiBox").attr("class", "meijiBox activeCT");
    });

    $('.activity').click(function () {
        $activityMask.css("display", "block");

        fetch(serverUrl + '/getrank')
            .then(function(response){
                return response.json()
            })
            .then(function(d){
                setRank(d);
            })
            .catch(function(a) { alert(a) })
    })

    $('.closeAM').click(function () {
        $activityMask.css("display", "none");

        if (isClickPlay) {
            $('.rangeGSM').css("display", "block");
            $('.cjGSM').css("display", "block");
            $('.onemoreGSM').css("display", "none");
        }
    })

    $('.headerAM').click(function (e) {
        var $active = $('.activeAM'),
            $unactive = $('.unactiveAM');
        // console.log(e.target.className)
        if(e.target.className == 'closeAM') return false;
        if(e.target.className == 'unactiveAM') {
            $unactive.attr("class", "activeAM");
            $active.attr("class", "unactiveAM");
            if (e.target.dataset.type == '1') {
                $boardAM.attr("class", "boardAM");
                $descAM.attr("class", "descAM descActive");
            } else {
                $descAM.attr("class", "descAM");
                $boardAM.attr("class", "boardAM descActive");
            }
        }
    })

    $shareAM.click(function () {
        $inviteMask.css("display", "block");
    })

    $sharezj.click(function () {
        $inviteMask.css("display", "block");
    })

    $musicbgBtn.click(function () {
        if (isMusic) {
            $musicbg.get(0).pause();
            isMusic = false;
            $musicbgBtn.css("background-color", "#b1aaaa");
        } else {
            $musicbg.get(0).play();
            isMusic = true;
            $musicbgBtn.css("background-color", "#fdc300");
        }
    })

    if(isPlayed == "meiji" || true) {
        $('.play').click(function () {
            isClickPlay = true;
            // console.log($('.headerAM').children()[0])
            $('.headerAM').children()[0].className = "unactiveAM acdescAM";
            $('.headerAM').children()[0].style.display = "none";
            $descAM.attr("class", "descAM");
            $boardAM.attr("class", "boardAM descActive");
            $('.headerAM').children()[1].className = "activeAM acrankAM";
            document.getElementById("musicbg").volume = 0.1;
            document.getElementById("click").volume = 1;
            $game.css("display", "block");
            $container.css("display", "none");
            $activityMask.css("display", "none");
            window.localStorage.setItem(wxopenid, "meiji");
            startGame();
        })
    } else {
        $('.play').css("display", "none");
    }


    $('.innerBoxGM').click(function (e) {
        // console.log('-------1', e.target.parentNode.className, e.target.parentNode.className.indexOf('activeGM'))
        // console.log('-------2', openedPandaId, e.target.dataset.panda)
        if (e.target.parentNode.className == 'gameBoxGM' || e.target.parentNode.className == 'innerBoxGM' || e.target.parentNode.className.indexOf('activeGM') > -1 || e.target.parentNode.parentNode.className.indexOf('activeGM') > -1) return false;

        $musicclick.get(0).play();
        e.target.parentNode.className = e.target.parentNode.className + " activeGM";
        if (openedPandaId == '') {
            openedPandaId = e.target.dataset.panda;
            openedPandaDom = e.target.parentNode;
        } else {
            // openedPandaDom1 = e.target.parentNode;
            if (openedPandaId == e.target.dataset.panda) {
                openPandas.push(openedPandaId);
                (function (opd, opid) {
                    setTimeout(function () {
                        // console.log('--sdasds---', parseInt(opid.replace('p', '')) % 6)
                        opd.className = opd.className + " binganGM";
                        e.target.parentNode.className = e.target.parentNode.className + " binganGM";
                        opd.childNodes[3].style.backgroundImage = "url(\"./src/img/bingan/bg" + (parseInt(opid.replace('p', '')) % 6 + 1) + ".png\")";
                        e.target.parentNode.childNodes[3].style.backgroundImage = "url(\"./src/img/bingan/bg" + (parseInt(opid.replace('p', '')) % 6 + 1) + ".png\")";
                        openPandaClassArr.push(opd);
                        openPandaClassArr.push(e.target.parentNode);
                        openPandaStyleArr.push(opd.childNodes[3]);
                        openPandaStyleArr.push(e.target.parentNode.childNodes[3]);
                    }, 600)
                })(openedPandaDom, openedPandaId);
                openedPandaId = '';
            } else {
                openedPandaId = '';
                (function (opd) {
                    setTimeout(function () {
                        // console.log('st', opd, e.target.parentNode);
                        opd.className = opd.className.replace('activeGM', '');
                        e.target.parentNode.className = e.target.parentNode.className.replace('activeGM', '');
                    }, 600)
                })(openedPandaDom);
            }
        }
        // console.log('-------3', openedPandaDom, openedPandaId, e.target.dataset.panda)
    })

    $('.onemoreGSM').click(function () {
        $gameFailMask.css("display", "none");
        openPandas = [];
        isMusic && $musicbg.get(0).play();
        playtimes += 1;
        // console.log($('.flipContainerGM'));
        Array.prototype.slice.call($('.flipContainerGM')).forEach(function ($flipItem) {
            $flipItem.className = $flipItem.className.replace('activeGM', '');
        })

        for(var i = 0; i < openPandaClassArr.length; i++) {
            (
                function (index) {
                    openPandaClassArr[index].className = openPandaClassArr[index].className.replace("binganGM", "");
                }
            )(i)
        }

        for(var j = 0; j < openPandaClassArr.length; j++) {
            (
                function (index) {
                    openPandaStyleArr[index].style.backgroundImage = "";
                }
            )(j)
        }
        openPandaClassArr = [];
        openPandaStyleArr = [];

        startGame();
    })

    $('.rangeGSM').click(function () {
        fetch(serverUrl + '/getrank')
            .then(function(response){
                return response.json()
            })
            .then(function(d){
                setRank(d);
            })
            .catch(function(a) { alert(a) })

        $activityMask.css("display", "block");

        $('.rangeGSM').css("display", "none");
        $('.cjGSM').css("display", "none");
        $('.onemoreGSM').css("display", "none");
    })
    
    $('.cjGSM').click(function () {
        $gameSuccMask.css("display", "none");
        $game.css("display", "none");
        $lottery.css("display", "block");
        $lotteryBg.css("display", "block");
    })

    $ltytry.click(function () {
        $tt.attr("class", "tt_contentLt tt_activeLt");
        $ltytry.unbind();
        setTimeout(function () {
            $tt.attr("class", "tt_contentLt " + jpTypeMap[jpType]);
            setTimeout(function () {
                $lottery.css("display", "none");
                if (jpType == 1) {
                    $zjmp.css("display", "block");
                }
                else if (jpType == 2) {
                    $zjtn.css("display", "block");
                } else {
                    $zjjd.css("display", "block");
                }
            }, 3500)
        }, 2000)
    })

    $inviteMask.click(function () {
        $inviteMask.css("display", "none");
    })

    $('#submitMask').click(function () {
        $('#submitMask').css("display", "none");
    })

    $submitmp.click(
        function () {
            $('#submitMask').css("display", "block");
        }
    )



    loadImagesNormal([
        "./src/img/game/p1.png",
        "./src/img/game/p2.png",
        "./src/img/game/p3.png",
        "./src/img/game/p4.png",
        "./src/img/game/p5.png",
        "./src/img/game/p6.png",
        "./src/img/game/p7.png",
        "./src/img/game/p8.png",
        "./src/img/game/p9.png",
        "./src/img/game/p10.png",
        "./src/img/game/p11.png",
        "./src/img/game/p12.png",

        "./src/img/bingan/bg1.png",
        "./src/img/bingan/bg2.png",
        "./src/img/bingan/bg3.png",
        "./src/img/bingan/bg4.png",
        "./src/img/bingan/bg5.png",
        "./src/img/bingan/bg6.png",

        "./src/img/activityDesc/invite.png",
        "./src/img/activityDesc/panda.png",
        "./src/img/activityDesc/rankone.png",
        "./src/img/activityDesc/ranktwo.png",
        "./src/img/activityDesc/rankthree.png",
        // "./src/img/xxx/1.png",
        // "./src/img/xxx/2.png",
        // "./src/img/xxx/3.png",
        // "./src/img/xxx/4.png",
        // "./src/img/xxx/5.png",
        // "./src/img/xxx/6.png",
        // "./src/img/xxx/7.png",

        "./src/img/game/failp.png",
        "./src/img/game/failStar.png",
        "./src/img/game/gamebutton.png",

        "./src/img/game/succbg.png",
        "./src/img/game/succp.png",
        "./src/img/game/succStar.png",
    ]);
}



loadImages([
    "./src/img/bg.png",
    "./src/img/bgelips.png",
    "./src/img/dajiang.png",
    "./src/img/button_activity.png",
    "./src/img/guan.png",
    "./src/img/logo.png",
    "./src/img/meiji.png",
    "./src/img/panda1.png",
    "./src/img/panda2.png",
    "./src/img/panda3.png",
    "./src/img/panda4.png",
    "./src/img/panda5.png",
    "./src/img/panda6.png",
    "./src/img/spanda1.png",
    "./src/img/spanda2.png",
    "./src/img/spanda3.png",
    "./src/img/spanda4.png",
    "./src/img/spanda5.png",
    "./src/img/spanda6.png",
    "./src/img/submitmp.png",
    "./src/img/tong.png",
    "./src/img/ying.png",
    "./src/img/wenan.png",
    "./src/img/activityDesc/bg.png",
    // "./src/img/activityDesc/invite.png",
    "./src/img/activityDesc/leaderFour.png",
    "./src/img/activityDesc/meiji.png",
    // "./src/img/activityDesc/panda.png",
    // "./src/img/activityDesc/rankone.png",
    // "./src/img/activityDesc/ranktwo.png",
    // "./src/img/activityDesc/rankthree.png",
    "./src/img/activityDesc/triangle.png",
    "./src/img/game/bg.png",
    "./src/img/game/bgmask.png",
    "./src/img/game/bingan.png",
    // "./src/img/game/failp.png",
    // "./src/img/game/failStar.png",
    // "./src/img/game/gamebutton.png",
    // "./src/img/game/p1.png",
    // "./src/img/game/p2.png",
    // "./src/img/game/p3.png",
    // "./src/img/game/p4.png",
    // "./src/img/game/p5.png",
    // "./src/img/game/p6.png",
    // "./src/img/game/p7.png",
    // "./src/img/game/p8.png",
    // "./src/img/game/p9.png",
    // "./src/img/game/p10.png",
    // "./src/img/game/p11.png",
    // "./src/img/game/p12.png",
    "./src/img/game/progress1.png",
    "./src/img/game/progress2.png",
    // "./src/img/game/succbg.png",
    // "./src/img/game/succp.png",
    // "./src/img/game/succStar.png",
    "./src/img/lottery/bg.png",
    "./src/img/lottery/arrow.png",
    "./src/img/lottery/buttonlot.png",
    "./src/img/lottery/buttonzj.png",
    "./src/img/lottery/header.png",
    "./src/img/lottery/headerIcon.png",
    "./src/img/lottery/tp.png",
    "./src/img/lottery/ttbg.png",
    "./src/img/lottery/zj_jd.png",
    "./src/img/lottery/zj_mp.png",
    "./src/img/lottery/zj_tn.png",
    // "./src/img/xxx/1.png",
    // "./src/img/xxx/2.png",
    // "./src/img/xxx/3.png",
    // "./src/img/xxx/4.png",
    // "./src/img/xxx/5.png",
    // "./src/img/xxx/6.png",
    // "./src/img/xxx/7.png",
    // "./src/img/bingan/bg1.png",
    // "./src/img/bingan/bg2.png",
    // "./src/img/bingan/bg3.png",
    // "./src/img/bingan/bg4.png",
    // "./src/img/bingan/bg5.png",
    // "./src/img/bingan/bg6.png",
]);
