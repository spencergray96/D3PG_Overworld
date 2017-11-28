// event object

var eventObject = {
    hismove: {}
};

//walking Objects
var walkingobjsArr = [];

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

var walkingAnimFPS = 8;
var playerSpeed = 360;
//NPC / object interaction

var NPCs = [];
//var NPCs2 = [];
var hitNPC = false;

var currentNPC = null;

//NPC movement

var RNGaboveThisNumberToMove = 900;
var delayOnMovingAgain = 1000;

var NPCindex = 0;
var NPCvelocity = 240;

//starting character Frame
var startingCharFrame = 5;

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
//        NPCs = [];
        playerSpriteSheet = playerStats[0].spritesheet;
        this.game = this.getGame().game;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.ctrlKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL)
        
        this.generateMap();
        this.generatePlayer();

        this.updatables.forEach((o) => {
            o.createThis(this.game);
        });
        
        this.createNPCs();
        this.generateMap2();
        
        //walking objs
//        this.generateWalkingObjects();
    }

    generateMap() {
        this.game.map = this.game.add.tilemap(this.params.tilemap);
//        this.game.map.addTilesetImage(this.params.tileSetImage["1"], this.params.tileSetImage["2"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["1"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["2"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["3"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["4"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["5"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["6"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["7"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["8"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["9"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["10"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["11"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["12"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["13"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["14"]);
        this.game.map.addTilesetImage(this.params.tileSetImage["15"]);
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
        if(currentDoor == undefined || currentDoor.coolProperties.from == null){
            this.player = this.game.add.sprite(result[0].x, result[0].y, playerSpriteSheet);
        } else {
            switch(currentDoor.coolProperties.from){
                case "se14":
                    this.player = this.game.add.sprite(result[1].x, result[1].y, playerSpriteSheet);
                    break;
                case "sw03":
                    this.player = this.game.add.sprite(result[2].x, result[2].y, playerSpriteSheet);
                    break;
                case "se6":
                    this.player = this.game.add.sprite(result[3].x, result[3].y, playerSpriteSheet);
                    break;
                case "dorm":
                    this.player = this.game.add.sprite(result[4].x, result[4].y, playerSpriteSheet);
                    break;
                case "ne1":
                    this.player = this.game.add.sprite(result[5].x, result[5].y, playerSpriteSheet);
                    break;
            }
        }
        
        this.player.frame = startingCharFrame;
        this.player.animations.add("left", [6, 8, 7, 8], walkingAnimFPS, true);
        this.player.animations.add("right", [9, 11, 10, 11], walkingAnimFPS, true);
        this.player.animations.add("up", [0, 2, 1, 2], walkingAnimFPS, true);
        this.player.animations.add("down", [3, 5, 4, 5], walkingAnimFPS, true);
        
        this.player.animations.add("fastleft", [6, 8, 7, 8], walkingAnimFPS*1.5, true);
        this.player.animations.add("fastright", [9, 11, 10, 11], walkingAnimFPS*1.5, true);
        this.player.animations.add("fastup", [0, 2, 1, 2], walkingAnimFPS*1.5, true);
        this.player.animations.add("fastdown", [3, 5, 4, 5], walkingAnimFPS*1.5, true);
        
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
        
        xCurrent = Math.floor((this.player.mymove.x / 128));
        yCurrent = Math.floor((this.player.mymove.y / 128));
    }
    
    generatePlayer2(){
        this.player.loadTexture(playerSpriteSheet);
        this.player.frame = 5;
        this.setSpriteDirectionAfterWalking();
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
        if(playerSpriteSheet != null){
            this.generatePlayer2();
            playerSpriteSheet = null;
        }
//        this.game.physics.arcade.overlap(this.player, this.items, null, this);
        hitNPC = false;
        
        yUpdatingAbove = Math.floor(((this.player.mymove.y - 128) / 128));
        yUpdatingBelow = Math.floor(((this.player.mymove.y + 128) / 128));
        xUpdatingLeft = Math.floor(((this.player.mymove.x - 128) / 128));
        xUpdatingRight = Math.floor(((this.player.mymove.x + 128) / 128));
        
        if(!disableControls){
            this.createControls();
            this.createEnterPress();
        }
        
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
        
        if(NPCs.length > 0){
            var rand =  Math.floor(Math.random() * (NPCs.length - 1));
            this.tryToMakeNPCsMove((Math.random() * 1000), rand, Math.floor(Math.random() * 2), Math.floor(Math.random() * 2));
        }
       
        
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
        
        this.checkForRunning();
        this.player.mymove.speed = playerSpeed;
    }

    checkForRunning(){
        if(this.ctrlKey.isDown && runningShoes){
            playerSpeed = 540;
        } else if(this.ctrlKey.isUp){
            playerSpeed = 360;
        }
    }
    
    playerMoveX(isDown){
        if(isDown){
            if(Math.round(this.player.x) < (this.player.mymove.x2)){
                this.player.body.velocity.x = this.player.mymove.speed;
            } else {
                this.player.body.velocity.x = 0;
                this.player.mymove.x = this.player.mymove.x2;
//                this.player.x = this.player.mymove.x2 - movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x right: " + ((this.player.x + 128) / 128) + ", y above: " + yUpdatingAbove + ", y below: " + yUpdatingBelow);
                
                xCurrent = Math.round((this.player.x / 128));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
                
                testTrigger = false;
            }
            lastWalkingDirection = "right";

        } else {
            if(Math.round(this.player.x) > (this.player.mymove.x2)){
                this.player.body.velocity.x = this.player.mymove.speed*-1;
            } else {
                this.player.body.velocity.x = 0;
                this.player.mymove.x = this.player.mymove.x2;
//                this.player.x = this.player.mymove.x2 + movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x left: " + ((this.player.x - 128) / 128) + ", y above: " + yUpdatingAbove + ", y below: " + yUpdatingBelow);
                
                xCurrent = Math.round((this.player.x / 128));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
                
                testTrigger = false;
            }
            lastWalkingDirection = "left";

        }
    }
    
    playerMoveY(isDown){
        if(isDown){
            if(Math.round(this.player.y) < (this.player.mymove.y2)){
                this.player.body.velocity.y = this.player.mymove.speed;
            } else {
                this.player.body.velocity.y = 0;
                this.player.mymove.y = this.player.mymove.y2;
//                this.player.y = this.player.mymove.y2 - movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x left: " + xUpdatingLeft + ", x right: " + xUpdatingRight + ", y below: " + ((this.player.y + 128) / 128));
                
                yCurrent = Math.round((this.player.y / 128));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
                
                testTrigger = false;
            }
            lastWalkingDirection = "down";

        } else {
            if(Math.round(this.player.y) > (this.player.mymove.y2)){
                this.player.body.velocity.y = this.player.mymove.speed*-1;
            } else {
                this.player.body.velocity.y = 0;
                this.player.mymove.y = this.player.mymove.y2;
//                this.player.y = this.player.mymove.y2 + movementOffset;
                this.player.mymove.state = 0;
                
//                console.log(this.player.world);
//                console.log("x left: " + xUpdatingLeft + ", x right: " + xUpdatingRight + ", y above: " + ((this.player.y - 128) / 128));
                
                yCurrent = Math.round((this.player.y / 128));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
                
                testTrigger = false;
            }
            lastWalkingDirection = "up";

        }
    }
    
    createControls() {
        if(!texting && !isPaused){
            
            if(this.cursors.up.isDown && !walkingLR) {
                if(this.player.mymove.state === 0){
                    if(this.game.map.getTile(xCurrent, yUpdatingAbove, blockedLayer_c, true).index == -1){
                        for(var i = 0; i < NPCs.length - 1; i++){
                            if((Math.round(NPCs[i].x / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].y / 128) == Math.round((this.player.y - 128) / 128))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].y / 128) == Math.round((this.player.y - 128) / 128))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].hismove.y2 / 128) == Math.round((this.player.y - 128) / 128))){
                                lastWalkingDirection = "up";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 4;
                            this.player.mymove.y2 = Math.floor(this.player.mymove.y) - 128;
                            
                            if(this.ctrlKey.isDown){
                                this.player.animations.play("fastup");
                            } else {
                                this.player.animations.play("up");
                            }
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
                            if((Math.round(NPCs[i].x / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].y / 128) == Math.round((this.player.y + 128) / 128))){
                                lastWalkingDirection = "down";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].y / 128) == Math.round((this.player.y + 128) / 128))){
                                lastWalkingDirection = "down";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].hismove.y2 / 128) == Math.round((this.player.y + 128) / 128))){
                                lastWalkingDirection = "down";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 3;
                            this.player.mymove.y2 = Math.floor(this.player.mymove.y) + 128;
                            
                            if(this.ctrlKey.isDown){
                                this.player.animations.play("fastdown");
                            } else {
                                this.player.animations.play("down");
                            }
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
                            if((Math.round(NPCs[i].x / 128) == Math.round((this.player.x - 128) / 128)) && (Math.round(NPCs[i].y / 128) == Math.round(this.player.y / 128))){
                                lastWalkingDirection = "left";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 128) == Math.round((this.player.x  - 128) / 128)) && (Math.round(NPCs[i].hismove.y2 / 128) == Math.round(this.player.y / 128))){
                                lastWalkingDirection = "left";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 128) == Math.round((this.player.x - 128)/ 128)) && (Math.round(NPCs[i].y / 128) == Math.round(this.player.y / 128))){
                                lastWalkingDirection = "left";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 2;
                            this.player.mymove.x2 = Math.floor(this.player.mymove.x) - 128;
                            
                            if(this.ctrlKey.isDown){
                                this.player.animations.play("fastleft");
                            } else {
                                this.player.animations.play("left");
                            }
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
                            if((Math.round(NPCs[i].x / 128) == Math.round((this.player.x + 128) / 128)) && (Math.round(NPCs[i].y / 128) == Math.round(this.player.y / 128))){
                                lastWalkingDirection = "right";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].x / 128) == Math.round((this.player.x  + 128) / 128)) && (Math.round(NPCs[i].hismove.y2 / 128) == Math.round(this.player.y / 128))){
                                lastWalkingDirection = "right";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                            if((Math.round(NPCs[i].hismove.x2 / 128) == Math.round((this.player.x + 128)/ 128)) && (Math.round(NPCs[i].y / 128) == Math.round(this.player.y / 128))){
                                lastWalkingDirection = "right";
                                this.setSpriteDirectionAfterWalking();
                                hitNPC = true;
                                break;
                            }
                        }
                        if(!hitNPC){
                            this.player.mymove.state = 1;
                            this.player.mymove.x2 = Math.floor(this.player.mymove.x) + 128;
                            
                            if(this.ctrlKey.isDown){
                                this.player.animations.play("fastright");
                            } else {
                                this.player.animations.play("right");
                            }
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

                            if((Math.round(NPCs[i].x / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].y / 128) == Math.round((this.player.y - 128) / 128))){
                                NPCs[i].frame = 5;
                                currentNPC = NPCs[i];
                            }
                        }
                    }
                    break;
                case "down":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){

                            if((Math.round(NPCs[i].x / 128) == Math.round(this.player.x / 128)) && (Math.round(NPCs[i].y / 128) == Math.round((this.player.y + 128) / 128))){
                                NPCs[i].frame = 2;
                                currentNPC = NPCs[i];
                            }
                        }
                    }
                    break;
                case "left":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){

                            if((Math.round(NPCs[i].x / 128) == Math.round((this.player.x - 128) / 128)) && (Math.round(NPCs[i].y / 128) == Math.round(this.player.y / 128))){
                                NPCs[i].frame = 11;
                                currentNPC = NPCs[i];
                            }
                        }
                    }
                    break;
                case "right":
                    for(var i = 0; i < NPCs.length - 1; i++){
                        if(NPCs[i].hismove.walkingState == 0){

                            if((Math.round(NPCs[i].x / 128) == Math.round((this.player.x + 128) / 128)) && (Math.round(NPCs[i].y / 128) == Math.round(this.player.y / 128))){
                                NPCs[i].frame = 8;
                                currentNPC = NPCs[i];
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
                this.player.frame = 2;
                break;
            case "down":
                this.player.frame = 5;
                break;
            case "left":
                this.player.frame = 8;
                break;
            case "right":
                this.player.frame = 11;
                break;
        }
    }
    
    setNPCDirectionAfterWalking(thingy, i){
        switch(thingy){
            case "up":
                NPCs[i].frame = 2;
                break;
            case "down":
                NPCs[i].frame = 5;
                break;
            case "left":
                NPCs[i].frame = 8;
                break;
            case "right":
                NPCs[i].frame = 11;
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
        
//        NPCs = [];
        
        var NPC;
        var result;
        
        var i = 0;
        
        result = this.findObjectsByType('testingObj', this.game.map, 'objectsLayer');
        result.forEach(function(element){
            
            this.createNPCsFromTiledObject(element, this.NPCs, i);
//            this.newNPC = this.game.add.sprite(element.x, element.y, 'spencer_spritesheet');
            
            NPCs.push(element);
            i++;
        }, this);
    }
    
    createNPCsFromTiledObject(element, group, i) {
//        var sprite = group.create(element.x, element.y, 'spencer_spritesheet');
        
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            element[key] = element.properties[key];
        });
        
        NPCs[i] = this.game.add.sprite(element.x, element.y, element.spritesheet);
        NPCs[i].frame = 5;
        NPCs[i].hismove = {
            originalX: element.x,
            originalY: element.y,
            xMin: Math.round((element.x - 128) / 128),
            yMin: Math.round((element.y - 128) / 128),
            xMax: Math.round((element.x + 128) / 128),
            yMax: Math.round((element.y + 128) / 128),
            x: element.x,
            y: element.y,
            x2: element.x,
            y2: element.y,
            walkingState: 0,
            lastwalkingDirection: null,
            isWalking: false,
            cantMove: false,
            
            NPCkey: i,
            npcName: element.npcName,
            eventNPC: element.eventNPC,
            
            eventID: element.eventID
        }
        //making cinematic NPCs unable to move
        if(NPCs[i].hismove.eventID == "dov1" || NPCs[i].hismove.eventID == "james1" || NPCs[i].hismove.eventID == "raymond1"){
            NPCs[i].hismove.cantMove = true;
        }
        
        if(NPCs[i].hismove.eventID == "se6note" || NPCs[i].hismove.eventID == "ne1lamp" || NPCs[i].hismove.eventID == "se14comp" || NPCs[i].hismove.eventID == "dormComp" || NPCs[i].hismove.npcName == "jessie" || NPCs[i].hismove.npcName == "microwaveItem" || NPCs[i].hismove.npcName == "jakub" || NPCs[i].hismove.npcName == "henryLaptop" || NPCs[i].hismove.npcName == "KETLLE" || NPCs[i].hismove.npcName == "bookcaseNPC"){
            NPCs[i].hismove.cantMove = true;
        }
        
        if(NPCs[i].hismove.eventID != "se6note" && NPCs[i].hismove.eventID != "ne1lamp" && NPCs[i].hismove.eventID != "se14comp" && NPCs[i].hismove.eventID != "dormComp" && NPCs[i].hismove.npcName != "microwaveItem" && NPCs[i].hismove.npcName != "henryLaptop" && NPCs[i].hismove.npcName != "KETLLE" && NPCs[i].hismove.npcName != "bookcaseNPC"){
            NPCs[i].animations.add("left", [6, 8, 7, 8], walkingAnimFPS, true);
            NPCs[i].animations.add("right", [9, 11, 10, 11], walkingAnimFPS, true);
            NPCs[i].animations.add("up", [0, 2, 1, 2], walkingAnimFPS, true);
            NPCs[i].animations.add("down", [3, 5, 4, 5], walkingAnimFPS, true);
        }


        this.game.physics.arcade.enable(NPCs[i]);
//PREVENTING EVENT NPCS FROM SPAWNING
        if(eventNumber > 0){
            for(var i = 0; i < NPCs.length - 1; i++){
            
                if(NPCs[i].hismove.eventID == "dov1" || NPCs[i].hismove.eventID == "james1" || NPCs[i].hismove.eventID == "raymond1"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
                    NPCs[i].destroy();
                }
            }
        }
        
        if(eventNumber < 5 || eventNumber >= 25){
            if(NPCs[i].hismove.npcName == "ramin"){
                console.log("hello world??");
                NPCs[i].x = -100000;
                NPCs[i].y = -100000;
                NPCs[i].destroy();
            }
        }
        
        if(eventNumber > 13){
            if(NPCs[i].hismove.npcName == "ne1lamp"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
            }
        }
        
        if(eventNumber > 22){
            if(NPCs[i].hismove.npcName == "dormComp"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
            }
        }
        
        if(gotMicrowave){
            if(NPCs[i].hismove.npcName == "microwaveItem"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
            }
        }
        
        if(gotNachos){
            if(NPCs[i].hismove.npcName == "jakub"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
            }
        }
        
        if(gotLaptop){
            if(NPCs[i].hismove.npcName == "henryLaptop"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
            }
        }
        
        if(gotKettle){
            if(NPCs[i].hismove.npcName == "KETLLE"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
            }
        }
        
    }
    
    tryToMakeNPCsMove(randomNumber, randomNPC, randomDirection, positiveOrNegative){
        //console.log(randomNumber, NPCs[randomNPC].hismove);
        var directionMultiplier;
        if(positiveOrNegative == 0){
            directionMultiplier = 1;
        } else if(positiveOrNegative == 1){
            directionMultiplier = -1;
        }
        
        if(randomNumber > RNGaboveThisNumberToMove && !isPaused && NPCs[randomNPC] != undefined && NPCs[randomNPC].hismove != undefined){
            if(!NPCs[randomNPC].hismove.isWalking && !NPCs[randomNPC].hismove.cantMove && (NPCs[randomNPC].hismove.walkingState == 0) && !texting){
                
                NPCs[randomNPC].hismove.isWalking = true;
                
                if(randomDirection == 0){
                    var thisNPCsXValue = Math.round((NPCs[randomNPC].hismove.x + (128 * directionMultiplier)) / 128);
                    var thisNPCsYValue = Math.round(NPCs[randomNPC].hismove.y / 128);

                    if(thisNPCsXValue < NPCs[randomNPC].hismove.xMin || thisNPCsXValue > NPCs[randomNPC].hismove.xMax){
                    } else {
                        if(this.game.map.getTile(thisNPCsXValue, thisNPCsYValue, blockedLayer_c, true).index == -1){
                            if((Math.round(this.player.x / 128)) == thisNPCsXValue && (Math.round(this.player.y / 128)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            if((Math.round(this.player.mymove.x2) / 128) == thisNPCsXValue && (Math.round(this.player.y / 128)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            if((Math.round(this.player.mymove.y2 / 128) == thisNPCsYValue) && (Math.round(this.player.x / 128) == thisNPCsXValue)){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            for(var i = 0; i < NPCs.length - 1; i++){
                                if((Math.round(NPCs[i].x / 128) == thisNPCsXValue) && (Math.round(NPCs[i].y / 128) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].hismove.x2 / 128) == thisNPCsXValue) && (Math.round(NPCs[i].y / 128) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].x / 128) == thisNPCsXValue) && (Math.round(NPCs[i].hismove.y2 / 128) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                            }
                            if(!NPCs[randomNPC].hismove.cantMove){
                                NPCs[randomNPC].hismove.x2 = (NPCs[randomNPC].hismove.x + (128 * directionMultiplier));
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
                else if(randomDirection == 1 && !texting){
                    var thisNPCsXValue = Math.round(NPCs[randomNPC].hismove.x / 128);
                    var thisNPCsYValue = Math.round((NPCs[randomNPC].hismove.y + (128 * directionMultiplier)) / 128);

                    if(thisNPCsYValue < NPCs[randomNPC].hismove.yMin || thisNPCsYValue > NPCs[randomNPC].hismove.yMax){
                    } else {
                        if(this.game.map.getTile(thisNPCsXValue, thisNPCsYValue, blockedLayer_c, true).index == -1){
                            if((Math.round(this.player.x / 128)) == thisNPCsXValue && (Math.round(this.player.y / 128)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
                            }
                            if((Math.round(this.player.mymove.x2) / 128) == thisNPCsXValue && (Math.round(this.player.y / 128)) == thisNPCsYValue){
                                NPCs[randomNPC].hismove.cantMove = true;
//                                console.log("tried to move onto player");
                            }
                            if((Math.round(this.player.mymove.y2 / 128) == thisNPCsYValue) && (Math.round(this.player.x / 128) == thisNPCsXValue)){
                                NPCs[randomNPC].hismove.cantMove = true;
//                                console.log("tried to move onto player v2");
                            }
                            for(var i = 0; i < NPCs.length - 1; i++){
                                if((Math.round(NPCs[i].x / 128) == thisNPCsXValue) && (Math.round(NPCs[i].y / 128) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].hismove.x2 / 128) == thisNPCsXValue) && (Math.round(NPCs[i].y / 128) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                                if((Math.round(NPCs[i].x / 128) == thisNPCsXValue) && (Math.round(NPCs[i].hismove.y2 / 128) == thisNPCsYValue)){
                                    NPCs[randomNPC].hismove.cantMove = true;
                                }
                            }
                            if(!NPCs[randomNPC].hismove.cantMove){
                                NPCs[randomNPC].hismove.y2 = (NPCs[randomNPC].hismove.y + (128 * directionMultiplier));
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
                        NPCs[randomNPC].hismove.isWalking = false;
                        NPCs[randomNPC].hismove.cantMove = false;
            }
        }
                }

    NPCmoveX(isDown, i){
        if(isDown){
            if(Math.round(NPCs[i].x) < (NPCs[i].hismove.x2)){
                NPCs[i].body.velocity.x = NPCvelocity;
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
                NPCs[i].body.velocity.x = NPCvelocity*-1;
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
                NPCs[i].body.velocity.y = NPCvelocity;
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
                NPCs[i].body.velocity.y = NPCvelocity*-1;
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