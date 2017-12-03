var battling = true;

class battle extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        //  this is the background of the battle    //
        this.battleBackground = "mainBox";
        
        //  menu triggers for controls  //
        this.mainMenu = true;
        this.attackMenu = false;
        this.itemMenu = false;
        this.run = false;
        
        //  this is just to set up where the characters are. they do not dynamically move yet.
        this.characterXPos = 600;
        this.character1YPos = 50;
        this.character2YPos = 175;
        this.character3YPos = 300;
        this.character4YPos = 425;
        
        // this hasen't been used yet. //
        this.activeCharVar = 0;
        
        this.style = {
            font: "12pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left",
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 600
        };           
        
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.backBut = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.cursors = game.input.keyboard.createCursorKeys();        
        
        this.cursorProc = false;
        
        this.actionX1 = 15;
        this.actionY1 = (this.game.height) - (150);
        this.actionX2 = 175;
        this.actionY2 = (this.game.height) - (70);
        
        this.cursorX1 = 70;
        this.cursorX2 = 230;
        
        //  this is for the main targeting of the cursor    //
        this.cursorPosMain = 0;
        
        this.cursorWidth = mainMenuHandWidth - 10;
        this.cursorHeight = mainMenuHandHeight - 5;
        
        if(battling){
            this.makeContainers();
            this.makeCursors();
            this.actionOptions();
            
            this.enemy = this.game.add.sprite(100, 100, "dov");
            this.enemy.scale.setTo(10.0, 10.0);
            this.enemy.fixedToCamera = true;

            this.spencerCH = this.game.add.sprite(this.characterXPos, this.character1YPos, "spencerCH");
            this.spencerCH.scale.setTo(0.05, 0.05);
            this.spencerCH.fixedToCamera = true;

            this.dovCH = this.game.add.sprite(this.characterXPos, this.character2YPos, "dovCH");
            this.dovCH.scale.setTo(0.05, 0.05);
            this.dovCH.fixedToCamera = true;

            this.jamesCH = this.game.add.sprite(this.characterXPos, this.character3YPos, "jamesCH");
            this.jamesCH.scale.setTo(0.05, 0.05);
            this.jamesCH.fixedToCamera = true;

            this.raymondCH = this.game.add.sprite(this.characterXPos, this.character4YPos, "raymondCH");
            this.raymondCH.scale.setTo(0.05, 0.05);
            this.raymondCH.fixedToCamera = true;        
        }
        
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.createControls();
    }
    
    makeContainers(){
        this.mainContainer = this.game.add.image(0, 0, "whiteBG");
        this.mainContainer.width = this.game.width;
        this.mainContainer.height = this.game.height;
        this.mainContainer.fixedToCamera = true; 

        this.actionContainer = this.game.add.image(12, this.game.height - (this.game.height/4), "longBox");
        this.actionContainer.width = this.game.width/2.55;
        this.actionContainer.height = this.game.height/4;
        this.actionContainer.fixedToCamera = true;

        this.displayContainer = this.game.add.image(this.game.width/2.35, this.game.height - (this.game.height/4), "longBox");
        this.displayContainer.width = this.game.width - (this.game.width/2.22);
        this.displayContainer.height = this.game.height/4;
        this.displayContainer.fixedToCamera = true;          

        this.innerContainer = this.game.add.image(10, 9, this.battleBackground);
        this.innerContainer.width = this.game.width-20;
        this.innerContainer.height = (this.game.height - (this.game.height/4))-18;
        this.innerContainer.fixedToCamera = true;
    }
    
    //  this currently is where the controls for the cursor is  //    
    makeCursors(){
        if(!this.cursorProc){
            this.cursorProc = true;

            //  each if statement is for a different element in the main menu   //
            if(this.mainMenu){
                switch(this.cursorPosMain){
                    case 0:
                        this.cursorPosMain = 0;
                        this.battleCursor = this.game.add.image(this.actionX1, this.actionY1, "hand");
                        this.battleCursor.width = this.cursorWidth;
                        this.battleCursor.height = this.cursorHeight;
                        this.battleCursor.fixedToCamera = true; 
                        break;
                    case 1:
                        this.cursorPosMain = 1;
                        this.battleCursor = this.game.add.image(this.actionX2, this.actionY1, "hand");
                        this.battleCursor.width = this.cursorWidth;
                        this.battleCursor.height = this.cursorHeight;        
                        this.battleCursor.fixedToCamera = true; 
                        break;
                    case 2:
                        this.cursorPosMain = 2;
                        this.battleCursor = this.game.add.image(this.actionX1, this.actionY2, "hand");
                        this.battleCursor.width = this.cursorWidth;
                        this.battleCursor.height = this.cursorHeight;        
                        this.battleCursor.fixedToCamera = true; 
                        break;
                    case 3:
                        this.cursorPosMain = 3
                        this.battleCursor = this.game.add.image(this.actionX2, this.actionY2, "hand");
                        this.battleCursor.width = this.cursorWidth;
                        this.battleCursor.height = this.cursorHeight;        
                        this.battleCursor.fixedToCamera = true;            
                        break;
                }
            }
        }
        if(this.attackMenu){
            this.cursorPosMain = 4;
            this.battleCursor = this.game.add.image(this.enemy.x + 100, this.enemy.y + 100, "hand");
            this.battleCursor.width = this.cursorWidth;
            this.battleCursor.height = this.cursorHeight;

        }
        if(this.itemMenu){      
            console.log("lol skills");
        }            
    }
    
    actionOptions(){
        this.attack = this.game.add.text(this.cursorX1, this.actionY1, "Attack", this.style);
        this.attack.fixedToCamera = true;   
        this.items = this.game.add.text(this.cursorX2, this.actionY1, "Items", this.style);
        this.items.fixedToCamera = true;   
        this.skill = this.game.add.text(this.cursorX1, this.actionY2, "Skill", this.style);
        this.skill.fixedToCamera = true;           
        this.run = this.game.add.text(this.cursorX2, this.actionY2, "Run", this.style);
        this.run.fixedToCamera = true;
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
    
    eraseCursor(){
        this.battleCursor.destroy();
        this.cursorProc = false;
    }
    
    createControls() {
        if(battling && !disableControls){
            if (this.enterBut.isDown){
                if(!this.enterIsDown){
                    this.enterIsDown = true;
                    this.mainMenuControls();
                }
            }
            if(this.enterBut.isUp){
                if(this.enterIsDown){
                    this.enterIsDown = false;
                }
            }
            if (this.backBut.isDown){
                if(!this.backIsDown){
                    this.backIsDown = true;
                    this.goBack();
                }
            }
            if(this.backBut.isUp){
                if(this.backIsDown){
                    this.backIsDown = false;
                }
            }            
            if (this.cursors.up.isDown){
                if(!this.upIsDown){
                    this.upIsDown = true;
                    this.eraseCursor();
                    this.up();
                    this.makeCursors()
                }
            }
            if(this.cursors.up.isUp){
                if(this.upIsDown){
                    this.upIsDown = false;
                }
            }
            if (this.cursors.down.isDown){
                if(!this.downIsDown){
                    this.downIsDown = true;
                    this.eraseCursor();
                    this.down();
                    this.makeCursors()
                }
            }
            if(this.cursors.down.isUp){
                if(this.downIsDown){
                    this.downIsDown = false;
                }
            }
            if (this.cursors.left.isDown){
                if(!this.leftIsDown){
                    this.leftIsDown = true;
                    this.eraseCursor();
                    this.left();
                    this.makeCursors()
                }
            }
            if(this.cursors.left.isUp){
                if(this.leftIsDown){
                    this.leftIsDown = false;
                }
            }  
            if (this.cursors.right.isDown){
                if(!this.rightIsDown){
                    this.rightIsDown = true;
                    this.eraseCursor();
                    this.right();
                    this.makeCursors()
                }
            }
            if(this.cursors.right.isUp){
                if(this.rightIsDown){
                    this.rightIsDown = false;
                }
            }
        }        
    }
    
    goBack(){
        if(this.mainMenu){
            console.log("menu back noise");
        }
        if(this.attackMenu && !this.skillAttack){
            console.log("attack back noise");
            this.mainMenu = true;
            this.attackMenu = false;
            this.cursorPosMain = 0;
            this.eraseCursor();
            this.makeCursors();            
        }        
        if(this.skillAttack){
            console.log("skill back noise");
            this.mainMenu = true;
            this.attackMenu = false;
            this.skillAttack = false;
            this.cursorPosMain = 0;
            this.eraseCursor();
            this.makeCursors();               
        }
        if(this.itemMenu){
            console.log("item bump noise");
            this.mainMenu = true;
            this.itemMenu = false;
            this.cursorPosMain = 0;
            this.eraseCursor();
            this.makeCursors();              
        }
    }
    
    mainMenuControls(){
        if(this.mainMenu){
            switch(this.cursorPosMain){
                case 0:
                    console.log("Attack chosen");
                    this.mainMenu = false;
                    this.attackMenu = true;
                    this.eraseCursor();
                    this.makeCursors();
                    break;
                case 1:
                    console.log("Items chosen");
                    this.eraseCursor();
                    this.makeCursors();                            
                    break;
                case 2:
                    console.log("Skill chosen");
                    this.mainMenu = false;
                    this.attackMenu = true;
                    this.skillAttack = true;
                    this.eraseCursor();
                    this.makeCursors(); 
                    break;
                case 3:
                    console.log("Run");  
                    break;

            }
        }
        else if(this.attackMenu){
            switch(this.cursorPosMain){
                case 4:
                    this.fight();
            }
        }
    }
    
    up(){
        switch(this.cursorPosMain){
            case 0:
                console.log("bump noise");
                break;
            case 1:
                console.log("bump noise");
                break;
            case 2:
                this.cursorPosMain = 0;
                break;
            case 3:
                this.cursorPosMain = 1;
                break;
            case 4:
                console.log("bump noise");
                break;
        }
    }
    
    down(){
        switch(this.cursorPosMain){
            case 0:
                this.cursorPosMain = 2;
                break;
            case 1:
                this.cursorPosMain = 3;
                break;
            case 2:
                console.log("bump noise");
                break;
            case 3:
                console.log("bump noise");
                break;
            case 4:
                console.log("bump noise");
                break;                
                
        }    

    }
    
    left(){
        switch(this.cursorPosMain){
            case 0:
                console.log("bump noise");
                break;
            case 1:
                this.cursorPosMain = 0;
                break;
            case 2:
                console.log("bump noise");
                break;
            case 3:
                this.cursorPosMain = 2;
                break;
            case 4:
                console.log("bump noise");
                break;
        }    

    }
    
    right(){
        switch(this.cursorPosMain){
            case 0:
                this.cursorPosMain = 1;
                break;
            case 1:
                console.log("bump noise");
                break;
            case 2:
                this.cursorPosMain = 3;
                break;
            case 3:
                console.log("bump noise");
                break;
            case 4:
                console.log("bump noise");
                break;
        }

    }

    fight(){
        if(this.attackMenu && !this.skillAttack){
        switch(this.activeCharVar){
            case 0:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;
                this.eraseCursor();
                this.cursorPosMain = 0;
                this.cursorPosMain = 0;
                this.makeCursors();                
                this.activeCharVar++;
                break;
            case 1:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;
                this.eraseCursor();
                this.cursorPosMain = 0;
                this.cursorPosMain = 0;
                this.makeCursors();                
                this.activeCharVar++;
                break;
            case 2:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;
                this.eraseCursor();
                this.cursorPosMain = 0;
                this.cursorPosMain = 0;
                this.makeCursors();                
                this.activeCharVar++;
                break;
            case 3:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;                
                this.eraseCursor();
                this.cursorPosMain = 0;
                this.cursorPosMain = 0;
                this.makeCursors();                
                this.activeCharVar++;
                disableControls = true;
                console.log("disableControls");
                this.enemyTurn = true;
                this.enemyAttack();
                break;
            }            
        }
        if(this.skillAttack){
            console.log("Skill Attack");
            this.skillAttack = false;
            this.attackMenu = false;
            this.mainMenu = true; 
            this.eraseCursor();
            this.cursorPosMain = 0;
            this.cursorPosMain = 0;
            this.makeCursors();                
            this.activeCharVar++;                
        }
    }
    
    enemyAttack(){
        if (this.enemyTurn){
            console.log("enemy attacking");
            this.activeCharVar = 0;
            this.enemyTurn = false;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.enemyAttackFinish, this);
        }
    }
    
    enemyAttackFinish(){
        disableControls = false;
        console.log("turn on controls");
        this.cursorPosMain = 0;
        this.eraseCursor();
        this.cursorPosMain = 0;
        this.cursorPosMain = 0;
        this.makeCursors();         
    }
    
}