/**
 * Created by ningjian on 2015/9/15.
 */

var WelcomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var welcomeLayer = new cc.LayerColor(cc.color(255,255,255));

        this.addChild(welcomeLayer);
        var logo = new cc.Sprite(res.Logo_png);
        var size = cc.director.getWinSize();
        logo.x = size.width/2;
        logo.y = size.height/2;
        this.addChild(logo,1);

        setTimeout(function(){
            cc.director.runScene(new cc.TransitionFade(1, new MainScene()));
        },1000);

    }
});

var MainLayer = cc.Layer.extend({
    sprite:null,
    drop1:null,
    drop2:null,
    ctor:function () {

        this._super();
        this.scheduleUpdate();
        var size = cc.director.getWinSize();

        //开始按钮
        var start1 = new cc.MenuItemImage(res.Start1_png,res.Start1_png,this.startGame,this);
        var btnStart1 = new cc.Menu(start1);
        btnStart1.x = size.width/2;
        btnStart1.y = size.height/2-50;
        this.addChild(btnStart1,3);

        /************9.8增加主页面元素*************/
        //背景
        var bg = new cc.Sprite(res.MainBg1_png);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg,1);


        /**********9.7修改音乐开关状态**************/

        //游戏名
        var GameName = new cc.Sprite(res.GameName_png);
        GameName.x = size.width/2;
        GameName.y = size.height/1.5;
        this.addChild(GameName,3);

        //前景1
        var bg2 = new cc.Sprite(res.MainBg2_png);
        bg2.x = size.width - 636;
        bg2.y = 163;
        this.addChild(bg2,3);

        //前景2
        var bg3 = new cc.Sprite(res.MainBg3_png);
        bg3.x = 470;
        bg3.y = size.height - 67;
        this.addChild(bg3,3);

        //水滴1
        var Drop1 = new cc.Sprite(res.drop_png);
        Drop1.x = 275;
        Drop1.y = size.height - 70;
        this.drop1 = Drop1;
        this.addChild(this.drop1,3);
        var action = cc.fadeOut(3);
        this.drop1.runAction(action);

        //水滴2
        var Drop2 = new cc.Sprite(res.drop_png);
        Drop2.x = 750;
        Drop2.y = size.height - 70;
        this.drop2 = Drop2;
        this.addChild(this.drop2,3);
        var action1 = cc.fadeOut(1);
        this.drop2.runAction(action1);

        //石头
        var stone = new cc.Sprite(res.Stone_png);
        stone.x = 890;
        stone.y = 305;
        var action2 = cc.moveTo(4, cc.p(375,68));
        stone.runAction(action2);
        this.addChild(stone, 3);
        setTimeout(function(){
            stone.pause();
        },2);
        setTimeout(function(){
            stone.resume();
        },1000);


        //音乐开，按下后音乐会关闭
        var voiceOn = new cc.MenuItemImage(res.VoiceOn_png,res.VoiceOn_png,function(){
            MSMusic_tag = 0;

            cc.audioEngine.stopMusic();
            btnVoiceOn.setVisible(false);
            btnVoiceOff.setVisible(true);
        },this);
        var btnVoiceOn = new cc.Menu(voiceOn);

        btnVoiceOn.x = size.width - 80;
        btnVoiceOn.y = 70;
        this.addChild(btnVoiceOn,4);

        //音乐关，按下后音乐会开始
        var voiceOff = new cc.MenuItemImage(res.VoiceOff_png,res.VoiceOff_png,function(){
            MSMusic_tag = 1;
            console.log("musicOn  " + MSMusic_tag);
            cc.audioEngine.playMusic("res/playingMusic.mp3", true);
            btnVoiceOn.setVisible(true);
            btnVoiceOff.setVisible(false);
        },this);
        var btnVoiceOff = new cc.Menu(voiceOff);
        btnVoiceOff.x = size.width - 80;
        btnVoiceOff.y = 70;
        this.addChild(btnVoiceOff,4);
        btnVoiceOff.setVisible(false);
        //根据标签来判断音乐开关当前的状态
        if(MSMusic_tag==1) {
            console.log("musicOn-----------" + MSMusic_tag);
            cc.audioEngine.playMusic("res/playingMusic.mp3", true);
            btnVoiceOn.setVisible(true);
            btnVoiceOff.setVisible(false);
        }else if(MSMusic_tag==0){
            console.log("musicOff----------" +MSMusic_tag);
            cc.audioEngine.stopMusic();
            btnVoiceOn.setVisible(false);
            btnVoiceOff.setVisible(true);
        }


        /**********9.8添加主页粒子特效**************/
        var MSParticleSystem = new cc.ParticleSystem(500);
        MSParticleSystem.texture = cc.textureCache.addImage(res.Light_png);

        MSParticleSystem.setDuration(cc.ParticleSystem.DURATION_INFINITY);

        MSParticleSystem.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);

        // Gravity Mode: gravity
        MSParticleSystem.setGravity(cc.p(10, -10));

        // Gravity Mode: radial
        MSParticleSystem.setRadialAccel(10);
        MSParticleSystem.setRadialAccelVar(1);

        // Gravity Mode: tangential
        MSParticleSystem.setTangentialAccel(-1);
        MSParticleSystem.setTangentialAccelVar(1);

        // Gravity Mode: speed of particles
        MSParticleSystem.setSpeed(30);
        MSParticleSystem.setSpeedVar(10);

        // angle
        MSParticleSystem.setAngle(-90);
        MSParticleSystem.setAngleVar(50);

        // emitter position
        var winSize = cc.director.getWinSize();
        MSParticleSystem.setPosition(winSize.width / 2, winSize.height);
        MSParticleSystem.setPosVar(cc.p(winSize.width / 2, winSize.height));

        // life of particles
        MSParticleSystem.setLife(3);
        MSParticleSystem.setLifeVar(0);

        // size, in pixels
        MSParticleSystem.setStartSize(4.0);
        MSParticleSystem.setStartSizeVar(2.0);
        MSParticleSystem.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        MSParticleSystem.setEmissionRate(100);

        // color of particles
        MSParticleSystem.setStartColor(cc.color(255, 255, 255, 255));
        MSParticleSystem.setStartColorVar(cc.color(0, 255, 0, 255));
        MSParticleSystem.setEndColor(cc.color(255, 204, 255, 0));
        MSParticleSystem.setEndColorVar(cc.color(0, 0, 0, 0));

        // additive
        MSParticleSystem.setBlendAdditive(false);

        this.addChild(MSParticleSystem,2);

        return true;
    },

    startGame:function(){
        cc.audioEngine.stopMusic();
        cc.director.pushScene(new cc.TransitionFade(1.2, new GameScene()));
    },

    update:function(dt){
        var size = cc.director.getWinSize();
        this.drop1.y -= 3;
        this.drop2.y -= 2;
        if(this.drop1.y < -200){
            this.drop1.x = 275;
            this.drop1.y = size.height - 70;
            var action2 = cc.fadeIn(0.01);
            var action3 = cc.fadeOut(3);
            var sequence = cc.sequence(action2,action3);
            this.drop1.runAction(sequence);
        }
        if(this.drop2.y < 500){
            this.drop2.x = 750;
            this.drop2.y =  size.height - 70;
            var action2 = cc.fadeIn(0.01);
            var action3 = cc.fadeOut(1);
            var sequence = cc.sequence(action2,action3);
            this.drop2.runAction(sequence);
        }
    }

});
var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var mainLayer = new MainLayer();
        this.addChild(mainLayer);

    }
});

//游戏主场景start
var SPRITE_WIDTH = 60;
var SPRITE_HEIGHT = 60;
var DEBUG_NODE_SHOW = true;
var GameSceneLayer = cc.Layer.extend({
    space:null,
    sprite:null,
    sprite1:null,
    shapePos:0,
    ground:null,
    groundSpeed:3,
    offset:null,
    map1:null,
    map_01_2:null,
    map_01_a:null,
    map_01_b:null,
    map_02_1:null,
    map_01_stone1:null,
    map_01_stone2:null,
    map_01_wheel:null,
    enemyFish1:null,
    enemyFish2:null,
    enemyFish3:null,
    enemyFish4:null,
    enemyFish5:null,
    enemyFish6:null,
    screenWidth:0,
    screenHeight:0,
    roleBody:null,

    touchLeft:null,
    touchUp:null,
    touchRight:null,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        var bg = new cc.Sprite(res.SeaBg_png);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg,0);

        this.enemyFish1 = Fish.createType(15);
        this.enemyFish1.x = this.screenWidth/2;
        this.enemyFish1.y = 790;
        this.addChild(this.enemyFish1,1);

        this.enemyFish2 = Fish.createType(13);
        this.enemyFish2.x = 1112;
        this.enemyFish2.y = 448;
        this.addChild(this.enemyFish2,1);

        this.enemyFish3 = Fish.createType(15);
        this.enemyFish3.x = this.screenWidth/2+100;
        this.enemyFish3.y = 760;
        this.addChild(this.enemyFish3,1);

        this.enemyFish4 = Fish.createType(5);
        this.enemyFish4.x = 869;
        this.enemyFish4.y = -120;
        this.addChild(this.enemyFish4,1);

        this.enemyFish5 = Fish.createType(6);
        this.enemyFish5.x = 949;
        this.enemyFish5.y = -120;
        this.addChild(this.enemyFish5,1);

        this.enemyFish6 = Fish.createType(7);
        this.enemyFish6.x = 909;
        this.enemyFish6.y = -140;
        this.addChild(this.enemyFish6,1);

        this.createMap();
        this.initPhysics();
        this.ui = new GameSceneUI();
        this.addChild(this.ui,3);
        this.addRole(100,280);
        this.scheduleUpdate();
    },

    moveMap:function(){
        this.sprite1.setPosition(this.sprite.x,this.sprite.y);
        if(this.touchUp == 1){
            if(this.sprite.y >=400 && this.map1.y>=-450&&this.sprite.x>30&&this.sprite.x<1250&&this.sprite.y>30&&this.sprite.y<690){
                this.map1.setPosition(this.map1.x,this.map1.y-this.groundSpeed);
                this.map_01_2.y -= this.groundSpeed;
                this.map_01_a.y -= this.groundSpeed;
                this.map_01_b.y -= this.groundSpeed;
                this.map_01_stone1.y -= this.groundSpeed;
                this.map_01_stone2.y -= this.groundSpeed;
                this.enemyFish1.y -= this.groundSpeed;
                this.enemyFish2.y -= this.groundSpeed;
                this.enemyFish3.y -= this.groundSpeed;
                this.enemyFish4.y -= this.groundSpeed;
                this.enemyFish5.y -= this.groundSpeed;
                this.enemyFish6.y -= this.groundSpeed;
            } else {
                this.sprite.setPosition(this.sprite.x,this.sprite.y+6);
                //this.sprite1.setPosition(this.sprite.x,this.sprite.y);
            }
        }else{
            var upSpeed = new cp.Vect();
            upSpeed.x = 0;
            upSpeed.y = -10;
            this.roleBody.setVel(upSpeed);
        }

        if(this.sprite.y <= 200 && this.map1.y<=0){
            if(this.sprite.x>30&&this.sprite.x<1250&&this.sprite.y>30&&this.sprite.y<690){
                this.map1.setPosition(this.map1.x,this.map1.y+this.groundSpeed);
                this.map_01_2.y += this.groundSpeed;
                this.map_01_a.y += this.groundSpeed;
                this.map_01_b.y += this.groundSpeed;
                this.map_01_stone1.y += this.groundSpeed;
                this.map_01_stone2.y += this.groundSpeed;
                this.enemyFish1.y += this.groundSpeed;
                this.enemyFish2.y += this.groundSpeed;
                this.enemyFish3.y += this.groundSpeed;
                this.enemyFish4.y += this.groundSpeed;
                this.enemyFish5.y += this.groundSpeed;
                this.enemyFish6.y += this.groundSpeed;
            }
        }

        if(this.touchRight == 1){
            this.sprite.setVisible(true);
            this.sprite1.setVisible(false);
            if(this.sprite.x <800 ){
                this.sprite.setPosition(this.sprite.x+2,this.sprite.y);
            }else {
                if(this.sprite.x>30&&this.sprite.x<1250&&this.sprite.y>30&&this.sprite.y<690){
                    this.map1.setPosition(this.map1.x-this.groundSpeed,this.map1.y);
                    this.map_01_2.x -= this.groundSpeed;
                    this.map_01_a.x -= this.groundSpeed;
                    this.map_01_b.x -= this.groundSpeed;
                    this.map_01_stone1.x -= this.groundSpeed;
                    this.map_01_stone2.x -= this.groundSpeed;
                    this.enemyFish1.x -= this.groundSpeed;
                    this.enemyFish2.x -= this.groundSpeed;
                    this.enemyFish3.x -= this.groundSpeed;
                    this.enemyFish4.x -= this.groundSpeed;
                    this.enemyFish5.x -= this.groundSpeed;
                    this.enemyFish6.x -= this.groundSpeed;
                }
            }
        }

        if(this.touchLeft == 1){
            this.sprite.setVisible(false);
            this.sprite1.setVisible(true);
            if(this.map1.x<=-2&&this.sprite.x>30&&this.sprite.x<1250&&this.sprite.y>30&&this.sprite.y<690){
                this.map1.setPosition(this.map1.x+this.groundSpeed,this.map1.y);
                this.map_01_2.x += this.groundSpeed;
                this.map_01_a.x += this.groundSpeed;
                this.map_01_b.x += this.groundSpeed;
                this.map_01_stone1.x += this.groundSpeed;
                this.map_01_stone2.x += this.groundSpeed;
                this.enemyFish1.x += this.groundSpeed;
                this.enemyFish2.x += this.groundSpeed;
                this.enemyFish3.x += this.groundSpeed;
                this.enemyFish4.x += this.groundSpeed;
                this.enemyFish5.x += this.groundSpeed;
                this.enemyFish6.x += this.groundSpeed;
            } else{
                this.sprite.setPosition(this.sprite.x-2,this.sprite.y);
            }
        }
    },

    onEnter:function(){
        this._super();
        cc.log("onEnter");
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBegan.bind(this),
            onTouchEnded:this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(listener,this);
    },
    onTouchBegan:function(touch,event){
        cc.log("onTouchBegan");
        var location = touch.getLocation();

        if(location.x>=43&&location.x<=198&&location.y>=31&&location.y<=197) {
            this.touchLeft = 1;
        }
        if(location.x>=199&&location.x<=354&&location.y>=31&&location.y<=197) {
            this.touchRight = 1;
        }
        if(location.x>=1058&&location.x<=1246&&location.y>=34&&location.y<=194){
            this.touchUp = 1;
            //var upSpeed = new cp.Vect();
            //upSpeed.x = 0;
            //upSpeed.y = 0;
            //this.body.setVel(upSpeed);
        }
        return true;
    },
    onTouchEnded : function(touch, event) {
        cc.log("onTouchEnded");
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
        return true;
    },
    onExit:function(){
        this._super();
        cc.log("onExit");
        cc.eventManager.removeListener(cc.EventListener.TOUCH_ONE_BY_ONE);
    },

    setDebugMode:function(){
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);
    },

    initPhysics:function(){
        var size = cc.winSize;

        this.space = new cp.Space();
        this.setDebugMode();

        this.space.gravity = cp.v(0,-10);
        var staticBody = this.space.staticBody;

        var walls = [
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(size.width,0),2), //buttom
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(0,size.height),2) //left
        ];

        for(var i=0;i<walls.length;i++){
            var shape =walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            this.space.addStaticShape(shape);
        }
//*********************************newMap*******************************************
        var mapBody = this.space.staticBody;
        var mapShape = [];
        for (var i=0;i<mapData_01_1.length;i++) {
            mapShape[i] = new cp.PolyShape(mapBody, mapData_01_1[i],cp.v(370,315));
            mapShape[i].setElasticity(0.1);
            mapShape[i].setFriction(1);
            this.space.addStaticShape(mapShape[i]);
        }
        this.map1 = new cc.PhysicsSprite(res.map_01_1_png);
        this.map1.setBody(mapBody);
        this.map1.setAnchorPoint(cc.p(0,0));
        this.map1.setPosition(cc.p(-200,-250));
        this.addChild(this.map1);

        this.createWheel(mapData_01_wheel,500,50,res.map_01_wheel_png);

        this.createPoly(mapData_01_2,this.map_01_2.x,this.map_01_2.y);
        this.createPoly(mapData_01_a,this.map_01_a.x,this.map_01_a.y);
        this.createPoly(mapData_01_b,this.map_01_b.x,this.map_01_b.y);
        this.createPoly(mapData_01_stone1,this.map_01_stone1.x,this.map_01_stone1.y);
        this.createPoly(mapData_01_stone2,this.map_01_stone2.x,this.map_01_stone2.y);
    },

    addRole:function(x,y){
        this.roleBody = new cp.Body(1,10000000000);
        this.roleBody.setPos(cp.v(x,y));
        this.space.addBody(this.roleBody);

        var roleShape = [];
        for (var i=0;i<roleData.length;i++){
            roleShape[i] = new cp.PolyShape(this.roleBody,roleData[i],cp.v(0,0));
            roleShape[i].setElasticity(0.2);
            roleShape[i].setFriction(1);
            this.space.addShape(roleShape[i]);
        }

        //this.sprite = new cc.PhysicsSprite(res.Role_swim_png);
        this.sprite = MainRole.createType(0);
        this.sprite.setBody(this.roleBody);
        this.sprite.setPosition(x,y);
        cc.log(this.sprite.x);
        this.addChild(this.sprite,2);

        this.sprite1 = MainRole.createType(1);
        this.sprite1.setBody(this.roleBody);
        this.sprite1.setPosition(x,y);
        this.addChild(this.sprite1,2);

        this.sprite.setVisible(true);
        this.sprite1.setVisible(false);

    },

    update:function(dt){
        var timeStep = 0.085;
        this.space.step(timeStep);
        this.space.reindexStatic();
        this.moveMap();
    },

    createPoly:function(vertsData,offsetX,offsetY){
        var mapBody = this.space.staticBody;
        var mapShape = [];
        for (var i=0;i<vertsData.length;i++){
            mapShape[i] = new cp.PolyShape(mapBody,vertsData[i],cp.v(offsetX+200,offsetY+250));
            mapShape[i].setElasticity(0);
            mapShape[i].setFriction(1);
            this.space.addStaticShape(mapShape[i]);
        }
    },

    createMap:function(){
        var size = cc.winSize;
        this.map_01_2 = new cc.Sprite(res.map_01_2_png);
        this.map_01_2.setPosition(size.width - this.map_01_2.width/2,this.map_01_2.height/2-250);
        this.addChild(this.map_01_2);

        this.map_01_a = new cc.Sprite(res.map_01_a_png);
        this.map_01_a.setPosition(this.map_01_a.width/2-200,size.height-this.map_01_a.height/2+200);
        this.addChild(this.map_01_a);

        this.map_01_b = new cc.Sprite(res.map_01_b_png);
        this.map_01_b.setPosition(size.width-this.map_01_b.width/2,size.height-this.map_01_b.height/2+200);
        this.addChild(this.map_01_b);

        this.map_01_stone1 = new cc.Sprite(res.map_01_stone1_png);
        this.map_01_stone1.setPosition(size.width-this.map_01_stone1.width/2,this.map_01_stone1.height/2+20);
        this.addChild(this.map_01_stone1);

        this.map_01_stone2 = new cc.Sprite(res.map_01_stone2_png);
        this.map_01_stone2.setPosition(size.width-this.map_01_stone2.width/2,-this.map_01_stone2.height/2);
        this.addChild(this.map_01_stone2);
    },

    createWheel:function(vertsData,offsetX,offsetY,res){
        var wheelBody = new cp.Body(100,200);
        wheelBody.setPos(cp.v(offsetX,offsetY));
        this.space.addBody(wheelBody);

        var wheelShape = [];
        for (var i=0;i<vertsData.length;i++){
            wheelShape[i] = new cp.PolyShape(wheelBody,vertsData[i],cp.v(0,0));
            wheelShape[i].setElasticity(0.2);
            wheelShape[i].setFriction(1);
            this.space.addShape(wheelShape[i]);
        }

        this.space.addConstraint(new cp.PivotJoint(wheelBody, this.space.staticBody, cp.v(offsetX,offsetY)));
        wheelBody.applyImpulse(cp.v(500,30), cp.v(1, -1));

        var mapSprite = new cc.PhysicsSprite(res);
        mapSprite.setBody(wheelBody);
        mapSprite.setPosition(cp.v(offsetX,offsetY));
        this.addChild(mapSprite);

    }

});
var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameSceneLayer();
        this.addChild(layer);
    }
});
//游戏主场景end

//GameSceneUI.js copy start//
var GameSceneUI = cc.Layer.extend({
    distanceShow:null,
    _life:null,

    ctor:function() {
        this._super();
        var size = cc.winSize;

        //游戏操作按钮
        var RightBtn = new cc.Sprite(res.RightBtn_png);
        RightBtn.x = 276;
        RightBtn.y = 114;
        this.addChild(RightBtn,4);
        RightBtn.retain();

        var LeftBtn = new cc.Sprite(res.LeftBtn_png);
        LeftBtn.x = 120;
        LeftBtn.y = 114;
        this.addChild(LeftBtn,4);
        LeftBtn.retain();

        var UpBtn = new cc.Sprite(res.UpBtn_png);
        UpBtn.x = size.width-128;
        UpBtn.y = 114;
        this.addChild(UpBtn,4);
        UpBtn.retain();

        this.distanceShow = new cc.LabelTTF("0","FONTDINERDOTCOM LOUNGY",48);
        this.distanceShow.x = 1050;
        this.distanceShow.y = size.height-60;
        this.addChild(this.distanceShow, 3);

        var m = new cc.LabelTTF("M", "FONTDINERDOTCOM LOUNGY", 48);
        m.x = 1130;
        m.y = size.height - 60;
        this.addChild(m, 3);

        this._life = new cc.Sprite(res.Life_png);
        this._life.x = 200;
        this._life.y = size.height-55;
        this.addChild(this._life,3);

        //重新开始按钮
        var restartMenu = new cc.MenuItemImage(res.Restart1_png,res.Restart1_png,function(){
            cc.director.resume();
            cc.director.runScene(new MainScene());
        },this);
        restartMenu.retain();

        var restartMu = new cc.Menu(restartMenu);
        restartMu.x = size.width/2-200;
        restartMu.y = size.height/2;
        restartMu.retain();

        //继续游戏按钮
        var resumeMenu = new cc.MenuItemImage(res.Start2_png,res.Start2_png,function(){
            this.removeChild(resumeMu);
            this.removeChild(restartMu);
            this.removeChild(btnVoiceOff);
            this.removeChild(btnVoiceOn);

            this.addChild(RightBtn,3);
            this.addChild(LeftBtn,3);
            this.addChild(UpBtn,3);

            cc.director.resume();
        },this);
        resumeMenu.retain();

        var resumeMu = new cc.Menu(resumeMenu);
        resumeMu.x = size.width/2+200;
        resumeMu.y = size.height/2;
        resumeMu.retain();

        //音乐开关按钮
        //先判断该场景中音乐是否开启
        if(GSMusic_tag == 1){
            cc.audioEngine.playMusic("res/playingMusic.mp3", true);
        }else if(GSMusic_tag == 0){
            cc.audioEngine.stopMusic();
        }
        //音乐开，按下后音乐关闭
        var voiceOn = new cc.MenuItemImage(res.VoiceOn_png,res.VoiceOn_png,function(){
            GSMusic_tag = 0;
            cc.audioEngine.stopMusic();
            btnVoiceOn.setVisible(false);
            btnVoiceOff.setVisible(true);
        },this);
        voiceOn.retain();

        var btnVoiceOn = new cc.Menu(voiceOn);
        btnVoiceOn.x = size.width-80;
        btnVoiceOn.y = 70;
        btnVoiceOn.retain();

        //音乐关，按下后音乐打开
        var voiceOff = new cc.MenuItemImage(res.VoiceOff_png,res.VoiceOff_png,function(){
            GSMusic_tag = 1;
            cc.audioEngine.playMusic("res/playingMusic.mp3", true);
            btnVoiceOn.setVisible(true);
            btnVoiceOff.setVisible(false);
        },this);
        voiceOff.retain();

        var btnVoiceOff = new cc.Menu(voiceOff);
        btnVoiceOff.x = size.width-80;
        btnVoiceOff.y = 70;
        btnVoiceOff.retain();

        //暂停按钮
        var pauseMenu = new cc.MenuItemImage(res.Pause_png,res.Pause_png,function(){
            this.addChild(resumeMu,3);
            this.addChild(restartMu,3);
            this.addChild(btnVoiceOn,3);
            this.addChild(btnVoiceOff,3);

            this.removeChild(RightBtn);
            this.removeChild(LeftBtn);
            this.removeChild(UpBtn);
            if(GSMusic_tag == 1){
                btnVoiceOn.setVisible(true);
                btnVoiceOff.setVisible(false);
            }else if(GSMusic_tag == 0){
                btnVoiceOn.setVisible(false);
                btnVoiceOff.setVisible(true);
            }
            cc.director.pause();
        },this);
        pauseMenu.retain();

        var pauseMu = new cc.Menu(pauseMenu);
        pauseMu.x = size.width-64;
        pauseMu.y = size.height-60;
        this.addChild(pauseMu, 3);
        pauseMu.retain();
    }
});
//GameSceneUI.js copy end//

//MainRole start
var MainRole = cc.PhysicsSprite.extend({
    speed:5,
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
//mainRole end

//敌方鱼生成start
var Fish = cc.Sprite.extend({
    type:0,//15种鱼，
    speed:5,
    ctor:function(type){
        type = parseInt(type);
        cc.log("random num:"+type);
        var size = cc.winSize;
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.AllEnemyFish_plist,res.AllEnemyFish_png);
        this._super("#fish"+(type*4)+".png");
        this.init(type);
        var animation = new cc.Animation();
        for(var i = type*4;i<type*4+4;i++){
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
        return true;
    }
});
Fish.createType = function(type){
    type = parseInt(type);
    return new Fish(type);
};
//敌方鱼生成end