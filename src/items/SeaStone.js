/**
 * Created by Embert on 2015/8/31.
 */
/**
 * Created by Embert on 2015/8/30.
 */
var SeaStone = cc.Layer.extend({
    seaStone1:null,
    seaStone2:null,
    screenWidth:0,
    gameSceneLayer:null,
    ctor:function(gameSceneLayer){
        this._super();
        this.gameSceneLayer = gameSceneLayer;
        var size = cc.winSize;
        this.screenWidth = size.width;

        this.seaStone1 = new cc.Sprite(res.SeaStone1_png);
        this.seaStone1.anchorX = 0;
        this.seaStone1.anchorY = 0;
        this.seaStone1.x = 0;
        this.seaStone1.y = 0;
        this.addChild(this.seaStone1,1);

        this.seaStone2 = new cc.Sprite(res.SeaStone2_png);
        this.seaStone2.x = size.width;
        this.seaStone2.y = 0;
        this.seaStone2.anchorX = 0;
        this.seaStone2.anchorY = 0;
        this.addChild(this.seaStone2,1);
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
    }
});