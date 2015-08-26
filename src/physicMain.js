var DEBUG_NODE_SHOW = true;
var SPRITE_WIDTH=80;
var SPRITE_HEIGHT=40;
var COLLISION_TYPE=1;
var pmLayer = cc.Layer.extend({
   // car:null,
    space:null,

    ctor:function(){
        var size = cc.winSize;
        this._super();
        this.initPhysics();
/*//小车前行

        this.car = new cc.Sprite(res.carred_png);
        this.car.setPosition(0,size.height/2);
        this.addChild(this.car,0);
        var moveAction = cc.MoveTo.create(3,this.car.x+600,this.car.y);
        this.car.runAction(moveAction);*/

        var body=new cp.Body(1,cp.momentForBox(0.1,SPRITE_WIDTH,SPRITE_HEIGHT));
        body.setPos(cc.p(0,640));
        //size.height/2
        this.space.addBody(body);
        var body1=new cp.Body(1,cp.momentForBox(0.1,SPRITE_WIDTH,SPRITE_HEIGHT));
        body1.setPos(cc.p(720,640));
        this.space.addBody(body1);
        var shape = new cp.BoxShape(body,SPRITE_WIDTH,SPRITE_HEIGHT);
        var shape1 = new cp.BoxShape(body1,SPRITE_WIDTH,SPRITE_HEIGHT);
        shape.setElasticity(0.5);
        shape.setFriction(0.5);
        shape1.setElasticity(0.5);
        shape1.setFriction(0.5);
        this.space.addShape(shape);
        this.space.addShape(shape1);
        shape.setCollisionType(COLLISION_TYPE);
        shape1.setCollisionType(COLLISION_TYPE);
        //创建物理引擎精灵对象
        //var sprite1=new cc.PhysicsSprite(res.carred_png);
        //var sprite2=new cc.PhysicsSprite(res.carBlue_png);
        var sprite1=new cc.PhysicsSprite(res.RightBtn_png);
        var sprite2=new cc.PhysicsSprite(res.LeftBtn_png);
        sprite1.setBody(body);
        sprite2.setBody(body1);
        sprite1.setPosition(cc.p(0,640));
        sprite2.setPosition(cc.p(720,640));
        //size.height/2

        this.addChild(sprite1);
        this.addChild(sprite2);
        body.data=sprite1;
        body1.data=sprite2;
        var moveAction1 = cc.MoveTo.create(6,sprite1.x+50,sprite1.y);
        var moveAction2 = cc.MoveTo.create(3,sprite1.x-50,sprite1.y);
        sprite1.runAction(moveAction1);
        sprite2.runAction(moveAction2);
        this.scheduleUpdate();
//将两辆小车放入不同的shape和body中后，可以同时显示两辆小车。

        return true;

    },

    initPhysics:function(){
        var winSize = cc.director.getWinSize();

        this.space = new cp.Space();
        this.setupDebugNode();

        //设置重力
        this.space.gravity = cp.v(0,-100);
        var staticBody = this.space.staticBody;

        //设置空间边界
        var walls=[new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(winSize.width,0),0),
            new cp.SegmentShape(staticBody,cp.v(0,winSize.height),cp.v(winSize.width,winSize.height),0),
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(0,winSize.height),0),
            new cp.SegmentShape(staticBody,cp.v(winSize.width,0),cp.v(winSize.width,winSize.height),0)];
        for(var i=0;i<walls.length;i++){
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            this.space.addStaticShape(shape);
        }


        //设置碰撞检测
        this.space.addCollisionHandler(COLLISION_TYPE,
                                       COLLISION_TYPE,
                                       this.collisionBegin.bind(this),
                                       this.collisionPre.bind(this),
                                       this.collisionPost.bind(this),
                                       this.collisionSeparate.bind(this)
        );
    },

    collisionBegin:function(arbiter,space){
        cc.log("collisionBegin");
        return true;
    },
    collisionPre:function(arbiter,space){
        cc.log("collisionPre");
        return true;
    },
    collisionPost:function(arbiter,space){
        cc.log("collisionPost");
        return true;
    },
    collisionSeparate:function(arbiter,space) {
        console.log("collisionSeparate");
        this.pause();
        cc.log("0000000000000000000");
        var shapes = arbiter.getShapes();

        var bodyA=shapes[0].getBody();
        var bodyB=shapes[1].getBody();
        cc.log(bodyA);
        cc.log(bodyB);

        var spriteA = bodyA.data;
        var spriteB = bodyB.data;
        if(spriteA!=null&&spriteB!=null){
            cc.log("11111111");
            spriteA.setColor(new cc.Color(255,255,255,255));
            spriteB.setColor(new cc.Color(255,255,255,255));

        }
    },

    update:function(dt){
        var timeStep = 0.03;
        this.space.step(timeStep);


    },
    setupDebugNode:function(){
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);

    }
});

 var pmScene = cc.Scene.extend({
     onEnter:function() {
         cc.log("000");
         this._super();
         cc.log("111");
         var layer = new pmLayer();
         cc.log("222");
         this.addChild(layer);
     }
 });