var doorDes = {
    theDestination: null,
    from: null
};

var doors = [];
var currentDoor;

class door extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        disableControls = false;
        currentDoor = undefined;
        currentNPC = null;
        doors = [];
        NPCs = [];
        game.camera.flash('#000000');
        this.doors            = this.game.add.group();
        this.doors.enableBody = true;
        var doorResult            = this.findObjectsByType('door', this.game.map, 'objectsLayer');
        var i = 0;
        doorResult.forEach(function (element) {
            this.createDoorsFromTiledObject(element, this.doors, i);
            doors.push(element);
            i++;
//            this.game.physics.enable(element, Phaser.Physics.ARCADE);
        }, this);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.checkForDoorEntry(game);
    }

    checkForDoorEntry(game){
        for(var i = 0; i < doors.length - 1; i++){
            if(Math.round(this.player.mymove.x2 / 128) == doors[i].coolProperties.xIndex && Math.round(this.player.mymove.y2 / 128) == doors[i].coolProperties.yIndex){
                
                currentDoor = doors[i];
                
                if(eventNumber <= 22 && currentDoor.coolProperties.from == "dorm"){
                    
                } else {
                    disableControls = true;
                    var that = this;
                    setTimeout(function(){

                        that.intermediaryDoorEnter();

                    }, 300);                    
                }
            }
        }
    }
    
    intermediaryDoorEnter(){
        this.game.camera.fade('#000000');
        this.game.camera.onFadeComplete.add(this.newEnterDoor,this);
    }
    
    newEnterDoor(){
        if(currentDoor != undefined){
            switch(currentDoor.coolProperties.destination){
                case "se14":
                    TopDownGame.game.state.start('se14');
                    break;
                case "sw03":
                    TopDownGame.game.state.start('sw03');
                    break;
                case "dorm":
                    TopDownGame.game.state.start('dorm');
                    break;
                case "se6office":
                    TopDownGame.game.state.start('se6office');
                    break;
                case "NE1":
                    TopDownGame.game.state.start('NE1');
                    break;
                case "theStand":
                    TopDownGame.game.state.start('theStand');
                    break;    
                case "overworld":
                    doorDes.theDestination = "overworld";
                    TopDownGame.game.state.start('overworld');
                    break;
                case "tunnel":
                    TopDownGame.game.state.start('tunnel');
                    break;
                default:
                    console.log("can't do that");
                    disableControls = false;
                    break;
            }
        }
    }

}