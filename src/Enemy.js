/**
 * Created by njw on 2015/8/28.
 */
var Enemy = cc.Layer.extend({
    enemyNum:null,
    enemyFish:[],
    screenWidth:0,
    screenHeight:0,
    ctor:function(){
        cc.log("Enter Enermy");
        this._super();
        this.scheduleUpdate();
        var size = cc.winSize;
        this.screenWidth = size.width;
        this.screenHeight = size.height;

        this.enemyNum = parseInt(Math.random()*3+4);

        for(var i=0; i<enemyFishType.length; i++){
            this.enemyFish[i] = Fish.createType(enemyFishType[i]/4);
            //this.enemyFish[i].x = size.width*xOffset[parseInt(Math.random()*6)];
            //this.enemyFish[i].y = this.getRandomRaceRoad();
            this.enemyFish[i].x = enemyFishX[i];
            this.enemyFish[i].y = this.screenHeight - enemyFishY[i];
            this.enemyFish[i].anchorX = 0;
            cc.log(this.enemyFish[i]);
            this.addChild(this.enemyFish[i],1);
        }



        //this.enemyOne = Fish.createType(parseInt(Math.random()*15));
        //this.enemyOne.x = size.width*xOffset[parseInt(Math.random()*6)];
        //this.enemyOne.y = this.getRandomRaceRoad();
        //cc.log(this.enemyOne.y);
        //this.enemyOne.anchorX = 0;
        //this.addChild(this.enemyOne,1);
        //cc.log("enemyOne finish");
        //
        //this.enemyTwo = Fish.createType(parseInt(Math.random()*15));
        //this.enemyTwo.x = size.width*xOffset[parseInt(Math.random()*6)];
        //this.enemyTwo.y = this.getRandomRaceRoad();
        //this.enemyTwo.anchorX = 0;
        //this.addChild(this.enemyTwo,1);
        //cc.log("enemyTwo finish");
        //
        //this.enemyThree = Fish.createType(parseInt(Math.random()*15));
        //this.enemyThree.x = size.width*xOffset[parseInt(Math.random()*6)];
        //this.enemyThree.y = this.getRandomRaceRoad();
        //this.enemyThree.anchorX = 0;
        //this.addChild(this.enemyThree,1);
        //
        //cc.log("Enermy1 speed:" + this.enemyOne.speed);
        //cc.log("Enermy2 speed:" + this.enemyTwo.speed);
    },

    update:function(dt){
        //for(var i=0; i<this.enemyNum; i++){
        //    if(this.enemyFish[i].x<-this.screenWidth/2){
        //        this.removeChild(this.enemyFish[i]);
        //        this.enemyFish[i] = null;
        //        this.enemyFish[i] = Fish.createType(parseInt(Math.random()*16));
        //        this.enemyFish[i].x = cc.winSize.width*xOffset[parseInt(Math.random()*6)];
        //        this.enemyFish[i].y = this.getRandomRaceRoad();
        //        this.enemyFish[i].anchorX = 0;
        //        this.addChild(this.enemyFish[i],1);
        //    }
        //}

        for(var i=0; i<enemyFishType.length; i++){
            //this.enemyFish[i].x -= this.enemyFish[i].speed;
            if(enemyFishType[i])
            this.enemyFish[i].x -= 5;
        }

    },
    getRandomRaceRoad:function(){
        /**
         * 产生1~6随机赛道
         * */
        var random=parseInt(Math.random()*6) ;
        return raceRoad[random];
    }
});