/**
 * Created by Embert on 2015/8/31.
 */
/**
 * Created by Embert on 2015/8/28.
 */
var GameSceneUI = cc.Layer.extend({
    distanceShow:null,
    _life:null,
    ctor:function() {
        this._super();
        var size = cc.winSize;
        var rightBtn = new cc.Sprite(res.RightBtn_png);
        rightBtn.x = 147;
        rightBtn.y = 0;
        rightBtn.anchorX = 0;
        rightBtn.anchorY = 0;
        this.addChild(rightBtn,2);

        //Add Button
        var LeftBtn = new cc.Sprite(res.LeftBtn_png);
        LeftBtn.x = 0;
        LeftBtn.y = 0;
        LeftBtn.anchorX = 0;
        LeftBtn.anchorY = 0;
        this.addChild(LeftBtn,2);

        var UpBtn = new cc.Sprite(res.UpBtn_png);
        UpBtn.x = size.width;
        UpBtn.y = 0;
        UpBtn.anchorX = 1;
        UpBtn.anchorY = 0;
        this.addChild(UpBtn,2);

        this.distanceShow = new cc.LabelTTF("0","Arial",48);
        this.distanceShow.x = size.width;
        this.distanceShow.y = size.height;
        this.distanceShow.anchorX = 1;
        this.distanceShow.anchorY = 1;
        this.addChild(this.distanceShow, 1);

        this._life = new cc.Sprite(res.Life_png);
        this._life.x = 180;
        this._life.y = size.height-30;
        this.addChild(this._life,1);

    }

});