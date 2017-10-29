
class testEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        this.person1text = ["This is bs", 
            "I can't believe I have to do this again", 
            "Please make it stop", 
            "It's already dead!"
            ];
        
        this.style = { font: "8pt Arial", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 120 };
    
        this.lineDelay = 10;
        this.letter = 0;
        this.lineState = 0;

        this.contDial = true;
        this.makeCont = false;
        this.dialEnd = this.person1text.length;
        
    }
    
    createThis(game) {
        super.createThis(game);
        
        this.textEvents            = this.game.add.group();
        this.textEvents.enableBody = true;
        this.textEvents.immovable = true;
        
        var result            = this.findObjectsByType('item', this.game.map, 'objectsLayer');
        result.forEach(function (element) {
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
        
        this.game.time.events.loop(this.lineDelay, this.nextText, this);
        
//        var mainScreenJSON = {
//            id: 'main',
//            component: 'Window',
//            draggable: true,
//            padding: 4,
//            position: { x: 0, y: 0 },
//            width: 200,
//            height: 140,
//
//
//            layout: [1, 3],
//            children: [
//                {
//                    id: 'label1',
//                    text: 'This text is using native Arial font',
//                    font: {
//                        size: '10px',
//                        family: 'Arial'
//                    },
//                    component: 'Label',
//                    position: 'center',
//                    width: 200,
//                    height: 80
//                },
//                {
//                    id: 'label1',
//                    text: 'This text is using \nSkranji bitmap font',
//                    font: {
//                        size: '10px',
//                        family: 'Skranji',
//                        color:'white'
//                    },
//                    component: 'Label',
//                    position: 'center',
//                    width: 200,
//                    height: 80
//                },
//                {
//                    id: 'label1',
//                    text: 'This text is using \nTinted Skranji bitmap font',
//                    font: {
//                        size: '10px',
//                        family: 'Skranji',
//                        color: 'red'
//                    },
//                    component: 'Label',
//                    position: 'center',
//                    width: 200,
//                    height: 80
//                }
//            ]
//        }
//        
//        EZGUI.Theme.load(['/ezgui/assets/metalworks-theme/metalworks-theme.json'], function () {
//
//            var mainScreen = EZGUI.create(mainScreenJSON, 'metalworks');
//        });
    
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.game.physics.arcade.overlap(this.player, this.textEvents.children, this.readText, null, this);
        
    }

    readText() {  
        if (this.enterBut.isDown){
            
            if(!this.isDown){
                this.isDown = true;
            }
            
        }
        
        if(this.enterBut.isUp){
            if(this.isDown){
                this.isDown = false;
                switch (this.isText) {
                    case 0:
                        this.printText();
                        this.isText = 1;
                        break;
                    case 1:

                        break;
                    case 2:
                        this.textScreen.visible = false;
                        this.textProfile.visible = false;
                        this.text.visible = false;
                        this.isText = 0;
                        break;
                }
            }
        }
    }  
    
    printText() {
        this.textScreen.visible = true;
        this.textProfile.visible = true;
        this.text.visible = true;
        
        
    }
    
    nextText() {
        
        if(this.isText <= 0 || this.isText >=2){
            return false;
        }
        if (this.letter <= this.person1text[this.lineState].length){
            this.addLetters = this.person1text[this.lineState].substring(0,this.letter);
            this.text.text = this.addLetters; 
            this.letter = this.letter + 1;
            //console.log(this.person1text[this.lineState].length);

        }
        else if (this.letter >= this.person1text[this.lineState].length){ 
            //this.checkDial();
            this.lineState++;
            this.letter = 0;
            this.isText = 0;
            
            if(this.lineState >= this.person1text.length){
                
                this.lineState = 0;
                this.isText = 2;
            }
            console.log('lineState: ' + this.lineState);

        }        
    }
}

