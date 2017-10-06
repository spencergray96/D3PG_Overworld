class door extends abstractCharacter {


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
        // this.game.physics.arcade.overlap(this.player, this.doors.children[0], this.enterDoor0, null, this);
        // this.game.physics.arcade.overlap(this.player, this.doors.children[1], this.enterDoor1, null, this);
        // this.game.physics.arcade.overlap(this.player, this.doors.children, this.enterDoor, null, this);

    }

    enterDoor() {
        var theDoor = [];
        for (var i=0; i < this.doors.children.length; i++) {
            theDoor[i] = this.doors.children[i];
            if (this.game.physics.arcade.overlap(theDoor[i], this.player)){

                if (theDoor[i].destination == "se14"){
                    console.log(theDoor[i]);
                    TopDownGame.game.state.start('TestLevel2');
                }
                else if(theDoor[i].destination == "theStart"){
                    console.log(theDoor[i]);
                    TopDownGame.game.state.start('TestLevel');
                }
                else if(theDoor[i].destination == "bl"){
                    console.log(theDoor[i]);
                    console.log(theDoor[i].destination);
                    TopDownGame.game.state.start('TestLevel3');
                }
            }

        }
    }

    // enterDoor0() {
    //     TopDownGame.game.state.start('TestLeve2');
    // }
    // enterDoor1() {
    //     TopDownGame.game.state.start('TestLevel');
    // }
    // enterDoor() {
        // for (var i = 0; i < this.doors.children.length; i++){
        //     if this.doors.children[i].destination == "se14"){
        //         if (/* se14 is overlapping with the player */){
        //
        //         }
        //     }
        //     else {
        //         break;
        //     }
        // }
        // console.log(this.doors.children[this].destination);
        // if(this.doors.children.properties.destination == "se14") {
        //     TopDownGame.game.state.start('TestLevel');
        // }
        // else {
        //     console.log("sdfgfg)");
        // }
    // }

    //ask about grabbing properties from the tiled / json file
}
