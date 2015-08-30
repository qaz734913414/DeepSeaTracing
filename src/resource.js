var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    BackGround_png : "res/bgElement/seabg.png",
    SeaStone1_png : "res/bgElement/seastone1.png",
    SeaStone2_png : "res/bgElement/seastone2.png",
    Role_png : "res/fish/role.png",
    RightBtn_png : "res/rightBtn.png",
    LeftBtn_png : "res/leftBtn.png",
    UpBtn_png : "res/upBtn.png",
    Bubble_png : "res/bgElement/bubble.png",
    Tuna_png : "res/fish/tuna.png",
    Life_png : "res/bgElement/life.png",
    Blood_png : "res/bgElement/blood.png",
    Replay_png : "res/replay.png",
    Puffer_plist : "res/puffer.plist",
    Puffer_png : "res/puffer.png",
    Fish_png : "res/fish.png",
    Fish_plist : "res/fish.plist",
    FishSize_plist : "res/fishsize.plist",
    FishSize_png : "res/fishsize.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var raceRoad = [110,220,330,440,550,660];    //6条轨道中心点
var xOffset = [1,1.2,1.4,1.6,1.8,2];         //
var speedRate = [0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3];  //速度变换倍率
