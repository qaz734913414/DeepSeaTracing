
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        //var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        //var closeItem = new cc.MenuItemImage(
        //    res.CloseNormal_png,
        //    res.CloseSelected_png,
        //    function () {
        //        cc.log("Menu is clicked!");
        //    }, this);
        //closeItem.attr({
        //    x: size.width - 20,
        //    y: 20,
        //    anchorX: 0.5,
        //    anchorY: 0.5
        //});
        //
        //var menu = new cc.Menu(closeItem);
        //menu.x = 0;
        //menu.y = 0;
        //this.addChild(menu, 1);
        //
        ///////////////////////////////
        //// 3. add your codes below...
        //// add a label shows "Hello World"
        //// create and initialize a label
        //var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        //// position the label on the center of the screen
        //helloLabel.x = size.width / 2;
        //helloLabel.y = 0;
        //// add the label as a child to this layer
        //this.addChild(helloLabel, 5);
        //
        //// add "HelloWorld" splash screen"
        //var sprite =Fish.createRandomType();
        //this.addChild(sprite, 2);
        //
        //sprite.runAction(
        //    cc.sequence(
        //        cc.rotateTo(2, 0),
        //        cc.scaleTo(2, 1, 1)
        //    )
        //);
        //helloLabel.runAction(
        //    cc.spawn(
        //        cc.moveBy(2.5, cc.p(0, size.height - 40)),
        //        cc.tintTo(2.5,255,125,0)
        //    )
        //);
        var size = cc.winSize;
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.FishSize_plist,res.FishSize_png);

        for(var i =1;i<14;i++){
            var sprite = new cc.Sprite("#fishsize"+i+".png");
            cc.log("sprite");
            sprite.x = 280*(i%4)+200;
            sprite.y = (Math.ceil(i/4)-1)*140+100;
            sprite.anchorX = 0;
            sprite.anchorY = 0;
            this.addChild(sprite,1);
        }

        var sprite1 = new cc.Sprite(res.BackGround_png);
        sprite1.setPosition(size.width/2,size.height/2);
        this.addChild(sprite1,0);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

