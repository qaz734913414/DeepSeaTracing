/**
 * Created by Embert on 2015/8/31.
 */
/**
 * Created by Embert on 2015/8/30.
 */
var SeaStone = cc.Layer.extend({
    seaStone1:null,
    seaStone2:null,
    background : [],//背景
    screenWidth:0,
    gameSceneLayer:null,
    ctor:function(gameSceneLayer){
        this._super();
        this.gameSceneLayer = gameSceneLayer;
        var size = cc.winSize;
        this.screenWidth = size.width;

        for(var i= 0;i<10;i++){
            var bgName = "res/bg/bg"+i+".png";
            this.background[i] = new cc.Sprite(bgName);
            this.background[i].x = i*1280;
            this.background[i].y = 0;
            this.background[i].anchorX = 0;
            this.background[i].anchorY = 0;
            this.addChild(this.background[i],0);
        }

        this.seaStone1 = new cc.Sprite(res.SeaStone1_png);
        this.seaStone1.anchorX = 0;
        this.seaStone1.anchorY = 0;
        this.seaStone1.x = 0;
        this.seaStone1.y = 0;
        //this.addChild(this.seaStone1,1);

        this.seaStone2 = new cc.Sprite(res.SeaStone2_png);
        this.seaStone2.x = size.width;
        this.seaStone2.y = 0;
        this.seaStone2.anchorX = 0;
        this.seaStone2.anchorY = 0;
        //this.addChild(this.seaStone2,1);
    },

    moveSeaStone:function(){
        if(this.seaStone1.x<(-this.screenWidth)) {
            this.seaStone1.x = this.screenWidth;
            this.seaStone2.x = 0;
            this.gameSceneLayer.reduceLife();

        }
        if(this.seaStone2.x<(-this.screenWidth)){
            this.seaStone2.x = this.screenWidth;
            this.seaStone1.x = 0;
            this.gameSceneLayer.reduceLife();
        }
    },
    moveBgRight:function(){
      for(var i=0;i<10;i++){
          this.background[i].x -= 2;//2是背景移动速度
      }
    },
    moveBgLeft:function(){
        if(this.background[0].x<=0){
            for(var i=0;i<10;i++){
                this.background[i].x += 2;//2是背景移动速度
            }
        }
    }
});