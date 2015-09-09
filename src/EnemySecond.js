/**
 * Created by ningjian on 2015/9/8.
 */
var Enemy = cc.Layer.extend({
    enemyNum:null,
    enemyFish:[],
    screenWidth:0,
    screenHeight:0,
    ctor:function(){
        cc.log("Enter EnermySecond");
        this._super();
        //this.scheduleUpdate();
        var size = cc.winSize;
        this.screenWidth = size.width;
        this.screenHeight = size.height;
    }
});