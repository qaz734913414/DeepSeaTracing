/**
 * Created by MQN on 2015/9/1.
 */

var MainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        var bg =new cc.Sprite(res.BackGround_png);
        var size = cc.director.getWinSize();
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg,1);

        //开始按钮
        var start1 = new cc.MenuItemImage(res.Start1_png,res.Start1_png,this.startGame,this);
        var btnStart1 = new cc.Menu(start1);
        btnStart1.x = size.width/2 + size.width/8;
        btnStart1.y = size.height/3.5;
        this.addChild(btnStart1,2);

        //音乐开关按钮
        cc.audioEngine.playMusic("res/playingMusic.mp3", true);
        var voiceOn = new cc.MenuItemImage(res.VoiceOn_png,res.VoiceOn_png,function(){
            cc.audioEngine.stopMusic();
            btnVoiceOn.setVisible(false);
            btnVoiceOff.setVisible(true);
        },this);
        var btnVoiceOn = new cc.Menu(voiceOn);
        btnVoiceOn.x = size.width/2 - size.width/8;
        btnVoiceOn.y = size.height/3.5;
        this.addChild(btnVoiceOn,2);

        var voiceOff = new cc.MenuItemImage(res.VoiceOff_png,res.VoiceOff_png,function(){
            cc.audioEngine.playMusic("res/playingMusic.mp3", true);
            btnVoiceOn.setVisible(true);
            btnVoiceOff.setVisible(false);
        },this);
        var btnVoiceOff = new cc.Menu(voiceOff);
        btnVoiceOff.x = size.width/2 - size.width/8;
        btnVoiceOff.y = size.height/3.5;
        this.addChild(btnVoiceOff,2);
        btnVoiceOff.setVisible(false);

        return true;
    },

    startGame:function(){
        cc.audioEngine.stopMusic();
        cc.director.runScene(new cc.TransitionFade(1.2, new GameScene ));
    }

});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var mainlayer = new MainLayer();
        this.addChild(mainlayer);

    }
});
