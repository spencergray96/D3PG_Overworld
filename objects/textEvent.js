var person1text = ["This is bullshit", 
            "I can't believe I have to do this again for another semester", 
            "Please make it stop", 
            "It's already dead!"
           ];

class testEvent extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        this.textEvents            = this.game.add.group();
        this.textEvents.enableBody = true;
        this.textEvents.immovable = true;
        var result            = this.findObjectsByType('item', this.game.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.textEvents);
            this.game.physics.enable(element, Phaser.Physics.ARCADE);
        }, this);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.game.physics.arcade.overlap(this.player, this.textEvents.children, this.readText, null, this);

    }

    readText() {


    }


}