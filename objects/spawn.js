var spawnLoc = [];

//if (doorDes.theDestination == "se14_1")

class spawn extends abstractObject {


    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        this.spawns            = this.game.add.group();
        this.spawns.enableBody = true;
        var result            = this.findObjectsByType('playerStart', this.game.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.spawns);

        }, this);
        spawnLoc = (this.spawns.children);
    }

    updateThis(game, player) {
        super.updateThis(game, player);   
    }


}
