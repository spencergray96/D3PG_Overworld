class abstractObject {

    constructor() {
        
    }

    createThis(game) {
        this.game = game;
    }

    updateThis(game, player) {
        this.game = game;
        this.player = player;
//        console.log("hello");
    }
    
    createFromTiledObject(element, group, i) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
        
    }
    
    createDoorsFromTiledObject(element, group, i) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
        
        doors[i] = this.game.add.sprite(element.x, element.y, element.spritesheet);
        doors[i].coolProperties = {
            xIndex: Math.round(element.x / 128),
            yIndex: Math.round(element.y / 128),
            destination: element.properties.destination,
            from: element.properties.from
        }
    }

    findObjectsByType(type, map, layer) {
        var result = [];
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }


}