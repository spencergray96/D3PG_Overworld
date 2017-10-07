class spawn extends abstractObject {


    constructor() {
        super();
    }

    createThis(game) {
        var spawnLoc = [];
        super.createThis(game);
        this.spawns            = this.game.add.group();
        this.spawns.enableBody = true;
        var result            = this.findObjectsByType('playerStart', this.game.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.spawns);
            spawnLoc.push(element);
            console.log(spawnLoc);
        }, this);
        
        console.log(this.spawns.children);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
    }

    chooseSpawn() {

        }


}
