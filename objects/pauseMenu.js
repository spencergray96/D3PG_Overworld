disableControls = false;

var isPaused = false;
var whichMenu = "main";
var cursorPosMain = 0;
var downKeyIsPushed = false;
var upKeyIsPushed = false;
var enterKeyIsPushed = false;
var backKeyIsPushed = false;


//items display and usage
var itemScreenOn = false;

var itemsArr = [];
var visibleItems = [];
var cursorPosItems = 0;
var selectableItems = [];
var selectedItem;
var selectingCharacter = false;
var cursorPosSelectingChars = 0;

var howManyItemsToDisplay = 7;

var movingItemsArr = 0;
var uphandExists = false;
var downhandExists = false;

var justUsedItem = false;
var itemDispayOffset = 0;


//re-ordering
var selectingCharToReOrder = false;
var cursorPosSelectingCharsToReOrder = 0;
var reOrderPhase = 0;
var firstChosenNPC;
var secondChosenNPC;

//status
var selectingCharToViewStatus = false;
var cursorPosSelectingCharsToViewStatus = 0;
var selectedCharToViewStatus;
var viewingStatus = false;
var tempDisplayArray = [];

//x and y variables for placing things

//Main Menu items and main cursor
var mainMenuRightIndent = 200;
var mainMenuHeightItem1 = 100,
    mainMenuHeightItem2 = 150,
    mainMenuHeightItem3 = 200,
    mainMenuHeightItem4 = 250;
var mainMenuHandRightIndent = 260;

var mainMenuHandHeightItem1 = 100,
    mainMenuHandHeightItem2 = 150,
    mainMenuHandHeightItem3 = 200,
    mainMenuHandHeightItem4 = 250;

var mainMenuHandWidth = 50,
    mainMenuHandHeight = 30;
var headerY = 35;

//character info (main display)
var characterHeadx = 50,
    characterHeady = 100,
    characterHeadyOriginal = characterHeady;
var normalCharWidth = 150,
    dovCharWidth = 130;
var charInfoX = 230,
    charInfoY2 = 150,
    charInfoY3 = 190,
    charInfoY2Original = charInfoY2,
    charInfoY3Original = charInfoY3;
var charInfoIncrement = 170;
var objectiveXindent = 45;

//selecting characters
var selectingHandLeftIndent = 25,
    selectingHandy0 = 160,
    selectingHandy1 = 330,
    selectingHandy2 = 500,
    selectingHandy3 = 670;
var selectedCharHandx = 155;

//status screen
var descY = characterHeady + 40;

//items
var arrowHandWidth = mainMenuHandWidth - 15;
var arrowHandxIndent = 80;
var arrowHandyIndent = 120;
var arrowHandyIndentTOP = 200;

var itemYseperation = 80;

var item1y = 185;
var item2y = 265;
var item3y = 345;
var item4y = 425;
var item5y = 505;
var item6y = 585;
var item7y = 665;
var itemYoffset = 20;

var itemListXindent = 80;
var itemDescYindent = 50;

var itemTitleBoxX = 20;
var itemTitleBoxY = 15;
var itemTitleBoxHeight = 60;
var itemDescBoxY = 70;

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
        
        this.characterFacesArr = [];
        this.characterNamesArr = [];
        this.hpArray = [];
        this.enArray = [];
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        
        if(this.spaceKey.isDown && this.backKey.isUp && !isPaused && this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && !battling){
            this.createPauseMenu();
        } else if(this.spaceKey.isUp && this.backKey.isDown && isPaused){
            this.destroyPauseMenu();
        }
        this.createControls();
    }

    createPauseMenu(){
        this.style = {
            font: "18pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 600
        };
        
        this.styleLONG = {
            font: "16pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 800
        };
        
        this.styleLONG2 = {
            font: "18pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 800
        };
        
        this.styleHeader = {
            font: "22pt Final-Fantasy-36-Font",
            fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top", 
            wordWrap: true, wordWrapWidth: 2000
        };
        
        isPaused = true;
        
    //Pause Menu    
        this.pauseMenu = this.game.add.image(0, 0, 'mainBox');
        this.pauseMenu.fixedToCamera = true;
        this.pauseMenu.width = this.game.width;
        this.pauseMenu.height = this.game.height;
        
    //Characters
        this.characterFacesArr = [];
        this.characterNamesArr = [];
        this.hpArray = [];
        this.enArray = [];
        
        this.printCharacterInfo();
        
    //Menu Navigation
        this.navItems = this.game.add.text(this.game.width - mainMenuRightIndent, mainMenuHeightItem1, "Items", this.style);
        this.navItems.fixedToCamera = true;
        this.navStatus = this.game.add.text(this.game.width - mainMenuRightIndent, mainMenuHeightItem2, "Status", this.style);
        this.navStatus.fixedToCamera = true;
        this.navReorder = this.game.add.text(this.game.width - mainMenuRightIndent, mainMenuHeightItem3, "Reorder", this.style);
        this.navReorder.fixedToCamera = true;
        this.navSave = this.game.add.text(this.game.width - mainMenuRightIndent, mainMenuHeightItem4, "Save", this.style);
        this.navSave.fixedToCamera = true;
        
        this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem1, "hand");
        this.hand.smoothed = false;
        this.hand.width = mainMenuHandWidth;
        this.hand.height = mainMenuHandHeight;
        this.hand.fixedToCamera = true;
        
    //objective
        this.printObjective();
        
    }
    
    printCharacterInfo(){
        
        for(var i = 0; i < playerStats.length; i++){
            
            if(this.characterFacesArr.length < 4){
                this.newChar = this.game.add.image(characterHeadx, characterHeady, playerStats[i].ch);
                this.newChar.smoothed = false;
                this.newChar.fixedToCamera = true;
                if(playerStats[i].name == "Dov"){
                    this.newChar.width = dovCharWidth;
                } else {
                    this.newChar.width = normalCharWidth;
                }
                this.newChar.height = normalCharWidth;
                this.characterFacesArr.push(this.newChar);
            }
            
            if(this.characterNamesArr.length < 4){
                this.newName = this.game.add.text(charInfoX, characterHeady, playerStats[i].name, this.styleHeader);
                this.newName.fixedToCamera = true;
                this.characterNamesArr.push(this.newName);
            }
            characterHeady += charInfoIncrement;
            
            
            if(this.hpArray.length < 4){
                this.newHP = this.game.add.text(charInfoX, charInfoY2, "HP: " + (playerStats[i].currentHP + "/" + playerStats[i].maxHP), this.style);
                this.hpArray.push(this.newHP);
                this.newHP.fixedToCamera = true;
            }
            charInfoY2 += charInfoIncrement;
            
            if(this.enArray.length < 4){
                this.newEN = this.game.add.text(charInfoX, charInfoY3, "Energy: " + (playerStats[i].currentEN + "/" + playerStats[i].maxEN), this.style);
                this.enArray.push(this.newEN);
                this.newEN.fixedToCamera = true;
            }
            charInfoY3 += charInfoIncrement;
        }
        
        if(characterHeady != characterHeadyOriginal){
            characterHeady = characterHeadyOriginal;
        }
        
        if(charInfoY2 != charInfoY2Original){
            charInfoY2 = charInfoY2Original;
        }
        
        if(charInfoY3 != charInfoY3Original){
            charInfoY3 = charInfoY3Original;
        }
    }
    
    destroyPauseMenu(parm){
        if(!backKeyIsPushed){
            if(!disableControls && isPaused && !itemScreenOn && !selectingCharToReOrder && !selectingCharToViewStatus && !viewingStatus){
                isPaused = false;

                this.pauseMenu.destroy();
                
                for(var i = 0; i < playerStats.length; i++){
                    this.characterFacesArr[i].destroy();
                    this.characterNamesArr[i].destroy();
                    this.hpArray[i].destroy();
                    this.enArray[i].destroy();
                    
                    console.log(this.characterFacesArr[i]);
                }
                
                this.navItems.destroy();
                this.navStatus.destroy();
                this.navReorder.destroy();
                this.navSave.destroy();

                this.hand.destroy();
                
                cursorPosMain = 0;
                
                this.destroyObjective();
            } else if(!disableControls && itemScreenOn && !selectingCharacter && !selectingCharToReOrder){
                
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
                this.itemTitleBox.destroy();
                this.itemDescBox.destroy();
                if(itemsArr.length > 0){
                    this.itemDescription.destroy();
                    this.itemsHand.destroy();
                }
                
                for(var i = 0; i < visibleItems.length; i++){
                    visibleItems[i].destroy();
                }
                visibleItems = [];
                selectableItems = [];
                itemsArr = [];
                
                this.hand.destroy();
                this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem1, "hand");
                this.hand.smoothed = false;
                this.hand.width = mainMenuHandWidth;
                this.hand.height = mainMenuHandHeight;
                this.hand.fixedToCamera = true;
                
            } else if(!disableControls && itemScreenOn && selectingCharacter || parm == "goBackToItems" && !selectingCharToReOrder){
                backKeyIsPushed = true;
                selectingCharacter = false;
                this.selectingCharHand.destroy();
                selectableItems = [];
                itemsArr = [];
                visibleItems = [];
                justUsedItem = true;
                this.itemsMenu();
                
            } else if(selectingCharToReOrder && reOrderPhase == 0){
                backKeyIsPushed = true;
                
                this.selectingCharHand.destroy();
                selectingCharToReOrder = false;
                
                this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem3, "hand");
                this.hand.smoothed = false;
                this.hand.width = mainMenuHandWidth;
                this.hand.height = mainMenuHandHeight;
                this.hand.fixedToCamera = true;
            
            } else if(selectingCharToReOrder && reOrderPhase == 1){
                backKeyIsPushed = true;
                
                reOrderPhase = 0;
                
                this.selectedCharHand.destroy();
                
            } else if(selectingCharToViewStatus && !viewingStatus){
                backKeyIsPushed = true;
                selectingCharToViewStatus = false;
                this.selectingCharHand.destroy();
                
                this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem2, "hand");
                this.hand.smoothed = false;
                this.hand.width = mainMenuHandWidth;
                this.hand.height = mainMenuHandHeight;
                this.hand.fixedToCamera = true;
                
            } else if(!selectingCharToViewStatus && viewingStatus){
                backKeyIsPushed = true;
                for(var i = 0; i < tempDisplayArray.length; i++){
                    tempDisplayArray[i].destroy();
                }
                tempDisplayArray = [];
                selectingCharToViewStatus = true;
                viewingStatus = false;
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
        if(!disableControls && parm == "goingup" && !upKeyIsPushed && !itemScreenOn && !selectingCharToReOrder && !selectingCharToViewStatus && !viewingStatus){
            upKeyIsPushed = true;
            switch(cursorPosMain){
                case 0:
                    console.log("at the top of the menu");
                    break;
                case 1:
                    cursorPosMain = 0;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem1, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = mainMenuHandWidth;
                    this.hand.height = mainMenuHandHeight;
                    this.hand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosMain = 1;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem2, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = mainMenuHandWidth;
                    this.hand.height = mainMenuHandHeight;
                    this.hand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosMain = 2;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem3, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = mainMenuHandWidth;
                    this.hand.height = mainMenuHandHeight;
                    this.hand.fixedToCamera = true;
                    break;
                
            }
        }
        if(!disableControls && parm == "goingdown" && !downKeyIsPushed && !itemScreenOn && !selectingCharToReOrder && !selectingCharToViewStatus && !viewingStatus){
            downKeyIsPushed = true;
            switch(cursorPosMain){
                case 0:
                    cursorPosMain = 1;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem2, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = mainMenuHandWidth;
                    this.hand.height = mainMenuHandHeight;
                    this.hand.fixedToCamera = true;
                    break;
                case 1:
                    cursorPosMain = 2;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem3, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = mainMenuHandWidth;
                    this.hand.height = mainMenuHandHeight;
                    this.hand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosMain = 3;
                    this.hand.destroy();
                    this.hand = this.game.add.image(this.game.width - mainMenuHandRightIndent, mainMenuHandHeightItem4, "hand");
                    this.hand.smoothed = false;
                    this.hand.width = mainMenuHandWidth;
                    this.hand.height = mainMenuHandHeight;
                    this.hand.fixedToCamera = true;
                    break;
                case 3:
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
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item1y + itemYoffset, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = mainMenuHandWidth;
                    this.itemsHand.height = mainMenuHandHeight;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosItems = 1;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item2y + itemYoffset, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = mainMenuHandWidth;
                    this.itemsHand.height = mainMenuHandHeight;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosItems = 2;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item3y + itemYoffset, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = mainMenuHandWidth;
                    this.itemsHand.height = mainMenuHandHeight;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 4:
                    cursorPosItems = 3;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item4y + itemYoffset, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = mainMenuHandWidth;
                    this.itemsHand.height = mainMenuHandHeight;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 5:
                    cursorPosItems = 4;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item5y + itemYoffset, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = mainMenuHandWidth;
                    this.itemsHand.height = mainMenuHandHeight;
                    this.itemsHand.fixedToCamera = true;
                    break;
                case 6:
                    cursorPosItems = 5;
                    this.itemsHand.destroy();
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item6y + itemYoffset, "hand");
                    this.itemsHand.smoothed = false;
                    this.itemsHand.width = mainMenuHandWidth;
                    this.itemsHand.height = mainMenuHandHeight;
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
                        this.itemsHand = this.game.add.image(selectingHandLeftIndent, item2y + itemYoffset, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = mainMenuHandWidth;
                        this.itemsHand.height = mainMenuHandHeight;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 1:
                    if(typeof itemsArr[2] !== 'undefined'){
                        cursorPosItems = 2;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(selectingHandLeftIndent, item3y + itemYoffset, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = mainMenuHandWidth;
                        this.itemsHand.height = mainMenuHandHeight;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 2:
                    if(typeof itemsArr[3] !== 'undefined'){
                        cursorPosItems = 3;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(selectingHandLeftIndent, item4y + itemYoffset, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = mainMenuHandWidth;
                        this.itemsHand.height = mainMenuHandHeight;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 3:
                    if(typeof itemsArr[4] !== 'undefined'){
                        cursorPosItems = 4;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(selectingHandLeftIndent, item5y + itemYoffset, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = mainMenuHandWidth;
                        this.itemsHand.height = mainMenuHandHeight;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 4:
                    if(typeof itemsArr[5] !== 'undefined'){
                        cursorPosItems = 5;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(selectingHandLeftIndent, item6y + itemYoffset, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = mainMenuHandWidth;
                        this.itemsHand.height = mainMenuHandHeight;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 5:
                    if(typeof itemsArr[6] !== 'undefined'){
                        cursorPosItems = 6;
                        this.itemsHand.destroy();
                        this.itemsHand = this.game.add.image(selectingHandLeftIndent, item7y + itemYoffset, "hand");
                        this.itemsHand.smoothed = false;
                        this.itemsHand.width = mainMenuHandWidth;
                        this.itemsHand.height = mainMenuHandHeight;
                        this.itemsHand.fixedToCamera = true;
                    }
                    break;
                case 6:
                    if(typeof selectableItems[howManyItemsToDisplay + movingItemsArr + 1] === 'undefined' && selectableItems.length > 7){
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
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingChars = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosSelectingChars = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
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
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 1:
                    cursorPosSelectingChars = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingChars = 3;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    console.log("bottom of the character list");
                    break;
            }
        }
        
        //selecting character after selecting REORDER
        if(!disableControls && parm == "goingup" && !upKeyIsPushed && !itemScreenOn && !selectingCharacter && selectingCharToReOrder){
            upKeyIsPushed = true;
            switch(cursorPosSelectingCharsToReOrder){
                case 0:
                    console.log("top of the character list");
                case 1:
                    cursorPosSelectingCharsToReOrder = 0;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingCharsToReOrder = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosSelectingCharsToReOrder = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
            }
        }
        
        if(!disableControls && parm == "goingdown" && !downKeyIsPushed && !itemScreenOn && !selectingCharacter && selectingCharToReOrder){
            downKeyIsPushed = true;
            switch(cursorPosSelectingCharsToReOrder){
                case 0:
                    cursorPosSelectingCharsToReOrder = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 1:
                    cursorPosSelectingCharsToReOrder = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingCharsToReOrder = 3;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    console.log("bottom of the character list");
                    break;
            }
        }
        
        if(selectingCharToViewStatus && parm == "goingup" && !upKeyIsPushed && !viewingStatus){
            upKeyIsPushed = true;
            switch(cursorPosSelectingCharsToViewStatus){
                case 0:
                    console.log("top of the character list");
                case 1:
                    cursorPosSelectingCharsToViewStatus = 0;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingCharsToViewStatus = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    cursorPosSelectingCharsToViewStatus = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
            }
        }
        
        if(selectingCharToViewStatus && parm == "goingdown" && !downKeyIsPushed && !viewingStatus){
            downKeyIsPushed = true;
            switch(cursorPosSelectingCharsToViewStatus){
                case 0:
                    cursorPosSelectingCharsToViewStatus = 1;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 1:
                    cursorPosSelectingCharsToViewStatus = 2;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 2:
                    cursorPosSelectingCharsToViewStatus = 3;
                    this.selectingCharHand.destroy();
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    this.selectingCharHand.smoothed = false;
                    this.selectingCharHand.width = mainMenuHandWidth;
                    this.selectingCharHand.height = mainMenuHandHeight;
                    this.selectingCharHand.fixedToCamera = true;
                    break;
                case 3:
                    console.log("bottom of the character list");
                    break;
            }
        }
        
        
    }
    
    enterPress(){
        if(!disableControls && isPaused && !enterKeyIsPushed && !itemScreenOn && !selectingCharToReOrder && !selectingCharToViewStatus && !viewingStatus){
            enterKeyIsPushed = true;
            switch(cursorPosMain){
                case 0:
                    console.log("items");
                    this.itemsMenu();
                    break;
                case 1:
                    console.log("status");
                    this.selectCharToViewStats();
                    break;
                case 2:
                    console.log("reorder");
                    this.reorder();
                    break;
                case 3:
                    console.log("save");
                    break;
            }
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && itemScreenOn && selectingCharacter && !selectingCharToReOrder && !viewingStatus){
            enterKeyIsPushed = true;
            this.useItem(cursorPosSelectingChars);
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && itemScreenOn && !selectingCharacter && itemsArr.length != 0 && !selectingCharToReOrder && !viewingStatus){
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
            this.itemTitleBox.destroy();
            this.itemDescBox.destroy();

            for(var i = 0; i < visibleItems.length; i++){
                visibleItems[i].destroy();
            }
            
            switch(cursorPosSelectingChars){
                case 0:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    break;
                case 1:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    break;
                case 2:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    break;
                case 3:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    break;
            }
            
            this.selectingCharHand.smoothed = false;
            this.selectingCharHand.width = mainMenuHandWidth;
            this.selectingCharHand.height = mainMenuHandHeight;
            this.selectingCharHand.fixedToCamera = true;
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && !itemScreenOn && !selectingCharacter && selectingCharToReOrder && reOrderPhase == 0 && !viewingStatus){
            enterKeyIsPushed = true;
            reOrderPhase = 1;
            console.log('shouldnt make it');
            switch(cursorPosSelectingCharsToReOrder){
                case 0:
                    this.selectedCharHand = this.game.add.image(selectedCharHandx, selectingHandy0, "hand-left");
                    firstChosenNPC = 0
                    break;
                case 1:
                    this.selectedCharHand = this.game.add.image(selectedCharHandx, selectingHandy1, "hand-left");
                    firstChosenNPC = 1
                    break;
                case 2:
                    this.selectedCharHand = this.game.add.image(selectedCharHandx, selectingHandy2, "hand-left");
                    firstChosenNPC = 2
                    break;
                case 3:
                    this.selectedCharHand = this.game.add.image(selectedCharHandx, selectingHandy3, "hand-left");
                    firstChosenNPC = 3
                    break;
            }
            
            this.selectedCharHand.smoothed = false;
            this.selectedCharHand.width = mainMenuHandWidth;
            this.selectedCharHand.height = mainMenuHandHeight;
            this.selectedCharHand.fixedToCamera = true;
            
            console.log(firstChosenNPC);
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && !itemScreenOn && !selectingCharacter && selectingCharToReOrder && reOrderPhase == 1 && !viewingStatus){
            enterKeyIsPushed = true;
            reOrderPhase = 0;
            
            secondChosenNPC = cursorPosSelectingCharsToReOrder;
            console.log("wants to switch: ", firstChosenNPC, " with ", secondChosenNPC);
            
            this.selectedCharHand.destroy();
            
            playerStats.move(firstChosenNPC, secondChosenNPC);
            
            this.updateCharSprite();
            console.log(playerSpriteSheet);
            
            for(var i = 0; i < playerStats.length; i++){
                this.characterFacesArr[i].destroy();
                this.characterNamesArr[i].destroy();
                this.hpArray[i].destroy();
                this.enArray[i].destroy();
            }
            
            this.characterFacesArr = [];
            this.characterNamesArr = [];
            this.hpArray = [];
            this.enArray = [];

            this.printCharacterInfo();
            
            this.selectingCharHand.destroy();
            
            switch(cursorPosSelectingCharsToReOrder){
                case 0:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    break;
                case 1:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    break;
                case 2:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    break;
                case 3:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    break;
            }
            
            this.selectingCharHand.smoothed = false;
            this.selectingCharHand.width = mainMenuHandWidth;
            this.selectingCharHand.height = mainMenuHandHeight;
            this.selectingCharHand.fixedToCamera = true;
        }
        
        if(!disableControls && isPaused && !enterKeyIsPushed && selectingCharToViewStatus && !viewingStatus){
            enterKeyIsPushed = true;
            selectingCharToViewStatus = false
            viewingStatus = true;
            console.log(playerStats[cursorPosSelectingCharsToViewStatus]);
            this.createStatusScreen();
        }
    }
    
    itemsMenu(){
        
        itemScreenOn = true;
        this.itemsScreen = this.game.add.image(0, 0, 'mainBox');
        this.itemsScreen.fixedToCamera = true;
        this.itemsScreen.width = this.game.width;
        this.itemsScreen.height = this.game.height;
        
        this.itemTitleBox = this.game.add.image(itemTitleBoxX, itemTitleBoxY, 'singleBox');
        this.itemTitleBox.fixedToCamera = true;
        this.itemTitleBox.height = itemTitleBoxHeight;
        
        this.itemsTitle = this.game.add.text(characterHeadx, headerY, "ITEMS", this.styleHeader);
        this.itemsTitle.fixedToCamera = true;
        
        for(var i = 0; i < playerItems.length; i++){
            if(playerItems[i].quantity == 0){
            } else if(playerItems[i].quantity != 0) {
                selectableItems.push(playerItems[i]);
            }
        }
        
        for(var i = 0; i < howManyItemsToDisplay; i++){
            if(typeof selectableItems[i + movingItemsArr] !== 'undefined'){
                itemsArr.push(selectableItems[i + movingItemsArr]);
               }
        }
        
        var yValue = 180;
        
        if(itemsArr.length != 0){
//        console.log(cursorPosItems);
            for(var i = 0; i < itemsArr.length; i++){
                if(typeof selectableItems[i + movingItemsArr] !== 'undefined'){
                    this.itemName = this.game.add.text(characterHeadx + itemListXindent, yValue + itemYoffset, itemsArr[i].name + " (" + itemsArr[i].quantity + ")", this.styleHeader);
                    this.itemName.fixedToCamera = true;

                    visibleItems.push(this.itemName);
//                    console.log(visibleItems.length);
                    yValue += itemYseperation;

                }
//            }
            
                if(typeof itemsArr[cursorPosItems] === 'undefined'){
                    cursorPosItems--;
                }
            }
            
            this.itemDescBox = this.game.add.image(0, itemDescBoxY, "longBox");
            this.itemDescBox.fixedToCamera = true;
//            this.itemDescBox.height = itemTitleBoxHeight;
            
            this.itemDescription = this.game.add.text(characterHeadx, (headerY + itemDescYindent), itemsArr[cursorPosItems].description, this.styleHeader);
            this.itemDescription.fixedToCamera = true;
        }
        
        
        if(itemsArr[howManyItemsToDisplay - 1] != selectableItems[selectableItems.length - 1]){
            if(itemsArr.length == howManyItemsToDisplay){
                if(!downhandExists){
                    this.downhand = this.game.add.image(this.game.width - arrowHandxIndent, this.game.height - arrowHandyIndent, "hand-down");
                    this.downhand.smoothed = false;
                    this.downhand.width = arrowHandWidth;
                    this.downhand.height = mainMenuHandWidth;
                    this.downhand.fixedToCamera = true;

                    downhandExists = true;
                }
            }
        }
        
        if(itemsArr[0] != selectableItems[0]){
            if(!uphandExists){
                this.uphand = this.game.add.image(this.game.width - arrowHandxIndent, arrowHandyIndentTOP, "hand-up");
                this.uphand.smoothed = false;
                this.uphand.width = arrowHandWidth;
                this.uphand.height = mainMenuHandWidth;
                this.uphand.fixedToCamera = true;

                uphandExists = true;
            }
        }
        
        if(itemsArr.length != 0){
            switch(cursorPosItems){
                case 0:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item1y + itemYoffset, "hand");
                    break;
                case 1:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item2y + itemYoffset, "hand");
                    break;
                case 2:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item3y + itemYoffset, "hand");
                    break;
                case 3:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item4y + itemYoffset, "hand");
                    break;
                case 4:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item5y + itemYoffset, "hand");
                    break;
                case 5:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item6y + itemYoffset, "hand");
                    break;
                case 6:
                    this.itemsHand = this.game.add.image(selectingHandLeftIndent, item7y + itemYoffset, "hand");
                    break;
            }

            this.itemsHand.smoothed = false;
            this.itemsHand.width = mainMenuHandWidth;
            this.itemsHand.height = mainMenuHandHeight;
            this.itemsHand.fixedToCamera = true;
            
        }
    }
    
    updateItemDesc(){
        this.itemDescription.destroy();
        this.itemDescription = this.game.add.text(characterHeadx, (headerY + itemDescYindent), itemsArr[cursorPosItems].description, this.styleHeader);
        this.itemDescription.fixedToCamera = true;
    }
    
    useItem(parm){
//        console.log(parm);
        
        if(selectedItem.targets == 1 && selectedItem.quantity > 0){
            if(playerStats[parm].currentHP != playerStats[parm].maxHP && selectedItem.healing > 0){
                this.consumeItem(parm);
            } else if(playerStats[parm].currentEN != playerStats[parm].maxEN && selectedItem.energy > 0){
                this.consumeItem(parm);
            } else {
                console.log("couldn't use the item");
            }
        }
    }
    
    consumeItem(parm){
        selectedItem.quantity -= 1;

        playerStats[parm].currentHP += selectedItem.healing;
        if(playerStats[parm].currentHP > playerStats[parm].maxHP){
            playerStats[parm].currentHP = playerStats[parm].maxHP;
        }

        playerStats[parm].currentEN += selectedItem.energy;
        if(playerStats[parm].currentEN > playerStats[parm].maxEN){
            playerStats[parm].currentEN = playerStats[parm].maxEN;
        }

        for(var i = 0; i <this.hpArray.length; i++){
            this.hpArray[i].destroy();
            this.enArray[i].destroy();

        }

        this.hpArray = [];
        this.enArray = [];
        this.printCharacterInfo();

        if(selectedItem.quantity == 0){

            movingItemsArr--;
            if(movingItemsArr < 0){
                movingItemsArr = 0;
            }

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
//                console.log("the down hand should have been destroyed");
            }
            
            if(itemsArr[0] != selectableItems[0]){
                if(!uphandExists){
                    this.uphand = this.game.add.image(this.game.width - arrowHandxIndent, arrowHandyIndentTOP, "hand-up");
                    this.uphand.smoothed = false;
                    this.uphand.width = arrowHandWidth;
                    this.uphand.height = mainMenuHandWidth;
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
                console.log("line 1275 ", downhandExists);
                if(!downhandExists){
                    console.log("still good");
                    this.downhand = this.game.add.image(this.game.width - arrowHandxIndent, this.game.height - arrowHandyIndent, "hand-down");
                    this.downhand.smoothed = false;
                    this.downhand.width = arrowHandWidth;
                    this.downhand.height = mainMenuHandWidth;
                    this.downhand.fixedToCamera = true;
                    
                    downhandExists = true;
                }
            }
        }
        
        var yValue = 180;
        
        for(var i = 0; i < itemsArr.length; i++){
            if(selectableItems[i + movingItemsArr].quantity == 0){
                console.log("nothing");
            } else if(selectableItems[i + movingItemsArr].quantity != 0 && i < 7) {
                this.itemName = this.game.add.text(characterHeadx + itemListXindent, yValue + itemYoffset, itemsArr[i].name + " (" + itemsArr[i].quantity + ")", this.styleHeader);
                this.itemName.fixedToCamera = true;
                
                yValue += itemYseperation;
                
                visibleItems.push(this.itemName);
                
            }
        }
    }
    
    reorder(){
        this.hand.destroy();
        selectingCharToReOrder = true;
        
        switch(cursorPosSelectingCharsToReOrder){
                case 0:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    break;
                case 1:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    break;
                case 2:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    break;
                case 3:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    break;
            }
        
        this.selectingCharHand.smoothed = false;
        this.selectingCharHand.width = mainMenuHandWidth;
        this.selectingCharHand.height = mainMenuHandHeight;
        this.selectingCharHand.fixedToCamera = true;
    }
    
    
    //Objective
    
    printObjective(){
        this.objectiveBox = this.game.add.image(0, 10, "longBox");
        this.objectiveBox.height = 60;
        this.objectiveBox.fixedToCamera = true;
        this.objective = this.game.add.text(objectiveXindent, headerY, objectives[gameChapter].objective, this.styleLONG);
        this.objective.fixedToCamera = true;
    }
    
    destroyObjective(){
        this.objective.destroy();
        this.objectiveBox.destroy();
    }
    
    //Status
    
    selectCharToViewStats(){
        console.log("hello");
        
        this.hand.destroy();
        selectingCharToViewStatus = true;
        
        switch(cursorPosSelectingCharsToViewStatus){
                case 0:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy0, "hand");
                    break;
                case 1:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy1, "hand");
                    break;
                case 2:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy2, "hand");
                    break;
                case 3:
                    this.selectingCharHand = this.game.add.image(selectingHandLeftIndent, selectingHandy3, "hand");
                    break;
            }
        
        this.selectingCharHand.smoothed = false;
        this.selectingCharHand.width = mainMenuHandWidth;
        this.selectingCharHand.height = mainMenuHandHeight;
        this.selectingCharHand.fixedToCamera = true;
    }
    
    createStatusScreen(){
        console.log("hello world");
        
        selectedCharToViewStatus = playerStats[cursorPosSelectingCharsToViewStatus];
        console.log("selected char is: ", selectedCharToViewStatus);
        
        this.itemsScreen = this.game.add.image(0, 0, 'mainBox');
        this.itemsScreen.fixedToCamera = true;
        this.itemsScreen.width = this.game.width;
        this.itemsScreen.height = this.game.height;
        tempDisplayArray.push(this.itemsScreen);
        
        this.newChar = this.game.add.image(characterHeadx, characterHeady, selectedCharToViewStatus.ch);
        this.newChar.smoothed = false;
        this.newChar.fixedToCamera = true;
        if(selectedCharToViewStatus.name == "Dov"){
            this.newChar.width = dovCharWidth;
        } else {
            this.newChar.width = normalCharWidth;
        }
        this.newChar.height = normalCharWidth;
        tempDisplayArray.push(this.newChar);
        
        this.newName = this.game.add.text(charInfoX, characterHeady, selectedCharToViewStatus.name, this.styleHeader);
        this.newName.fixedToCamera = true;
        tempDisplayArray.push(this.newName);
        
        this.newDesc = this.game.add.text(charInfoX, charInfoY2, selectedCharToViewStatus.description, this.style);
        this.newDesc.fixedToCamera = true;
        tempDisplayArray.push(this.newDesc);

        this.newHP = this.game.add.text(characterHeadx, 280, "HP: " + (selectedCharToViewStatus.currentHP + "/" + selectedCharToViewStatus.maxHP), this.style);
        this.newHP.fixedToCamera = true;
        tempDisplayArray.push(this.newHP);

        this.newEN = this.game.add.text(characterHeadx, 320, "Energy: " + (selectedCharToViewStatus.currentEN + "/" + selectedCharToViewStatus.maxEN), this.style);
        this.newEN.fixedToCamera = true;
        tempDisplayArray.push(this.newEN);
        
        this.newLV = this.game.add.text(characterHeadx, 400, "Level: " + (selectedCharToViewStatus.level), this.style);
        this.newLV.fixedToCamera = true;
        tempDisplayArray.push(this.newLV);
        
        this.newXP = this.game.add.text(characterHeadx, 440, "Next level: " + (selectedCharToViewStatus.nextLevel), this.style);
        this.newXP.fixedToCamera = true;
        tempDisplayArray.push(this.newXP);
        
        this.newattack = this.game.add.text(characterHeadx, 520, "Attack: " + (selectedCharToViewStatus.attack), this.style);
        this.newattack.fixedToCamera = true;
        tempDisplayArray.push(this.newattack);
        
        this.newweapon = this.game.add.text(characterHeadx, 560, "Weapon: " + (selectedCharToViewStatus.weapon), this.style);
        this.newweapon.fixedToCamera = true;
        tempDisplayArray.push(this.newweapon);
        
        this.newweaponMult = this.game.add.text(characterHeadx, 600, "Weapon Multiplier: " + (selectedCharToViewStatus.weaponMult), this.style);
        this.newweaponMult.fixedToCamera = true;
        tempDisplayArray.push(this.newweaponMult);
        
        this.newdefence = this.game.add.text(characterHeadx, 640, "Defence: " + (selectedCharToViewStatus.defence), this.style);
        this.newdefence.fixedToCamera = true;
        tempDisplayArray.push(this.newdefence);
        
        this.newevasion = this.game.add.text(characterHeadx, 680, "Evasion chance: " + (selectedCharToViewStatus.evasion), this.style);
        this.newevasion.fixedToCamera = true;
        tempDisplayArray.push(this.newevasion);
        
        this.newSpecDesc = this.game.add.text(characterHeadx, 720, "Special attack: " + (selectedCharToViewStatus.specDesc), this.styleLONG2);
        this.newSpecDesc.fixedToCamera = true;
        tempDisplayArray.push(this.newSpecDesc);
        
        this.newSprite = this.game.add.sprite(this.game.width - mainMenuRightIndent, 280, selectedCharToViewStatus.spritesheet);
//        this.newSprite.frame = 5;
        this.newSprite.animations.add("down", [3, 5, 4, 5], walkingAnimFPS / 2, true);
        this.newSprite.animations.play("down");
        this.newSprite.fixedToCamera = true;
        tempDisplayArray.push(this.newSprite);
    }
    
    updateCharSprite(){
        playerSpriteSheet = playerStats[0].spritesheet;
//        this.player.destroy();
        tempX = this.player.x;
        tempY = this.player.y;
    }
    
}