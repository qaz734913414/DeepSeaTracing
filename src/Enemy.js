/**
 * Created by njw on 2015/8/28.
 */
var Enemy = cc.Layer.extend({
    //speed:0,
    enemyOne:null,
    enemyTwo:null,
    enemyThree:null,
    screenWidth:0,
    screenHeight:0,
    ctor:function(){
        cc.log("Enter Enermy");
        this._super();
        this.scheduleUpdate();
        var size = cc.winSize;
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        this.enemyOne = Fish.createType(parseInt(Math.random()*10));
        this.enemyOne.x = size.width*xOffset[parseInt(Math.random()*6)];
        this.enemyOne.y = this.getRandomRaceRoad();
        cc.log(this.enemyOne.y);
        this.enemyOne.anchorX = 0;
        this.addChild(this.enemyOne,1);
        cc.log("enemyOne finish");

        this.enemyTwo = Fish.createType(parseInt(Math.random()*10));
        this.enemyTwo.x = size.width*xOffset[parseInt(Math.random()*6)];
        this.enemyTwo.y = this.getRandomRaceRoad();
        this.enemyTwo.anchorX = 0;
        this.addChild(this.enemyTwo,1);
        cc.log("enemyTwo finish");

        this.enemyThree = Fish.createType(parseInt(Math.random()*10));
        this.enemyThree.x = size.width*xOffset[parseInt(Math.random()*6)];
        this.enemyThree.y = this.getRandomRaceRoad();
        this.enemyThree.anchorX = 0;
        this.addChild(this.enemyThree,1);

        cc.log("Enermy1 speed:" + this.enemyOne.speed);
        cc.log("Enermy2 speed:" + this.enemyTwo.speed);
    },

    update:function(dt){
        if(this.enemyOne.x<-this.screenWidth/2){
            this.enemyOne.x = this.screenWidth;
        }
        if(this.enemyTwo.x<-this.screenWidth/2){
            this.enemyTwo.x = this.screenWidth;
        }
        if(this.enemyThree.x<-this.screenWidth/2){
            this.enemyThree.x = this.screenWidth;
        }
        this.enemyOne.x -= this.enemyOne.speed;
        this.enemyTwo.x -= this.enemyTwo.speed;
        this.enemyThree.x -= this.enemyThree.speed;

    },
    getRandomRaceRoad:function(){
        /**
         * 产生1~6随机赛道
         * */
        var random=parseInt(Math.random()*6) ;
        return raceRoad[random];
    }
});