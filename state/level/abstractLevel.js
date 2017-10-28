var blockedLayer_c;
var backgroundLayer;

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

class abstractLevel extends Phaser.State {

    constructor(getGame, params, updatables) {
        super();
        this.getGame = getGame;
        this.params = params;
        this.updatables = updatables;
        
        this.events = {
            curEvents:0
        }
    }

    create() {
        this.game = this.getGame().game;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.generateMap();
        this.generatePlayer();

        this.updatables.forEach((o) => {
            o.createThis(this.game);
        })

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
        var x,y;
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
            speed:60,
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
        
        yUpdatingAbove = Math.floor(((this.player.mymove.y - 32) / 32));
        yUpdatingBelow = Math.floor(((this.player.mymove.y + 32) / 32));
        xUpdatingLeft = Math.floor(((this.player.mymove.x - 32) / 32));
        xUpdatingRight = Math.floor(((this.player.mymove.x + 32) / 32));
        
        this.createControls();
        
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
                
                console.log(this.player.world);
                console.log("x right: " + ((this.player.x + 32) / 32) + ", y above: " + yUpdatingAbove + ", y below: " + yUpdatingBelow);
                
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
                
                console.log(this.player.world);
                console.log("x left: " + ((this.player.x - 32) / 32) + ", y above: " + yUpdatingAbove + ", y below: " + yUpdatingBelow);
                
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
                
                console.log(this.player.world);
                console.log("x left: " + xUpdatingLeft + ", x right: " + xUpdatingRight + ", y below: " + ((this.player.y + 32) / 32));
                
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
                
                console.log(this.player.world);
                console.log("x left: " + xUpdatingLeft + ", x right: " + xUpdatingRight + ", y above: " + ((this.player.y - 32) / 32));
                
                yCurrent = Math.floor((this.player.y / 32));
                
                this.player.animations.stop();
                this.setSpriteDirectionAfterWalking();
            }
            lastWalkingDirection = "up";

        }
    }
    
    createControls() {
        if(this.cursors.up.isDown && !walkingLR) {
            if(this.player.mymove.state === 0){
                if(this.game.map.getTile(xCurrent, yUpdatingAbove, blockedLayer_c, true).index == -1){
                    this.player.mymove.state = 4;
                    this.player.mymove.y2 = Math.floor(this.player.mymove.y) - 32;
                    this.player.animations.play("up");
                } else {
                    lastWalkingDirection = "up";
                    this.setSpriteDirectionAfterWalking();
                }
            } 
        }
        
        else if(this.cursors.down.isDown && !walkingLR) {
            if(this.player.mymove.state === 0){
                if(this.game.map.getTile(xCurrent, yUpdatingBelow, blockedLayer_c, true).index == -1){
                    this.player.mymove.state = 3;
                    this.player.mymove.y2 = Math.floor(this.player.mymove.y) + 32;
                    this.player.animations.play("down");
                } else {
                    lastWalkingDirection = "down";
                    this.setSpriteDirectionAfterWalking();
                }
            }
        }
        
        if(this.cursors.left.isDown && !walkingUD) {
            if(this.player.mymove.state === 0){
                if(this.game.map.getTile(xUpdatingLeft, yCurrent, blockedLayer_c, true).index == -1){
                    this.player.mymove.state = 2;
                    this.player.mymove.x2 = Math.floor(this.player.mymove.x) - 32;
                    this.player.animations.play("left");
                } else {
                    lastWalkingDirection = "left";
                    this.setSpriteDirectionAfterWalking();
                }
            }
        }
        
        else if(this.cursors.right.isDown && !walkingUD) {
            if(this.player.mymove.state === 0){
                if(this.game.map.getTile(xUpdatingRight, yCurrent, blockedLayer_c, true).index == -1){
                    this.player.mymove.state = 1;
                    this.player.mymove.x2 = Math.floor(this.player.mymove.x) + 32;
                    this.player.animations.play("right");
                } else {
                    lastWalkingDirection = "right";
                    this.setSpriteDirectionAfterWalking();
                }
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

//    generateCollision() {
//        this.params.layers.forEach((layer) => {
//            if (layer[layer.length-2] === "_" && layer[layer.length-1] === "c"){
//                this.game.physics.arcade.collide(this.player, this.layerObj[layer], this.setNextToWall, null, this);
//            }
//        })
//    }

    createFromTiledObject(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    }
}