/**
 * Created by Embert on 2015/8/31.
 */
var PhysX = cc.Layer.extend({
    SPRITE_WIDTH:77,
    SPRITE_HEIGTH:70,
    DEBUG_NODE_SHOW:false,
    body:null,
    sprite:null,
    shape:null,
    space:null,
    upSpeed:null,
    gameSceneLayer:null,

    ctor:function(gameSceneLayer){
        this._super();
        this.gameSceneLayer = gameSceneLayer;
        this.upSpeed = gameSceneLayer.upSpeed;
        //this.upSpeed = new cp.Vect();
        //this.upSpeed.x = 0;
        //this.upSpeed.y = 0;
        //this.body.setVel(this.upSpeed);

    },

    setupDebugNode:function(){
        this._debugNode=new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible=this.DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);
    },

    initPhysics:function(){
        var winSize = cc.director.getWinSize();

        this.space = new cp.Space();
        this.setupDebugNode();

        this.space.gravity = cp.v(0,-30);

        var staticBody = this.space.staticBody;

        var walls = [new cp.SegmentShape(staticBody,cp.v(0,50),cp.v(winSize.width,50),0),
            new cp.SegmentShape(staticBody,cp.v(0,winSize.height),cp.v(winSize.width,winSize.height),0),
            new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(0,winSize.height),0),
            new cp.SegmentShape(staticBody,cp.v(winSize.width,0),cp.v(winSize.width,winSize.height),0)
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
        this.body = new cp.Body(1,cp.momentForBox(1,this.SPRITE_WIDTH,this.SPRITE_HEIGTH));
        var gavition = new cp.Vect();
        gavition.x = x;
        gavition.y = y;
        this.body.setPos(gavition);
        delete gavition;
        this.space.addBody(this.body);

        this.shape = new cp.BoxShape(this.body,this.SPRITE_WIDTH,this.SPRITE_HEIGTH);
        this.shape.setElasticity(0.2);
        this.shape.setFriction(0.1);
        this.space.addShape(this.shape);

        this.sprite = new cc.PhysicsSprite(res.Role_png);
        this.sprite.setBody(this.body);
        this.sprite.setPosition(x,y);
        this.addChild(this.sprite,2);

    },

    resetSpeed:function(){
        this.upSpeed = new cp.Vect();
        this.upSpeed.x = 0;
        this.upSpeed.y = 0;
        this.body.setVel(this.upSpeed);
    }
});