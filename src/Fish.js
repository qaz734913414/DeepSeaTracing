/**
 * Created by njw on 2015/8/27.
 */
var Fish = cc.Sprite.extend({
    type:0,
    speed:5,
    ctor:function(type){
        cc.log("random num:"+type);
        var size = cc.winSize;
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.Fish_plist,res.Fish_png);
        var temp = (1+(type-1)*3);
        this._super("#fish"+temp+".png");
        this.init(type);
        var animation = new cc.Animation();
        for(var i = temp;i<temp+3;i++){
            var frameName = "fish"+i+".png";
            cc.log(frameName);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);
        }

        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(false);
        var action = cc.animate(animation);
        this.runAction(cc.repeatForever(action));
        this.addParticleSystem(this);

        return true;
    },
    addParticleSystem:function(sprite){
        var particleSystem = new cc.ParticleSystem(5);
        //var particleSystem1 = new cc.ParticleFlower(20);
        particleSystem.texture = cc.textureCache.addImage(res.Bubble_png);

        particleSystem.x = 0;
        particleSystem.y = 26;
        particleSystem.duration = cc.ParticleSystem.DURATION_INFINITY;
        particleSystem.emitterMode = cc.ParticleSystem.MODE_GRAVITY;
        particleSystem.gravity = cc.p(0,-20);
        particleSystem.setRadialAccel(0);
        particleSystem.setRadialAccelVar(0);
        particleSystem.setSpeed(180);
        particleSystem.setSpeedVar(50);
        particleSystem.setAngle(90);
        particleSystem.setAngleVar(20);
        particleSystem.setLife(3.5);
        particleSystem.setLifeVar(1);
        particleSystem.emissionRate = particleSystem.totalParticles / particleSystem.life;
        particleSystem.setStartColor(cc.color(0,0,255, 128));
        particleSystem.setStartColorVar(cc.color(0, 0, 10, -50));
        particleSystem.setEndColor(cc.color(0, 0, 255, 128));
        particleSystem.setEndColorVar(cc.color(0, 0, 0, 0));
        particleSystem.setStartSize(20.0);
        particleSystem.setStartSizeVar(5.0);
        particleSystem.setEndSize(40.0);
        sprite.addChild(particleSystem);
        //sprite.addChild(particleSystem1);
        console.log("particleSystem~~~~~~~");
    },
    init:function(type){
        this.type = type;
        this.speed = this.getRandomSpeed();
        return true;
    },
    getRandomSpeed:function(){
        /**
         *产生随机速率
         * */
        var random=parseInt(Math.random()*15);
        return speedRate[random]*5;
    }
});
Fish.createRandomType = function(){
    return new Fish(Math.ceil(Math.random()*3));
};
