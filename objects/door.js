var doorDes = {
    theDestination: null,
    from: null
};

class door extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        this.doors            = this.game.add.group();
        this.doors.enableBody = true;
        var result            = this.findObjectsByType('door', this.game.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.doors);
            this.game.physics.enable(element, Phaser.Physics.ARCADE);
        }, this);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.game.physics.arcade.overlap(this.player, this.doors.children, this.enterDoor, null, this);

    }

    enterDoor() {
        var theDoor = [];
        for (var i=0; i < this.doors.children.length; i++) {
            theDoor[i] = this.doors.children[i];
            
            if (this.game.physics.arcade.overlap(theDoor[i], this.player)){

                if (theDoor[i].destination == "se14"){                    
                    console.log(theDoor[i]);
                    doorDes.theDestination = theDoor[i].destination;
                    doorDes.from = 1;
                    
                    TopDownGame.game.state.start('TestLevel2');
                }
                else if(theDoor[i].destination == "theStart"){
                    console.log(theDoor[i]);
                    doorDes.theDestination = theDoor[i].destination;
                    TopDownGame.game.state.start('TestLevel');
                }
                else if(theDoor[i].destination == "bl"){
                    console.log(theDoor[i]);
                    doorDes.theDestination = theDoor[i].destination;
                    TopDownGame.game.state.start('TestLevel3');
                }
            }
        }

    }


}
