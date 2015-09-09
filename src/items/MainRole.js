/**
 * Created by ningjian on 2015/9/9.
 */
var MainRole = cc.PhysicsSprite.extend({
    speed:5,
    //frameCache:null,
    animation:null,
    ctor:function(type){
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.MainRole_plist,res.MainRole_png);
        if(type==0){
            this._super("#RoleRight1.png");
            this.animation = new cc.Animation();
            for(var i = 1;i<5;i++){
                var frameName = "RoleRight"+i+".png";
                cc.log(frameName);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                this.animation.addSpriteFrame(spriteFrame);
            }
        }
        if(type==1){
            this._super("#RoleLeft1.png");
            this.animation = new cc.Animation();
            for(var i = 1;i<5;i++){
                var frameName = "RoleLeft"+i+".png";
                cc.log(frameName);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                this.animation.addSpriteFrame(spriteFrame);
            }
        }
        this.animation.setDelayPerUnit(0.1);
        this.animation.setRestoreOriginalFrame(false);
        var action = cc.animate(this.animation);
        this.runAction(cc.repeatForever(action));
    },
    bumpAnimation:function(bumpType){
        var frameCache = cc.spriteFrameCache;
        if(bumpType==5||bumpType==6||bumpType==7){
            frameCache.addSpriteFrames(res.RoleAnimation_plist,res.RoleAnimation_png);
            this.animation = new cc.Animation();
            for(var i = 1;i<3;i++){
                var frameName = "shock"+i+".png";
                cc.log(frameName);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                this.animation.addSpriteFrame(spriteFrame);
            }
        }else if(bumpType==0||bumpType==1||bumpType==9||bumpType==10||
            bumpType==11||bumpType==12||bumpType==13||bumpType==14){
            frameCache.addSpriteFrames(res.RoleAnimation_plist,res.RoleAnimation_png);
            this.animation = new cc.Animation();
            for(var i = 1;i<7;i++){
                var frameName = "role_stanbbed"+i+".png";
                cc.log(frameName);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                this.animation.addSpriteFrame(spriteFrame);
            }
            //cc.director.runScene(new GameOverScene());
        }else{
            frameCache.addSpriteFrames(res.MainRoleBump_plist,res.MainRoleBump_png);
            this.animation = new cc.Animation();
            for(var i = 1;i<5;i++){
                var frameName = "role_hurt"+i+".png";
                cc.log(frameName);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                this.animation.addSpriteFrame(spriteFrame);
            }
        }
        this.animation.setDelayPerUnit(0.1);
        this.animation.setRestoreOriginalFrame(false);
        //var action = cc.animate(this.animation);
        this.runAction(cc.animate(this.animation));
        //if(bumpType==0||bumpType==1||bumpType==9||bumpType==10||
        //    bumpType==11||bumpType==12||bumpType==13||bumpType==14){
        //    cc.director.runScene(new GameOverScene());
        //}
    }
});
MainRole.createType = function(type){
    return new MainRole(type);
};