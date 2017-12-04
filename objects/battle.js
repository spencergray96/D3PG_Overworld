var battling = false;

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
        
        this.attackDelay = 2;
        this.enemyDelay = 3;
        
        //  this is just to set up where the characters are. they do not dynamically move yet.
        this.characterXPos = 600;
        this.character1YPos = 50;
        this.character2YPos = 175;
        this.character3YPos = 300;
        this.character4YPos = 425;
        
        this.infoX1 = 350;
        this.infoX2 = 475;
        this.infoX3 = 525;
        this.infoXHP = 585;
        this.infoX4 = 640;
        this.infoX5 = 675;
        this.infoX6 = 725;
        
        this.infoY1 = 635;
        this.infoY2 = 675;
        this.infoY3 = 715;
        this.infoY4 = 755;
        
        this.activeCharVar = 0;
        
        this.displayArr = [];
        
        
        this.style = {
            font: "12pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left",
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 600
        };
        this.style2 = {
            font: "10pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "right",
            boundsAlignH: "right", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 600
        };        
        
        
        //Testing button
        this.tildeBut = this.game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
        
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
        
        
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.createControls();
        this.setupBattle();
    }
    setupBattle(){
        if(battling && !this.setup){
            this.setup = true;
            this.makeContainers();
            this.cursorProc = false;
            this.makeCursors();
            this.actionOptions();
            this.displayPlayerStats();

            this.enemy = this.game.add.sprite(100, 100, "dov");
            this.enemy.scale.setTo(10.0, 10.0);
            this.enemy.fixedToCamera = true;

            this.displayArr.push(this.enemy);
            
            this.displayPlayerStats();
        }
}
    
    makeContainers(){
        this.mainContainer = this.game.add.image(0, 0, "whiteBG");
        this.mainContainer.width = this.game.width;
        this.mainContainer.height = this.game.height;
        this.mainContainer.fixedToCamera = true; 

        this.displayArr.push(this.mainContainer);
        
        this.actionContainer = this.game.add.image(12, this.game.height - (this.game.height/4), "longBox");
        this.actionContainer.width = this.game.width/2.55;
        this.actionContainer.height = this.game.height/4;
        this.actionContainer.fixedToCamera = true;

        this.displayArr.push(this.actionContainer);
        
        this.displayContainer = this.game.add.image(this.game.width/2.35, this.game.height - (this.game.height/4), "longBox");
        this.displayContainer.width = this.game.width - (this.game.width/2.22);
        this.displayContainer.height = this.game.height/4;
        this.displayContainer.fixedToCamera = true;          

        this.displayArr.push(this.displayContainer);
        
        this.innerContainer = this.game.add.image(10, 9, this.battleBackground);
        this.innerContainer.width = this.game.width-20;
        this.innerContainer.height = (this.game.height - (this.game.height/4))-18;
        this.innerContainer.fixedToCamera = true;
        
        this.displayArr.push(this.innerContainer);
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
                this.displayArr.push(this.battleCursor);
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
        
        this.displayArr.push(this.attack);
        
        this.items = this.game.add.text(this.cursorX2, this.actionY1, "Items", this.style);
        this.items.fixedToCamera = true;
        
        this.displayArr.push(this.items);
        
        this.skill = this.game.add.text(this.cursorX1, this.actionY2, "Skill", this.style);
        this.skill.fixedToCamera = true;
        
        this.displayArr.push(this.skill);
        
        this.run = this.game.add.text(this.cursorX2, this.actionY2, "Run", this.style);
        this.run.fixedToCamera = true;
        
        this.displayArr.push(this.run);
    }
    
    displayPlayerStats(){
        
        //  player 1 information
        this.player1 = this.game.add.text(this.infoX1, this.infoY1, playerStats[0].name, this.style);
        this.player1.fixedToCamera = true;
        
        this.displayArr.push(this.player1);
        
        this.player1CurrentHealth = this.game.add.text(this.infoX2, this.infoY1, playerStats[0].currentHP, this.style);
        this.player1CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player1CurrentHealth.fixedToCamera = true;
        
        this.displayArr.push(this.player1CurrentHealth);

        
        this.player1MaxHealth = this.game.add.text(this.infoX3, this.infoY1, "/" + playerStats[0].maxHP, this.style2);
        this.player1MaxHealth.fixedToCamera = true;
        
        this.displayArr.push(this.player1MaxHealth);
        
        this.player1HP = this.game.add.text(this.infoXHP, this.infoY1,"HP", this.style);
        this.player1HP.fixedToCamera = true;
        
        this.displayArr.push(this.player1HP);
        
        this.player1CurrentEN = this.game.add.text(this.infoX4, this.infoY1, playerStats[0].currentEN, this.style);
        this.player1CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player1CurrentEN.fixedToCamera = true;           
        
        this.displayArr.push(this.player1CurrentEN);
        
        this.player1MaxEN = this.game.add.text(this.infoX5, this.infoY1, "/" + playerStats[0].maxEN, this.style2);      
        this.player1MaxEN.fixedToCamera = true;
        
        this.displayArr.push(this.player1MaxEN);
        
        this.player1EN = this.game.add.text(this.infoX6, this.infoY1, "EN", this.style);
        this.player1EN.fixedToCamera = true;        
        
        this.displayArr.push(this.player1EN);
        
        //  player 2 information
        this.player2 = this.game.add.text(this.infoX1, this.infoY2, playerStats[1].name, this.style);
        this.player2.fixedToCamera = true;

        this.displayArr.push(this.player2);
        
        this.player2CurrentHealth = this.game.add.text(this.infoX2, this.infoY2, playerStats[1].currentHP, this.style);
        this.player2CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player2CurrentHealth.fixedToCamera = true;
        
        this.displayArr.push(this.player2CurrentHealth);
        
        this.player2MaxHealth = this.game.add.text(this.infoX3, this.infoY2, "/" + playerStats[1].maxHP, this.style2);
        this.player2MaxHealth.fixedToCamera = true;

        this.displayArr.push(this.player2MaxHealth);
        
        this.player2HP = this.game.add.text(this.infoXHP, this.infoY2,"HP", this.style);
        this.player2HP.fixedToCamera = true;        
        
        this.displayArr.push(this.player2HP);
        
        this.player2CurrentEN = this.game.add.text(this.infoX4, this.infoY2, playerStats[1].currentEN, this.style);
        this.player2CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player2CurrentEN.fixedToCamera = true;           
        
        this.displayArr.push(this.player2CurrentEN);
        
        this.player2MaxEN = this.game.add.text(this.infoX5, this.infoY2, "/" + playerStats[1].maxEN, this.style2);      
        this.player2MaxEN.fixedToCamera = true;
        
        this.displayArr.push(this.player2MaxEN);
        
        this.player2EN = this.game.add.text(this.infoX6, this.infoY2, "EN", this.style);
        this.player2EN.fixedToCamera = true;
        
        this.displayArr.push(this.player2EN);
        
        //  player 3 information
        this.player3 = this.game.add.text(this.infoX1, this.infoY3, playerStats[2].name, this.style);
        this.player3.fixedToCamera = true

        this.displayArr.push(this.player3);
        
        this.player3CurrentHealth = this.game.add.text(this.infoX2, this.infoY3, playerStats[2].currentHP, this.style);
        this.player3CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player3CurrentHealth.fixedToCamera = true;
        
        this.displayArr.push(this.player3CurrentHealth);
        
        this.player3MaxHealth = this.game.add.text(this.infoX3, this.infoY3, "/" + playerStats[2].maxHP, this.style2);
        this.player3MaxHealth.fixedToCamera = true;

        this.displayArr.push(this.player3MaxHealth);        
        
        this.player3HP = this.game.add.text(this.infoXHP, this.infoY3,"HP", this.style);
        this.player3HP.fixedToCamera = true;
        
        this.displayArr.push(this.player3HP);                
        
        this.player3CurrentEN = this.game.add.text(this.infoX4, this.infoY3, playerStats[2].currentEN, this.style);
        this.player3CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player3CurrentEN.fixedToCamera = true;           
        
        this.displayArr.push(this.player3CurrentEN);
        
        this.player3MaxEN = this.game.add.text(this.infoX5, this.infoY3, "/" + playerStats[2].maxEN, this.style2);      
        this.player3MaxEN.fixedToCamera = true;        
        
        this.displayArr.push(this.player3MaxEN);
        
        this.player3EN = this.game.add.text(this.infoX6, this.infoY3, "EN", this.style);
        this.player3EN.fixedToCamera = true;          
        
        this.displayArr.push(this.player3EN);
        
        // player 4 information
        this.player4 = this.game.add.text(this.infoX1, this.infoY4, playerStats[3].name, this.style);
        this.player4.fixedToCamera = true;

        this.displayArr.push(this.player4);
        
        this.player4CurrentHealth = this.game.add.text(this.infoX2, this.infoY4, playerStats[3].currentHP, this.style);
        this.player4CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player4CurrentHealth.fixedToCamera = true;
        
        this.displayArr.push(this.player4CurrentHealth);
        
        this.player4MaxHealth = this.game.add.text(this.infoX3, this.infoY4, "/" + playerStats[3].maxHP, this.style2);
        this.player4MaxHealth.fixedToCamera = true;
        
        this.displayArr.push(this.player4MaxHealth);
        
        this.player4HP = this.game.add.text(this.infoXHP, this.infoY4,"HP", this.style);
        this.player4HP.fixedToCamera = true;           
        
        this.displayArr.push(this.player4HP);
        
        this.player4CurrentEN = this.game.add.text(this.infoX4, this.infoY4, playerStats[3].currentEN, this.style);
        this.player4CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player4CurrentEN.fixedToCamera = true;           
        
        this.displayArr.push(this.player4CurrentEN);
        
        this.player4MaxEN = this.game.add.text(this.infoX5, this.infoY4, "/" + playerStats[3].maxEN, this.style2);      
        this.player4MaxEN.fixedToCamera = true;
        
        this.displayArr.push(this.player4MaxEN);
        
        this.player4EN = this.game.add.text(this.infoX6, this.infoY4, "EN", this.style);
        this.player4EN.fixedToCamera = true;    
        
        this.displayArr.push(this.player4EN);
    }
    
    clearEverything(){
        for(var i=0; i < this.displayArr.length; i++){
//            console.log(this.displayArr[i]);
            this.displayArr[i].destroy();
        }
        this.displayArr = [];
        this.testing = false;
        this.setup = false;
    }
    
    eraseCursor(){
        this.battleCursor.destroy();
        this.cursorProc = false;
    }
    
    createControls() {
        
        if (this.tildeBut.isDown){
            if(!this.tildeIsDown){
                this.tildeIsDown = true;
                if(!this.testing){
                    battling = true;
                    this.testing = true;
                console.log("battling is: " + battling);
                this.setupBattle();                    
                }
                else if(this.testing){
                    this.testing = false;
                    battling = false;
                    console.log("battling is: " + battling);
                    this.clearEverything();
                }
            }
        }
        if(this.tildeBut.isUp){
            if(this.tildeIsDown){
                this.tildeIsDown = false;
            }
        }
        
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
                    alert("import Items lol");
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
                    alert("No Run Lol");  
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
                disableControls = true;
                this.eraseCursor();
                this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.playerAttack, this);
                break;
            case 1:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;
                disableControls = true;
                this.eraseCursor();
                this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.playerAttack, this);
                break;
            case 2:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;
                disableControls = true;
                this.eraseCursor();
                this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.playerAttack, this);
                break;
            case 3:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;                
                this.playerAttack();
                disableControls = true;
                console.log("disableControls");
                this.enemyTurn = true;
                this.eraseCursor();
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
            disableControls = true;
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.playerAttack, this);             
        }
    }
    
    playerAttack(){
        this.cursorPosMain = 0;
        this.cursorPosMain = 0;
        this.makeCursors();                
        this.activeCharVar++;
        disableControls = false;
    }
    
    enemyAttack(){
        if (this.enemyTurn){
            console.log("enemy attacking");
            this.activeCharVar = 0;
            this.enemyTurn = false;
            this.game.time.events.add(Phaser.Timer.SECOND * this.enemyDelay, this.enemyAttackFinish, this);
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