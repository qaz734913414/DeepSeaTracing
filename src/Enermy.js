/**
 * Created by njw on 2015/8/28.
 */
var Enermy = cc.Layer.extend({
    //speed:0,
    enermyOne:null,
    enermyTwo:null,
    enermyThree:null,
    screenWidth:0,
    screenHeight:0,
    ctor:function(){
        cc.log("Enter Enermy");
        this._super();
        this.scheduleUpdate();
        var size = cc.winSize;
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        this.enermyOne = Fish.createRandomType();
        this.enermyOne.x = size.width*xOffset[parseInt(Math.random()*6)];
        this.enermyOne.y = this.getRandomRaceRoad();
        cc.log(this.enermyOne.y);
        this.enermyOne.anchorX = 0;
        this.addChild(this.enermyOne,1);
        cc.log("enermyOne finish");

        this.enermyTwo = Fish.createRandomType();
        this.enermyTwo.x = size.width*xOffset[parseInt(Math.random()*6)];
        this.enermyTwo.y = this.getRandomRaceRoad();
        this.enermyTwo.anchorX = 0;
        this.addChild(this.enermyTwo,1);
        cc.log("enermyTwo finish");

        this.enermyThree = Fish.createRandomType();
        this.enermyThree.x = size.width*xOffset[parseInt(Math.random()*6)];
        this.enermyThree.y = this.getRandomRaceRoad();
        this.enermyThree.anchorX = 0;
        this.addChild(this.enermyThree,1);

        cc.log("Enermy1 speed:" + this.enermyOne.speed);
        cc.log("Enermy2 speed:" + this.enermyTwo.speed);
    },
    update:function(dt){
        if(this.enermyOne.x<-this.screenWidth/2){
            this.enermyOne.x = this.screenWidth;
        }
        if(this.enermyTwo.x<-this.screenWidth/2){
            this.enermyTwo.x = this.screenWidth;
        }
        if(this.enermyThree.x<-this.screenWidth/2){
            this.enermyThree.x = this.screenWidth;
        }
        this.enermyOne.x -= this.enermyOne.speed;
        this.enermyTwo.x -= this.enermyTwo.speed;
        this.enermyThree.x -= this.enermyThree.speed;

    },
    getRandomRaceRoad:function(){
        /**
         * 产生1-6随机赛道
         * */
        var random=parseInt(Math.random()*6) ;
        return raceRoad[random];
    }
});