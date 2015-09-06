/**
 * Created by MQN on 2015/9/1.
 */

var WelcomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var welcomelayer = new cc.LayerColor(cc.color(255,255,255));

        this.addChild(welcomelayer);
        var logo = new cc.Sprite(res.Logo_png);
        var size = cc.director.getWinSize();
        logo.x = size.width/2;
        logo.y = size.height/2;
        this.addChild(logo,1);

        setTimeout(function(){
            cc.director.runScene(new cc.TransitionFade(1, new MainScene));
        },1000);

    }
});