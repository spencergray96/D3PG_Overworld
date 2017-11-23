var battling = true;

class battle extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);

        this.style = {
            font: "12pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 600
        };        
        
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);        
        this.isDown = false;
        
        this.createControls();
        
        this.actionX1 = 15;
        this.actionY1 = (this.game.height) - (150);
        this.actionX2 = 175;
        this.actionY2 = (this.game.height) - (70);
        
        this.cursorX1 = 70;
        
        this.cursorWidth = mainMenuHandWidth - 10;
        this.cursorHeight = mainMenuHandHeight - 5;
        
        this.makeContainers();
        this.makeCursors();
        this.actionOptions();
        
    }

    updateThis(game, player) {
        super.updateThis(game, player);
    }
    
    createControls(){
        if(battling){        
            if (this.enterBut.isDown){
                if(!this.isDown){
                    this.isDown = true;
                }
            }

            if(this.enterBut.isUp){
                if(this.isDown){
                    console.log("stuff");
                    this.isDown = false;
                    console.log("hello");
                }
            }
        }
    }
    
    makeContainers(){

        this.mainContainer = this.game.add.image(0, 0, "whiteBG");
        this.mainContainer.width = this.game.width;
        this.mainContainer.height = this.game.height;
        this.mainContainer.fixedToCamera = true; 

        this.actionContainer = this.game.add.image(10, this.game.height - (this.game.height/4), "longBox");
        this.actionContainer.width = this.game.width/2.2;
        this.actionContainer.height = this.game.height/4;
        this.actionContainer.fixedToCamera = true;

        this.displayContainer = this.game.add.image(this.game.width/2.05, this.game.height - (this.game.height/4), "longBox");
        this.displayContainer.width = this.game.width - (this.game.width/2);
        this.displayContainer.height = this.game.height/4;
        this.displayContainer.fixedToCamera = true;          

        this.innerContainer = this.game.add.image(10, 9, "mainBox");
        this.innerContainer.width = this.game.width-20;
        this.innerContainer.height = (this.game.height - (this.game.height/4))-18;
        this.innerContainer.fixedToCamera = true;                        
    }
    
    makeCursors(){
        this.topLeftIcon = this.game.add.image(this.actionX1, this.actionY1, "hand");
        this.topLeftIcon.width = this.cursorWidth;
        this.topLeftIcon.height = this.cursorHeight;        
        this.topLeftIcon.fixedToCamera = true; 
        
        this.bottomLeftIcon = this.game.add.image(this.actionX1, this.actionY2, "hand");
        this.bottomLeftIcon.width = this.cursorWidth;
        this.bottomLeftIcon.height = this.cursorHeight;        
        this.bottomLeftIcon.fixedToCamera = true; 

        this.topRightIcon = this.game.add.image(this.actionX2, this.actionY1, "hand");
        this.topRightIcon.width = this.cursorWidth;
        this.topRightIcon.height = this.cursorHeight;        
        this.topRightIcon.fixedToCamera = true; 
        
        this.bottomRightIcon = this.game.add.image(this.actionX2, this.actionY2, "hand");
        this.bottomRightIcon.width = this.cursorWidth;
        this.bottomRightIcon.height = this.cursorHeight;        
        this.bottomRightIcon.fixedToCamera = true;            
    }
    
    actionOptions(){
        this.attack = this.game.add.text(this.cursorX1, this.actionY1, "Attack", this.style);
        this.attack.fixedToCamera = true;        
    }
    
    clearEverything(){
        this.topLeftIcon.destroy();
        this.actionContainer.destroy();
        this.displayContainer.destroy();
        
        this.displayContainer.destroy();
        this.bottomLeftIcon.destroy();
        this.topRightIcon.destroy();
        this.bottomRightIcon.destroy();
    }
    
}