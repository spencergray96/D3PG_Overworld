var texting = false;
var chapter = 0;
var eventTrigger = false;
var eventNumber = 0;
var eventTextNumber = 0;

var firstEventCheck = false;

class textEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        this.continueIcon;
        
        //EVENT TRIGGER INDICATORS
        this.event01part01 = false;
        this.event01part02 = false;
//        this.firstEventCheck = false;
        
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
//        console.log(Object.values(theDialogue.events)[eventNumber][eventTextNumber].event);
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
        if ((this.enterBut.isDown && currentNPC != null) || !firstEventCheck){
            firstEventCheck = true;
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
    
    checkEventFinish(){
        if (eventTrigger){
            
            if (eventTextNumber < Object.values(theDialogue.events)[eventNumber].length - 1){
                
                    console.log("eventTextNumber is: ", eventTextNumber);
                    console.log("current NPC: ", currentNPC);
                    console.log(Object.values(theDialogue.events)[eventNumber][eventTextNumber].event);
                
                if (Object.values(theDialogue.events)[eventNumber][eventTextNumber].event == "action"){
                    // this is where actions for the events will be called //
    //EVENT 1 PART 1                
                    if (currentNPC.hismove.npcName == "firstEvent" && eventNumber == 0 && !this.event01part01){

                        //first event
                        this.event00();
                        
                        Object.values(theDialogue.events)[eventNumber][eventTextNumber].event = null;
                        disableControls = true;
                        
                    }
    //EVENT 1 PART 2
                    if (currentNPC.hismove.npcName == "firstEvent" && eventNumber == 0 && this.event01part01){
                        
                        //first event
                        this.event01();
                        
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
//                this.game.camera.follow(this.player);
                
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
            console.log("lol it broke PENIS");
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
                        
                        this.event01part01 = true;
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
    
//THE ACTUAL EVENTS
    
//goBackTest resets the game back to normal text interactions    
    goBackTest(){
//        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.checkEventFinish();
        this.continueThing = this.game.add.image((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
        this.continueThing.fixedToCamera = true;
        
        this.event01part01 = true;
    }
//EVENT 1 PART 1
    event00(){
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.eventNPC && NPCs[i].hismove.eventID == "dov1"){
                console.log("found event dov");
                
                this.targetNPC1 = NPCs[i];
                this.targetNPC1.animations.play("up");
                
                this.targetNPC1.hismove.y2 = this.player.y + 128;
                this.targetNPC1.hismove.walkingState = 4;
            }
            if(NPCs[i].hismove.eventNPC && NPCs[i].hismove.eventID == "james1"){
                console.log("found event james");
                
                this.targetNPC2 = NPCs[i];
                this.targetNPC2.animations.play("up");
                
                this.targetNPC2.hismove.y2 = this.player.y + 128;
                this.targetNPC2.hismove.walkingState = 4;
            }
        }
        
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
        this.eraseText();
        
        var that = this;
        
        var checkNPCposition = setInterval(function(){
            if(Math.round(that.targetNPC1.y / 128) == Math.round(that.targetNPC1.hismove.y2 / 128)){
                console.log("helloooooooo");
                
                that.game.time.events.add(Phaser.Timer.SECOND * 0.1,that.goBackTest, that);
                
                clearInterval(checkNPCposition);
                console.log(eventNumber);
                
                
            }
            
        }, 700);
    }
//EVENT 1 PART 2
    event01(){
        this.continueThing.destroy();
        this.game.camera.fade('#000000');
        this.game.camera.onFadeComplete.add(this.event01DestroyNPCs,this);
        
    }
    
    event01DestroyNPCs(){
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.eventNPC){
                NPCs[i].x = 0;
                NPCs[i].y = 0;
                console.log(NPCs[i]);
                NPCs[i].destroy();
            }
        }
        this.eraseText();
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        disableControls = false;
        
        var that = this;
        setTimeout(function(){
            that.goBackTest();
        }, 800);
    }
}

