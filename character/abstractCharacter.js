class abstractObject {

    constructor() {
    }

    createThis(game) {
        this.game = game;
    }

    updateThis(game, player) {
        this.game = game;
        this.player = player;
    }

    createFromTiledObject(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    }

    findObjectsByType(type, map, layer) {
        var result = [];
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


    //startDialouge(text) {
    //    alert(text);
    //}



}