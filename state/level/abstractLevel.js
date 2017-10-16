var blockedLayer_c;
var backgroundLayer;

var playX;
var playY;

var walking = false;

class abstractLevel extends Phaser.State {

    constructor(getGame, params, updatables) {
        super();
        this.getGame = getGame;
        this.params = params;
        this.updatables = updatables;
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
            console.log(this.layerObj[this.params.layers[i]].tiles);
        }
        this.game.map.setCollisionBetween(
            this.params.collisionRange.min,
            this.params.collisionRange.max,
            this.params.collisionRange.visible,
            this.params.collisionRange.name);
        
        console.log(this.game.map.getTile(10, 10, blockedLayer_c, true).index);
        
        blockedLayer_c = this.layerObj.blockedLayer_c;

        
//        console.log(this.game.map.layers[1].data);
        
//        blockedLayerBounds = this.layerObj.blockedLayer_c;
//        console.log(blockedLayerBounds);
        
//        console.log(blockedLayerBounds.tiles);
        
//        this.layerObj.forEach((layer) => {
//            console.log(layer);
//        });
        
        this.layerObj["backgroundLayer"].resizeWorld();
    }

    generatePlayer() {
        var result = this.findObjectsByType('playerStart', this.game.map, 'objectsLayer');
        if (doorDes.theDestination == "se14"){
            if (doorDes.from == 1){
                this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
                console.log("came from theStart");
                console.log(doorDes.from);
            }
            if (doorDes.from == 2){
                this.player = this.game.add.sprite(result[1].x, result[1].y, 'player');
                console.log("second door");
                console.log(doorDes.from);
            }
        }
        else {
            this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
            console.log("not se14");
                console.log(doorDes.from);
        }
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);
        
//        this.player.anchor.setTo(0.25, 0.25);

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
        this.generateCollision();
        this.player.body.velocity.x = 0;
        
        if(!walking){
            this.createControls();
        }

        this.updatables.forEach((o) => {
            o.updateThis(this.game, this.player);
        });
        
//        console.log(this.player.x);
//        console.log(this.player.y);
        
        playX = Math.floor((this.player.x / 32));
        playY = Math.floor((this.player.y / 32));
        
//        console.log(playX);
        
//        console.log(this.game.map.getTile(playX, playY, blockedLayer_c, true).index);

//        this.player.anchor.setTo(0.25, 0.25);
        
//        if(checkOverlap(this.player, blockedLayerBounds)){
////            console.log("wow spencer is so cool");
//        }
    }

    createControls() {
//        if();
        if(this.cursors.up.isDown) {
            if(this.player.body.velocity.y === 0)
//                this.player.body.velocity.y -= 150;
                
                if((this.game.map.getTile((playX), (playY - 1), blockedLayer_c, true).index) != -1){
//                    console.log("hello hahahaha");
                } else {
                    this.player.y = this.player.y - 32;
                    walking = true;
                    setTimeout(function(){
                        walking = false;
                    }, 500);
                }
                    
        }
        
        else if(this.cursors.down.isDown) {
            if(this.player.body.velocity.y === 0)
//                this.player.body.velocity.y += 150;
                
                if((this.game.map.getTile((playX), (playY + 1), blockedLayer_c, true).index) != -1){
//                    console.log("hello hahahaha");
                } else {
                    this.player.y = this.player.y + 32;
                    walking = true;
                    setTimeout(function(){
                        walking = false;
                    }, 500);
                };

        }
        
        else {
//            this.player.body.velocity.y = 0;
        }
        
        if(this.cursors.left.isDown) {
//            this.player.body.velocity.x -= 150;
            
            if((this.game.map.getTile((playX - 1), (playY), blockedLayer_c, true).index) != -1){
//                    console.log("hello hahahaha");
                } else {
                    this.player.x = this.player.x - 32;
                    walking = true;
                    setTimeout(function(){
                        walking = false;
                    }, 500);
                };
            
        }
        
        else if(this.cursors.right.isDown) {
//            this.player.body.velocity.x += 150;
            
            if((this.game.map.getTile((playX + 1), (playY), blockedLayer_c, true).index) != -1){
//                    console.log("hello hahahaha");
                } else {
                    this.player.x = this.player.x + 32;
                    walking = true;
                    setTimeout(function(){
                        walking = false;
                    }, 500);
                };
            
        }
        
    }

    generateCollision() {
        this.params.layers.forEach((layer) => {
            if (layer[layer.length-2] === "_" && layer[layer.length-1] === "c")
                this.game.physics.arcade.collide(this.player, this.layerObj[layer]);
        })
    }

    createFromTiledObject(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    }

}

function checkOverlap(thingA, thingB){
        var boundsA = thingA.getBounds();
        var boundsB = thingB.getBounds();
        
        return Phaser.Rectangle.intersects(boundsA, boundsB);
}