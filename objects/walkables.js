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
                            break;
                        case 7:
                            this.walkingEvent7s0();
                            break;
                        case 13:
                            this.walkingEvent13s0();
                            break;
                        case 20:
                            this.walkingEvent20s0();
                            break;
                        case 21:
                            this.walkingEvent21s0();
                            break;
                        case 35:
                            this.walkingEvent35s0();
                            break;
                        case 36:
                            this.walkingEvent36s0();
                            break;
                        case 37:
                            this.walkingEvent37s0();
                            break;
                        case 38:
                            this.walkingEvent38s0();
                            break;
                        case 39:
                            this.walkingEvent39s0();
                            break;
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
    
    walkingEvent7s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = 'seventhEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent13s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '13thEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent20s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '20thEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent21s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '21stEvent';

            currentNPC = eventObject;
        }
    }

    walkingEvent35s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '35thEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent36s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '36thEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent37s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '37thEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent38s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '38thEvent';

            currentNPC = eventObject;
        }
    }
    
    walkingEvent39s0(){
        if(!testTrigger){
            testTrigger = true;
            eventObject.hismove.npcName = '39thEvent';

            currentNPC = eventObject;
        }
    }
}