var res = {
    //BackGround_png : "res/bgElement/background.png",
    Bg0_png : "res/bg/bg0.png",
    Bg1_png : "res/bg/bg1.png",
    Bg2_png : "res/bg/bg2.png",
    Bg3_png : "res/bg/bg3.png",
    Bg4_png : "res/bg/bg4.png",
    Bg5_png : "res/bg/bg5.png",
    Bg6_png : "res/bg/bg6.png",
    Bg7_png : "res/bg/bg7.png",
    Bg8_png : "res/bg/bg8.png",
    Bg9_png : "res/bg/bg9.png",
    SeaStone1_png : "res/bgElement/seastone1.png",
    SeaStone2_png : "res/bgElement/seastone2.png",
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
    Eel_plist : "res/fishPlist/eel.plist",
    AllEnemyFish_plist : "res/AllEnemyFish.plist",
    AllEnemyFish_png : "res/AllEnemyFish.png",
    MainRole_plist : "res/role/RolesSwim.plist",
    MainRole_png : "res/role/RolesSwim.png",
    MainRoleBump_png : "res/role/SimpleBump.png",
    MainRoleBump_plist : "res/role/SimpleBump.plist",
    RoleAnimation_plist : "res/role/RoleAnimation.plist",
    RoleAnimation_png : "res/role/RoleAnimation.png"
};

var g_resources = [];

for (var i in res) {
    g_resources.push(res[i]);
}

var raceRoad = [110,220,330,440,550,660];    //敌人轨道纵坐标
var xOffset = [1,1.2,1.4,1.6,1.8,2];         //
var speedRate = [0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3];  //速度比率系数

var enemyFishType = [60,60,32,32,36,36,60,60,60,60,
                    28,24,20,20,32,32,36,44,12,16];//前十屏53条鱼的种类顺序
var enemyFishX = [534,714,1187,1453,1994,2251,2722,2903,3028,2850,
                2977,3033,3114,3230,3500,3656,3931,4554,4652,4692];//前十屏53条鱼的横坐标
var enemyFishY = [230,334,292,379,284,413,334,280,361,404,
                622,579,587,558,374,264,380,338,209,451];//前十屏53条鱼的纵坐标
