var battling = false;
var bossNum = 0;

class battle extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        //  this is the background of the battle    //
        console.log(enemyStats[bossNum].battleBG);
        this.battleBackground = enemyStats[bossNum].battleBG;
        
        this.battleAnimFPS = 10;
        
        //  menu triggers for controls  //
        this.mainMenu = true;
        this.attackMenu = false;
        this.itemMenu = false;
        this.run = false;
        
        this.damageAmount = "raymondCH";
        this.damageX = 100;
        this.damageY = 100;
        
        this.turnWalking = false;
        
        this.attackDelay = 1;
        this.enemyDelay = 1;
        
        this.closWindowDelay = 1.5;
        
        //  this is just to set up where the characters are. they do not dynamically move yet.
        this.characterPos = {
            character1YPos: 50,
            character2YPos: 175,
            character3YPos: 300,
            character4YPos: 425,
            
            characterX1Pos: 490,
            characterX2Pos: 430            
        }     
        
        this.waiting = false;
        
        this.weaponAlignment = 325;

        this.infoX1 = 350;
        this.infoX2 = 475;
        this.infoX3 = 525;
        this.infoXHP = 585;
        this.infoX4 = 625;
        this.infoX5 = 675;
        this.infoX6 = 725;
        
        this.infoY1 = 635;
        this.infoY2 = 675;
        this.infoY3 = 715;
        this.infoY4 = 755;
        
        this.teamStats = [];
        this.ENStats = [];
        
        this.enemyX = 50;
        this.enemyY = 50;
        this.enemyWidth = 400;
        this.enemyHeight = 500;
        
        this.tempAttack = null; // this is for who the enemy targets

        this.activeCharVar = 0;
        
        this.displayArr = [];
        
        this.charArr = [];
        
        this.style = {
            font: "12pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "right",
            boundsAlignH: "right", 
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
        this.style3 = {
            font: "12pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "center",
            boundsAlignH: "center", 
            boundsAlignV: "center", 
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
            this.teamStats = [];
            this.ENStats = [];            
            this.makeContainers();
            this.cursorProc = false;
            this.makeCursors();         
            this.actionOptions();
            this.displayPlayerStats();
            
            this.makePlayers();

            this.enemy = this.game.add.sprite(this.enemyX, this.enemyY, enemyStats[bossNum].baseCharacter);
            this.enemy.width = this.enemyWidth;
            this.enemy.height = this.enemyHeight;
            this.enemy.fixedToCamera = true;

            this.displayArr.push(this.enemy);
            
            this.displayPlayerStats();
            this.displayDamage();
        }
    }
    
    makePlayers(){
        for(var i = 0; i < playerStats.length; i++){
            if (this.activeCharVar == i){
                // the secondary code here is to check if the player is dead. removed that for now
                if (!battle /* playerStats[i].currentHP <= 0 */){
                    this.charArr[i] = this.game.add.sprite(Object.values(this.characterPos)[4], Object.values(this.characterPos)[i], playerStats[i].spritesheetBattle);                
                    this.charArr[i].frame = 0;                    
                    this.activeCharVar++
                }
                else{
                    this.charArr[i] = this.game.add.sprite(Object.values(this.characterPos)[5], Object.values(this.characterPos)[i], playerStats[i].spritesheetBattle);
                    this.charArr[i].frame = 6;
                }
            }
            else{
                this.charArr[i] = this.game.add.sprite(Object.values(this.characterPos)[4], Object.values(this.characterPos)[i], playerStats[i].spritesheetBattle);                
                this.charArr[i].frame = 0;
            }
            
            this.charArr[i].width = 240;
            this.charArr[i].height = 120;

            this.charArr[i].animations.add("left", [1, 2, 3, 4, 5, 6], this.battleAnimFPS, false);
            this.charArr[i].animations.add("right", [6, 5, 4, 3, 2, 1, 0], this.battleAnimFPS, false);
            
            this.charArr[i].animations.add("attack", [6, 8, 6, 7,], this.battleAnimFPS, true);
            
            this.game.physics.arcade.enable(this.charArr[i]);
            this.charArr[i].fixedToCamera = true;
            this.charArr[i].cameraOffset.x = Object.values(this.characterPos)[4];
            this.displayArr.push(this.charArr[i]);
        }
    }
    
    makeWeapons(){
        if (eventNumber < 32){
            switch(this.activeCharVar){
                case 0:
                    this.animateWeapons(playerStats[0].basicWeapon, this.characterPos.character1YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);             
                    break;
                case 1:
                    this.animateWeapons(playerStats[1].basicWeapon, this.characterPos.character2YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);
                    break;    
                case 2:
                    this.animateWeapons(playerStats[2].basicWeapon, this.characterPos.character3YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);
                    break;
                case 3:
                    this.animateWeapons(playerStats[3].basicWeapon, this.characterPos.character4YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);
                    break;
            }
        }
        else {
            switch(this.activeCharVar){                
                case 0:
                    this.animateWeapons(playerStats[0].lastWeapon, this.characterPos.character1YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);             
                    break;
                case 1:
                    this.animateWeapons(playerStats[1].lastWeapon, this.characterPos.character2YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);
                    break;    
                case 2:
                    this.animateWeapons(playerStats[2].lastWeapon, this.characterPos.character3YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);
                    break;
                case 3:
                    this.animateWeapons(playerStats[3].lastWeapon, this.characterPos.character4YPos);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);
                    break;                
            }
        }
    }
    
    animateWeapons(thing, location){
        this.weaponArr = this.game.add.sprite(this.weaponAlignment, location, thing);
        if(battling){
        this.weaponArr.frame = 1;
        this.weaponArr.animations.add("hit", [0, 1, 2, 1], this.battleAnimFPS, true);
        this.weaponArr.fixedToCamera = true;
        this.game.physics.arcade.enable(this.weaponArr);
        this.weaponArr.animations.play("hit");
        this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyWeapon, this);            
        }
    }
    
    destroyWeapon(){
        this.weaponArr.destroy();
    }
    
    makeContainers(){
        this.mainContainer = this.game.add.image(0, 0, "whiteBox");
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
        if(!this.cursorProc && battling){
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
            // this is where items go
            console.log("lol items");
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
    
    resetStats(){
        for (var i = 0; i < this.teamStats.length; i++){
            this.teamStats[i].destroy();
        }
        this.teamStats = [];
        
        this.player1CurrentHealth = this.game.add.text(this.infoX2, this.infoY1, playerStats[0].currentHP, this.style);
        this.player1CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player1CurrentHealth.fixedToCamera = true;
        
        this.teamStats.push(this.player1CurrentHealth);
        
        this.player2CurrentHealth = this.game.add.text(this.infoX2, this.infoY2, playerStats[1].currentHP, this.style);
        this.player2CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player2CurrentHealth.fixedToCamera = true;
        
        this.teamStats.push(this.player2CurrentHealth);
        
        this.player3CurrentHealth = this.game.add.text(this.infoX2, this.infoY3, playerStats[2].currentHP, this.style);
        this.player3CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player3CurrentHealth.fixedToCamera = true;
        
        this.teamStats.push(this.player3CurrentHealth);
        
        this.player4CurrentHealth = this.game.add.text(this.infoX2, this.infoY4, playerStats[3].currentHP, this.style);
        this.player4CurrentHealth.setTextBounds(0, 0, 50, 100);
        this.player4CurrentHealth.fixedToCamera = true;
        
        this.teamStats.push(this.player4CurrentHealth);
        
        //  player 1 information
        this.player1 = this.game.add.text(this.infoX1, this.infoY1, playerStats[0].name, this.style);
        this.player1.fixedToCamera = true;
        
        this.teamStats.push(this.player1);
        
        this.player1MaxHealth = this.game.add.text(this.infoX3, this.infoY1, "/" + playerStats[0].maxHP, this.style2);
        this.player1MaxHealth.fixedToCamera = true;
        
        this.teamStats.push(this.player1MaxHealth);
        
        this.player1HP = this.game.add.text(this.infoXHP, this.infoY1,"HP", this.style);
        this.player1HP.fixedToCamera = true;
        
        this.teamStats.push(this.player1HP);
        
        this.player1CurrentEN = this.game.add.text(this.infoX4, this.infoY1, playerStats[0].currentEN, this.style);
        this.player1CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player1CurrentEN.fixedToCamera = true;           
        
        this.teamStats.push(this.player1CurrentEN);
        
        this.player1MaxEN = this.game.add.text(this.infoX5, this.infoY1, "/" + playerStats[0].maxEN, this.style2);      
        this.player1MaxEN.fixedToCamera = true;
        
        this.teamStats.push(this.player1MaxEN);
        
        this.player1EN = this.game.add.text(this.infoX6, this.infoY1, "EN", this.style);
        this.player1EN.fixedToCamera = true;        
        
        this.teamStats.push(this.player1EN);
        
        //  player 2 information
        this.player2 = this.game.add.text(this.infoX1, this.infoY2, playerStats[1].name, this.style);
        this.player2.fixedToCamera = true;

        this.teamStats.push(this.player2);

        this.player2MaxHealth = this.game.add.text(this.infoX3, this.infoY2, "/" + playerStats[1].maxHP, this.style2);
        this.player2MaxHealth.fixedToCamera = true;

        this.teamStats.push(this.player2MaxHealth);
        
        this.player2HP = this.game.add.text(this.infoXHP, this.infoY2,"HP", this.style);
        this.player2HP.fixedToCamera = true;        
        
        this.teamStats.push(this.player2HP);
        
        this.player2CurrentEN = this.game.add.text(this.infoX4, this.infoY2, playerStats[1].currentEN, this.style);
        this.player2CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player2CurrentEN.fixedToCamera = true;           
        
        this.teamStats.push(this.player2CurrentEN);
        
        this.player2MaxEN = this.game.add.text(this.infoX5, this.infoY2, "/" + playerStats[1].maxEN, this.style2);      
        this.player2MaxEN.fixedToCamera = true;
        
        this.teamStats.push(this.player2MaxEN);
        
        this.player2EN = this.game.add.text(this.infoX6, this.infoY2, "EN", this.style);
        this.player2EN.fixedToCamera = true;
        
        this.teamStats.push(this.player2EN);
        
        //  player 3 information
        this.player3 = this.game.add.text(this.infoX1, this.infoY3, playerStats[2].name, this.style);
        this.player3.fixedToCamera = true

        this.teamStats.push(this.player3);
        
        this.player3MaxHealth = this.game.add.text(this.infoX3, this.infoY3, "/" + playerStats[2].maxHP, this.style2);
        this.player3MaxHealth.fixedToCamera = true;

        this.teamStats.push(this.player3MaxHealth);        
        
        this.player3HP = this.game.add.text(this.infoXHP, this.infoY3,"HP", this.style);
        this.player3HP.fixedToCamera = true;
        
        this.teamStats.push(this.player3HP);                
        
        this.player3CurrentEN = this.game.add.text(this.infoX4, this.infoY3, playerStats[2].currentEN, this.style);
        this.player3CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player3CurrentEN.fixedToCamera = true;           
        
        this.teamStats.push(this.player3CurrentEN);
        
        this.player3MaxEN = this.game.add.text(this.infoX5, this.infoY3, "/" + playerStats[2].maxEN, this.style2);      
        this.player3MaxEN.fixedToCamera = true;        
        
        this.teamStats.push(this.player3MaxEN);
        
        this.player3EN = this.game.add.text(this.infoX6, this.infoY3, "EN", this.style);
        this.player3EN.fixedToCamera = true;          
        
        this.teamStats.push(this.player3EN);
        
        // player 4 information
        this.player4 = this.game.add.text(this.infoX1, this.infoY4, playerStats[3].name, this.style);
        this.player4.fixedToCamera = true;

        this.teamStats.push(this.player4);

        this.player4MaxHealth = this.game.add.text(this.infoX3, this.infoY4, "/" + playerStats[3].maxHP, this.style2);
        this.player4MaxHealth.fixedToCamera = true;
        
        this.teamStats.push(this.player4MaxHealth);
        
        this.player4HP = this.game.add.text(this.infoXHP, this.infoY4,"HP", this.style);
        this.player4HP.fixedToCamera = true;           
        
        this.teamStats.push(this.player4HP);
        
        this.player4CurrentEN = this.game.add.text(this.infoX4, this.infoY4, playerStats[3].currentEN, this.style);
        this.player4CurrentEN.setTextBounds(0, 0, 50, 100);        
        this.player4CurrentEN.fixedToCamera = true;           
        
        this.teamStats.push(this.player4CurrentEN);
        
        this.player4MaxEN = this.game.add.text(this.infoX5, this.infoY4, "/" + playerStats[3].maxEN, this.style2);      
        this.player4MaxEN.fixedToCamera = true;
        
        this.teamStats.push(this.player4MaxEN);
        
        this.player4EN = this.game.add.text(this.infoX6, this.infoY4, "EN", this.style);
        this.player4EN.fixedToCamera = true;    
        
        this.teamStats.push(this.player4EN);        
    }
    
    displayPlayerStats(){
        this.resetStats();
    }
    
    clearEverything(){
        for(var i=0; i < this.displayArr.length; i++){
            this.displayArr[i].destroy();
        }
        for(var i=0; i < this.teamStats.length; i++){
            this.teamStats[i].destroy();
        }        
        this.displayArr = [];
        this.teamStats = [];
        this.ENStats = [];        
        this.testing = false;
        this.setup = false;
        this.activeCharVar = 0;
        this.eraseCursor();       
        battling = false;
        disableControls = false;        
    }  
    
    eraseCursor(){
        this.battleCursor.destroy();
        this.cursorProc = false;
    }
    
    createControls() {
        
        if (this.tildeBut.isDown){
            if(!this.tildeIsDown){
                this.tildeIsDown = true;
                disableControls = true;
                if(!this.testing){
                    this.game.camera.fade(0x000000, 1000);
                    this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.fadeComplete, this);
                }
                else if(this.testing){
                    disableControls = true;
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
                    if(this.waiting){
                        
                        this.noDeath();
                    }
                    else{
                        this.mainMenuControls();
                    }
                }
            }
            if(this.enterBut.isUp){
                if(this.enterIsDown){
                    this.enterIsDown = false;
                }
            }
            if (this.backBut.isDown && !this.waiting){
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
            
            if (this.cursors.up.isDown && !this.waiting){
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
            if (this.cursors.down.isDown && !this.waiting){
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
            if (this.cursors.left.isDown && !this.waiting){
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
            if (this.cursors.right.isDown && !this.waiting){
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
    
    fadeComplete(){
        battling = true;
        this.testing = true;
        console.log("battling is: " + battling);
        this.game.camera.resetFX();
        disableControls = false;
        this.setupBattle();
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
                    this.noRun();
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

    noDeath(){
        if(!this.waiting){
            this.waiting = true;
            this.noDeathBox = this.game.add.image(this.game.width/3, this.game.height/3, "singleBox", this.style);
            this.noDeathBox.height = 100;        
            this.noDeathBox.width = 300;
            this.noDeathBox.fixedToCamera = true;
            this.noDeathMessage = this.game.add.text(0, 50, "Heroes Never Die", this.style3);
            this.noDeathMessage.setTextBounds(this.game.width/3, this.game.height/3, this.noDeathBox.width, this.noDeathBox.height);
            this.noDeathMessage.fixedToCamera = true;
            this.resetStats();
        }
        
        else{
            this.waiting = false;
            this.noDeathBox.destroy();
            this.noDeathMessage.destroy();
            this.resetStats();
        }
    }
    
    noRun(){
        if(!this.waiting){
            this.waiting = true;
            this.noDeathBox = this.game.add.image(this.game.width/8, this.game.height/3, "singleBox", this.style);
            this.noDeathBox.height = 100;        
            this.noDeathBox.width = 600;
            this.noDeathBox.fixedToCamera = true;
            this.noDeathMessage = this.game.add.text(0, 50, "Even Heroes Can't Run From Life", this.style3);
            this.noDeathMessage.setTextBounds(this.game.width/8, this.game.height/3, this.noDeathBox.width, this.noDeathBox.height);
            this.noDeathMessage.fixedToCamera = true;
            this.resetStats();
        }
        
        else{
            this.waiting = false;
            this.noDeathBox.destroy();
            this.noDeathMessage.destroy();
            this.resetStats();
        }        
    }
    
    fight(){
        if(this.attackMenu && !this.skillAttack){
        switch(this.activeCharVar){
            case 0:
            case 1:
            case 2:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;
                disableControls = true;
                this.eraseCursor();              
                this.attackFunctions();
                break;    
            case 3:
                console.log("you hit the enemy");
                this.attackMenu = false;
                this.mainMenu = true;                
                disableControls = true;
                this.eraseCursor();
                this.attackFunctions();
                console.log("disableControls");
                break;
            }
        }
        if(this.skillAttack){
            console.log("Skill Attack");
            this.attackMenu = false;
            this.mainMenu = true; 
            this.eraseCursor();
            disableControls = true;
            switch(this.activeCharVar){
                case 0:
                    this.game.camera.flash(playerStats[0].skillColor, 500);
                    playerStats[0].currentEN = playerStats[0].currentEN - 1;
                    this.resetStats();
                    break;
                case 1:
                    this.game.camera.flash(playerStats[1].skillColor, 500);
                    playerStats[1].currentEN = playerStats[1].currentEN - 1;
                    this.resetStats();
                    break;
                case 2:
                    this.game.camera.flash(playerStats[2].skillColor, 500);
                    playerStats[2].currentEN = playerStats[2].currentEN - 1;
                    this.resetStats();
                    break;
                case 3:
                    this.game.camera.flash(playerStats[3].skillColor, 500);
                    playerStats[3].currentEN = playerStats[3].currentEN - 1;
                    this.resetStats();
                    break;
                }
            this.attackFunctions();
            this.skillAttack = false;
                                     
        }
    }
    
    
    healthCheck(num){
        
        this.evasion = this.game.rnd.integerInRange(1, playerStats[this.activeCharVar].evasion);
        this.attackRoll = this.game.rnd.integerInRange(1, 100);
        if(this.evasion > this.attackRoll){
            console.log("miss");
            this.damageAmount = 0;
        }
        else{
            this.damageAmount = enemyStats[bossNum].attack;
            if(playerStats[num].currentHP < 0){
                playerStats[num].currentHP = 0;
            }
        }
        console.log(playerStats[num].currentHP);
        this.noDeath();
//        }
//        else{
//            this.damageAmount = enemyStats[bossNum].attack;
//            console.log("???");
//        }
    }
    
    displayDamage(number){
        if(!this.enemyTurn){
            if(this.skillAttack){
                this.damageAmount = (playerStats[this.activeCharVar].attack * playerStats[this.activeCharVar].weaponMult);
            }
            else{
                this.damageAmount = playerStats[this.activeCharVar].attack;
            }
        }
        else{
            switch(this.activeCharVar){
                case 0:
                    this.healthCheck(0);
                    console.log(this.damageAmount);
                    break;
                case 1:
                    this.healthCheck(1);
                    console.log(this.damageAmount);
                    break;
                case 2:
                    this.healthCheck(2);
                    console.log(this.damageAmount);
                    break;
                case 3:
                    this.healthCheck(3);
                    console.log(this.damageAmount);
                    break;                                     
            }
            this.enemyTurn = false;            
        }
        if(number == 0 && playerStats[0].currentHP > 0 && enemyStats[bossNum].currentHP > 0){
            console.log("the damage amount is: " + this.damageAmount);
            if(this.damageAmount == 0){
                this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[0], "Miss", this.style);
            }
            else{
                this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[0], this.damageAmount, this.style);
            }
            this.takeDamage.alpha = 1;
            this.takeDamage.fixedToCamera = true;
            this.game.add.tween(this.takeDamage).to( { alpha: 0 }, Phaser.Timer.SECOND * this.attackDelay, "Linear", true);
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyDamageText, this);
            playerStats[0].currentHP -= this.damageAmount;
            this.healthCheck(0);
        }
        if(number == 1 && playerStats[1].currentHP > 0 && enemyStats[bossNum].currentHP > 0){         
            console.log("the damage amount is: " + this.damageAmount);
            if(this.damageAmount == 0){
                this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[1], "Miss", this.style);
            }
            else{            
            this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[1], this.damageAmount, this.style);
            }
            this.takeDamage.alpha = 1;        
            this.takeDamage.fixedToCamera = true;
            this.game.add.tween(this.takeDamage).to( { alpha: 0 }, Phaser.Timer.SECOND * this.attackDelay, "Linear", true);
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyDamageText, this);
            playerStats[1].currentHP -= this.damageAmount;
            this.healthCheck(1);
        }
        if(number == 2 && playerStats[2].currentHP > 0 && enemyStats[bossNum].currentHP > 0){         
            console.log("the damage amount is: " + this.damageAmount);
                        if(this.damageAmount == 0){
                this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[2], "Miss", this.style);
            }
            else{
            this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[2], this.damageAmount, this.style);
            }
            this.takeDamage.alpha = 1;
            this.takeDamage.fixedToCamera = true;
            this.game.add.tween(this.takeDamage).to( { alpha: 0 }, Phaser.Timer.SECOND * this.attackDelay, "Linear", true);
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyDamageText, this);
            playerStats[2].currentHP -= this.damageAmount;
            this.healthCheck(2);

        }
        if(number == 3 && playerStats[3].currentHP > 0 && enemyStats[bossNum].currentHP > 0){
            console.log("the damage amount is: " + this.damageAmount);
            if(this.damageAmount == 0){
                this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[0], "Miss", this.style);
            }
            else{            
            this.takeDamage = this.game.add.text(Object.values(this.characterPos)[5] + 200, Object.values(this.characterPos)[3], this.damageAmount, this.style);
            }
            this.takeDamage.alpha = 1;
            this.takeDamage.fixedToCamera = true;
            this.game.add.tween(this.takeDamage).to( { alpha: 0 }, Phaser.Timer.SECOND * this.attackDelay, "Linear", true);
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyDamageText, this);
            playerStats[3].currentHP -= this.damageAmount;
            this.healthCheck(3);
            
        }
        if(number == 4){
            console.log("the damage amount is: " + this.damageAmount);
            this.takeDamage = this.game.add.text(this.enemyX + 200, this.enemyY, this.damageAmount, this.style);
            this.takeDamage.alpha = 1;
            this.takeDamage.fixedToCamera = true;
            this.game.add.tween(this.takeDamage).to( { alpha: 0 }, Phaser.Timer.SECOND * this.attackDelay, "Linear", true);
            
            console.log(" took " + this.damageAmount + " damage");
            enemyStats[bossNum].currentHP -= playerStats[this.activeCharVar].attack;
            console.log("Enemy health: " + enemyStats[bossNum].currentHP);
            if(enemyStats[bossNum].currentHP > 0){
                this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.destroyDamageText, this);
            }
            else{
                console.log("you beat the boss");
                this.game.time.events.remove(Phaser.Timer.SECOND * this.attackDelay, this.destroyDamageText, this);
                this.endEvent();
                
            }
        }
        if(playerStats[0].currentHP <= 0 && playerStats[1].currentHP <= 0 && playerStats[2].currentHP <= 0 && playerStats[3].currentHP <= 0){
            alert("everyone died");
        }
    }
    
    endEvent(){
        this.game.add.tween(this.enemy).to( { alpha: 0 }, Phaser.Timer.SECOND * this.attackDelay, "Linear", true);
        this.game.time.events.add(Phaser.Timer.SECOND * this.closWindowDelay, this.closeBattle, this);
    }
    
    closeBattle(){
        bossNum++;
        this.testing = false;
        battling = false;
        this.game.time.events.add(Phaser.Timer.SECOND * this.closWindowDelay, ()=>{
            this.game.camera.fade(0x000000, 1000);
            this.game.time.events.add(Phaser.Timer.SECOND * this.closWindowDelay, ()=>{
                this.clearEverything();                
                this.game.camera.resetFX();
                enemyStats[bossNum].currentHP = enemyStats[bossNum].currentHP;
            }, this);
            
        }, this);
    }
    
    destroyDamageText(){
        this.takeDamage.destroy();
    }
    
    walkForward(){
        for (var i = 0; i < this.charArr.length; i++){
            if (this.charArr[i] == this.charArr[this.activeCharVar]){
                if(playerStats[this.activeCharVar].currentHP <= 0){
                    console.log(playerStats[i].currentHP = 1);
                    this.noDeath();
                    this.resetStats();
                    this.charArr[this.activeCharVar].animations.play("left");
//                    this.charArr[this.activeCharVar].frame = 0;
//                    this.activeCharVar++;  
                }
                else{
                    this.charArr[this.activeCharVar].animations.play("left");
                }
            }
        }
    }
    
    walkBackward(){
        for (var i = 0; i < this.charArr.length; i++){
            if (this.charArr[i] == this.charArr[this.activeCharVar]){
                this.charArr[this.activeCharVar].animations.play("right");
            }
        }
    }   
    
    attackReset(){
        if(enemyStats[bossNum].currentHP > 0){
            for (var i = 0; i < this.charArr.length; i++){
                if (this.charArr[i] == this.charArr[this.activeCharVar]){
                    this.charArr[this.activeCharVar].animations.play("right");
                }
            }
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay/2, this.nextPlayerCursor, this);
        }
        else{
            this.walkBackward();
            this.cursorPosMain = 0;
        }
    }
    
    attackFunctions(){
        this.tempAttack = bossNum;
        for (var i = 0; i < this.charArr.length; i++){
            if (this.charArr[i] == this.charArr[this.activeCharVar]){
                this.charArr[this.activeCharVar].animations.play("attack");
                this.displayDamage(this.game.rnd.integerInRange(4, 4));
            }
        }
        this.makeWeapons();
        this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, this.stopPunching, this);
    }
    
    stopPunching(){
        this.charArr[this.activeCharVar].animations.stop();
        this.charArr[this.activeCharVar].frame = 6;        
        if(this.activeCharVar >= 3){
            this.walkBackward();
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, ()=>{
                this.enemyTurn = true;
                this.enemyAttack();
            }, this);
        }
        else{
            this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay*1.5, ()=>{
                disableControls = false;
            }, this);
            this.attackReset();
        }
        
    }
    
    
    nextPlayerCursor(){
        if(battling){
            this.activeCharVar++;           
            console.log("looking for next player: " + this.activeCharVar)
        }
        this.cursorPosMain = 0;
        this.walkForward();
        this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay/2, ()=>{
            this.makeCursors();
        }, this);   
    }
    
    enemyAttack(){
        this.tempAttack = this.game.rnd.integerInRange(0, 3);
        console.log("the enemy is targeting player: " + this.tempAttack);        
        if (this.enemyTurn){
            console.log("enemy attacking");
            this.displayDamage(this.tempAttack);
            this.game.time.events.add(Phaser.Timer.SECOND * this.enemyDelay, this.enemyAttackFinish, this);
        }
    }
    
    enemyAttackFinish(){       
        this.cursorPosMain = 0;
        this.activeCharVar = 0;
        this.walkForward();
        this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, ()=>{disableControls = false;}, this);
        this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay/2, ()=>{
            this.eraseCursor();          
        }, this);
        this.game.time.events.add(Phaser.Timer.SECOND * this.attackDelay, ()=>{
            this.makeCursors();
        }, this);

    }
    
    testingFuncConsole(){
        console.log("we did it ayyy lmao");
    }
    
}