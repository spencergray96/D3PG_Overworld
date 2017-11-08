disableControls = false;

var isPaused = false;
var whichMenu = "main";
var cursorPosMain = 0;
var downKeyIsPushed = false;
var upKeyIsPushed = false;
var enterKeyIsPushed = false;
var backKeyIsPushed = false;

var itemScreenOn = false;

var itemsArr = [];
var visibleItems = [];
var cursorPosItems = 0;
var selectableItems = [];
var selectedItem;
var selectingCharacter = false;
var cursorPosSelectingChars = 0;

var hpArray = [];
var enArray = [];
var howManyItemsToDisplay = 7;

var movingItemsArr = 0;
var uphandExists = false;
var downhandExists = false;

class pauseMenu extends abstractObject {

    constructor() {
        super();
        
    }

    createThis(game) {
        super.createThis(game);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.backKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        console.log(this.spaceKey);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        
        if(this.spaceKey.isDown && this.backKey.isUp && !isPaused){
            this.createPauseMenu();
        } else if(this.spaceKey.isUp && this.backKey.isDown && isPaused){
            this.destroyPauseMenu();
        }
        this.createControls();
    }

    createPauseMenu(){
        this.style = { font: "8pt Arial", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 200 };
        
        console.log(isPaused);
        
        isPaused = true;
        
    //Pause Menu    
        this.pauseMenu = this.game.add.image(0, 0, 'textBox');
        this.pauseMenu.fixedToCamera = true;
        this.pauseMenu.width = this.game.width;
        this.pauseMenu.height = this.game.height;
        
    //Characters    
        //Spencer
        this.spencerCH = this.game.add.image(10, 10, 'spencerCH');
        this.spencerCH.smoothed = false;
        
        this.spencerCH.fixedToCamera = true;
        this.spencerCH.width = 35;
        this.spencerCH.height = 35;
        
        //text
        this.spencerName = this.game.add.text(50, 10, "Spencer", this.style);
        this.spencerName.fixedToCamera = true;
        this.spencerHP = this.game.add.text(50, 20, "HP: " + (playerStats[0].currentHP + " / " + playerStats[0].maxHP), this.style);
        hpArray.push(this.spencerHP);
        this.spencerHP.fixedToCamera = true;
        this.spencerEN = this.game.add.text(50, 30, "Energy: " + (playerStats[0].currentEN + " / " + playerStats[0].maxEN), this.style);
        enArray.push(this.spencerEN);
        this.spencerEN.fixedToCamera = true;
        
        
        //Dov
        this.dovCH = this.game.add.image(10, 55, 'dovCH');
        this.dovCH.smoothed = false;
        
        this.dovCH.fixedToCamera = true;
        this.dovCH.width = 27;
        this.dovCH.height = 35;
        
        //text
        this.dovName = this.game.add.text(50, 55, "Dov", this.style);
        this.dovName.fixedToCamera = true;
        this.dovHP = this.game.add.text(50, 65, "HP: " + (playerStats[1].currentHP + " / " + playerStats[1].maxHP), this.style);
        hpArray.push(this.dovHP);
        this.dovHP.fixedToCamera = true;
        this.dovEN = this.game.add.text(50, 75, "Energy: " + (playerStats[1].currentEN + " / " + playerStats[1].maxEN), this.style);
        enArray.push(this.dovEN);
        this.dovEN.fixedToCamera = true;
        
        
        //James
        this.jamesCH = this.game.add.image(10, 100, 'jamesCH');
        this.jamesCH.smoothed = false;
        
        this.jamesCH.fixedToCamera = true;
        this.jamesCH.width = 35;
        this.jamesCH.height = 35;
        
        //text
        this.jamesName = this.game.add.text(50, 100, "James", this.style);
        this.jamesName.fixedToCamera = true;
        this.jamesHP = this.game.add.text(50, 110, "HP: " + (playerStats[2].currentHP + " / " + playerStats[2].maxHP), this.style);
        hpArray.push(this.jamesHP);
        this.jamesHP.fixedToCamera = true;
        this.jamesEN = this.game.add.text(50, 120, "Energy: " + (playerStats[2].currentEN + " / " + playerStats[2].maxEN), this.style);
        enArray.push(this.jamesEN);
        this.jamesEN.fixedToCamera = true;
        
        //Raymond
        this.raymondCH = this.game.add.image(10, 145, 'raymondCH');
        this.raymondCH.smoothed = false;
        
        this.raymondCH.fixedToCamera = true;
        this.raymondCH.width = 35;
        this.raymondCH.height = 35;
        
        //text
        this.raymondName = this.game.add.text(50, 145, "Raymond", this.style);
        this.raymondName.fixedToCamera = true;
        this.raymondHP = this.game.add.text(50, 155, "HP: " + (playerStats[3].currentHP + " / " + playerStats[3].maxHP), this.style);
        hpArray.push(this.raymondHP);
        this.raymondHP.fixedToCamera = true;
        this.raymondEN = this.game.add.text(50, 165, "Energy: " + (playerStats[3].currentEN + " / " + playerStats[3].maxEN), this.style);
        enArray.push(this.raymondEN);
        this.raymondEN.fixedToCamera = true;
        
    //Menu Navigation
        this.navItems = this.game.add.text(this.game.width - 50, 10, "Items", this.style);
        this.navItems.fixedToCamera = true;
        this.navAbilities = this.game.add.text(this.game.width - 50, 30, "Abilities", this.style);
        this.navAbilities.fixedToCamera = true;
        this.navStatus = this.game.add.text(this.game.width - 50, 50, "Status", this.style);
        this.navStatus.fixedToCamera = true;
        this.navReorder = this.game.add.text(this.game.width - 50, 70, "Reorder", this.style);
        this.navReorder.fixedToCamera = true;
        this.navSave = this.game.add.text(this.game.width - 50, 90, "Save", this.style);
        this.navSave.fixedToCamera = true;
        
        this.hand = this.game.add.image(this.game.width - 70, 15, "hand");
        this.hand.smoothed = false;
        this.hand.width = 15;
        this.hand.height = 7;
        this.hand.fixedToCamera = true;
        
    }
    
    destroyPauseMenu(parm){
        if(!backKeyIsPushed){
            console.log(isPaused);
            if(!disableControls && isPaused && !itemScreenOn){
                isPaused = false;

                this.pauseMenu.destroy();

                this.spencerCH.destroy();
                this.spencerName.destroy();
                this.spencerHP.destroy();
                this.spencerEN.destroy();

                this.dovCH.destroy();
                this.dovName.destroy();
                this.dovHP.destroy();
                this.dovEN.destroy();

                this.jamesCH.destroy();
                this.jamesName.destroy();
                this.jamesHP.destroy();
                this.jamesEN.destroy();

                this.raymondCH.destroy();
                this.raymondName.destroy();
                this.raymondHP.destroy();
                this.raymondEN.destroy();

                this.navItems.destroy();
                this.navAbilities.destroy();
                this.navStatus.destroy();
                this.navReorder.destroy();
                this.navSave.destroy();

                this.hand.destroy();
                
                cursorPosMain = 0;
            } else if(!disableControls && itemScreenOn && !selectingCharacter){
                
                if(uphandExists){
                    this.uphand.destroy();
                    uphandExists = false;
                }
                if(downhandExists){
                    this.downhand.destroy();
                    downhandExists = false;
                }
                
                backKeyIsPushed = true;
                itemScreenOn = false;
                this.itemsScreen.destroy();
                this.itemsTitle.destroy();
                this.itemDescription.destroy();
                this.itemsHand.destroy();
                
                for(var i = 0; i < visibleItems.length; i++){
                    visibleItems[i].destroy();
                }
                visibleItems = [];
                selectableItems = [];
                itemsArr = [];
                
                this.hand.destroy();
                this.hand = this.game.add.image(this.game.width - 70, 15, "hand");
                this.hand.smoothed = false;
                this.hand.width = 15;
                this.hand.height = 7;
                this.hand.fixedToCamera = true;
                
            } else if(!disableControls && itemScreenOn && selectingCharacter || parm == "goBackToItems"){
                backKeyIsPushed = true;
                selectingCharacter = false;
                this.selectingCharHand.destroy();
                selectableItems = [];
                itemsArr = [];
                this.itemsMenu();
            }
        }
    }
    
    createControls(){
        if(this.enterKey.isDown){
            this.enterPress();
        }
        
        if(this.cursors.up.isDown){
            if(isPaused){
                this.moveCursor("goingup");
            }
        } else if(this.cursors.down.isDown){
            if(isPaused){
                this.moveCursor("goingdown");
            }
        }
        
        if(this.cursors.up.isUp){
            if(isPaused){
                upKeyIsPushed = false;
            }
        }
        if(this.cursors.down.isUp){
            if(isPaused){
                downKeyIsPushed = false;
            }
        }
        if(this.enterKey.isUp){
            if(isPaused){
                enterKeyIsPushed = false;
            }
        }
        if(this.backKey.isUp){
            backKeyIsPushed = false;
        }
    }
    
    moveCursor(parm){
        
    //on the main menu    
        if(!disableControls && parm == "goingup" && !upKeyIsPushed && !itemScreenOn){
            upKeyIsPushed = true;
            switch(cursorPosMain){
                case 0:
                    console.log("at the top of the menu");
                    break;
                case 1:
                    cursorPosMain = 0;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 15, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosMain = 1;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 35, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosMain = 2;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 55, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 4:
                    cursorPosMain = 3;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 75, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                
            }
        }
        if(!disableControls && parm == "goingdown" && !downKeyIsPushed && !itemScreenOn){
            downKeyIsPushed = true;
            switch(cursorPosMain){
                case 0:
                    cursorPosMain = 1;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 35, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 1:
                    cursorPosMain = 2;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 55, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosMain = 3;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 75, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosMain = 4;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - 70, 95, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = 15;
                    this.hand.height = 7;
                    this.hand.fixedToCamera = true;
                    break;
                case 4:
                    console.log("at the bottom of the menu");
                    break;
            }
        }
    //on the items menu    
        if(!disableControls && parm == "goingup" && !upKeyIsPushed && itemScreenOn && !selectingCharacter && itemsArr.length != 0){
            upKeyIsPushed = true;
            switch(cursorPosItems){
                case 0:
                    if(itemsArr[0] === selectableItems[0]){
                    } else if(itemsArr[0] !== selectableItems[0]){
                        if(selectableItems.length > itemsArr.length){
                            movingItemsArr--;
                            this.reOrderItemDisplay("goingup");
                        }
                    }
                    break;
                case 1:
                    cursorPosItems = 0;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(5, 55, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = 15;
                    this.itemsHand.height = 7;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosItems = 1;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(5, 75, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = 15;
                    this.itemsHand.height = 7;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosItems = 2;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(5, 95, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = 15;
                    this.itemsHand.height = 7;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 4:
                    cursorPosItems = 3;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(5, 115, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = 15;
                    this.itemsHand.height = 7;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 5:
                    cursorPosItems = 4;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(5, 135, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = 15;
                    this.itemsHand.height = 7;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 6:
                    cursorPosItems = 5;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(5, 155, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = 15;
                    this.itemsHand.height = 7;
                    this.itemsHand.fixedToCamera = true;
                    break;
            }
            this.updateItemDesc();
        }
        
        if(!disableControls && parm == "goingdown" && !downKeyIsPushed && itemScreenOn && !selectingCharacter && itemsArr.length != 0){
            downKeyIsPushed = true;
            switch(cursorPosItems){
                case 0:
                    if(typeof itemsArr[1] !== 'undefined'){
                        cursorPosItems = 1;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(5, 75, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = 15;
                        this.itemsHand.height = 7;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 1:
                    if(typeof itemsArr[2] !== 'undefined'){
                        cursorPosItems = 2;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(5, 95, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = 15;
                        this.itemsHand.height = 7;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 2:
                    if(typeof itemsArr[3] !== 'undefined'){
                        cursorPosItems = 3;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(5, 115, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = 15;
                        this.itemsHand.height = 7;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 3:
                    if(typeof itemsArr[4] !== 'undefined'){
                        cursorPosItems = 4;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(5, 135, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = 15;
                        this.itemsHand.height = 7;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 4:
                    if(typeof itemsArr[5] !== 'undefined'){
                        cursorPosItems = 5;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(5, 155, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = 15;
                        this.itemsHand.height = 7;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 5:
                    if(typeof itemsArr[6] !== 'undefined'){
                        cursorPosItems = 6;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(5, 175, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = 15;
                        this.itemsHand.height = 7;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 6:
                    if(typeof selectableItems[howManyItemsToDisplay + movingItemsArr + 1] === 'undefined'){
                        this.downhand.destroy();
                    }
                    if(typeof selectableItems[howManyItemsToDisplay + movingItemsArr] === 'undefined') {
                        
                    } else if(typeof selectableItems[howManyItemsToDisplay + movingItemsArr] !== 'undefined'){
                        if(selectableItems.length > itemsArr.length){
                            movingItemsArr++;
                            this.reOrderItemDisplay("goingdown");
                        }
                    }
//                    console.log("get to here");
                    break;
            }
            this.updateItemDesc();
        }
    //selecting character after selecting item
        if(!disableControls && parm == "goingup" && !upKeyIsPushed && itemScreenOn && selectingCharacter){
            upKeyIsPushed = true;
            switch(cursorPosSelectingChars){
                case 0:
                    console.log("top of the character list");
                case 1:
                    cursorPosSelectingChars = 0;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(5, 30, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = 15;
                    this.selectingCharHand.height = 7;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingChars = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(5, 75, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = 15;
                    this.selectingCharHand.height = 7;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosSelectingChars = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(5, 110, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = 15;
                    this.selectingCharHand.height = 7;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
            }
        }
        
        if(!disableControls && parm == "goingdown" && !downKeyIsPushed && itemScreenOn && selectingCharacter){
            downKeyIsPushed = true;
            switch(cursorPosSelectingChars){
                case 0:
                    cursorPosSelectingChars = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(5, 75, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = 15;
                    this.selectingCharHand.height = 7;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 1:
                    cursorPosSelectingChars = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(5, 110, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = 15;
                    this.selectingCharHand.height = 7;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingChars = 3;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(5, 155, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = 15;
                    this.selectingCharHand.height = 7;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    console.log("bottom of the character list");
                    break;
            }
        }
    }
    
    enterPress(){
        if(!disableControls && isPaused && !enterKeyIsPushed && !itemScreenOn){
            enterKeyIsPushed = true;
            switch(cursorPosMain){
                case 0:
                    console.log("items");
                    this.itemsMenu();
                    break;
                case 1:
                    console.log("abilities");
                    break;
                case 2:
                    console.log("status");
                    break;
                case 3:
                    console.log("reorder");
                    break;
                case 4:
                    console.log("save");
                    break;
            }
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && itemScreenOn && selectingCharacter){
            enterKeyIsPushed = true;
            this.useItem(cursorPosSelectingChars);
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && itemScreenOn && !selectingCharacter && itemsArr.length != 0){
            if(uphandExists){
                this.uphand.destroy();
                uphandExists = false;
            }
            if(downhandExists){
                this.downhand.destroy();
                downhandExists = false;
            }
            
            enterKeyIsPushed = true;
            switch(cursorPosItems){
                case 0:
                    selectedItem = itemsArr[0];
                    console.log(selectedItem);
                    break;
                case 1:
                    selectedItem = itemsArr[1];
                    console.log(selectedItem);
                    break;
                case 2:
                    selectedItem = itemsArr[2];
                    console.log(selectedItem);
                    break;
                case 3:
                    selectedItem = itemsArr[3];
                    console.log(selectedItem);
                    break;
                case 4:
                    selectedItem = itemsArr[4];
                    console.log(selectedItem);
                    break;
                case 5:
                    selectedItem = itemsArr[5];
                    console.log(selectedItem);
                    break;
                case 6:
                    selectedItem = itemsArr[6];
                    console.log(selectedItem);
                    break;
            }
            selectingCharacter = true;
            this.hand.destroy();
            
            this.itemsScreen.destroy();
            this.itemsTitle.destroy();
            this.itemDescription.destroy();
            this.itemsHand.destroy();

            for(var i = 0; i < visibleItems.length; i++){
                visibleItems[i].destroy();
            }
            
            switch(cursorPosSelectingChars){
                case 0:
                     this.selectingCharHand = this.game.add.image(5, 30, "hand");
                    break;
                case 1:
                     this.selectingCharHand = this.game.add.image(5, 75, "hand");
                    break;
                case 2:
                     this.selectingCharHand = this.game.add.image(5, 110, "hand");
                    break;
                case 3:
                     this.selectingCharHand = this.game.add.image(5, 155, "hand");
                    break;
            }
            
            this.selectingCharHand.smoothed = false;
            this.selectingCharHand.width = 15;
            this.selectingCharHand.height = 7;
            this.selectingCharHand.fixedToCamera = true;
        }
        
    }
    
    itemsMenu(){
        itemScreenOn = true;
        this.itemsScreen = this.game.add.image(0, 0, 'textBox');
        this.itemsScreen.fixedToCamera = true;
        this.itemsScreen.width = this.game.width;
        this.itemsScreen.height = this.game.height;
        
        this.itemsTitle = this.game.add.text(10, 15, "ITEMS", this.style);
        this.itemsTitle.fixedToCamera = true;
        
        for(var i = 0; i < playerItems.length; i++){
            if(playerItems[i].quantity == 0){
//                console.log("nothing");
            } else if(playerItems[i].quantity != 0) {
                selectableItems.push(playerItems[i]);
            }
        }
        console.log(selectableItems);
            
        for(var i = 0; i < howManyItemsToDisplay; i++){
            if(typeof selectableItems[i + movingItemsArr] !== 'undefined'){
                itemsArr.push(selectableItems[i + movingItemsArr]);
               }
        }
        
        console.log(itemsArr);
        
        var yValue = 50;
        
        if(itemsArr.length != 0){
        
            for(var i = 0; i < itemsArr.length; i++){
                if(typeof selectableItems[i + movingItemsArr] !== 'undefined'){
                    this.itemName = this.game.add.text(30, yValue, itemsArr[i].name + " (" + itemsArr[i].quantity + ")", this.style);
                    this.itemName.fixedToCamera = true;

                    visibleItems.push(this.itemName);
                    console.log(visibleItems.length);
                    yValue += 20;

                }
            }
            
            if(typeof itemsArr[cursorPosItems] !== 'undefined'){
                this.itemDescription = this.game.add.text(10, 30, selectableItems[cursorPosItems].description, this.style);
                this.itemDescription.fixedToCamera = true;
            } else {
                cursorPosItems--;
                this.itemDescription = this.game.add.text(10, 30, selectableItems[cursorPosItems].description, this.style);
                this.itemDescription.fixedToCamera = true;
            }
        }
        
        
        if(itemsArr[howManyItemsToDisplay - 1] != selectableItems[selectableItems.length - 1]){
            if(itemsArr.length == howManyItemsToDisplay){
                if(!downhandExists){
                    this.downhand = this.game.add.image(this.game.width - 20, this.game.height - 30, "hand-down");
                    this.downhand.smoothed = false;
                    this.downhand.width = 7;
                    this.downhand.height = 15;
                    this.downhand.fixedToCamera = true;

                    downhandExists = true;
                }
            }
        }
        
        if(itemsArr[0] != selectableItems[0]){
            if(!uphandExists){
                this.uphand = this.game.add.image(this.game.width - 20, 50, "hand-up");
                this.uphand.smoothed = false;
                this.uphand.width = 7;
                this.uphand.height = 15;
                this.uphand.fixedToCamera = true;

                uphandExists = true;
            }
        }
                
//                
//                
//                itemsArr.push(playerItems[i]);
//                visibleItems.push(this.itemName);
//                
//                console.log(itemsArr);
//                
//            }
//            selectableItems.push(playerItems[i]);
//            console.log(selectableItems);
//            console.log(itemsArr);
//        }
        
        if(itemsArr.length != 0){
            switch(cursorPosItems){
                case 0:
                    this.itemsHand = this.game.add.image(5, 55, "hand");
                    break;
                case 1:
                    this.itemsHand = this.game.add.image(5, 75, "hand");
                    break;
                case 2:
                    this.itemsHand = this.game.add.image(5, 95, "hand");
                    break;
                case 3:
                    this.itemsHand = this.game.add.image(5, 115, "hand");
                    break;
                case 4:
                    this.itemsHand = this.game.add.image(5, 135, "hand");
                    break;
                case 5:
                    this.itemsHand = this.game.add.image(5, 155, "hand");
                    break;
                case 6:
                    this.itemsHand = this.game.add.image(5, 175, "hand");
                    break;
            }

            this.itemsHand.smoothed = false;
            this.itemsHand.width = 15;
            this.itemsHand.height = 7;
            this.itemsHand.fixedToCamera = true;
            
        }
    }
    
    updateItemDesc(){
        this.itemDescription.destroy();
        this.itemDescription = this.game.add.text(10, 30, itemsArr[cursorPosItems].description, this.style);
        this.itemDescription.fixedToCamera = true;
    }
    
    useItem(parm){
        console.log(parm);
        
        if(selectedItem.targets == 1 && selectedItem.quantity > 0){
            
            selectedItem.quantity -= 1;
            
            playerStats[parm].currentHP += selectedItem.healing;
            if(playerStats[parm].currentHP > playerStats[parm].maxHP){
                playerStats[parm].currentHP = playerStats[parm].maxHP;
            }
            
            playerStats[parm].currentEN += selectedItem.energy;
            if(playerStats[parm].currentEN > playerStats[parm].maxEN){
                playerStats[parm].currentEN = playerStats[parm].maxEN;
            }
            
            for(var i = 0; i < hpArray.length; i++){
                hpArray[i].destroy();
                enArray[i].destroy();
            }
        }
            
        //hp
            this.spencerHP = this.game.add.text(50, 20, "HP: " + (playerStats[0].currentHP + " / " + playerStats[0].maxHP), this.style);
            this.spencerHP.fixedToCamera = true;
            hpArray.push(this.spencerHP);
            
            this.dovHP = this.game.add.text(50, 65, "HP: " + (playerStats[1].currentHP + " / " + playerStats[1].maxHP), this.style);
            this.dovHP.fixedToCamera = true;
            hpArray.push(this.dovHP);
            
            this.jamesHP = this.game.add.text(50, 110, "HP: " + (playerStats[2].currentHP + " / " + playerStats[2].maxHP), this.style);
            this.jamesHP.fixedToCamera = true;
            hpArray.push(this.jamesHP);
            
            this.raymondHP = this.game.add.text(50, 155, "HP: " + (playerStats[3].currentHP + " / " + playerStats[3].maxHP), this.style);
            this.raymondHP.fixedToCamera = true;
            hpArray.push(this.raymondHP);
            
        //energy
            this.spencerEN = this.game.add.text(50, 30, "Energy: " + (playerStats[0].currentEN + " / " + playerStats[0].maxEN), this.style);
            this.spencerEN.fixedToCamera = true;
            enArray.push(this.spencerEN);
            
            this.dovEN = this.game.add.text(50, 75, "Energy: " + (playerStats[1].currentEN + " / " + playerStats[1].maxEN), this.style);
            this.dovEN.fixedToCamera = true;
            enArray.push(this.dovEN);
            
            this.jamesEN = this.game.add.text(50, 120, "Energy: " + (playerStats[2].currentEN + " / " + playerStats[2].maxEN), this.style);
            this.jamesEN.fixedToCamera = true;
            enArray.push(this.jamesEN);
            
            this.raymondEN = this.game.add.text(50, 165, "Energy: " + (playerStats[3].currentEN + " / " + playerStats[3].maxEN), this.style);
            this.raymondEN.fixedToCamera = true;
            enArray.push(this.raymondEN);
            
            console.log(playerStats[parm]);
            
            if(selectedItem.quantity == 0){
                for(var i = 0; i < itemsArr.length; i++){
                    if(itemsArr[i].quantity == 0){
                        playerItems[i].quantity == 0;
                        itemsArr.splice(i, 1);
                    }
                }
                
                disableControls = true;
                var that = this;
                setTimeout(function(){
                    disableControls = false;
                    that.destroyPauseMenu();
                }, 777);
            }
//        }
    }
    
    reOrderItemDisplay(parm){
//        console.log(selectableItems);
        for(var i = 0; i < visibleItems.length; i++){
            visibleItems[i].destroy();
//            console.log("part 1");
        }
        
        if(parm == "goingdown"){
            itemsArr.splice(0, 1);
//            console.log(itemsArr);
            
            if(itemsArr.length < howManyItemsToDisplay){
                itemsArr.push(selectableItems[6 + movingItemsArr]);
//                console.log("part 2");
            }
            
            if(itemsArr[howManyItemsToDisplay - 1] == selectableItems[selectableItems.length - 1]){
                this.downhand.destroy();
                downhandExists = false;
                console.log("the down hand should have been destroyed");
            }
            
            if(itemsArr[0] != selectableItems[0]){
                if(!uphandExists){
                    this.uphand = this.game.add.image(this.game.width - 20, 50, "hand-up");
                    this.uphand.smoothed = false;
                    this.uphand.width = 7;
                    this.uphand.height = 15;
                    this.uphand.fixedToCamera = true;
                    
                    uphandExists = true;
                }
            }
            
        }
        
        if(parm == "goingup"){
            itemsArr.splice(6, 1);
//            console.log(itemsArr);
            
            if(itemsArr.length < howManyItemsToDisplay){
                itemsArr.splice(0, 0, selectableItems[0 + movingItemsArr]);
//                console.log("part 3");
            }
            
            if(itemsArr[0] == selectableItems[0]){
                this.uphand.destroy();
                uphandExists = false;
            }
            
            if(itemsArr[howManyItemsToDisplay - 1] != selectableItems[howManyItemsToDisplay - 1] || itemsArr[0] == selectableItems[0]){
                console.log(" 904");
                console.log(downhandExists);
                if(!downhandExists){
                    this.downhand = this.game.add.image(this.game.width - 20, this.game.height - 30, "hand-down");
                    this.downhand.smoothed = false;
                    this.downhand.width = 7;
                    this.downhand.height = 15;
                    this.downhand.fixedToCamera = true;
                    
                    downhandExists = true;
                }
            }
        }
        
        var yValue = 50;
        
        for(var i = 0; i < itemsArr.length; i++){
            if(selectableItems[i + movingItemsArr].quantity == 0){
                console.log("nothing");
            } else if(selectableItems[i + movingItemsArr].quantity != 0 && i < 7) {
                this.itemName = this.game.add.text(30, yValue, selectableItems[i + movingItemsArr].name + " (" + selectableItems[i + movingItemsArr].quantity + ")", this.style);
                this.itemName.fixedToCamera = true;
//                console.log("plase proc");
                
                yValue += 20;
                
                visibleItems.push(this.itemName);
                
//                console.log(itemsArr);
                
            }
        }
        
            
    }
    
}