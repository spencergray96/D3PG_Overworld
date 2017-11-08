//Variables representing the layers from Tiled
var blockedLayer_c;
var backgroundLayer;

//Variables for the grid movement

var walkingLR = false;
var walkingUD = false;

var lastWalkingDirection;

var xCurrent;
var yCurrent;

var yUpdatingAbove;
var yUpdatingBelow;
var xUpdatingLeft;
var xUpdatingRight;

var movementOffset = 0;

var walkingAnimFPS = 7;
var playerSpeed = 60;
//NPC / object interaction

var NPCs = [];
var hitNPC = false;

//NPC movement

var RNGaboveThisNumberToMove = 600;
var delayOnMovingAgain = 1000;

var NPCindex = 0;

//ABSTRACT LEVEL CLASS

class abstractLevel extends Phaser.State {

    constructor(getGame, params, updatables) {
        super();
        this.getGame = getGame;
        this.params = params;
        this.updatables = updatables;
        
        this.events = {
            curEvents:0,
//            NPCindex: 0
        }
        
        
    }

    create() {
        this.game = this.getGame().game;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.generateMap();
        this.generatePlayer();
        this.generateMap2();

        this.updatables.forEach((o) => {
            o.createThis(this.game);
        });
        
        this.createNPCs();
    }

    generateMap() {
        this.game.map = this.game.add.tilemap(this.params.tilemap);
        this.game.map.addTilesetImage(this.params.tileSetImage["1"], this.params.tileSetImage["2"]);
        this.layerObj = {};
        for (let i = 0; i < this.params.layers.length; i ++) {
            this.layerObj[this.params.layers[i]] = this.game.map.createLayer(this.params.layers[i]);
        }
        this.game.map.setCollisionBetween(
            this.params.collisionRange.min,
            this.params.collisionRange.max,
            this.params.collisionRange.visible,
            this.params.collisionRange.name);
        
        blockedLayer_c = this.layerObj.blockedLayer_c;
        backgroundLayer = this.layerObj.backgroundLayer;

        this.layerObj["backgroundLayer"].resizeWorld();
        
//        console.log(this.game.map.getTile(0, 9, backgroundLayer, true).index);
    }

    generatePlayer() {
        var result = this.findObjectsByType('playerStart', this.game.map, 'objectsLayer');
        var x, y;
        if (doorDes.theDestination == "se14"){
            if (doorDes.from == 1){
                this.player = this.game.add.sprite(result[0].x, result[0].y, 'spencer_spritesheet');
                
                console.log("came from theStart");
                console.log(doorDes.from);
            }
            if (doorDes.from == 2){
                this.player = this.game.add.sprite(result[1].x, result[1].y, 'spencer_spritesheet');
                
                console.log("second door");
                console.log(doorDes.from);
            }
        }
        else {
            this.player = this.game.add.sprite(result[0].x, result[0].y, 'spencer_spritesheet');
            this.game.world.addAt(this.player, 3);
//            console.log("not se14");
//            console.log(doorDes.from);
        }
        
        this.player.frame = 7;
        this.player.animations.add("left", [0, 9, 1, 9], walkingAnimFPS, true);
        this.player.animations.add("right", [3, 12, 2, 12], walkingAnimFPS, true);
        this.player.animations.add("up", [4, 6, 5, 6], walkingAnimFPS, true);
        this.player.animations.add("down", [8, 7, 11, 7], walkingAnimFPS, true);
        
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);
        
        this.player.mymove = {
            speed:playerSpeed,
            state:0,
            x:this.player.x,
            y:this.player.y,
            x2:this.player.x,
            y2:this.player.y
        }
        
        xCurrent = Math.floor((this.player.mymove.x / 32));
        yCurrent = Math.floor((this.player.mymove.y / 32));
        
        console.log(this.player.x, this.player.y, (this.player.x / 32), (this.player.y / 32));
        console.log(this.player);
    }
    
    generateMap2() {
        this.layerObj2 = {};
        for (let i = 0; i < this.params.renderAboveLayers.length; i ++) {
            this.layerObj2[this.params.renderAboveLayers[i]] = this.game.map.createLayer(this.params.renderAboveLayers[i]);
        }
    }
    
    findObjectsByType(type, map, layer) {
        let result = [];
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }
    
    

    update() {
//        this.game.physics.arcade.overlap(this.player, this.items, null, this);
        hitNPC = false;
        
        yUpdatingAbove = Math.floor(((this.player.mymove.y - 32) / 32));
        yUpdatingBelow = Math.floor(((this.player.mymove.y + 32) / 32));
        xUpdatingLeft = Math.floor(((this.player.mymove.x - 32) / 32));
        xUpdatingRight = Math.floor(((this.player.mymove.x + 32) / 32));
        
        this.createControls();
        this.createEnterPress();
        
        switch(this.player.mymove.state){
            case 1:
                this.playerMoveX(true);
                break;
            case 2:
                this.playerMoveX(false);
                break;
            case 3:
                this.playerMoveY(true);
                break;
            case 4:
                this.playerMoveY(false);
                break;
        }
        
        this.updatables.forEach((o) => {
            o.updateThis(this.game, this.player);
        });
        
        var rand =  Math.floor(Math.random() * (NPCs.length - 1));
        this.tryToMakeNPCsMove((Math.random() * 1000), rand, Math.floor(Math.random() * 2), Math.floor(Math.random() * 2));
       
        
//this should be changed instead of a for loop
        
        for(var i = 1; i < (NPCs.length - 1); i++){
//            NPCs[i].hismove.cantMove = false;
            if(NPCs[i].hismove.walkingState > 0){
                
                switch(NPCs[i].hismove.walkingState){
                    case 1:
                        this.NPCmoveX(true, i);
                        break;
                    case 2:
                        this.NPCmoveX(false, i);
                        break;
                    case 3:
                        this.NPCmoveY(true, i);
                        break;
                    case 4:
                        this.NPCmoveY(false, i);
                        break;
                }
            }
        }
        
        
        //console.log(NPCs[NPCindex].hismove.cantMove);
        //NPCs[NPCindex].hismove.cantMove = false;
        
       // console.log(NPCindex, NPCs[NPCindex].hismove.isWalking);
//        switch(NPCs[NPCindex].hismove.walkingState){
//            case 1:
//                this.NPCmoveX(true, NPCindex);
//                break;
//            case 2:
//                this.NPCmoveX(false, NPCindex);
//                break;
//            case 3:
//                this.NPCmoveY(true, NPCindex);
//                break;
//            case 4:
//                this.NPCmoveY(false, NPCindex);
//                break;
//        }
//        NPCindex++;
//        if(NPCindex == NPCs.length - 1){
//            NPCindex = 0;
//        }
        
    }


    playerMoveX(isDown){
        if(isDown){
            if(Math.floor(this.player.x) < (this.player.mymove.x2)){
                this.player.body.velocity.x = this.player.mymove.speed;
            } else {
                this.player.body.velocity.x = 0;
                this.player.mymove.x = this.player.mymove.x2;
                this.player.x = this.player.mymove.x2 - movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x right: " + ((this.player.x + 32) / 32) + ", y above: " + yUpdatingAbove + ", y below: " + yUpdatingBelow);
                
                xCurrent = Math.floor((this.player.x / 32));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
            }
            lastWalkingDirection = "right";

        } else {
            if(Math.floor(this.player.x) > (this.player.mymove.x2)){
                this.player.body.velocity.x = this.player.mymove.speed*-1;
            } else {
                this.player.body.velocity.x = 0;
                this.player.mymove.x = this.player.mymove.x2;
                this.player.x = this.player.mymove.x2 + movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x left: " + ((this.player.x - 32) / 32) + ", y above: " + yUpdatingAbove + ", y below: " + yUpdatingBelow);
                
                xCurrent = Math.floor((this.player.x / 32));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
            }
            lastWalkingDirection = "left";

        }
    }
    
    playerMoveY(isDown){
        if(isDown){
            if(Math.floor(this.player.y) < (this.player.mymove.y2)){
                this.player.body.velocity.y = this.player.mymove.speed;
            } else {
                this.player.body.velocity.y = 0;
                this.player.mymove.y = this.player.mymove.y2;
                this.player.y = this.player.mymove.y2 - movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x left: " + xUpdatingLeft + ", x right: " + xUpdatingRight + ", y below: " + ((this.player.y + 32) / 32));
                
                yCurrent = Math.floor((this.player.y / 32));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
            }
            lastWalkingDirection = "down";

        } else {
            if(Math.floor(this.player.y) > (this.player.mymove.y2)){
                this.player.body.velocity.y = this.player.mymove.speed*-1;
            } else {
                this.player.body.velocity.y = 0;
                this.player.mymove.y = this.player.mymove.y2;
                this.player.y = this.player.mymove.y2 + movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x left: " + xUpdatingLeft + ", x right: " + xUpdatingRight + ", y above: " + ((this.player.y - 32) / 32));
                
                yCurrent = Math.floor((this.player.y / 32));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
            }
            lastWalkingDirection = "up";

        }
    }
    
    createControls() {
        if(!texting){
            
            if(this.cursors.up.isDown && !walkingLR) {
                if(this.player.mymove.state === 0){
                    if(this.game.map.getTile(xCurrent, yUpdatingAbove, blockedLayer_c, true).index == -1){
                        for(var i = 0; i < NPCs.length - 1; i++){
                            if((Math.round(NPCs[i].x / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].y / 32) == Math.round((this.player.y - 32) / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].y / 32) == Math.round((this.player.y - 32) / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].hismove.y2 / 32) == Math.round((this.player.y - 32) / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 4;
                            this.player.mymove.y2 = Math.floor(this.player.mymove.y) - 32;
                            this.player.animations.play("up");
                        }
                    } else {
                        lastWalkingDirection = "up";
                        this.setSpriteDirectionAfterWalking();
                    }
                }
            }

            else if(this.cursors.down.isDown && !walkingLR) {
                if(this.player.mymove.state === 0){
                    if(this.game.map.getTile(xCurrent, yUpdatingBelow, blockedLayer_c, true).index == -1){
                        for(var i = 0; i < NPCs.length - 1; i++){
                            if((Math.round(NPCs[i].x / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].y / 32) == Math.round((this.player.y + 32) / 32))){
                                lastWalkingDirection = "down";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].y / 32) == Math.round((this.player.y + 32) / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].hismove.y2 / 32) == Math.round((this.player.y + 32) / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 3;
                            this.player.mymove.y2 = Math.floor(this.player.mymove.y) + 32;
                            this.player.animations.play("down");
                        }
                    } else {
                        lastWalkingDirection = "down";
                        this.setSpriteDirectionAfterWalking();
                    }
                }
            }

            if(this.cursors.left.isDown && !walkingUD) {
                if(this.player.mymove.state === 0){
                    if(this.game.map.getTile(xUpdatingLeft, yCurrent, blockedLayer_c, true).index == -1){
                        for(var i = 0; i < NPCs.length - 1; i++){
                            if((Math.round(NPCs[i].x / 32) == Math.round((this.player.x - 32) / 32)) && (Math.round(NPCs[i].y / 32) == Math.round(this.player.y / 32))){
                                lastWalkingDirection = "left";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 32) == Math.round((this.player.x  - 32) / 32)) && (Math.round(NPCs[i].hismove.y2 / 32) == Math.round(this.player.y / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 32) == Math.round((this.player.x - 32)/ 32)) && (Math.round(NPCs[i].y / 32) == Math.round(this.player.y / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 2;
                            this.player.mymove.x2 = Math.floor(this.player.mymove.x) - 32;
                            this.player.animations.play("left");
                        }
                    } else {
                        lastWalkingDirection = "left";
                        this.setSpriteDirectionAfterWalking();
                    }
                }
            }

            else if(this.cursors.right.isDown && !walkingUD) {
                if(this.player.mymove.state === 0){
                    if(this.game.map.getTile(xUpdatingRight, yCurrent, blockedLayer_c, true).index == -1){
                        for(var i = 0; i < NPCs.length - 1; i++){
                            if((Math.round(NPCs[i].x / 32) == Math.round((this.player.x + 32) / 32)) && (Math.round(NPCs[i].y / 32) == Math.round(this.player.y / 32))){
                                lastWalkingDirection = "right";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 32) == Math.round((this.player.x  + 32) / 32)) && (Math.round(NPCs[i].hismove.y2 / 32) == Math.round(this.player.y / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 32) == Math.round((this.player.x + 32)/ 32)) && (Math.round(NPCs[i].y / 32) == Math.round(this.player.y / 32))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 1;
                            this.player.mymove.x2 = Math.floor(this.player.mymove.x) + 32;
                            this.player.animations.play("right");
                        }
                    } else {
                        lastWalkingDirection = "right";
                        this.setSpriteDirectionAfterWalking();
                    }
                }
            }
        }
    }
    
    createEnterPress(){
        if(this.enterKey.isDown){
            switch(lastWalkingDirection){
                case "up":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){
                            if((Math.round(NPCs[i].x / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].y / 32) == Math.round((this.player.y - 32) / 32))){
                                NPCs[i].frame = 7;
                                console.log("talked ABOVE");
                                
                            }
                        }
                    }
                    break;
                case "down":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){
                            if((Math.round(NPCs[i].x / 32) == Math.round(this.player.x / 32)) && (Math.round(NPCs[i].y / 32) == Math.round((this.player.y + 32) / 32))){
                                NPCs[i].frame = 6;
                                console.log("talked BELOW");
                                
                            }
                        }
                    }
                    break;
                case "left":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){
                            if((Math.round(NPCs[i].x / 32) == Math.round((this.player.x - 32) / 32)) && (Math.round(NPCs[i].y / 32) == Math.round(this.player.y / 32))){
                                NPCs[i].frame = 12;
                                console.log("talked LEFT");
                                
                            }
                        }
                    }
                    break;
                case "right":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){
                            if((Math.round(NPCs[i].x / 32) == Math.round((this.player.x + 32) / 32)) && (Math.round(NPCs[i].y / 32) == Math.round(this.player.y / 32))){
                                NPCs[i].frame = 9;
                                console.log("talked RIGHT");
                                
                            }
                        }
                    }
                    break;
            }
        }
    }
    
    setSpriteDirectionAfterWalking(){
        switch(lastWalkingDirection){
            case "up":
                this.player.frame = 6;
                break;
            case "down":
                this.player.frame = 7;
                break;
            case "left":
                this.player.frame = 9;
                break;
            case "right":
                this.player.frame = 12;
                break;
        }
    }
    
    setNPCDirectionAfterWalking(thingy, i){
        switch(thingy){
            case "up":
                NPCs[i].frame = 6;
                break;
            case "down":
                NPCs[i].frame = 7;
                break;
            case "left":
                NPCs[i].frame = 9;
                break;
            case "right":
                NPCs[i].frame = 12;
                break;
        }
    }

//    generateCollision() {
//        this.params.layers.forEach((layer) => {
//            if (layer[layer.length-2] === "_" && layer[layer.length-1] === "c"){
//                this.game.physics.arcade.collide(this.player, this.layerObj[layer], this.setNextToWall, null, this);
//            }
//        })
//    }

    createNPCs() {
        //create items
        this.NPCs = this.game.add.group();
        this.NPCs.enableBody = true;
        
        var NPC;
        var result;
        
        var i = 0;
        
        result = this.findObjectsByType('testingObj', this.game.map, 'objectsLayer');
        result.forEach(function(element){
            
            this.createFromTiledObject(element, this.NPCs, i);
//            this.newNPC = this.game.add.sprite(element.x, element.y, 'spencer_spritesheet');
            
            NPCs.push(element);
            i++;
        }, this);
        console.log(NPCs);
    }
    
    createFromTiledObject(element, group, i) {
//        var sprite = group.create(element.x, element.y, 'spencer_spritesheet');
        
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            element[key] = element.properties[key];
        });
        
        NPCs[i] = this.game.add.sprite(element.x, element.y, element.spritesheet);
        NPCs[i].frame = 7;
        NPCs[i].hismove = {
            originalX: element.x,
            originalY: element.y,
            xMin: Math.floor((element.x - 32) / 32),
            yMin: Math.floor((element.y - 32) / 32),
            xMax: Math.floor((element.x + 32) / 32),
            yMax: Math.floor((element.y + 32) / 32),
            x: element.x,
            y: element.y,
            x2: element.x,
            y2: element.y,
            walkingState: 0,
            lastwalkingDirection: null,
            isWalking: false,
            cantMove: false
        }
        
        NPCs[i].animations.add("left", [0, 9, 1, 9], walkingAnimFPS, true);
        NPCs[i].animations.add("right", [3, 12, 2, 12], walkingAnimFPS, true);
        NPCs[i].animations.add("up", [4, 6, 5, 6], walkingAnimFPS, true);
        NPCs[i].animations.add("down", [8, 7, 11, 7], walkingAnimFPS, true);
        
//        console.log(NPCs[i].hismove);
        
        this.game.physics.arcade.enable(NPCs[i]);
    }
    
    tryToMakeNPCsMove(randomNumber, randomNPC, randomDirection, positiveOrNegative){
        //console.log(randomNumber, NPCs[randomNPC].hismove);
        var directionMultiplier;
        if(positiveOrNegative == 0){
            directionMultiplier = 1;
        } else if(positiveOrNegative == 1){
            directionMultiplier = -1;
        }
        
        if(randomNumber > RNGaboveThisNumberToMove){
            if(!NPCs[randomNPC].hismove.isWalking && !NPCs[randomNPC].hismove.cantMove && (NPCs[randomNPC].hismove.walkingState == 0)){
                NPCs[randomNPC].hismove.isWalking = true;
                
                if(randomDirection == 0){
                    var thisNPCsXValue = Math.round((NPCs[randomNPC].hismove.x + (32 * directionMultiplier)) / 32);
                    var thisNPCsYValue = Math.round(NPCs[randomNPC].hismove.y / 32);
                    if(thisNPCsXValue < NPCs[randomNPC].hismove.xMin || thisNPCsXValue > NPCs[randomNPC].hismove.xMax){
                    } else {
                        if(this.game.map.getTile(thisNPCsXValue, thisNPCsYValue, blockedLayer_c, true).index == -1){
                            if((Math.round(this.player.x / 32)) == thisNPCsXValue && (Math.round(this.player.y / 32)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            if((Math.round(this.player.mymove.x2) / 32) == thisNPCsXValue && (Math.round(this.player.y / 32)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            if((Math.round(this.player.mymove.y2 / 32) == thisNPCsYValue) && (Math.round(this.player.x / 32) == thisNPCsXValue)){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            for(var i = 0; i < NPCs.length - 1; i++){
                                if((Math.round(NPCs[i].x / 32) == thisNPCsXValue) && (Math.round(NPCs[i].y / 32) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].hismove.x2 / 32) == thisNPCsXValue) && (Math.round(NPCs[i].y / 32) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].x / 32) == thisNPCsXValue) && (Math.round(NPCs[i].hismove.y2 / 32) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                            }
                            if(!NPCs[randomNPC].hismove.cantMove){
                                NPCs[randomNPC].hismove.x2 = (NPCs[randomNPC].hismove.x + (32 * directionMultiplier));
                                if(directionMultiplier == 1){
                                    NPCs[randomNPC].hismove.walkingState = 1;
                                    NPCs[randomNPC].animations.play("right");
                                } else if(directionMultiplier == -1){
                                    NPCs[randomNPC].hismove.walkingState = 2;
                                    NPCs[randomNPC].animations.play("left");
                                }
                            }
                        }
                    }
                }
                else if(randomDirection == 1){
                    var thisNPCsXValue = Math.round(NPCs[randomNPC].hismove.x / 32);
                    var thisNPCsYValue = Math.round((NPCs[randomNPC].hismove.y + (32 * directionMultiplier)) / 32);
                    if(thisNPCsYValue < NPCs[randomNPC].hismove.yMin || thisNPCsYValue > NPCs[randomNPC].hismove.yMax){
                    } else {
                        if(this.game.map.getTile(thisNPCsXValue, thisNPCsYValue, blockedLayer_c, true).index == -1){
                            if((Math.round(this.player.x / 32)) == thisNPCsXValue && (Math.round(this.player.y / 32)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            if((Math.round(this.player.mymove.x2) / 32) == thisNPCsXValue && (Math.round(this.player.y / 32)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                                console.log("tried to move onto player");
                            }
                            if((Math.round(this.player.mymove.y2 / 32) == thisNPCsYValue) && (Math.round(this.player.x / 32) == thisNPCsXValue)){
                                NPCs[randomNPC].hismove.cantMove = true;
                                console.log("tried to move onto player v2");
                            }
                            for(var i = 0; i < NPCs.length - 1; i++){
                                if((Math.round(NPCs[i].x / 32) == thisNPCsXValue) && (Math.round(NPCs[i].y / 32) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].hismove.x2 / 32) == thisNPCsXValue) && (Math.round(NPCs[i].y / 32) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].x / 32) == thisNPCsXValue) && (Math.round(NPCs[i].hismove.y2 / 32) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                            }
                            if(!NPCs[randomNPC].hismove.cantMove){
                                NPCs[randomNPC].hismove.y2 = (NPCs[randomNPC].hismove.y + (32 * directionMultiplier));
                                if(directionMultiplier == 1){
                                    NPCs[randomNPC].hismove.walkingState = 3;
                                    NPCs[randomNPC].animations.play("down");
                                } else if(directionMultiplier == -1){
                                    NPCs[randomNPC].hismove.walkingState = 4;
                                    NPCs[randomNPC].animations.play("up");
                                }
                            }
                        }
                    }
                }
            }
        }
                    setTimeout(function(){
                        NPCs[randomNPC].hismove.isWalking = false;
                        NPCs[randomNPC].hismove.cantMove = false;
                    }, 1000);
                }

    NPCmoveX(isDown, i){
        if(isDown){
            if(Math.round(NPCs[i].x) < (NPCs[i].hismove.x2)){
                NPCs[i].body.velocity.x = this.player.mymove.speed;
            } else {
                NPCs[i].body.velocity.x = 0;
                NPCs[i].hismove.x = NPCs[i].hismove.x2;
                NPCs[i].x = NPCs[i].hismove.x2 - movementOffset;
                NPCs[i].hismove.walkingState = 0;
                NPCs[i].hismove.isWalking = false;
                NPCs[i].animations.stop();
                this.setNPCDirectionAfterWalking(NPCs[i].hismove.lastwalkingDirection, i);
//                console.log("Fin",NPCs[i].hismove.isWalking);
            }
            NPCs[i].hismove.lastwalkingDirection = "right";

        } else {
            if(Math.round(NPCs[i].x) > (NPCs[i].hismove.x2)){
                NPCs[i].body.velocity.x = this.player.mymove.speed*-1;
            } else {
                NPCs[i].body.velocity.x = 0;
                NPCs[i].hismove.x = NPCs[i].hismove.x2;
                NPCs[i].x = NPCs[i].hismove.x2 + movementOffset;
                NPCs[i].hismove.walkingState = 0;
                NPCs[i].hismove.isWalking = false;
                NPCs[i].animations.stop();
                this.setNPCDirectionAfterWalking(NPCs[i].hismove.lastwalkingDirection, i);
//                console.log("Fin",NPCs[i].hismove.isWalking);
            }
            NPCs[i].hismove.lastwalkingDirection = "left";

        }
    }
    
    NPCmoveY(isDown, i){
        if(isDown){
            if(Math.round(NPCs[i].y) < (NPCs[i].hismove.y2)){
                NPCs[i].body.velocity.y = this.player.mymove.speed;
            } else {
                NPCs[i].body.velocity.y = 0;
                NPCs[i].hismove.y = NPCs[i].hismove.y2;
                NPCs[i].y = NPCs[i].hismove.y2 - movementOffset;
                NPCs[i].hismove.walkingState = 0;
                NPCs[i].hismove.isWalking = false;
                NPCs[i].animations.stop();
                this.setNPCDirectionAfterWalking(NPCs[i].hismove.lastwalkingDirection, i);
//                console.log("Fin",NPCs[i].hismove.isWalking);
            }
            NPCs[i].hismove.lastwalkingDirection = "down";

        } else {
            if(Math.round(NPCs[i].y) > (NPCs[i].hismove.y2)){
                NPCs[i].body.velocity.y = this.player.mymove.speed*-1;
            } else {
                NPCs[i].body.velocity.y = 0;
                NPCs[i].hismove.y = NPCs[i].hismove.y2;
                NPCs[i].y = NPCs[i].hismove.y2 + movementOffset;
                NPCs[i].hismove.walkingState = 0;
                NPCs[i].hismove.isWalking = false;
                NPCs[i].animations.stop();
                this.setNPCDirectionAfterWalking(NPCs[i].hismove.lastwalkingDirection, i);
//                console.log("Fin",NPCs[i].hismove.isWalking);
            }
            NPCs[i].hismove.lastwalkingDirection = "up";

        }
    }
}