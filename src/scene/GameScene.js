/**
 * Created by Embert on 2015/8/31.
 */
var GameSceneLayer = cc.Layer.extend({
    //SPRITE_WIDTH:77,
    //SPRITE_HEIGTH:70,
    //DEBUG_NODE_SHOW:true,

    sprite:null,//main role
    body:null,
    shape:null,
    space:null,
    speed:5,
    upSpeed:null,
    screenWidth:0,
    screenHeight:0,
    gameTime:0,
    ui:null,
    seaStone:null,
    _life:null,
    myLife:[],
    lossLife:0,
    bloodNum:10,
    _tuna1:null,
    _tuna2:null,
    _tuna3:null,

    bubble:null,

    touchLeft:null,
    touchRight:null,
    touchUp:null,
    physX:null,

    enemyLayer:null,
    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        var background1 = new cc.Sprite(res.BackGround_png);
        background1.x = size.width/2;
        background1.y = size.height/2;
        this.addChild(background1,0);

        this.ui = new GameSceneUI();
        this.addChild(this.ui,3);
        this._life = this.ui._life;
        this.addLife();

        this.enemyLayer = new Enemy();
        this.addChild(this.enemyLayer,1);

        this.physX = new PhysX(this);
        this.addChild(this.physX,2);
        this.physX.initPhysics();
        //初始化主角
        this.physX.addNewSpriteAtPosition(size.width/4,size.height/4);

        this.seaStone = new SeaStone(this);
        this.addChild(this.seaStone,1);

        this._tuna1 = Fish.createRandomType();
        this._tuna1.x = size.width;
        this._tuna1.y = size.height/2;
        this.addChild(this._tuna1,2);

        this._tuna2 = Fish.createRandomType();
        this._tuna2.x = size.width*1.5;
        this._tuna2.y = size.height/3;
        this.addChild(this._tuna2, 1);

        this._tuna3 = Fish.createRandomType();
        this._tuna3.x = size.width*1.8;
        this._tuna3.y = size.height/1.8;
        this.addChild(this._tuna3, 1);

        this.bubble = new cc.Sprite(res.Bubble_png);
        this.bubble.x= size.width/4 * 3;
        this.bubble.x= size.height/2;
        this.addChild(this.bubble,2);

        //this.initPhysics();
        this.scheduleUpdate();

    },

//-----------------------单点触摸start-----------------//

    onEnter:function(){
        this._super();
        cc.log("onEnter");
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBegan.bind(this),
            //onTouchMoved:this.onTouchMoved.bind(this),
            onTouchEnded:this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(listener,this);
    },
    onTouchBegan:function(touch,event){
        cc.log("onTouchBegan");
        //var target = event.getCurrentTarget();
        var location = touch.getLocation();

        if(location.x>=0&&location.x<=147&&location.y>=0&&location.y<=141) {
            this.touchLeft = 1;
        }
        if(location.x>=147&&location.x<=294&&location.y>=0&&location.y<=141) {
            this.touchRight = 1;
        }
        if(location.x>=1130&&location.x<=1280&&location.y>=0&&location.y<=120){
            this.touchUp = 1;
            cc.log("touchup"+location.x,this.touchUp);
            this.upSpeed = new cp.Vect();
            this.upSpeed.x = 0;
            this.upSpeed.y = 0;
            this.physX.body.setVel(this.upSpeed);
            //this.physX.resetSpeed();
            delete speed;
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

//-------------------------------单点触摸end------------------------//

    checkMainActor:function(){
        if(this.physX.sprite.x<20){
            this.physX.sprite.setPositionX(20);
        }
        if(this.physX.sprite.x>(this.screenWidth/2)){
            this.physX.sprite.setPositionX(this.screenWidth/2);
        }
        if(this.physX.sprite.y<20){
            this.physX.sprite.setPositionY(20);
        }
        if(this.physX.sprite.y>(this.screenHeight-20)){
            this.physX.sprite.setPositionY(this.screenHeight-20);
        }
    },

    moveMainActor:function(){
        //move left
        if(this.touchLeft==1){
            this.physX.sprite.runAction(cc.MoveTo.create(1,this.physX.sprite.x-5,this.physX.sprite.y));
        }
        //move right
        if(this.touchRight==1){
            if(this.physX.sprite.getPositionX()<this.screenWidth/2){
                //主角在屏幕左半边，主角移动
                this.physX.sprite.runAction(cc.MoveTo.create(1,this.physX.sprite.x+5,this.physX.sprite.y));
            }else{
                //主角在屏幕中间
                this.seaStone.seaStone1.setPositionX(this.seaStone.seaStone1.getPositionX()-this.speed);
                this.seaStone.seaStone2.setPositionX(this.seaStone.seaStone2.getPositionX()-this.speed);
                this.bubble.x -= (this.speed);
                this.gameTime++;
            }
        }
        //move upward
        //if(this.touchUp==1&&(this.physX.sprite.getPositionY()<(this.screenHeight-this.SPRITE_HEIGTH))){
        if(this.touchUp==1){
            this.physX.sprite.runAction(cc.MoveTo.create(1,this.physX.sprite.x,this.physX.sprite.y+10));
        }
    },

    moveFish:function(){
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
    },

    detectCollision:function(){
        if(this.bumpExplore(this._tuna1,this.physX.sprite)&&this.losslife==0){
            this.reduceLife();
            cc.log("bump1");
            this.physX.sprite.setVisible(true);
            this.physX.sprite.runAction(cc.blink(1,4));
        }
        if(this.bumpExplore(this._tuna2,this.physX.sprite)&&this.losslife==0){
            this.reduceLife();
            cc.log("bump2");
            this.physX.sprite.setVisible(true);
            var action = cc.blink(1,4);
            this.physX.sprite.runAction(action);
        }
        if(this.bumpExplore(this._tuna3,this.physX.sprite)&&this.losslife==0){
            this.reduceLife();
            cc.log("bump3");
            this.physX.sprite.setVisible(true);
            var action = cc.blink(0.5,4);
            this.physX.sprite.runAction(action);
        }
        if(this.bumpExplore(this.bubble,this.physX.sprite)){
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
        if((Math.abs(this._tuna1.x-this.physX.sprite.x)>100||Math.abs(this._tuna1.y-this.physX.sprite.y)>65)&&
            (Math.abs(this._tuna2.x-this.physX.sprite.x)>100||Math.abs(this._tuna2.y-this.physX.sprite.y)>65)&&
            (Math.abs(this._tuna3.x-this.physX.sprite.x)>100||Math.abs(this._tuna3.y-this.physX.sprite.y)>65)){
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

    update:function(dt){
        this.seaStone.moveSeaStone();
        this.checkMainActor();
        this.moveMainActor();
        this.moveFish();
        this.detectCollision();

        var timeStep = 0.03;
        this.physX.space.step(timeStep);
        this.ui.distanceShow.setString(parseInt(this.gameTime*this.speed/10, 10));

    },

    addLife: function () {
        var life = res.Blood_png;
        var lifes = [life];
        this.mylife = [new cc.Sprite(life)];
        this.mylife[0].x = 11;
        this.mylife[0].y = 9;
        for (i=0;i <10; i++) {
            lifes[i] = life;
            this.mylife[i + 1] = new cc.Sprite(lifes[i]);

            this.mylife[i + 1].x = this.mylife[i].x + 16;
            this.mylife[i + 1].y = 9;

        }
        this.bloodNum = lifes.length;

        for(i=0;i<10; i++){
            this._life.addChild(this.mylife[i], 1);
        }
        delete life;
        delete lifes;
    },

    displayLife:function(){
        for (var i = 0; i <10; i++) {
            this._life.removeChild(this.mylife[i], 1);
        }
        for(var j = 0; j < this.bloodNum; j++){
            this._life.addChild(this.mylife[j],1);
        }
    },

    reduceLife:function(){
        this.losslife = 1;
        this.bloodNum --;
        //var action = cc.blink(0.5,4);
        //this.sprite.runAction(action);
        if(this.bloodNum==0){
            cc.director.runScene(new cc.TransitionCrossFade(1.0, new GameOverScene()));
        }
        console.log("bloodNum: " + this.bloodNum);
        for (i=0;i <10; i++) {
            this._life.removeChild(this.mylife[i], 1);
        }
        for(i=0;i < this.bloodNum; i++){
            this._life.addChild(this.mylife[i],1);
        }
    }

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer1 = new GameSceneLayer();
        this.addChild(layer1,0);
        //var layer2 = new Enemy();
        //this.addChild(layer2,1);
    }
});