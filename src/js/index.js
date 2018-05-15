var screenScale, startTime, endTime, tmpTime, openPandas = [], openedPandaId = '', openedPandaDom, playtimes = 1, succUsedTime, succPercent, isMusic = true;

var jpType = Math.ceil(Math.random() *3), jpTypeMap = {1: 'tt_ct_one', 2: 'tt_ct_two', 3: ''};

// jpType = 1 ;

function startGame() {
    startTime = tmpTime = Date.now();
    var $numGM = $('.numGM'), $percentGM = $('.percentGM'), $smhcGSM = $('.smhcGSM'), $fmhcGSM = $('.fmhcGSM'), $musicfail = $('#fail'), $musicsucc = $('#succ'),count;

    function run() {
        endTime = Date.now();

        if (count == 0) {
            if (openPandas.length > 12) {
                $musicfail.get(0).play();
                $fmhcGSM.html('<div>' + (40 + Math.random() * 20).toFixed(2) + '%的玩家已完成挑战</div><div>第一名成绩为：9秒</div>');

                $('#gameFailMask').css("display", "block");
                playtimes == 2 && $('.onemoreGSM').css("display", "none");
            } else {
                $musicsucc.get(0).play();
                succUsedTime = Math.abs((30 + (startTime - endTime) / 1000).toFixed(2));
                succPercent = (30 - succUsedTime) < 15 ? (95 + Math.random() * 5).toFixed(2) : ((30 - succUsedTime) / 15 * 100 + Math.random()).toFixed(2);

                console.log(((30 - succUsedTime) / 15 * 100 + Math.random()).toFixed(2))
                $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国' + succPercent + '%的玩家</div><div>第一名成绩为：9.12秒</div>');
                $('#gameSuccMask').css("display", "block");
            }
            return
        }

        if (openPandas.length == 12) {
            $musicsucc.get(0).play();
            succUsedTime = Math.abs((30 + (startTime - endTime) / 1000).toFixed(2));
            succPercent = (30 - succUsedTime) < 15 ? (95 + Math.random() * 5).toFixed(2) : ((30 - succUsedTime) / 15 + Math.random()).toFixed(2);

            $smhcGSM.html('<div>你的成绩为：' + succUsedTime + '秒</div><div>成功击败全国' + succPercent + '%的玩家</div><div>第一名成绩为：9.12秒</div>');
            $('#gameSuccMask').css("display", "block");
        }

        if(endTime - tmpTime > 1000) {
            count = Math.abs((30 + (startTime - endTime) / 1000).toFixed());
            $numGM.html( count + 'S');
            tmpTime = endTime;
            $percentGM.css("width", (100 - 100 / 30 * (30 - count)) + "%");
            count == 25 && (count = 0); //5秒后默认失败
        }

        requestAnimationFrame(run);
    }

    run();

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
        $container = $('#container'),
        $lottery = $('#lottery'),
        $lotteryBg = $('#lotteryBg'),
        $ltytry = $('.buttonLt'),
        $tt = $('.tt_contentLt'),
        $zjmp = $('#zjmp'),
        $zjjd = $('#zjjd'),
        $zjtn = $('#zjtn'),
        $musicbgBtn = $('.music'),
        $musicbg = $('#musicbg'),
        $musicclick = $('#click'),
        $inviteMask = $('#inviteMask'),
        $descAM = $('.descAM'),
        $shareAM = $('.shareAM'),
        $sharezj = $('.sharezj'),
        $boardAM = $('.boardAM');

    $loadingMask.css("display", "none");

    $('.activity').click(function () {
        $activityMask.css("display", "block");
    })

    $('.closeAM').click(function () {
        $activityMask.css("display", "none");
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

    $('.play').click(function () {
        $game.css("display", "block");
        $container.css("display", "none");
        $activityMask.css("display", "none");
        startGame();
    })

    $('.innerBoxGM').click(function (e) {
        // console.log(e.target.parentNode.className, e.target.parentNode.className.indexOf('activeGM'))
        if (e.target.parentNode.className.indexOf('activeGM') > -1 || e.target.parentNode.parentNode.className.indexOf('activeGM') > -1) return false;

        // console.log(openedPandaId, e.target.dataset.panda)
        $musicclick.get(0).play();
        e.target.parentNode.className = "flipContainerGM activeGM";
        if (openedPandaId == '') {
            openedPandaId = e.target.dataset.panda;
            openedPandaDom = e.target.parentNode;
        } else {
            if (openedPandaId == e.target.dataset.panda) {
                openPandas.push(openedPandaId);
                openedPandaId = '';
            } else {
                openedPandaId = '';
                (function (opd) {
                    setTimeout(function () {
                        opd.className = opd.className.replace('activeGM', '');
                        e.target.parentNode.className = e.target.parentNode.className.replace('activeGM', '');
                    }, 600)
                })(openedPandaDom)
            }
        }
    })

    $('.onemoreGSM').click(function () {
        $gameFailMask.css("display", "none");
        playtimes += 1;
        // console.log($('.flipContainerGM'));
        Array.prototype.slice.call($('.flipContainerGM')).forEach(function ($flipItem) {
            $flipItem.className = $flipItem.className.replace('activeGM', '');
        })
        startGame();
    })

    $('.rangeGSM').click(function () {
        $activityMask.css("display", "block");
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
            }, 2000)
        }, 2000)
    })
    
}



loadImages([
    "./src/img/bg.png",
    "./src/img/bgelips.png",
    "./src/img/dajiang.png",
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
    "./src/img/tong.png",
    "./src/img/ying.png",
    "./src/img/wenan.png",
    "./src/img/activityDesc/bg.png",
    "./src/img/activityDesc/leaderFour.png",
    "./src/img/activityDesc/meiji.png",
    "./src/img/activityDesc/panda.png",
    "./src/img/activityDesc/triangle.png",
    "./src/img/game/bg.png",
    "./src/img/game/bgmask.png",
    "./src/img/game/bingan.png",
    "./src/img/game/failp.png",
    "./src/img/game/failStar.png",
    "./src/img/game/gamebutton.png",
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
    "./src/img/game/progress1.png",
    "./src/img/game/progress2.png",
    "./src/img/game/succbg.png",
    "./src/img/game/succp.png",
    "./src/img/game/succStar.png",
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
]);
