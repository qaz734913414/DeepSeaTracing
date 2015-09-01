/**
 * Created by njw on 2015/8/25.
 */
var GameOverLayer = cc.Layer.extend({
    sprite:null,
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var background = new cc.Sprite(res.BackGround_png);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background,0);

        var seastone = new cc.Sprite(res.SeaStone1_png);
        seastone.setPosition(0,0);
        seastone.setAnchorPoint(0,0);
        this.addChild(seastone,1);

        var gameoverLabel = new cc.LabelTTF("Game Over","Arial",50);
        gameoverLabel.setPosition(size.width/2,size.height/2);
        this.addChild(gameoverLabel,1);

        var mainRole = new cc.Sprite(res.Role_png);
        mainRole.setPosition(size.width/4,size.height/4);
        this.addChild(mainRole,2);

        var replayMenu = new cc.MenuItemImage(res.Replay_png,res.Replay_png,function(){
            cc.director.runScene(new cc.TransitionCrossFade(0.5,new GameScene()))},this);
        replayMenu.setPosition(size.width,0);
        replayMenu.setAnchorPoint(1,0);

        var mu = new cc.Menu(replayMenu);
        mu.setPosition(0, 0);
        this.addChild(mu, 2);

        //var seq = cc.sequence(cc.scaleTo(0.5,1.5),cc.scaleTo(0.5,1.0));
        //replayMenu.runAction(cc.repeatForever(seq));
        replayMenu.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,1.5),cc.scaleTo(0.5,1.0))));

        return true;
    }
});
var GameOverScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});