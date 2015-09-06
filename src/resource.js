var res = {
    BackGround_png : "res/bgElement/seabg.png",
    SeaStone1_png : "res/bgElement/seastone1.png",
    SeaStone2_png : "res/bgElement/seastone2.png",
    Role_png : "res/fish/role.png",
    RightBtn_png : "res/rightBtn.png",
    LeftBtn_png : "res/leftBtn.png",
    UpBtn_png : "res/upBtn.png",
    Bubble_png : "res/bgElement/bubble.png",
    Life_png : "res/bgElement/life.png",
    Blood_png : "res/bgElement/blood.png",
    Replay_png : "res/replay.png",

    Logo_png:"res/logo.png",
    Restart1_png:"res/btnProcess/restart1.png",
    Restart2_png:"res/btnProcess/restart2.png",
    Pause_png:"res/btnProcess/pause.png",
    Share_png:"res/btnProcess/share.png",
    Start1_png:"res/btnProcess/start1.png",
    Start2_png:"res/btnProcess/start2.png",
    VoiceOn_png:"res/btnProcess/voiceOn.png",
    VoiceOff_png:"res/btnProcess/voiceOff.png",

    StoneFish_png : "res/fishPlist/stonefish.png",
    StoneFish_plist : "res/fishPlist/stonefish.plist",
    AnimationFiveToOne_png : "res/fishPlist/animationFiveToOne.png",
    AnimationFiveToOne_plist : "res/fishPlist/animationFiveToOne.plist",
    Eel_png : "res/fishPlist/eel.png",
    Eel_plist : "res/fishPlist/eel.plist"
};

var g_resources = [];

for (var i in res) {
    g_resources.push(res[i]);
}

var raceRoad = [110,220,330,440,550,660];    //敌人轨道纵坐标
var xOffset = [1,1.2,1.4,1.6,1.8,2];         //
var speedRate = [0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3];  //速度比率系数
