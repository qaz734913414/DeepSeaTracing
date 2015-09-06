/**
 * Created by Embert on 2015/8/31.
 */
/**
 * Created by Embert on 2015/8/28.
 */
var GameSceneUI = cc.Layer.extend({
    distanceShow:null,
    _life:null,
    music_tag:1,
    ctor:function() {
        this._super();
        var size = cc.winSize;
        var rightBtn = new cc.Sprite(res.RightBtn_png);
        rightBtn.x = 147;
        rightBtn.y = 0;
        rightBtn.anchorX = 0;
        rightBtn.anchorY = 0;
        this.addChild(rightBtn,2);

        //Add Button
        var LeftBtn = new cc.Sprite(res.LeftBtn_png);
        LeftBtn.x = 0;
        LeftBtn.y = 0;
        LeftBtn.anchorX = 0;
        LeftBtn.anchorY = 0;
        this.addChild(LeftBtn,2);

        var UpBtn = new cc.Sprite(res.UpBtn_png);
        UpBtn.x = size.width;
        UpBtn.y = 0;
        UpBtn.anchorX = 1;
        UpBtn.anchorY = 0;
        this.addChild(UpBtn,2);

        this.distanceShow = new cc.LabelTTF("0","Arial",48);
        this.distanceShow.x = 180;
        this.distanceShow.y = size.height-80;
        //this.distanceShow.anchorX = 0;
        //this.distanceShow.anchorY = 0;
        this.addChild(this.distanceShow, 1);

        this._life = new cc.Sprite(res.Life_png);
        this._life.x = 180;
        this._life.y = size.height-30;
        this.addChild(this._life,1);

        //重新开始按钮
        var restartMenu = new cc.MenuItemImage(res.Restart1_png,res.Restart1_png,function(){
            //this.removeAllChildren();
            cc.director.resume();
            cc.director.runScene(new cc.TransitionCrossFade(0.5,new MainScene()));
        },this);
        var restartMu = new cc.Menu(restartMenu);
        restartMu.x = size.width/2;
        restartMu.y = size.height/4;

        //继续游戏按钮
        var resumeMenu = new cc.MenuItemImage(res.Start2_png,res.Start2_png,function(){
            this.removeChild(resumeMu);
            this.removeChild(restartMu);
            this.removeChild(btnVoiceOff);
            this.removeChild(btnVoiceOn);
            cc.director.resume();
        },this);
        var resumeMu = new cc.Menu(resumeMenu);
        resumeMu.x = size.width/2 - size.width/8;
        resumeMu.y = size.height/2;

        //音乐开关按钮
        cc.audioEngine.playMusic("res/playingMusic.mp3", true);//暂时与主页音乐相同，后期会替换
        var voiceOn = new cc.MenuItemImage(res.VoiceOn_png,res.VoiceOn_png,function(){
            this.music_tag = 0;
            cc.audioEngine.stopMusic();
            btnVoiceOn.setVisible(false);
            btnVoiceOff.setVisible(true);
        },this);
        var btnVoiceOn = new cc.Menu(voiceOn);
        btnVoiceOn.x = size.width/2 + size.width/8;
        btnVoiceOn.y = size.height/2;
        //this.addChild(btnVoiceOn,2);

        var voiceOff = new cc.MenuItemImage(res.VoiceOff_png,res.VoiceOff_png,function(){
            this.music_tag = 1;
            cc.audioEngine.playMusic("res/playingMusic.mp3", true);
            btnVoiceOn.setVisible(true);
            btnVoiceOff.setVisible(false);
        },this);
        var btnVoiceOff = new cc.Menu(voiceOff);
        btnVoiceOff.x = size.width/2 + size.width/8;
        btnVoiceOff.y = size.height/2;
        //this.addChild(btnVoiceOff,2);
        //btnVoiceOff.setVisible(false);
        //暂停按钮
        var pauseMenu = new cc.MenuItemImage(res.Pause_png,res.Pause_png,function(){
            this.addChild(resumeMu,2);
            this.addChild(restartMu,2);
            this.addChild(btnVoiceOn,2);
            this.addChild(btnVoiceOff,2);
            if(this.music_tag == 1){
                btnVoiceOn.setVisible(true);
                btnVoiceOff.setVisible(false);
            }else if(this.music_tag == 0){
                btnVoiceOn.setVisible(false);
                btnVoiceOff.setVisible(true);
            }

            cc.director.pause();
        },this);
        //pauseMenu.setAnchorPoint(1,0);
        var pauseMu = new cc.Menu(pauseMenu);
        pauseMu.x = size.width-40;
        pauseMu.y = size.height-40;
        this.addChild(pauseMu, 2);

    }

});