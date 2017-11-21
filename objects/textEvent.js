var texting = false;
var chapter = 0;
var eventTrigger = false;
var eventNumber = 0;
var eventTextNumber = 0;

class textEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        this.continueIcon;
        this.firstEventCheck = false;
        
        // Put the dialogue here. Eventually we need to put the dialogue somewhere else (JSON file?) and push it to this parameter   //
        
        this.style = { font: "14pt Final-Fantasy-36-Font", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top" , 
            wordWrap: true, wordWrapWidth: 500, 
            };
        
        this.profileXValue = 30;
        this.profileYValue = 4.5;
        this.profileScale = 0.05;
    
        this.targetText = null;
        
        this.lineDelay  = 10;
        this.letter     = 0;
        this.lineState  = 0;

        this.contDial   = true;
        this.makeCont   = false;
        
        this.textLeading = 20;
        this.continueArrowIndentDivisor = 13;
    }
    
    createThis(game) {
        super.createThis(game);
        
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.isText = 0;
        this.isDown = false;
        //  this delays text printing, it also prints text  //
        this.game.time.events.loop(this.lineDelay, this.printText, this);
        console.log(Object.values(theDialogue.events)[eventNumber][eventTextNumber].event);
    }

    updateThis(game, player) {
        super.updateThis(game, player);

        // this is for printing text and making it appear //
        this.readText();
        
        this.staticEvents();
        
    }
    
    staticEvents(){
        if(eventNumber == 0 && currentNPC.hismove.npcName == "firstEvent" && !eventTrigger){
            this.callEvent("firstEvent", 0);
            this.readText(); 
        }
        else{
        }
    }
    
    readText() {
        if ((this.enterBut.isDown && currentNPC != null) || !this.firstEventCheck){
            this.firstEventCheck = true;
            texting = true;
            if(!this.isDown){
                this.checkTextBoxContent();
                this.isDown = true;
            }
        }
        
        if(this.enterBut.isUp && !disableControls){
            if(this.isDown){
                console.log("event number: " + eventNumber);
                this.isDown = false;
                switch (this.isText) {
                    case 0:
                        this.showText();
                        this.isText = 1;
                        break;
                    case 1:
                        break;
                    case 2:
                        this.checkEventFinish();                        
                        break;
                }
            }
        }
    }  
    
    checkTextBoxContent(){
        if(currentNPC == null){
            console.log("how did this happen?");
        } 
        else{    
            if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0){

                if(eventNumber == 0 && currentNPC.hismove.npcName == "firstEvent" && !eventTrigger){
                    this.callEvent("firstEvent", 0);
                }
                
                else if(eventNumber == 1 && currentNPC.hismove.npcName == "james" && !eventTrigger){
                    this.callEvent("james", 1);
                }

                
                else if (!eventTrigger){
                    for (var i=0; i < Object.keys(theDialogue.defaults).length; i++){
                        if (Object.keys(theDialogue.defaults)[i] == currentNPC.hismove.npcName){
                            this.person = (Object.values(theDialogue.defaults)[i].txt[chapter]).split(";;");
                            this.profilePic = Object.values(theDialogue.defaults)[i].profile;
                        }
                    }
                }
            }
        }
    }
    
//    goBackTest(){
//        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
//        this.checkEventFinish();
//        this.continueThing = this.game.add.image((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
//        this.continueThing.fixedToCamera = true;           
//    }
//    
//    testEvent(){
//
//        this.continueThing.destroy();
//        this.game.camera.follow(NPCs[0], Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
//        this.eraseText();
//        this.game.time.events.add(Phaser.Timer.SECOND * 2,this.goBackTest, this);
//    }
    
    checkEventFinish(){
        if (eventTrigger){
            
            if (eventTextNumber < Object.values(theDialogue.events)[eventNumber].length - 1){
                
                if (Object.values(theDialogue.events)[eventNumber][eventTextNumber].event == "action"){
                    
                    // this is where actions for the events will be called //
                    if (currentNPC.hismove.npcName == "firstEvent" && eventNumber == 0){
                        this.testEvent();
                        Object.values(theDialogue.events)[eventNumber][eventTextNumber].event = null;
                        disableControls = true;
                    }
                }
                else{
                    disableControls = false;
                    eventTextNumber++;                     
                    
                    this.showText();
                    
                    if (Object.values(theDialogue.events)[eventNumber].length != eventTextNumber){
                        this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
                        this.textProfile.destroy();

                        this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
                        this.textProfile = this.game.add.image(this.profileXValue, this.game.height - (this.game.height/(this.profileYValue)), this.profilePic); 
                        this.textProfile.scale.setTo(this.profileScale, this.profileScale);
                        this.textProfile.fixedToCamera = true;

                        this.isText = 1;
                    }                    
                }
            }
            else if (eventTextNumber >= Object.values(theDialogue.events)[eventNumber].length - 1 && Object.values(theDialogue.events)[eventNumber][Object.values(theDialogue.events)[eventNumber].length-1].event == "end"){
                
                eventNumber++;           
                                
                console.log("event number: " + eventNumber);
                this.game.camera.follow(this.player);
                
                this.isText = 2;
                this.eraseText();   

                eventTrigger = false;

                texting = false;
                currentNPC = null;
                this.isText = 0;

                eventTextNumber = 0;
            } 
        }
        
        else {
            eventTextNumber = 0;
            eventTrigger = false;
            this.isText = 0;
            this.eraseText();            
            texting = false;
            currentNPC = null;
        }

    }
    
    showText() {
        if(!this.startText){
            this.startText = true;
            
            this.textScreen = this.game.add.image(0, (this.game.height - (this.game.height/4)), 'textBox'); 
            this.textScreen.fixedToCamera = true;
            this.textScreen.width = this.game.width;
            this.textScreen.height = this.game.height/4;

            this.text = this.game.add.text(150, 35, this.text, this.style);
            this.text.fixedToCamera = true;
            this.text.setTextBounds( 48 , (this.game.height - (this.game.height/4)), 2000, 360);
            this.text.lineSpacing = this.textLeading;

            this.textProfile = this.game.add.image(this.profileXValue, this.game.height - (this.game.height/(this.profileYValue)), this.profilePic); 
            this.textProfile.scale.setTo(this.profileScale, this.profileScale);
            this.textProfile.fixedToCamera = true;
        }
    }
    
    eraseText(){
        this.startText = false;
        this.textScreen.destroy();
        this.textProfile.destroy();
        this.text.destroy();                
    }
    
    printText() {
        
        if(this.isText <= 0 || this.isText >= 2){
            return false;
        }
        
        if(currentNPC == null){
            console.log("lol it broke");
        } 
        else if(currentNPC != null){
            if (this.letter <= this.person[this.lineState].length){
                this.addLetters = this.person[this.lineState].substring(0,this.letter);
                this.text.text = this.addLetters; 
                this.letter = this.letter + 1;
            }    
            else if (this.letter >= this.person[this.lineState].length){ 

                this.letter = 0;
                this.isText = 0;
                this.lineState++;
                
                if(this.lineState < this.person.length){

                    if (!this.continueIcon){
                        this.continueIcon = true;
    //                    this line makes the continue text icon. maybe replace with an animated sprite?
                        this.continueThing = this.game.add.image((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
                        this.continueThing.fixedToCamera = true;                   
                    }
                }

                else if(this.lineState >= this.person.length){
                    if (eventTrigger){
                        this.lineState = 0;
                        this.isText = 2;
                    
                        if (eventTextNumber >= Object.values(theDialogue.events)[eventNumber].length - 1){
                            this.continueIcon = false;
                            this.continueThing.destroy();  
                        }
                    }
                    else{
                        eventTextNumber = 0;
                        this.lineState = 0;
                        this.isText = 2;
                        this.continueIcon = false;
                        this.continueThing.destroy();
                    }
                }
            }        
        }
    }
    
    callEvent(sprite, event){
        if (currentNPC.hismove.npcName == String(sprite) && eventNumber == event && !eventTrigger){
            eventTrigger = true;
            console.log(sprite);
            this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
            this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
        }     
    }
}

