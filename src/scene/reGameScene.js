/**
 * Created by Embert on 2015/8/31.
 */
var GameScene = cc.Scene.extend({
    SPRITE_WIDTH:77,
    SPRITE_HEIGTH:70,
    DEBUG_NODE_SHOW:true,

    sprite:null,//main role
    body:null,
    shape:null,
    space:null,
    speed:5,
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
    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        var bgLayer = new cc.Layer();


    }
});