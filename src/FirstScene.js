/**
 * Created by njw on 2015/8/22.
 */
var SPRITE_WIDTH = 77;
var SPRITE_HIEGTH = 70;
var DEBUG_NODE_SHOW = true;

var FirstLayer = cc.Layer.extend({
    sprite:null,//main role
    bubble:null,
    touchLeft:null,
    touchRight:null,
    touchUp:null,
    _tuna1:null,
    _tuna2:null,
    _tuna3:null,
    _life:null,
    losslife:0,
    seaStone1:null,
    seaStone2:null,
    bloodNum:10,
    body:null,
    shape:null,
    space:null,
    speed:5,
    screenWidth:0,
    screenHeight:0,
    ctor:function(){
        this._super();
        this.initPhysics();
        this.scheduleUpdate();

        var size = cc.winSize;
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        var background1 = new cc.Sprite(res.BackGround_png);
        background1.setPosition(size.width/2,size.height/2);
        this.addChild(background1,0);

        var rightBtn = new cc.Sprite(res.RightBtn_png);
        rightBtn.setPosition(147,0);
        rightBtn.setAnchorPoint(0,0);
        this.addChild(rightBtn,2,2);

        var LeftBtn = new cc.Sprite(res.LeftBtn_png);
        LeftBtn.setPosition(0,0);
        LeftBtn.setAnchorPoint(0,0);
        this.addChild(LeftBtn,2,2);

        var UpBtn = new cc.Sprite(res.UpBtn_png);
        UpBtn.setPosition(size.width,0);
        UpBtn.setAnchorPoint(1,0);
        this.addChild(UpBtn,2,2);

        this.seaStone1 = new cc.Sprite(res.SeaStone1_png);
        this.seaStone1.setPosition(0,0);
        this.seaStone1.setAnchorPoint(0,0);
        this.addChild(this.seaStone1,1);

        this.seaStone2 = new cc.Sprite(res.SeaStone2_png);
        this.seaStone2.setPosition(this.screenWidth,0);
        this.seaStone2.setAnchorPoint(0,0);
        this.addChild(this.seaStone2,1);

        this.bubble = new cc.Sprite(res.Bubble_png);
        this.bubble.setPosition(this.screenWidth/4*3,this.screenHeight/2);
        this.addChild(this.bubble,2);

////////////////////敌方鱼加动画////////////////////////////
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.Puffer_plist,res.Puffer_png);

        this._tuna1 = new cc.Sprite("#puffer01.png");
        this._tuna1.x = size.width;
        this._tuna1.y = size.height/2;
        this.addChild(this._tuna1, 1);

        var animation = new cc.Animation();
        for(var i=1;i<4;i++){
            var frameName = "puffer0"+i+".png";
            cc.log(frameName);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);
        }
        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(false);
        var action = cc.animate(animation);
        var action1 = cc.animate(animation);
        var action2 = cc.animate(animation);
        this._tuna1.runAction(cc.repeatForever(action));

        this._tuna2 = new cc.Sprite("#puffer01.png");
        this._tuna2.x = size.width*1.5;
        this._tuna2.y = size.height/3;
        this.addChild(this._tuna2, 1);
        this._tuna2.runAction(cc.repeatForever(action1));

        this._tuna3 = new cc.Sprite("#puffer01.png");
        this._tuna3.x = size.width*1.8;
        this._tuna3.y = size.height/1.8;
        this.addChild(this._tuna3, 1);
        this._tuna3.runAction(cc.repeatForever(action2));



        this.addParticleSystem(this._tuna1);
        this.addParticleSystem(this._tuna2);
        this.addParticleSystem(this._tuna3);

        //生命条
        this._life = new cc.Sprite(res.Life_png);
        this._life.x = 180;
        this._life.y = size.height-30;
        this.addChild(this._life,1);
        this.addLife();

///////////////////////////敌方鱼////////////////////////////

        //初始化主角
        this.addNewSpriteAtPosition(size.width/4,size.height/4);
    },

    setupDebugNode:function(){
        this._debugNode=new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible=DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);
    },

    /////////////////粒子系统，敌方鱼吐气泡///////////////////////
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

//--------------------------多点触摸-------------------------//

    ///**
    //* 多点触控
    //* */

    onEnter:function() {
        this._super();
        cc.log("onEnter");
        if('touches' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan:this.onTouchesBegan.bind(this),
                //onTouchesMoved:this.onTouchesMoved.bind(this),
                onTouchesEnded:this.onTouchesEnded.bind(this)
            },this)
        }else{
            cc.log("Touches unsupported");
        }
    },
    onTouchesBegan:function(touches,event){
        var target = event.getCurrentTarget();
        for(var i=0;i<touches.length;i++){
            var touch = touches[i];
            var location = touch.getLocation();
            if(location.x>=0&&location.x<=147&&location.y>=0&&location.y<=141) {
                this.touchLeft = 1;
            }
            if(location.x>=147&&location.x<=294&&location.y>=0&&location.y<=141) {
                this.touchRight = 1;
            }
            if(location.x>=1130&&location.x<=1280&&location.y>=0&&location.y<=120){
                //this.touchBegan = 1;
                this.touchUp = 1;
                var speed = new cp.Vect();
                speed.x = 0;
                speed.y = 0;
                this.body.setVel(speed);
                delete speed;
            }
        }
        return true;
    },
    onTouchesEnded:function(touches,event){
        var target = event.getCurrentTarget();
        for(var i=0;i<touches.length;i++) {
            var touch = touches[i];
            var location = touch.getLocation();
            if(location.x>=0&&location.x<=147){
                this.touchLeft = 0;
                this.touchRight = 0;
            }
            if(location.x>147&&location.x<=this.screenWidth/2){
                this.touchRight = 0;
                this.touchLeft = 0;
            }
            if(location.x>this.screenWidth/2&&location.x<=this.screenWidth){
                this.touchUp = 0;
            }
        }
    },
    onExit:function(){
        this._super();
        cc.log("onExit");
        cc.eventManager.removeListener(cc.EventListener.TOUCH_ALL_AT_ONCE);
    },

//-----------------------多点触摸-----------------//

//-----------------------单点触摸start-----------------//
    /**
     * 单点触控
     * */

    //onEnter:function(){
    //    this._super();
    //    cc.log("onEnter");
    //    var listener = cc.EventListener.create({
    //        event:cc.EventListener.TOUCH_ONE_BY_ONE,
    //        onTouchBegan:this.onTouchBegan.bind(this),
    //        //onTouchMoved:this.onTouchMoved.bind(this),
    //        onTouchEnded:this.onTouchEnded.bind(this)
    //    });
    //    cc.eventManager.addListener(listener,this);
    //},
    //onTouchBegan:function(touch,event){
    //    cc.log("onTouchBegan");
    //    //var target = event.getCurrentTarget();
    //    var location = touch.getLocation();
    //
    //    if(location.x>=0&&location.x<=147&&location.y>=0&&location.y<=141) {
    //        this.touchLeft = 1;
    //    }
    //    if(location.x>=147&&location.x<=294&&location.y>=0&&location.y<=141) {
    //        this.touchRight = 1;
    //    }
    //    if(location.x>=1130&&location.x<=1280&&location.y>=0&&location.y<=120){
    //        this.touchUp = 1;
    //        var speed = new cp.Vect();
    //        speed.x = 0;
    //        speed.y = 0;
    //        this.body.setVel(speed);
    //        delete speed;
    //    }
    //    return true;
    //},
    //onTouchEnded : function(touch, event) {
    //    cc.log("onTouchEnded");
    //    var location = touch.getLocation();
    //    if(location.x>=0&&location.x<=147){
    //        this.touchLeft = 0;
    //        this.touchRight = 0;
    //    }
    //    if(location.x>147&&location.x<=this.screenWidth/2){
    //        this.touchRight = 0;
    //        this.touchLeft = 0;
    //    }
    //    if(location.x>this.screenWidth/2&&location.x<=this.screenWidth){
    //        this.touchUp = 0;
    //    }
    //    return true;
    //},
    //onExit:function(){
    //    this._super();
    //    cc.log("onExit");
    //    cc.eventManager.removeListener(cc.EventListener.TOUCH_ONE_BY_ONE);
    //},

//-------------------------------单点触摸end------------------------//
    initPhysics:function(){
        var winSize = cc.director.getWinSize();

        this.space = new cp.Space();
        this.setupDebugNode();

        this.space.gravity = cp.v(0,-10);

        var staticBody = this.space.staticBody;

        var walls = [new cp.SegmentShape(staticBody,cp.v(0,50),cp.v(winSize.width,50),0),
            new cp.SegmentShape(staticBody,cp.v(0,winSize.height),cp.v(winSize.width,winSize.height),0),
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(0,winSize.height),0),
            new cp.SegmentShape(staticBody,cp.v(winSize.width,0),cp.v(winSize.width,winSize.height),0),
        ];
        for (var i=0;i<walls.length;i++){
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            this.space.addStaticShape(shape);
        }
    },

    addNewSpriteAtPosition:function(x,y){
        cc.log("addNewSpriteAtPosition");
        this.body = new cp.Body(1,cp.momentForBox(1,SPRITE_WIDTH,SPRITE_HIEGTH));
        var gavition = new cp.Vect();
        gavition.x = x;
        gavition.y = y;
        this.body.setPos(gavition);
        delete gavition;
        this.space.addBody(this.body);

        this.shape = new cp.BoxShape(this.body,SPRITE_WIDTH,SPRITE_HIEGTH);
        this.shape.setElasticity(0.2);
        this.shape.setFriction(0.1);
        this.space.addShape(this.shape);

        this.sprite = new cc.PhysicsSprite(res.Role_png);
        this.sprite.setBody(this.body);
        this.sprite.setPosition(x,y);
        this.addChild(this.sprite,2);

    },

    update:function(dt){
        var timeStep = 0.03;
        this.space.step(timeStep);

        if(this.sprite.x<20){
            this.sprite.setPositionX(20);
        }
        if(this.sprite.x>(this.screenWidth/2)){
            this.sprite.setPositionX(this.screenWidth/2);
        }
        if(this.sprite.y<20){
            this.sprite.setPositionY(20);
        }
        if(this.sprite.y>(this.screenHeight-20)){
            this.sprite.setPositionY(this.screenHeight-20);
        }

        //move left
        if(this.touchLeft==1){
            this.sprite.runAction(cc.MoveTo.create(1,this.sprite.x-5,this.sprite.y));
        }
        //move right
        if(this.touchRight==1){
            if(this.sprite.getPositionX()<this.screenWidth/2){
                //主角在屏幕左半边，主角移动
                this.sprite.runAction(cc.MoveTo.create(1,this.sprite.x+5,this.sprite.y));
            }else{
                //主角在屏幕中间
                this.seaStone1.setPositionX(this.seaStone1.getPositionX()-this.speed);
                this.seaStone2.setPositionX(this.seaStone2.getPositionX()-this.speed);
                this.bubble.x -= (this.speed);
            }
        }
        //move upward
        if(this.touchUp==1&&this.sprite.getPositionY()<(this.screenHeight-SPRITE_HIEGTH)){
            this.sprite.runAction(cc.MoveTo.create(1,this.sprite.x,this.sprite.y+10));
        }

        if(this.seaStone1.getPositionX()<(-this.screenWidth)) {
            this.seaStone1.setPositionX(this.screenWidth);
            this.seaStone2.setPositionX(0);
            this.reduceLife();

        }
        if(this.seaStone2.getPositionX()<(-this.screenWidth)){
            this.seaStone2.setPositionX(this.screenWidth);
            this.seaStone1.setPositionX(0);
            this.reduceLife();
        }

        //敌人移动
        this._tuna1.x -= (this.speed*1.3);
        this._tuna2.x -= (this.speed*1.8);
        this._tuna3.x -= (this.speed*1.5);
        //this.bubble.x -= (this.speed);
        //敌人循环出现
        if(this._tuna1.x<=-this.screenWidth/2){
            this._tuna1.setPositionX(this.screenWidth*1.1);
        }
        if(this._tuna2.x<=-this.screenWidth/2){
            this._tuna2.setPositionX(this.screenWidth*1.1);
        }
        if(this._tuna3.x<=-this.screenWidth/2){
            this._tuna3.setPositionX(this.screenWidth*1.1);
        }

        if(this.bumpExplore(this._tuna1,this.sprite)&&this.losslife==0){
            this.reduceLife();
            cc.log("bump1");
            this.sprite.runAction(cc.blink(1,4));
        }
        if(this.bumpExplore(this._tuna2,this.sprite)&&this.losslife==0){
            this.reduceLife();
            cc.log("bump2");
            var action = cc.blink(1,4);
            this.sprite.runAction(action);
        }
        if(this.bumpExplore(this._tuna3,this.sprite)&&this.losslife==0){
            this.reduceLife();
            cc.log("bump3");
            var action = cc.blink(0.5,4);
            this.sprite.runAction(action);
        }
        if(this.bumpExplore(this.bubble,this.sprite)){
            if(this.bloodNum<10){
                this.bloodNum++;
            }
            cc.log("add life");
            this.bubble.setPositionX(this.screenWidth);
            this.displayLife();
        }
        if(this.bubble.getPositionX()<0){
            this.bubble.setPositionX(this.screenWidth);
        }
        if((Math.abs(this._tuna1.x-this.sprite.x)>100||Math.abs(this._tuna1.y-this.sprite.y)>65)&&
            (Math.abs(this._tuna2.x-this.sprite.x)>100||Math.abs(this._tuna2.y-this.sprite.y)>65)&&
            (Math.abs(this._tuna3.x-this.sprite.x)>100||Math.abs(this._tuna3.y-this.sprite.y)>65)){
            this.losslife = 0;
        }

    },

    bumpExplore:function(sprite1,sprite2){
        //&&(sprite1.x - sprite2.x)>=100
        if((sprite1.x - sprite2.x)<=100&&(sprite1.x - sprite2.x)>=-100&&
            ((sprite1.y - sprite2.y<65)&&(sprite1.y - sprite2.y>-65))){
            //this.losslife = 1;
            return true;
        }else{
            return false;
        }
    },

    addLife: function () {
        var life = res.Blood_png;
        var lifes = [life];
        this.mylife = [new cc.Sprite(life)];
        this.mylife[0].x = 11;
        this.mylife[0].y = 9;
        for (var i = 0; i <10; i++) {
            lifes[i] = life;
            this.mylife[i + 1] = new cc.Sprite(lifes[i]);

            this.mylife[i + 1].x = this.mylife[i].x + 16;
            this.mylife[i + 1].y = 9;

        }
        this.bloodNum = lifes.length;

        for(var i=0; i<10; i++){
            this._life.addChild(this.mylife[i], 1);
        }
        delete life;
        delete lifes;
    },

    displayLife:function(){
        for (var i = 0; i <10; i++) {
            this._life.removeChild(this.mylife[i], 1);
        }
        for(var i = 0; i < this.bloodNum; i++){
            this._life.addChild(this.mylife[i],1);
        }
    },

    reduceLife:function(){
        this.losslife = 1;
        this.bloodNum --;
        if(this.bloodNum==0){
            cc.director.runScene(new cc.TransitionCrossFade(1.0, new GameOverScene()));
        }
        console.log("bloodNum: " + this.bloodNum);
        for (var i = 0; i <10; i++) {
            this._life.removeChild(this.mylife[i], 1);
        }
        for(var i = 0; i < this.bloodNum; i++){
            this._life.addChild(this.mylife[i],1);
        }
    }
});

var FirstScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FirstLayer();
        this.addChild(layer);
    }
});