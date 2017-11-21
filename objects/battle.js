var battling = true;

class battle extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);

//        this.mainContainer = this.game.add.image(0, 0, "whiteBG");
//        this.mainContainer.width = this.game.width;
//        this.mainContainer.height = this.game.height;
//        this.mainContainer.fixedToCamera = true; 
//        
//        this.actionContainer = this.game.add.image(0, this.game.height - (this.game.height/4), "longBox");
//        this.actionContainer.width = this.game.width/3;
//        this.actionContainer.height = this.game.height/4;
//        this.actionContainer.fixedToCamera = true;
//        
//        this.displayContainer = this.game.add.image(this.game.width/3, this.game.height - (this.game.height/4), "longBox");
//        this.displayContainer.width = this.game.width - (this.game.width/3);
//        this.displayContainer.height = this.game.height/4;
//        this.displayContainer.fixedToCamera = true;          
//
//        this.innerContainer = this.game.add.image(10, 9, "mainBox");
//        this.innerContainer.width = this.game.width-20;
//        this.innerContainer.height = (this.game.height - (this.game.height/4))-18;
//        this.innerContainer.fixedToCamera = true; 
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);        
        this.isDown = false;
        
        this.createControls();
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        if(this.readText){
            this.makeContainers();
        }
        if (battling && !disableControls){
            disableControls = true;
            this.makeContainers();
        }
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

        this.actionContainer = this.game.add.image(0, this.game.height - (this.game.height/4), "longBox");
        this.actionContainer.width = this.game.width/3;
        this.actionContainer.height = this.game.height/4;
        this.actionContainer.fixedToCamera = true;

        this.displayContainer = this.game.add.image(this.game.width/3, this.game.height - (this.game.height/4), "longBox");
        this.displayContainer.width = this.game.width - (this.game.width/3);
        this.displayContainer.height = this.game.height/4;
        this.displayContainer.fixedToCamera = true;          

        this.innerContainer = this.game.add.image(10, 9, "mainBox");
        this.innerContainer.width = this.game.width-20;
        this.innerContainer.height = (this.game.height - (this.game.height/4))-18;
        this.innerContainer.fixedToCamera = true;                        
        
    }
    
    clearContainers(){
        this.mainContainer.destroy();
        this.actionContainer.destroy();
        this.displayContainer.destroy();
    }
    
}