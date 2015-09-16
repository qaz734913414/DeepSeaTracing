/**
 * Created by Embert on 2015/9/4.
 */

var SPRITE_WIDTH = 60;
var SPRITE_HEIGHT = 60;
var DEBUG_NODE_SHOW = false;
var chipmunkLayer = cc.Layer.extend({
    space:null,
    sprite:null,
    shapePos:0,
    ground:null,
    groundSpeed:1,
    offset:null,
    map1:null,
    map_01_2:null,
    map_01_a:null,
    map_01_b:null,
    map_02_1:null,
    map_01_stone1:null,
    map_01_stone2:null,
    map_01_wheel:null,

    upBtn:null,
    rightBtn:null,
    leftBtn:null,
    touchLeft:null,

    touchUp:null,
    touchRight:null,
    ctor:function(){
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite(res.SeaBg_png);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg,0);
        this.createMap();
        this.initPhysics();
        //this.moveSprite();
        this.addRole(100,280);
        this.scheduleUpdate();

        this.upBtn = new cc.Sprite("res/upBtn.png");
        this.upBtn.setPosition(1000,60);
        this.addChild(this.upBtn);

        this.rightBtn = new cc.Sprite("res/rightBtn.png");
        this.rightBtn.setPosition(1200,60);
        this.addChild(this.rightBtn);

        this.leftBtn = new cc.Sprite("res/leftBtn.png");
        this.leftBtn.setPosition(75,60);
        this.addChild(this.leftBtn);
    },

    moveMap:function(){
        if(this.touchUp == 1){
            if(this.sprite.y >=400 && this.map1.y>=-450){
                this.map1.setPosition(this.map1.x,this.map1.y-this.groundSpeed);
                this.map_01_2.y -= this.groundSpeed;
                this.map_01_a.y -= this.groundSpeed;
                this.map_01_b.y -= this.groundSpeed;
                this.map_01_stone1.y -= this.groundSpeed;
                this.map_01_stone2.y -= this.groundSpeed;
            } else {
                //this.sprite.y +=3;
                this.sprite.setPosition(this.sprite.x,this.sprite.y+3);
            }
        }
        if(this.sprite.y <= 200 && this.map1.y<=0){
            //this.map1.y += this.groundSpeed;
            this.map1.setPosition(this.map1.x,this.map1.y+this.groundSpeed);
            this.map_01_2.y += this.groundSpeed;
            this.map_01_a.y += this.groundSpeed;
            this.map_01_b.y += this.groundSpeed;
            this.map_01_stone1.y += this.groundSpeed;
            this.map_01_stone2.y += this.groundSpeed;
        }

        if(this.touchRight == 1){
            if(this.sprite.x <800 ){
                //this.sprite.x += 2;
                this.sprite.setPosition(this.sprite.x+2,this.sprite.y);
            }else {
                //this.map1.x -= this.groundSpeed;
                this.map1.setPosition(this.map1.x-this.groundSpeed,this.map1.y);
                this.map_01_2.x -= this.groundSpeed;
                this.map_01_a.x -= this.groundSpeed;
                this.map_01_b.x -= this.groundSpeed;
                this.map_01_stone1.x -= this.groundSpeed;
                this.map_01_stone2.x -= this.groundSpeed;
                //cc.log(this.map1.x);
            }
        }

        if(this.touchLeft == 1){
            if(this.map1.x<=-2){
                this.map1.setPosition(this.map1.x+this.groundSpeed,this.map1.y);
                this.map_01_2.x += this.groundSpeed;
                this.map_01_a.x += this.groundSpeed;
                this.map_01_b.x += this.groundSpeed;
                this.map_01_stone1.x += this.groundSpeed;
                this.map_01_stone2.x += this.groundSpeed;
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
        //var target = event.getCurrentTarget();
        var location = touch.getLocation();

        if(location.x>925&&location.x<=1075&&location.y>=0&&location.y<=121) {
            this.touchUp = 1;
        }
        if(location.x>=1125&&location.x<=1275&&location.y>=0&&location.y<=121) {
            this.touchRight = 1;
        }
        if(location.x>=0 && location.x<=150 && location.y>=0 && location.y<=121){
            this.touchLeft = 1;
        }
        cc.log("*************btn status********");
        cc.log("touchUp:"+this.touchUp);
        cc.log("touchLeft"+this.touchLeft);
        cc.log("touchRight"+this.touchRight);
        return true;
    },
    onTouchEnded : function(touch, event) {
        cc.log("onTouchEnded");
        var location = touch.getLocation();
        if(location.x>925&&location.x<=1075&&location.y>=0&&location.y<=121){
            this.touchUp = 0;
        }
        if(location.x>=1125&&location.x<=1275&&location.y>=0&&location.y<=121){
            this.touchRight = 0;
        }
        this.touchLeft = 0;
        cc.log("************btn end***********");
        cc.log("touchUp:"+this.touchUp);
        cc.log("touchLeft"+this.touchLeft);
        cc.log("touchRight"+this.touchRight);
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

    moveSprite:function(){
        var that = this;
        cc.log("come here1");
        if ("touches" in cc.sys.capabilities ){
            cc.log("come here");
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan:function(touch,event){
                    var pos = touch.getLocation();
                    //that.sprite.x =  pos.x;
                    //var target = event.getCurrentTarget();
                    //target.addRole(pos);

                    return true;
                }
            },this);
        } else if ('mouse' in cc.sys.capabilities){
            cc.log("come here3");
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:function(event){
                    var pos = event.getLocation();
                    cc.log(pos.x);
                    //that.sprite.x =  pos.x;
                    //cc.log(that.sprite.x);
                    //var action = cc.moveTo(2,cc.p(pos.x,pos.y));
                    //action.easing(cc.easeCubicActionInOut());
                    //that.sprite.runAction(action);
                    //var target = event.getCurrentTarget();
                    //target.addRole(pos);
                }
            },this);
        }
    },

    initPhysics:function(){
        var size = cc.winSize;

        this.space = new cp.Space();
        this.setDebugMode();

        this.space.gravity = cp.v(0,-10);
        var staticBody = this.space.staticBody;

        var walls = [
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(size.width,0),2), //buttom
            //new cp.SegmentShape(staticBody,cp.v(0,size.height),cp.v(size.width,size.height),2), //top
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(0,size.height),2), //left
            //new cp.SegmentShape(staticBody,cp.v(size.width,0),cp.v(size.width,size.height),2)  //right
        ];

        //for(var i=0;i<walls.length;i++){
        //    var shape =walls[i];
        //    shape.setElasticity(1);
        //    shape.setFriction(1);
        //    this.space.addStaticShape(shape);
        //}
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

        //this.createPoly(mapData_01_wheel,this.map_01_wheel.x,this.map_01_wheel.y);

        //this.createPoly(mapData_02_1,this.map_02_1.getPosition());

        //this.createPoly(mapData_01_2,cp.v((size.width-338),126));
        //this.createPoly(mapData_01_a,cp.v(170,size.height-46));
        //this.createPoly(mapData_01_b,cp.v(size.width-462,size.height-126));
    },

    addRole:function(x,y){
        cc.log(x, y);
        var body = new cp.Body(1,cp.momentForBox(100000,SPRITE_WIDTH,SPRITE_HEIGHT));
        body.setPos(cp.v(x,y));
        this.space.addBody(body);

        var shape = new cp.BoxShape(body,SPRITE_WIDTH,SPRITE_HEIGHT);
        shape.setElasticity(0);
        shape.setFriction(0.1);
        this.space.addShape(shape);

        this.sprite = new cc.PhysicsSprite(res.Role_swim_png);
        this.sprite.setBody(body);
        this.sprite.setPosition(x,y);
        cc.log(this.sprite.x);
        this.addChild(this.sprite,5);
    },

    update:function(){
        var timeStep = 0.03;
        this.space.step(timeStep);
        //this.map1.runAction(cc.moveTo(2,cc.p(this.map1.x-this.groundSpeed,this.map1.y)));
        //this.map1.x -= this.groundSpeed;
        //this.map_01_2.x -= this.groundSpeed;
        //this.map_01_a.x -= this.groundSpeed;
        //this.map_01_b.x -= this.groundSpeed;
        //this.map_02_1.x -= this.groundSpeed;

        this.space.reindexStatic();
        this.moveMap();
    },

    routePoly2:function(){
        var groundVerts1 = [
            [   562.50000,-50.00000,
                413.50000,72.00000,
                635.50000,49.00000,
                640.50000,-58.00000
            ],
            [   -344.50000,46.00000,
                -134.50000,-13.00000,
                179.50000,-134.00000,
                -640.50000,-134.00000,
                -640.50000,64.00000
            ],
            [
                457.50000,-72.00000,
                413.50000,72.00000,
                562.50000,-50.00000
            ],
            [
                -569.50000,112.00000,
                -362.50000,56.00000,
                -640.50000,68.00000,
                -640.50000,113.00000
            ],
            [
                207.50000,84.00000,
                225.50000,104.00000,
                385.50000,91.00000,
                413.50000,72.00000,
                257.50000,-16.00000,
                193.50000,30.00000
            ],
            [
                640.50000,-133.00000,
                179.50000,-134.00000,
                457.50000,-72.00000,
                640.50000,-90.00000
            ],
            [
                179.50000,-134.00000,
                242.50000,-42.00000,
                413.50000,72.00000,
                457.50000,-72.00000
            ],
            [
                -134.50000,-13.00000,
                -330.50000,89.00000,
                54.50000,20.00000,
                86.50000,-13.00000
            ],
            [
                -330.50000,89.00000,
                -561.50000,133.00000,
                -400.50000,129.00000,
                -348.50000,109.00000
            ],
            [
                -134.50000,-13.00000,
                -362.50000,56.00000,
                -561.50000,133.00000,
                -330.50000,89.00000
            ],
            [
                -561.50000,133.00000,
                -362.50000,56.00000,
                -569.50000,112.00000
            ],
            [
                413.50000,72.00000,
                242.50000,-42.00000,
                257.50000,-16.00000
            ],
            [
                179.50000,-134.00000,
                182.50000,-62.00000,
                242.50000,-42.00000
            ],
            [
                179.50000,-134.00000,
                -134.50000,-13.00000,
                148.50000,-47.00000,
                182.50000,-62.00000
            ],
            [
                -134.50000,-13.00000,
                -344.50000,46.00000,
                -362.50000,56.00000
            ]

        ];

        var groundVerts3 = [
            [
                245.00000,-19.93300,
                279.00000,13.06700,
                266.00000,-93.93300
            ],
            [
                213.00000,11.06700,
                309.00000,67.06700,
                279.00000,13.06700,
                245.00000,-19.93300
            ],
            [
                -376.00000,95.06700,
                376.00000,95.06700,
                309.00000,67.06700,
                -233.00000,59.06700,
                -376.00000,62.06700
            ],
            [
                -197.00000,46.06700,
                -233.00000,59.06700,
                309.00000,67.06700,
                213.00000,11.06700
            ]

        ];

        //route-02-b 01
        var groundVerts4 = [
            [
                -134.00000,140.00000,
                -82.00000,140.00000,
                -83.00000,110.00000,
                -96.00000,102.00000
            ],
            [
                -129.00000,-23.00000,
                -134.00000,140.00000,
                -105.00000,111.00000,
                -119.00000,-10.00000,
                -124.00000,-22.00000
            ]

        ];

        //route-02-b 02
        var groundVerts5 = [
            [
                135.00000,140.00000,
                -51.00000,84.00000,
                -75.00000,140.00000
            ],
            [
                59.00000,93.00000,
                97.00000,100.00000,
                79.00000,-48.00000
            ],
            [
                59.00000,93.00000,
                -51.00000,84.00000,
                113.00000,133.00000,
                97.00000,100.00000
            ],
            [
                113.00000,133.00000,
                135.00000,140.00000,
                133.00000,84.00000,
                123.00000,82.00000
            ],
            [
                -24.00000,-123.00000,
                -51.00000,84.00000,
                21.00000,49.00000,
                -9.00000,-140.00000
            ],
            [
                21.00000,49.00000,
                59.00000,93.00000,
                50.00000,-82.00000,
                37.00000,-70.00000
            ],
            [
                -51.00000,84.00000,
                59.00000,93.00000,
                21.00000,49.00000
            ]

        ];

        //route-02-c
        var groundVerts6 = [
            -48.01500,13.00000,
            48.98500,13.00000,
            48.98500,-13.00000

        ];

        var groundBody21 = this.space.staticBody;
        //groundBody21.local2World(cp.Vect());
        var grounds1 = [];
        for(var i=0;i<groundVerts1.length;i++){
            grounds1[i] = new cp.PolyShape(groundBody21,groundVerts1[i],cp.v(640,134));
            grounds1[i].setElasticity(1);
            grounds1[i].setFriction(1);
            this.space.addStaticShape(grounds1[i]);
        }
        this.ground = new cc.PhysicsSprite(res.route_02_1_png);
        this.ground.setBody(groundBody21);
        this.ground.setAnchorPoint(cc.p(0,0));
        this.ground.setPosition(cc.p(0,0));
        //ground.setPosition(cc.p(10,0));
        this.addChild(this.ground);

        var groundBody2a = this.space.staticBody;
        //groundBody2a.local2World(cp.v(0,0));
        //cc.log("ttttttttt");
        //cc.log(groundBody2a.getPos());
        //groundBody2a.setPos(cc.p(376,600));
        var grounds2a = [];
        for(var i=0;i<groundVerts3.length;i++){
            grounds2a[i] = new cp.PolyShape(groundBody2a,groundVerts3[i],cp.v(376,594));
            grounds2a[i].setElasticity(1);
            grounds2a[i].setFriction(1);
            this.space.addStaticShape(grounds2a[i]);
        }
        //var ground2a = new cc.PhysicsSprite(res.route_02_a_png);
        //ground2a.setBody(groundBody2a);
        //ground2a.setAnchorPoint(cc.p(0,0));
        //ground2a.setPosition(cc.p(0,0));
        ////ground2a.setPosition(cc.p(376,94));
        ////ground.setPosition(cc.p(10,0));
        //this.addChild(ground2a);
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

        //this.map_01_wheel = new cc.Sprite(res.map_01_wheel_png);
        //this.map_01_wheel.setPosition(500,60);
        //this.addChild(this.map_01_wheel);


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

        //var body = this.space.addBody(new cp.Body(100, 150));
        //body.setPos(cp.v(500, 60));
        //this.space.addShape(cp.BoxShape(body, 50, 50));
        //this.space.addConstraint(new cp.PivotJoint(body, this.space.staticBody, cp.v(500,60)));
        //body.applyImpulse(cp.v(500,60), cp.v(1, -1));
}

});
var ChipmunkScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new chipmunkLayer();
        this.addChild(layer);
    }
});