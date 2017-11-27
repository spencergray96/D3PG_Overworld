var texting = false;
var chapter = 0;
var eventTrigger = false;

var eventNumber = 3;
var subEventNumber = 0;
var eventTextNumber = 0;

var isEventing = false;

//eventTriggerChecks

var raminFirstSpawn = 5;
var raminSpawnedse14 = false;

class textEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        this.continueIcon;
        
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
    }

    updateThis(game, player) {
        super.updateThis(game, player);

        // this is for printing text and making it appear //
        
        this.staticEvents();
        
        this.spawnRamin();
        
    }
    
    staticEvents(){
//event 0        
        if(eventNumber == 0 && currentNPC.hismove.npcName == "firstEvent" && !eventTrigger){
            this.callEvent("firstEvent", 0);
            isEventing = true;
        }
//blocking event        
        if(eventNumber < se6OPEN && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "se6Blocker"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 1;
                
                this.callEvent("se6Blocker");
                isEventing = true;
            }
        }
//event 1        
        if(eventNumber == 1 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "secondEvent"){
                this.callEvent("secondEvent", 1);
                isEventing = true;
            }
        }
//event 2        
        if(eventNumber == 2 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "thirdEvent"){
                this.callEvent("thirdEvent", 2);
                isEventing = true;
            }
        }
//event 3
        if(eventNumber == 3 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "henry"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("henry", 3);
                    isEventing = true;
                }
            }
        }
//event 4
        if(eventNumber == 4 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "guy3"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("guy3", 4);
                    isEventing = true;
                }
            }
        }
//event 5        
        if(eventNumber == 5 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ramin"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("ramin", 5);
                    isEventing = true;
                }
            }
        }
//event 6
        if(eventNumber == 6 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "sixthEvent"){
                    this.callEvent("sixthEvent", 6);
                    isEventing = true;
            }
        }
//read text        
        if(currentNPC != null){
            this.readText();
        }
    }
    
    readText() {
        if ((this.enterBut.isDown && currentNPC != null || isEventing)){
            isEventing = false;
            texting = true;
            if(!this.isDown){
                this.checkTextBoxContent();
                this.isDown = true;
            }
        }
        
        if(this.enterBut.isUp && !disableControls){
            if(this.isDown){
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
        } 
        else{
//            if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0 && currentNPC.hismove.npcName != undefined && currentNPC.hismove.eventNPC && !eventTrigger){
////                this.callEvent(currentNPC.hismove.npcName, eventNumber);
//                
////                if(eventNumber == 1 && currentNPC.hismove.npcName == "james" && !eventTrigger){
////                    this.callEvent("james", 1);
////                }
//
//                
//            } else
                if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0 && currentNPC.hismove.npcName != undefined && !eventTrigger){
                    for (var i=0; i < Object.keys(theDialogue.defaults).length; i++){
                        if (Object.keys(theDialogue.defaults)[i] == currentNPC.hismove.npcName){
                            this.person = (Object.values(theDialogue.defaults)[i].txt[chapter]).split(";;");
                            this.profilePic = Object.values(theDialogue.defaults)[i].profile;
                        }
                    }
                }
        }
    }
    
    checkEventFinish(){
        if (eventTrigger){
            
            if (eventTextNumber < Object.values(theDialogue.events)[eventNumber].length - 1){
                
                if (Object.values(theDialogue.events)[eventNumber][eventTextNumber].event == "action"){
                    // this is where actions for the events will be called //
                    switch(eventNumber){
                        case Object.keys(theDialogue.events).length - 1:
                            this.blockedEventSwitch();
                            break;
                        case 0:
                            this.event0switch();
                            break;
                        case 1:
                            this.event1switch();
                            break;
                        case 2:
                            this.event2switch();
                            break;
                        case 3:
                            this.event3switch();
                            break;
                        case 4:
                            this.event4switch();
                            break;
                        case 6:
                            this.event6switch();
                            break;
                    }
                        
                    Object.values(theDialogue.events)[eventNumber][eventTextNumber].event = null;
                    disableControls = true;
                    
                    subEventNumber++;
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
                
                
                if(currentNPC.hismove.npcName != "se6Blocker"){
                    eventNumber++;
                }
                
                else if(currentNPC.hismove.npcName === "se6Blocker"){
                    Object.values(theDialogue.events)[eventNumber][0].event = "action";
                }
                
                if(eventNumberTemp != null){
                    
                    eventNumber = eventNumberTemp;
                    eventNumberTemp = null;
                }
                
                subEventNumber = 0;
                
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
    
//EVENT SWITCH STATEMENTS
    
    blockedEventSwitch(){
        switch(subEventNumber){
            case 0:
                this.se6Block();
                break;
        }
    }
    
    event0switch(){
        switch(subEventNumber){
            case 0:
                this.event0s0();
                break;
            case 1:
                this.event0s1();
                break;
        }
    }
    
    event1switch(){
        switch(subEventNumber){
            case 0:
                this.event1s0();
                break;
        }
    }
    
    event2switch(){
        switch(subEventNumber){
            case 0:
                this.event2s0();
                break;
            case 1:
                this.event2s1();
                break;
            case 2:
                this.event2s2();
                break;
        }
    }
    
    event3switch(){
        switch(subEventNumber){
            case 0:
                this.event3s0();
                break;
        }
    }
    
    event4switch(){
        switch(subEventNumber){
            case 0:
                this.event4s0();
                break;
        }
    }
    
    event6switch(){
        switch(subEventNumber){
            case 0:
                this.event6s0();
                break;
            case 1:
                this.event6s1();
                break;
        }
    }
    
//end of EVENT SWITCH STATEMENTS    
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
//            console.log("lol it broke");
        }
        
        else if(currentNPC != null){
//            console.log("lineState is: ", this.lineState);
            if (this.letter <= this.person[this.lineState].length){
                this.addLetters = this.person[this.lineState].substring(0,this.letter);
                this.text.text = this.addLetters; 
                this.letter = this.letter + 1;
            }    
            else if (this.letter >= this.person[this.lineState].length){

                this.letter = 0;
                this.isText = 0;
                this.lineState++;
                
                if(this.lineState < this.person.length || this.lineState < Object.values(theDialogue.events)[eventNumber].length){

                    if (!this.continueIcon){
                        this.continueIcon = true;
    //                    this line makes the continue text icon. maybe replace with an animated sprite?
                        this.continueThing = this.game.add.image((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
                        this.continueThing.fixedToCamera = true;                   
                    }
                }

                if(this.lineState >= this.person.length){

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
//        if (currentNPC.hismove.npcName == String(sprite) && eventNumber == event && !eventTrigger){
            eventTrigger = true;
//            console.log(sprite);
            this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
            this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
    }
    
//THE ACTUAL EVENTS
    
//goBackTest resets the game back to normal text interactions    
    goBackTest(){
        this.checkEventFinish();
        this.continueThing = this.game.add.image((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
        this.continueThing.fixedToCamera = true;      
    }
    
//Blocking events
    se6Block(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
            this.player.mymove.state = 3;
            this.player.mymove.y2 = Math.floor(this.player.mymove.y) + 128;
            this.player.animations.play("down");
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function(){
            this.goBackTest();
//            eventNumber = eventNumberTemp;
        }, this);
    }
    
//EVENT 0 PART 0
    event0s0(){
        
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.eventNPC && NPCs[i].hismove.eventID == "dov1"){
                
                this.targetNPC1 = NPCs[i];
                this.targetNPC1.animations.play("up");
                
                this.targetNPC1.hismove.y2 = this.player.y + 128;
                this.targetNPC1.hismove.walkingState = 4;
            }
            if(NPCs[i].hismove.eventNPC && NPCs[i].hismove.eventID == "james1"){
                
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
                
                that.game.time.events.add(Phaser.Timer.SECOND * 0.1,that.goBackTest, that);
                this.targetNPC1 = null;
                this.targetNPC2 = null;
                clearInterval(checkNPCposition);
            }
            
        }, 1);
    }
//EVENT 0 PART 1
    event0s1(){
        this.continueThing.destroy();
        this.game.camera.fade('#000000');
        this.game.camera.onFadeComplete.add(this.event0s1DestroyNPCs,this);
        
    }
    
    event0s1DestroyNPCs(){
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.eventID == "dov1" || NPCs[i].hismove.eventID == "james1" || NPCs[i].hismove.eventID == "raymond1"){
                NPCs[i].x = 0;
                NPCs[i].y = 0;
                NPCs[i].destroy();
            }
        }
        this.eraseText();
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8,this.goBackTest, this);
    }
    
//EVENT 1 PART 0
    event1s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.shake(0.005, 1000);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventID == 1){
                walkablesArr[i].x = 0;
                walkablesArr[i].y = 0;
                walkablesArr[i].destroy();
            }
        }
    }
    
//EVENT 2 PART 0    
    event2s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "se14camera"){
                this.targetNPC1 = walkablesArr[i];       
            }
        }
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
    }
    
    event2s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.8, function(){
            this.goBackTest();
        }, this);
    }
    
    event2s2(){
        this.eraseText();
        this.continueThing.destroy();
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        this.game.time.events.add(Phaser.Timer.SECOND * 1,this.goBackTest, this);
    }
    
//EVENT 3
    event3s0(){
        console.log("Event 3");
    }
    
//EVENT 4
    event4s0(){
        this.eraseText();
        this.continueThing.destroy();
        this.game.camera.shake(0.005, 1000);
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
    }
    
//SPAWN RAMIN
    spawnRamin(){
        if((eventNumber == raminFirstSpawn) && !raminSpawnedse14){
            raminSpawnedse14 = true;
            
            for(var i = 0; i < NPCs.length - 1; i++){
                if(NPCs[i].hismove.npcName == "ramin"){
                    
                    NPCs[i].x = NPCs[i].hismove.originalX;
                    NPCs[i].y = NPCs[i].hismove.originalY;
                }
            }
        }
    }

//EVENT 6    
    event6s0(){
        this.player.frame = 2;
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "henry"){
                this.targetNPC1 = NPCs[i];
            }
        }
        
        this.eraseText();
        this.continueThing.destroy();
        
        this.targetNPC1.x = this.player.x;
        this.targetNPC1.y = this.player.y - (1280*1.5);
        
        this.targetNPC1.animations.add("downFast", [3, 5, 4, 5], walkingAnimFPS*2, true);
        this.targetNPC1.animations.play("downFast");
        this.targetNPC1.hismove.y2 = this.player.y - 128;
        this.targetNPC1.hismove.walkingState = 3;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
            this.game.camera.flash('#000000');
            this.game.camera.follow(this.targetNPC1);
        }, this);
        
        var NPCvelocityTemp = NPCvelocity;
        NPCvelocity = NPCvelocity*3;
        
        var that = this;
        
        var checkNPCposition = setInterval(function(){
            if(Math.round(that.targetNPC1.y / 128) == Math.round(that.targetNPC1.hismove.y2 / 128)){
                
                that.game.time.events.add(Phaser.Timer.SECOND * 0.5,that.goBackTest, that);
                NPCvelocity = NPCvelocityTemp;
                clearInterval(checkNPCposition);
            }
        }, 1);
    }
    
    event6s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.targetNPC1.hismove.y2 = this.player.y - (1280*1.5);
        this.targetNPC1.animations.play("up");
        this.targetNPC1.hismove.walkingState = 4;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
            this.game.camera.flash('#000000');
            this.game.camera.follow(this.player);
            this.goBackTest();
            
            this.targetNPC1.x = this.targetNPC1.hismove.originalX;
            this.targetNPC1.y = this.targetNPC1.hismove.originalY;
            this.targetNPC1.hismove.y2 = this.targetNPC1.hismove.y;
            this.targetNPC1 = null;
        }, this);
        
//        var that = this;
        
//        var checkNPCposition = setInterval(function(){
//            if(Math.round(that.targetNPC1.y / 128) == Math.round(that.targetNPC1.hismove.y2 / 128)){
//                
//                that.targetNPC1.x = that.targetNPC1.hismove.originalX;
//                that.targetNPC1.y = that.targetNPC1.hismove.originalY;
//                that.targetNPC1 = null;
//                clearInterval(checkNPCposition);
//            }
//        }, 1);
    }
}

