var texting = false;

class textEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        
        // Put the dialogue here. Eventually we need to put the dialogue somewhere else and push it to this parameter   //
        this.theDialogue = [
            this.person1text = ["This is bs", 
            "doing it again.", 
            "lol dingdong"
            ],
            this.person2text = ["????", 
            "huh.", 
            "yeah...", 
            "this is a cup."
            ],
            this.person3text = ["more talking etc.", 
            "yup", 
            "this is a thing", 
            "...."
            ],
            this.person4text = ["short dialogue.", 
            "yup."
            ]
        ];
        
        this.style = { font: "8pt Arial", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 120 };
    
        this.targetText = null;
        
        this.lineDelay = 10;
        this.letter = 0;
        this.lineState = 0;

        this.contDial = true;
        this.makeCont = false;        
    }
    
    createThis(game) {
        super.createThis(game);
        this.textEvents            = this.game.add.group();
        this.textEvents.enableBody = true;
        this.textEvents.immovable = true;
        this.textEvents.enableBodyDebug = true;
        
        var result            = this.findObjectsByType('item', this.game.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.textEvents);
            this.game.physics.enable(element, Phaser.Physics.ARCADE);       
        }, this);
        
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.textScreen = this.game.add.image(0, (this.game.height - (this.game.height/4)), 'textBox'); 
        this.textScreen.fixedToCamera = true;
        this.textScreen.width = this.game.width;
        this.textScreen.height = this.game.height/4;
        
        this.textScreen.visible = false;
        
        this.textProfile = this.game.add.image(16, (this.game.height - (this.game.height/6)), 'player'); 
        this.textProfile.fixedToCamera = true;
        
        this.textProfile.visible = false;
        
        
        this.text = this.game.add.text(0, 0, this.text, this.style);
        this.text.fixedToCamera = true;
        this.text.setTextBounds( 48 , (this.game.height - (this.game.height/4)), 300, 240);
        
        this.text.visible = false; 
        this.isText = 0;
        this.isDown = false;
        //  this delays text printing, it also prints text  //
        this.game.time.events.loop(this.lineDelay, this.printText, this);
    
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        //  current solution on event handling  //
        this.game.physics.arcade.overlap(this.player, this.textEvents.children, this.readText, null, this);
        
    }   
    
    checkOverlap(){
        for (var i = 0; i < this.textEvents.length; i++){
            if (this.game.physics.arcade.overlap(this.textEvents.children[i], this.player)){
                this.person = this.theDialogue[i];
            }
        }        
    }    
    
    readText() {  
        if (this.enterBut.isDown){
            
            if(!this.isDown){
                this.isDown = true;
                
                this.checkOverlap();
            }
            
        }
        
        if(this.enterBut.isUp){
            if(this.isDown){
                this.isDown = false;
                switch (this.isText) {
                    case 0:
                        texting = true;

                        this.showText();
                        this.isText = 1;
                        break;
                    case 1:
                        break;
                    case 2:
                        this.textScreen.visible = false;
                        this.textProfile.visible = false;
                        this.text.visible = false;

                        texting = false;

                        this.isText = 0;
                        break;
                }
            }
        }
    }  
    
    showText() {
        this.textScreen.visible = true;
        this.textProfile.visible = true;
        this.text.visible = true;
      
    }
    
    printText() {
        if(this.isText <= 0 || this.isText >= 2){
            return false;
        }
        if (this.letter <= this.person[this.lineState].length){
            this.addLetters = this.person[this.lineState].substring(0,this.letter);
            this.text.text = this.addLetters; 
            this.letter = this.letter + 1;

        }
        else if (this.letter >= this.person[this.lineState].length){ 

            this.lineState++;
            this.letter = 0;
            this.isText = 0;
            
            if(this.lineState >= this.person.length){
                
                this.lineState = 0;
                this.isText = 2;
            }
            console.log('lineState: ' + this.lineState);

        }        
    }
}

