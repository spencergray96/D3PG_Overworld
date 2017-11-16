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
        
        // Put the dialogue here. Eventually we need to put the dialogue somewhere else (JSON file?) and push it to this parameter   //
        
        this.style = { font: "8pt Final-Fantasy-36-Font", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 120, 
            };
        
        this.profileXValue = 8;
    
        this.targetText = null;
        
        this.lineDelay  = 30;
        this.letter     = 0;
        this.lineState  = 0;

        this.contDial   = true;
        this.makeCont   = false; 
    }
    
    createThis(game) {
        super.createThis(game);
        
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.isText = 0;
        this.isDown = false;
        //  this delays text printing, it also prints text  //
        this.game.time.events.loop(this.lineDelay, this.printText, this);
        console.log("leaving this here to check variables");
    }

    updateThis(game, player) {
        super.updateThis(game, player);

        // this is for printing text and making it appear //
        this.readText();
        
    }   
    
    readText() {
        if (this.enterBut.isDown && currentNPC != null){
            texting = true;
            if(!this.isDown){
                this.checkTextBoxContent();
                this.isDown = true;
            }
        }
        
        if(this.enterBut.isUp){
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
            console.log("how did this happen?");
        } 
        else{    
            if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0){
                
                if(eventNumber == 0){
                    this.callEvent("ramin", 0);
                }
                
                else{
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
            
            if (eventTextNumber < Object.values(theDialogue.events)[eventNumber].length - 1 && eventNumber == 0){
                eventTextNumber++;

                if (Object.values(theDialogue.events)[eventNumber].length != eventTextNumber){
                    this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
                    this.textProfile.destroy();

                    this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
                    this.textProfile = this.game.add.image(this.profileXValue, (this.game.height - (this.game.height/6)), this.profilePic); 
                    this.textProfile.fixedToCamera = true;

                    this.isText = 1;
                }
            }
            else if (eventTextNumber >= Object.values(theDialogue.events)[eventNumber].length - 1 && eventNumber == 0){
                this.isText = 2;
                this.eraseText();   

                eventTrigger = false;
                eventNumber++;           

                texting = false;
                currentNPC = null;
                this.isText = 0;
            }
            
        }
        
        else {
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

            this.text = this.game.add.text(0, 0, this.text, this.style);
            this.text.fixedToCamera = true;
            this.text.setTextBounds( 48 , (this.game.height - (this.game.height/4)), 300, 240);
            this.text.lineSpacing = -5;

            this.textProfile = this.game.add.image(this.profileXValue, (this.game.height - (this.game.height/6)), this.profilePic); 
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
                        this.continueThing = this.game.add.image((this.game.width - (this.game.width/9)), (this.game.height - (this.game.height/9)), 'bluecup');
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
                console.log('lineState: ' + this.lineState);

            }        
        }
    }
    
    callEvent(sprite, event){
                    if (currentNPC.hismove.npcName == String(sprite) && eventNumber == event && !eventTrigger){

                        eventTrigger = true;

                        this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
                        this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
                    }     
    }
}

