var walkablesArr = [];
var testTrigger = false;

var se6OPEN = 7;
var eventNumberTemp;

class walkables extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        disableControls = false;
        walkablesArr = [];
        this.walkablesG = this.game.add.group();
        this.walkablesG.enableBody = true;
        var walkablesResult = this.findObjectsByType('walkable', this.game.map, 'objectsLayer');
        var i = 0;
        walkablesResult.forEach(function (element) {
            this.createWalksFromTiledObject(element, this.walkablesG, i);
            walkablesArr.push(element);
            i++;
        }, this);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.checkForWalkOver(game);
    }

    checkForWalkOver(game){
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(Math.round(this.player.x / 128) == walkablesArr[i].coolProperties.xIndex && Math.round(this.player.y / 128) == walkablesArr[i].coolProperties.yIndex){
                
                if(!eventTrigger && walkablesArr[i].coolProperties.eventID == "se6Blocker" && eventNumber < se6OPEN){
                    this.blockedAreaEvent();
                }
                
                else if(!testTrigger && walkablesArr[i].coolProperties.eventID == eventNumber){
                    switch(eventNumber){
                        case 1:
                            this.walkingEvent1s0();
                            break;
                        case 2:
                            this.walkingEvent2s0();
                            break;
                        case 6:
                            this.walkingEvent6s0();
                    }
                }
            }
        }
    }
    
    blockedAreaEvent(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = 'se6Blocker';
            
            currentNPC = eventObject
        }
    }
    
    walkingEvent1s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = 'secondEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent2s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = 'thirdEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent6s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = 'sixthEvent';

            currentNPC = eventObject;
        }
    }

}