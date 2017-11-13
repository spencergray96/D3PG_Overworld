var texting = false;

class textEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        this.continueIcon;
        
        // Put the dialogue here. Eventually we need to put the dialogue somewhere else (JSON file?) and push it to this parameter   //
        
        this.style = { font: "8pt Arial", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 120 };
    
        this.targetText = null;
        
        this.lineDelay  = 10;
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
                        this.eraseText();

                        texting = false;
                        currentNPC = null;

                        this.isText = 0;
                        break;
                }
            }
        }
    }  
    
    checkTextBoxContent(){
        if(currentNPC == null){
            console.log(theDialogue[defaults]);
        } 
        else{    
            if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0){
                this.person = (theDialogue.defaults.guy1.txt[0]).split(";;");
                this.profilePic = theDialogue.defaults.guy1.profile;
            }
            
        }
            
        
    }
    
    showText() {
        this.textScreen = this.game.add.image(0, (this.game.height - (this.game.height/4)), 'textBox'); 
        this.textScreen.fixedToCamera = true;
        this.textScreen.width = this.game.width;
        this.textScreen.height = this.game.height/4;
        
        this.text = this.game.add.text(0, 0, this.text, this.style);
        this.text.fixedToCamera = true;
        this.text.setTextBounds( 48 , (this.game.height - (this.game.height/4)), 300, 240);        
      
        this.textProfile = this.game.add.image(16, (this.game.height - (this.game.height/6)), this.profilePic); 
        this.textProfile.fixedToCamera = true;
    }
    
    eraseText(){
        console.log("this happened");
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
                    console.log(this.lineState);
                    if (!this.continueIcon){
                        this.continueIcon = true;
    //                    this line makes the continue text icon. maybe replace with an animated sprite?
                        this.continueThing = this.game.add.image((this.game.width - (this.game.width/10)), (this.game.height - (this.game.height/10)), this.profilePic);
                        this.continueThing.fixedToCamera = true;                   
                    }
                }

                else if(this.lineState >= this.person.length){
                    this.lineState = 0;
                    this.isText = 2;
                    this.continueIcon = false;
                    this.continueThing.destroy();
                }
                console.log('lineState: ' + this.lineState);

            }        
        }
    }
}

