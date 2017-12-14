var texting = false;
var chapter = 0;
var eventTrigger = false;

var eventNumber = 32;
var subEventNumber = 0;
var eventTextNumber = 0;

var isEventing = false;

//eventTriggerChecks

var raminFirstSpawn = 5;
var raminSpawnedse14 = false;

var runningShoes = true;
var noteProcurement = 8;

//collecting the final 4 items
var gotMicrowave = false;
var gotLaptop = false;
var gotNachos = false;
var gotKettle = false;
var procEvNum32 = false;

//LAST EVENT CUSTOM VARIABLES
var faceDownAfterWalkingUp = true;

if(eventNumber >= 32){
    var gotMicrowave = true;
    var gotLaptop = true;
    var gotNachos = true;
    var gotKettle = true;
    var procEvNum32 = true;
}

class textEvent extends abstractObject {
    
    constructor() {
        super();
        
        this.textScreen;
        this.startText = false;
        this.text;
        this.continueIcon;
        
        // Put the dialogue here. Eventually we need to put the dialogue somewhere else (JSON file?) and push it to this parameter   //
        
        this.style = { font: "14pt Final-Fantasy-36-Font", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top" ,
            wordWrap: true, wordWrapWidth: 500, 
            };
        
        this.styleOPTIONS = { font: "18pt Final-Fantasy-36-Font", fill: "#fff", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left", 
            boundsAlignV: "top" ,
            wordWrap: true, wordWrapWidth: 500, 
            };
        
        this.profileXValue = 30;
        this.profileYValue = 4.5;
        this.profileScale = 0.05;
    
        this.targetText = null;
        
        this.lineDelay  = 10;
        this.letter     = 0;
        this.lineState  = 0;

        this.contDial   = true;
        this.makeCont   = false;
        
        this.textLeading = 20;
        this.continueArrowIndentDivisor = 11;
        
        
    }
    
    createThis(game) {
        super.createThis(game);
        
        this.enterBut = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.isText = 0;
        this.isDown = false;
        //  this delays text printing, it also prints text  //
        
        this.game.time.events.loop(this.lineDelay, this.printText, this);
        
        
        //construction worker dialogue box variables
        this.optionBoxX = this.game.width - 205;
        this.optionBoxY = (this.game.height - ((this.game.height/8)*3.2));

        this.optionBoxHeight = this.game.height/6;

        this.selectDestinationHandx = this.game.width - 190;
        this.selectDestinationHandyYes = (this.game.height - ((this.game.height/8)*2.9));
        this.selectDestinationHandyNo = this.selectDestinationHandyYes + 50;
        
        this.optionYesNoX = this.selectDestinationHandx + 70;
        this.optionNoY = this.selectDestinationHandyYes + 50;
        this.cursorPosSelectingDestination = null;
        
        this.downDestinationIsPressed = false;
        this.upDestinationIsPressed = false;
        this.choseDestination = false;
        
//WASD CONTROLS
        this.w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
//END WASD CONTOLS
    }

    updateThis(game, player) {
        super.updateThis(game, player);

        // this is for printing text and making it appear //
        
        this.staticEvents();
        
        this.spawnRamin();
        
        if(eventNumber > 6){
            runningShoes = true;
        }
        
        if(gotMicrowave && gotLaptop && gotNachos && gotKettle && !procEvNum32 && !texting && currentNPC == null){
            procEvNum32 = true;
            eventNumber = 32;
        }
        
        if(eventNumber > 36){
            runningShoes = false;
        }
        
        this.createControls();
    }
    
    staticEvents(){
//event 0        
        if(eventNumber == 0 && !eventTrigger){
            
            eventObject.hismove.npcName = 'firstEvent';
            
            currentNPC = eventObject
            
            this.callEvent("firstEvent", 0);
            isEventing = true;
        }
//blocking event        
        if(eventNumber < se6OPEN && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "se6Blocker"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 1;
                
                this.callEvent("se6Blocker");
                isEventing = true;
            }
        }
//Construction workers
        if(eventNumber > 12 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "conWorker1"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 2;
                console.log("first step in calling the event");
                this.callEvent("conWorker1");
                isEventing = true;
            }
        }
        if(eventNumber > 12 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "conWorkerNE1"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 3;
                
                this.callEvent("conWorkerNE1");
                isEventing = true;
            }
        }
        if(eventNumber > 26 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "conWorker2"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 4;
                console.log("first step in calling the event");
                this.callEvent("conWorker2");
                isEventing = true;
            }
        }
        if(eventNumber > 26 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "conWorkerTheStand"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 5;
                
                this.callEvent("conWorkerTheStand");
                isEventing = true;
            }
        }
        if(eventNumber > 8 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "conWorker3"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 6;
                
                this.callEvent("conWorker3");
                isEventing = true;
            }
        }
        if(eventNumber > 8 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "conWorkerSW3"){
                eventNumberTemp = eventNumber;
                
                eventNumber = Object.keys(theDialogue.events).length - 7;
                
                this.callEvent("conWorkerSW3");
                isEventing = true;
            }
        }
//event 1
        if(eventNumber == 1 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "secondEvent"){
                this.callEvent("secondEvent", 1);
                isEventing = true;
            }
        }
//event 2        
        if(eventNumber == 2 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "thirdEvent"){
                this.callEvent("thirdEvent", 2);
                isEventing = true;
            }
        }
//event 3
        if(eventNumber == 3 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "henry"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("henry", 3);
                    chapter = 1;
                    isEventing = true;
                }
            }
        }
//event 4
        if(eventNumber == 4 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "guy3"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("guy3", 4);
                    chapter = 2;
                    isEventing = true;
                }
            }
        }
//event 5        
        if(eventNumber == 5 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ramin"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("ramin", 5);
                    chapter = 3;
                    isEventing = true;
                }
            }
        }
//event 6
        if(eventNumber == 6 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "sixthEvent"){
                    this.callEvent("sixthEvent", 6);
                    chapter = 4;
                    isEventing = true;
            }
        }
//event 7
        if(eventNumber == 7 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "seventhEvent"){
                    this.callEvent("seventhEvent", 7);
                    isEventing = true;
            }
        }
//event 8
        if(eventNumber == 8 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "se6note"){
                    this.callEvent("se6note", 8);
                    isEventing = true;
            }
        }
//event 9
        if(eventNumber == 9 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "galyna"){
                    this.callEvent("galyna", 9);
                    chapter = 5;
                    isEventing = true;
            }
        }
//ADJUST HERE WITH BATTLE 1 change !== into === and makes sure that becomes true after battle #1
//event 10
        if(eventNumber == 10 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName !== "postGalyna"){
                    this.callEvent("postGalyna", 10);
                    isEventing = true;
            }
        }
//DONE ADJUSTING FOR BATTLE
//event 11
        if(eventNumber == 11 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ramin"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("ramin", 11);
                    chapter = 6;
                    isEventing = true;
                }
            }
        }
//event 12
        if(eventNumber == 12 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "arron"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("arron", 12);
                    chapter = 7;
                    isEventing = true;
                }
            }
        }
//event x 13
        if(eventNumber == 13 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "13thEvent"){
                    this.callEvent("13thEvent", 13);
                    isEventing = true;
            }
        }
        
//event 14
        if(eventNumber == 14 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ne1lamp"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("ne1lamp", 14);
                    isEventing = true;
                }
            }
        }
//event 15
        if(eventNumber == 15 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "arron"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("arron", 15);
                    chapter = 8;
                    isEventing = true;
                }
            }
        }
//event 16
        if(eventNumber == 16 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "arron"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("arron", 16);
                    isEventing = true;
                }
            }
        }
//event 17
        if(eventNumber == 17 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ramin"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("ramin", 17);
                    chapter = 9;
                    isEventing = true;
                }
            }
        }
//event 18
        if(eventNumber == 18 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "daemon"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("daemon", 18);
                    chapter = 10;
                    isEventing = true;
                }
            }
        }
//event 19
        if(eventNumber == 19 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "se14comp"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("se14comp", 19);
                    chapter = 11;
                    isEventing = true;
                }
            }
        }
//event 20
        if(eventNumber == 20 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "20thEvent"){
                    this.callEvent("20thEvent", 20);
                    isEventing = true;
            }
        }
//event 21
        if(eventNumber == 21 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "21stEvent"){
                    this.callEvent("21stEvent", 21);
                    isEventing = true;
            }
        }
//event 22
        if(eventNumber == 22 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "dormComp"){
                    this.callEvent("dormComp", 22);
                    chapter = 12;
                    isEventing = true;
            }
        }
//event 23
        if(eventNumber == 23 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "se14comp"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("se14comp", 23);
                    chapter = 13;
                    isEventing = true;
                }
            }
        }
//event 24
        if(eventNumber == 24 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "daemon"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("daemon", 24);
                    chapter = 14;
                    isEventing = true;
                }
            }
        }
//event 25
        if(eventNumber == 25 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "daemon"){
                console.log("recognzie event 25 and daemon@@@@@@@@@@@@@@@@@@@");
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("daemon", 25);
                    isEventing = true;
                }
            }
        }
//event 26
        if(eventNumber == 26 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "henry"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("henry", 26);
                    chapter = 15;
                    isEventing = true;
                }
            }
        }
//events 27 - 30
        if(eventNumber >= 27 && eventNumber <= 31 && currentNPC != null && !eventTrigger){
    //jessie        
            if(currentNPC.hismove.npcName === "jessie" && !gotMicrowave){
                eventNumber = 27;
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("jessie", 27);
                    chapter = 16;
                    isEventing = true;
                }
            }
    //jakub
            if(currentNPC.hismove.npcName === "jakub" && !gotNachos){
                eventNumber = 28;
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("jakub", 28);
                    isEventing = true;
                }
            }
    //laptop
            if(currentNPC.hismove.npcName === "henryLaptop" && !gotLaptop){
                eventNumber = 29;
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("henryLaptop", 29);
                    isEventing = true;
                }
            }
    //kettle
            if(currentNPC.hismove.npcName === "KETLLE" && !gotKettle){
                eventNumber = 30;
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("KETLLE", 30);
                    isEventing = true;
                }
            }    
        }
//event 32
        if(eventNumber == 32 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "henry"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("henry", 32);
                    isEventing = true;
                }
            }
        }
//event 33
        if(eventNumber == 33 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "henry"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("henry", 33);
                    isEventing = true;
                }
            }
        }
//event 34
        if(eventNumber == 34 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "bookcaseNPC"){
                if(currentNPC.hismove.eventNPC == "true"){
                    this.callEvent("bookcaseNPC", 34);
                    isEventing = true;
                }
            }
        }
//event 35
        if(eventNumber == 35 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "35thEvent"){
                this.callEvent("35thEvent", 35);
                isEventing = true;
            }
        }
//event 36
        if(eventNumber == 36 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "36thEvent"){
                this.callEvent("36thEvent", 36);
                isEventing = true;
            }
        }
//event 37
        if(eventNumber == 37 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "37thEvent"){
                this.callEvent("37thEvent", 37);
                isEventing = true;
            }
        }
//event 38
        if(eventNumber == 38 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "38thEvent"){
                this.callEvent("38thEvent", 38);
                isEventing = true;
            }
        }
//event 39
        if(eventNumber == 39 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "39thEvent"){
                this.callEvent("39thEvent", 39);
                isEventing = true;
            }
        }
//event 40
        if(eventNumber == 40 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ramin"){
                if(currentNPC.hismove.eventNPC == "true"){
                    console.log("PLEASE");
                    this.callEvent("ramin", 40);
                    isEventing = true;
                }
            }
        }
//event 41
        if(eventNumber == 41 && currentNPC != null && !eventTrigger){
            if(currentNPC.hismove.npcName === "ramin"){
                if(currentNPC.hismove.eventNPC == "true"){
                    console.log("PLEASE");
                    this.callEvent("ramin", 41);
                    isEventing = true;
                }
            }
        }        
//read text
        if(currentNPC != null){
            this.readText();
        }
    }
    
    readText() {
        if ((this.enterBut.isDown && !battling && currentNPC != null || isEventing)){
            isEventing = false;
            texting = true;
            if(!this.isDown){
                this.checkTextBoxContent();
                this.isDown = true;
                if(!this.doTheNoise){
                    this.doTheNoise = true;
                    this.sfx = this.game.add.audio("UISelect2");
                    this.sfx.volume = 1;
                    this.sfx.play();                    
                }
            }
        }
        
        if(this.enterBut.isUp && !disableControls && !battling){
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
                        this.checkEventFinish();                        
                        break;
                }
            }
        }
    }  
    
    checkTextBoxContent(){
        if(currentNPC == null){
        } 
        else{
//            if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0 && currentNPC.hismove.npcName != undefined && currentNPC.hismove.eventNPC && !eventTrigger){
////                this.callEvent(currentNPC.hismove.npcName, eventNumber);
//                
////                if(eventNumber == 1 && currentNPC.hismove.npcName == "james" && !eventTrigger){
////                    this.callEvent("james", 1);
////                }
//
//                
//            } else
                if (currentNPC.hismove.walkingState == 0 && currentNPC.body.velocity.x == 0 && currentNPC.body.velocity.y == 0 && currentNPC.hismove.npcName != undefined && !eventTrigger){
                    for (var i=0; i < Object.keys(theDialogue.defaults).length; i++){
                        if (Object.keys(theDialogue.defaults)[i] == currentNPC.hismove.npcName){
                            if((Object.values(theDialogue.defaults)[i].txt[chapter]) != undefined){
                                this.person = (Object.values(theDialogue.defaults)[i].txt[chapter]).split(";;");
                                this.profilePic = Object.values(theDialogue.defaults)[i].profile;
                            }
                        }
                    }
                }
        }
    }
    
    checkEventFinish(){
        if (eventTrigger){
            
            if (eventTextNumber < Object.values(theDialogue.events)[eventNumber].length - 1){
//                console.log("made it to the master switch statement - 1");
//                    console.log(Object.values(theDialogue.events)[eventNumber][eventTextNumber]);
                if (Object.values(theDialogue.events)[eventNumber][eventTextNumber].event == "action"){

                    // this is where actions for the events will be called //
//                            console.log("made it to the master switch statement");
                    switch(eventNumber){
                        case Object.keys(theDialogue.events).length - 1:
//                            console.log("made it to the master switch statement 22222");
                            this.blockedEventSwitch();
                            break;
                        case Object.keys(theDialogue.events).length - 2:
//                            console.log("third step in calling the event");
                            this.ne1conWorkerSwitch();
                            break;
                        case Object.keys(theDialogue.events).length - 3:
                            this.ne1conWorkerSwitch2();
                            break;
                        case Object.keys(theDialogue.events).length - 4:
                            this.standconWorkerSwitch();
                            break;
                        case Object.keys(theDialogue.events).length - 5:
                            this.standconWorkerSwitch2();
                            break;
                        case Object.keys(theDialogue.events).length - 6:
                            this.sw3conWorkerSwitch();
                            break;
                        case Object.keys(theDialogue.events).length - 7:
                            this.sw3conWorkerSwitch2();
                            break;
                        case 0:
                            console.log("case 0 of the master switch");
                            this.event0switch();
                            break;
                        case 1:
                            this.event1switch();
                            break;
                        case 2:
                            this.event2switch();
                            break;
                        case 3:
                            break;
                        case 4:
                            this.event4switch();
                            break;
                        case 5:
                            break;
                        case 6:
                            this.event6switch();
                            break;
                        case 7:
                            this.event7switch();
                            break;
                        case 8:
                            this.event8switch();
                            break;
                        case 9:
                            this.event9switch();
                            break;
                        //event x13    
                        case 13:
                            this.event13switch();
                            break;
                        case 14:
                            this.event14switch();
                            break;
                        case 15:
                            this.event15switch();
                            break;
                        case 18:
                            this.event18switch();
                            break;
                        case 20:
                            this.event20switch();
                            break;
                        case 21:
                            this.event21switch();
                            break;
                        case 22:
                            this.event22switch();
                            break;    
                        case 24:
                            this.event24switch();
                            break;
                        case 25:
                            this.event25switch();
                            break;
                        case 27:
                            this.event27switch();
                            break;
                        case 28:
                            this.event28switch();
                            break;
                        case 29:
                            this.event29switch();
                            break;
                        case 30:
                            this.event30switch();
                            break;
                        case 32:
                            this.event32switch();
                            break;
                        case 33:
                            this.event33switch();
                            break;
                        case 34:
                            this.event34switch();
                            break;
                        case 37:
                            this.event37switch();
                            break;
                        case 38:
                            this.event38switch();
                            break;
                        case 39:
                            this.event39switch();
                            break;
                        case 40:
                            this.event40switch();
                            break;
                    }
                    
                    if(currentNPC.hismove.npcName != "conWorker1" && currentNPC.hismove.npcName != "conWorkerNE1" && currentNPC.hismove.npcName != "conWorker2" && currentNPC.hismove.npcName != "conWorkerTheStand" && currentNPC.hismove.npcName != "conWorker3" && currentNPC.hismove.npcName != "conWorkerSW3"){
                        console.log("how to get here for?");
                        Object.values(theDialogue.events)[eventNumber][eventTextNumber].event = null;
                    }
                    disableControls = true;
                    
                    subEventNumber++;
                }
                
                
                else{
                    disableControls = false;
                    eventTextNumber++;
                    this.showText();
                    
                    if (Object.values(theDialogue.events)[eventNumber].length != eventTextNumber){
                        if(Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt != undefined){
                            this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
                            this.textProfile.destroy();

                            this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
                            this.textProfile = this.game.add.image(this.profileXValue, this.game.height - (this.game.height/(this.profileYValue)), this.profilePic); 
                            this.textProfile.scale.setTo(this.profileScale, this.profileScale);
    //                        this.textProfile.width = 150;
    //                        this.textProfile.height = 150;
                            this.textProfile.fixedToCamera = true;

                            this.isText = 1;
                            
                        }
                    }
                }
                
            }
            
            else if (eventTextNumber >= Object.values(theDialogue.events)[eventNumber].length - 1 && Object.values(theDialogue.events)[eventNumber][Object.values(theDialogue.events)[eventNumber].length-1].event == "end"){
                
                if(currentNPC.hismove.npcName != "se6Blocker" && currentNPC.hismove.npcName != "conWorker1" && currentNPC.hismove.npcName != "conWorkerNE1"){
                    eventNumber++;
                }
                
                else if(currentNPC.hismove.npcName === "se6Blocker"){
                    Object.values(theDialogue.events)[eventNumber][0].event = "action";
                }
                
                if(eventNumberTemp != null){
                    
                    eventNumber = eventNumberTemp;
                    eventNumberTemp = null;
                }
                
                subEventNumber = 0;
                
                this.isText = 2;
                this.eraseText();   

                eventTrigger = false;

                texting = false;
                this.isText = 0;

                eventTextNumber = 0;
                
//checking if we are about to teleport to DORMS
                if(currentNPC.hismove.npcName == "20thEvent"){
                    this.eraseText();
                    this.continueThing.destroy();
                    currentNPC = null;
                    TopDownGame.game.state.start('dorm');
                } else if(currentNPC.hismove.npcName == "bookcaseNPC"){
                    console.log("line 618 baby");
                    this.eraseText();
                    this.continueThing.destroy();
                    currentNPC = null;
                    TopDownGame.game.state.start('tunnel');
                }
                currentNPC = null;
            } 
        }
        
        else {
            eventTextNumber = 0;
            eventTrigger = false;
            this.isText = 0;
            this.eraseText();            
            texting = false;
            currentNPC = null;
        }

    }
    
//EVENT SWITCH STATEMENTS
    
    blockedEventSwitch(){
        console.log("made it to the blocekd event switch");
        switch(subEventNumber){
            case 0:
                this.se6Block();
                break;
        }
    }
    
    ne1conWorkerSwitch(){
        switch(subEventNumber){
            case 0:
                this.ne1conEvent();
                break;
        }
    }
    
    ne1conWorkerSwitch2(){
        switch(subEventNumber){
            case 0:
                this.ne1conEvent2();
                break;
        }
    }
    
    standconWorkerSwitch(){
        switch(subEventNumber){
            case 0:
                this.standconEvent();
                break;
        }
    }
    
    standconWorkerSwitch2(){
        switch(subEventNumber){
            case 0:
                this.standconEvent2();
                break;
        }
    }
    
    sw3conWorkerSwitch(){
        switch(subEventNumber){
            case 0:
                this.sw3conEvent();
                break;
        }
    }
    
    sw3conWorkerSwitch2(){
       switch(subEventNumber){
            case 0:
                this.sw3conEvent2();
                break;
        } 
    }
    
    event0switch(){
        switch(subEventNumber){
            case 0:
                this.event0s0();
                break;
            case 1:
                console.log("case 1 of the event 0 switch");
                this.event0s1();
                break;
        }
    }
    
    event1switch(){
        switch(subEventNumber){
            case 0:
                this.event1s0();
                break;
        }
    }
    
    event2switch(){
        switch(subEventNumber){
            case 0:
                this.event2s0();
                break;
            case 1:
                this.event2s1();
                break;
            case 2:
                this.event2s2();
                break;
        }
    }
    
    event3switch(){
        switch(subEventNumber){
            case 0:
                this.event3s0();
                break;
        }
    }
    
    event4switch(){
        switch(subEventNumber){
            case 0:
                this.event4s0();
                break;
        }
    }
    
    event6switch(){
        switch(subEventNumber){
            case 0:
                this.event6s0();
                break;
            case 1:
                this.event6s1();
                break;
        }
    }
    
    event7switch(){
        switch(subEventNumber){
            case 0:
                this.event7s0();
                break;
            case 1:
                this.event7s1();
                break;
        }
    }
    
    event8switch(){
        switch(subEventNumber){
            case 0:
                this.event8s0();
                break;
        }
    }
    
    event9switch(){
        switch(subEventNumber){
            case 0:
                this.event9s0();
                break;
        }
    }
    
    event13switch(){
        switch(subEventNumber){
            case 0:
                this.event13s0();
                break;
            case 1:
                this.event13s1();
                break;
            case 2:
                this.event13s2();
                break;
        }
    }
    
    event14switch(){
        switch(subEventNumber){
            case 0:
                this.event14s0();
                break;
        }
    }
    
    event15switch(){
        switch(subEventNumber){
            case 0:
                this.event15s0();
                break;
        }
    }
    
    event18switch(){
        switch(subEventNumber){
            case 0:
                this.event18s0();
                break;
        }
    }
    
    event20switch(){
        switch(subEventNumber){
            case 0:
                this.event20s0();
                break;
        }
    }
    
    event21switch(){
        switch(subEventNumber){
            case 0:
                this.event21s0();
                break;
            case 1:
                this.event21s1();
                break;
            case 2:
                this.event21s2();
                break;
        }
    }
    
    event22switch(){
        switch(subEventNumber){
            case 0:
                this.event22s0();
                break;
            case 1:
                this.event22s1();
                break;
        }
    }
    
    event24switch(){
        switch(subEventNumber){
            case 0:
                this.event24s0();
                break;
        }
    }
    
    event25switch(){
        switch(subEventNumber){
            case 0:
                this.event25s0();
                break;
        }
    }
    
    event27switch(){
        switch(subEventNumber){
            case 0:
                this.event27s0();
                break;
        }
    }
    
    event28switch(){
        switch(subEventNumber){
            case 0:
                this.event28s0();
                break;
            case 1:
                this.event28s1();
                break;
        }
    }
    
    event29switch(){
        switch(subEventNumber){
            case 0:
                this.event29s0();
                break;
            case 1:
                this.event29s1();
        }
    }
    
    event30switch(){
        switch(subEventNumber){
            case 0:
                this.event30s0();
                break;
        }
    }
    
    event32switch(){
        switch(subEventNumber){
            case 0:
                this.event32s0();
                break;
        }
    }
    
    event33switch(){
        switch(subEventNumber){
            case 0:
                this.event33s0();
                break;
        }
    }
    
    event34switch(){
       switch(subEventNumber){
            case 0:
                this.event34s0();
                break;
        }
    }
    
    event37switch(){
        switch(subEventNumber){
            case 0:
                this.event37s0();
                break;
        }
    }
    
    event38switch(){
        switch(subEventNumber){
            case 0:
                this.event38s0();
                break;
        }
    }
    
    event39switch(){
        console.log("line 930");
        switch(subEventNumber){
            case 0:
                this.event39s0();
                break;
            case 1:
                this.event39s1();
                break;
            case 2:
                this.event39s2();
                break;
            case 3:
                this.event39s3();
                break;
            case 4:
                this.event39s4();
                break;
            case 5:
                this.event39s5();
                break;
            case 6:
                this.event39s6();
                break;
            case 7:
                this.event39s7();
                break;
            case 8:
                this.event39s8();
                break;
            case 9:
                this.event39s9();
                break;
        }
    }
    
    event40switch(){
        switch(subEventNumber){
            case 0:
                this.event40s0();
                break;
        }
    }
        
    
//end of EVENT SWITCH STATEMENTS
    showText() {
        if(!this.startText){
            this.startText = true;            
            
            this.textScreen = this.game.add.image(0, (this.game.height - (this.game.height/4)), 'textBox'); 
            this.textScreen.fixedToCamera = true;
            this.textScreen.width = this.game.width;
            this.textScreen.height = this.game.height/4;

            this.text = this.game.add.text(150, 35, this.text, this.style);
            this.text.fixedToCamera = true;
            this.text.setTextBounds( 48 , (this.game.height - (this.game.height/4)), 2000, 360);
            this.text.lineSpacing = this.textLeading;

            this.textProfile = this.game.add.image(this.profileXValue, this.game.height - (this.game.height/(this.profileYValue)), this.profilePic); 
            this.textProfile.scale.setTo(this.profileScale, this.profileScale);
            this.textProfile.fixedToCamera = true;
        }
    }
    
    eraseText(){
        this.startText = false;
        this.textScreen.destroy();
        this.textProfile.destroy();
        this.text.destroy();                
    }
    
    printText() {

        
        if(this.isText <= 0 || this.isText >= 2){
            return false;
        }
        
        if(currentNPC == null){
//            console.log("lol it broke");
        }
        
        else if(currentNPC != null){
//            console.log("lineState is: ", this.lineState);
            if (this.letter <= this.person[this.lineState].length){
                this.addLetters = this.person[this.lineState].substring(0,this.letter);
                this.text.text = this.addLetters; 
                this.letter = this.letter + 1;
            }    
            else if (this.letter >= this.person[this.lineState].length){
                this.letter = 0;
                this.isText = 0;
                this.lineState++;
                this.doTheNoise = false;
                
                if(this.lineState < this.person.length || this.lineState < Object.values(theDialogue.events)[eventNumber].length){

                    if (!this.continueIcon){
                        this.continueIcon = true;
    //                    this line makes the continue text icon. maybe replace with an animated sprite?
                        this.continueThing = this.game.add.sprite((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
                        
                        this.continueThing.animations.add("downAnim", [1, 0, 1, 2], 4, true);
                        this.continueThing.animations.play("downAnim");
                        this.continueThing.width = arrowHandWidth;
                        this.continueThing.height = mainMenuHandWidth;
                        this.continueThing.fixedToCamera = true;                   
                    }
                }

                if(this.lineState >= this.person.length){

                    if (eventTrigger){
                        this.lineState = 0;
                        this.isText = 2;
                        if (eventTextNumber >= Object.values(theDialogue.events)[eventNumber].length - 1){
                            this.continueIcon = false;
                            this.continueThing.destroy();  
                        }
                    }
                    else{
                        eventTextNumber = 0;
                        this.lineState = 0;
                        this.isText = 2;
                        if(this.continueIcon){
                            this.continueIcon = false;
                            this.continueThing.destroy();
                        }
                    }
                }
            }
        }
    }
    
    callEvent(sprite, event){
//        if (currentNPC.hismove.npcName == String(sprite) && eventNumber == event && !eventTrigger){
            eventTrigger = true;
//            console.log(sprite);
        if(Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt != undefined){
            this.person = Object.values(theDialogue.events)[eventNumber][eventTextNumber].txt.split(";;");
            this.profilePic = Object.values(theDialogue.events)[eventNumber][eventTextNumber].profile;
        }
    }
    
//THE ACTUAL EVENTS
    
//goBackTest resets the game back to normal text interactions    
    goBackTest(){
        this.checkEventFinish();
        this.continueThing = this.game.add.sprite((this.game.width - (this.game.width/this.continueArrowIndentDivisor)), (this.game.height - (this.game.height/this.continueArrowIndentDivisor)), 'hand-down');
        this.continueThing.animations.add("downAnim", [1, 0, 1, 2], 4, true);
        this.continueThing.animations.play("downAnim");
        this.continueThing.width = arrowHandWidth;
        this.continueThing.height = mainMenuHandWidth;
        this.continueThing.fixedToCamera = true;      
    }
    
//Blocking events
    se6Block(){
        console.log("se6block!!!");
//        disableControls = true;
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
            this.player.mymove.state = 3;
            this.player.mymove.y2 = Math.floor(this.player.y) + 128;
            this.player.animations.play("down");
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function(){
            console.log(this.player);
            this.goBackTest();
            
//            eventNumber = eventNumberTemp;
        }, this);
    }
    
//CONSTRUCTION WORKER EVENTS
    //ne1
    
    ne1conEvent(){
        this.continueThing.destroy();
        
        this.selectDestinationPart1();
    }
    
    ne1conEvent2(){
        this.continueThing.destroy();
        
        this.selectDestinationPart1();
    }
    
    standconEvent(){
        this.continueThing.destroy();
        
        this.selectDestinationPart1();
    }
    
    standconEvent2(){
        this.continueThing.destroy();
        
        this.selectDestinationPart1();
    }
    
    sw3conEvent(){
        this.continueThing.destroy();
        
        this.selectDestinationPart1();
    }
    
    sw3conEvent2(){
        this.continueThing.destroy();
        
        this.selectDestinationPart1();
    }
    
    selectDestinationPart1(){
        this.optionBox = this.game.add.image(this.optionBoxX, this.optionBoxY, "singleBox");
        this.optionBox.fixedToCamera = true;
        this.optionBox.height = this.optionBoxHeight;
        
        this.text2 = this.game.add.text(this.optionYesNoX, this.selectDestinationHandyYes, "YES", this.styleOPTIONS);
        this.text2.fixedToCamera = true;
        this.text3 = this.game.add.text(this.optionYesNoX, this.optionNoY, "SURE", this.styleOPTIONS);
        this.text3.fixedToCamera = true;
        
        this.spawnYesHand();
    }
    
    spawnYesHand(){
        this.cursorPosSelectingDestination = "YES";
        this.selectDestinationHand = this.game.add.image(this.selectDestinationHandx, this.selectDestinationHandyYes, "hand");
        this.selectDestinationHand.fixedToCamera = true;
        this.selectDestinationHand.width = mainMenuHandWidth;
        this.selectDestinationHand.height = mainMenuHandHeight;
    }
    
    spawnNoHand(){
        this.cursorPosSelectingDestination = "NO";
        this.selectDestinationHand = this.game.add.image(this.selectDestinationHandx, this.selectDestinationHandyNo, "hand");
        this.selectDestinationHand.fixedToCamera = true;
        this.selectDestinationHand.width = mainMenuHandWidth;
        this.selectDestinationHand.height = mainMenuHandHeight;
    }
    
    createControls(){
        if(this.cursors.up.isUp && this.w.isUp){
            this.upDestinationIsPressed = false;
        }
        if(this.cursors.down.isUp&& this.s.isUp){
            this.downDestinationIsPressed = false;
        }
        
        if(this.cursorPosSelectingDestination != null){
            if((this.cursors.up.isDown || this.w.isDown) && this.cursorPosSelectingDestination == "NO" && !this.upDestinationIsPressed){
                this.upDestinationIsPressed = true;
                this.selectDestinationHand.destroy();
                this.spawnYesHand();
            } else if((this.cursors.down.isDown || this.s.isDown) && this.cursorPosSelectingDestination == "YES" && !this.downDestinationIsPressed){
                this.downDestinationIsPressed = true;
                this.selectDestinationHand.destroy();
                this.spawnNoHand();
            }
        }
        
        this.checkForChooseDestination();
        
    }
    
    checkForChooseDestination(){
        if(this.enterBut.isUp){
            this.choseDestination = false;
        }
        
        if(this.enterBut.isDown && !this.choseDestination && this.cursorPosSelectingDestination != null){
            this.choseDestination = true;
            
            if(this.cursorPosSelectingDestination != null){
                console.log("is it breaking on 1421?");
                    this.cursorPosSelectingDestination = null;
                    eventNumber = eventNumberTemp;
                    eventNumberTemp = null;

                    subEventNumber = 0;

                    this.isText = 2;
                    this.eraseText();   

                    eventTrigger = false;

                    texting = false;
                    this.isText = 0;

                    eventTextNumber = 0;
                
                    if(!gotLaptop){
                        Object.values(theDialogue.events)[eventNumber][0].event = "action";
                    }
                
                    this.optionBox.destroy();
                    this.text2.destroy();
                    this.text3.destroy();
                    this.selectDestinationHand.destroy();

                    switch(currentNPC.hismove.npcName){
                        case "conWorker1":
                            TopDownGame.game.state.start('NE1');
                            break;
                        case "conWorkerNE1":
                            for(var i = 0; i < doors.length - 1; i++){
                                if(doors[i].coolProperties.from == "ne1"){
                                    currentDoor = doors[i];
                                }
                            }
                            TopDownGame.game.state.start('overworld');
                            break;
                        case "conWorker2":
                            TopDownGame.game.state.start('theStand');
                            break;
                        case "conWorkerTheStand":
                            for(var i = 0; i < doors.length - 1; i++){
                                if(doors[i].coolProperties.from == "theStand"){
                                    currentDoor = doors[i];
                                }
                            }
                            TopDownGame.game.state.start('overworld');
                            break;
                        case "conWorker3":
                            TopDownGame.game.state.start('sw03');
                            break;
                        case "conWorkerSW3":
                            for(var i = 0; i < doors.length - 1; i++){
                                if(doors[i].coolProperties.from == "sw03"){
                                    currentDoor = doors[i];
                                }
                            }
                            TopDownGame.game.state.start('overworld');
                            break;
                }
            }
            
        }
    }
    
//EVENT 0 PART 0
    event0s0(){
        
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.eventNPC && NPCs[i].hismove.eventID == "dov1"){
                
                this.targetNPC1 = NPCs[i];
                this.targetNPC1.animations.play("up");
                
                this.targetNPC1.hismove.y2 = this.player.y + 128;
                this.targetNPC1.hismove.walkingState = 4;
            }
            if(NPCs[i].hismove.eventNPC && NPCs[i].hismove.eventID == "james1"){
                
                this.targetNPC2 = NPCs[i];
                this.targetNPC2.animations.play("up");
                
                this.targetNPC2.hismove.y2 = this.player.y + 128;
                this.targetNPC2.hismove.walkingState = 4;
            }
        }
        
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
        this.eraseText();
        
        var that = this;
        
        var checkNPCposition = setInterval(function(){
            if(Math.round(that.targetNPC1.y / 128) == Math.round(that.targetNPC1.hismove.y2 / 128)){
                
                that.game.time.events.add(Phaser.Timer.SECOND * 0.1,that.goBackTest, that);
                this.targetNPC1 = null;
                this.targetNPC2 = null;
                clearInterval(checkNPCposition);
            }
            
        }, 1);
    }
//EVENT 0 PART 1
    event0s1(){
        this.eraseText();
        this.continueThing.destroy();
        console.log("about to flash");
        
//        this.game.camera.fade('#000000');
        this.game.camera.flash('#000000');
//        this.game.camera.onFadeComplete.add(function(){
            this.event0s1DestroyNPCs();
//        }, this);
    }
    
    event0s1DestroyNPCs(){
//        for (var i = 0; i < NPCs.length -1; i++){
//            NPCs[i].x = 0;
//        }
        console.log("about to destroyNPCS");
        
        for (var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.eventID == "dov1" || NPCs[i].hismove.eventID == "james1" || NPCs[i].hismove.eventID == "raymond1"){
                
                console.log(NPCs[i].hismove.eventID);
                
                NPCs[i].x = 0;
                NPCs[i].y = 0;
                NPCs[i].destroy();
            }
        }
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8,this.goBackTest, this);
    }
    
//    event0s1DestroyNPCs(){
//        console.log("about to destroyNPCS");
//        setTimeout(()=>{
//        
//            for (var i = 0; i < NPCs.length -1; i++){
//                if(NPCs[i].hismove.eventID == "dov1" || NPCs[i].hismove.eventID == "james1" || NPCs[i].hismove.eventID == "raymond1"){
//                    console.log(NPCs[i].hismove.eventID);
//                    NPCs[i].x = 0;
//                    NPCs[i].y = 0;
//                    NPCs[i].destroy();
//                }
//            }
//            this.game.camera.flash('#000000');
//            this.game.camera.follow(this.player);
//            this.game.time.events.add(Phaser.Timer.SECOND * 0.8,this.goBackTest, this);
//        }, 2000);
//    }
    
//EVENT 1 PART 0
    event1s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.shake(0.005, 1000);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventID == 1){
                walkablesArr[i].x = 0;
                walkablesArr[i].y = 0;
                walkablesArr[i].destroy();
            }
        }
    }
    
//EVENT 2 PART 0    
    event2s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "se14camera"){
                this.targetNPC1 = walkablesArr[i];       
            }
        }
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
    }
    
    event2s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.8, function(){
            this.goBackTest();
        }, this);
    }
    
    event2s2(){
        this.eraseText();
        this.continueThing.destroy();
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        this.game.time.events.add(Phaser.Timer.SECOND * 1,this.goBackTest, this);
    }
    
//EVENT 3
    event3s0(){
//        this.eraseText();
//        this.continueThing.destroy();
        console.log("Event 3");
//        chapter++;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.0000000000001,this.goBackTest, this);
    }
    
//EVENT 4
    event4s0(){
        this.eraseText();
        this.continueThing.destroy();
        this.game.camera.shake(0.005, 1000);
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
    }
    
//SPAWN RAMIN
    spawnRamin(){
        if((eventNumber == raminFirstSpawn) && !raminSpawnedse14){
            raminSpawnedse14 = true;
            
            for(var i = 0; i < NPCs.length - 1; i++){
                if(NPCs[i].hismove.npcName == "ramin"){
                    
                    NPCs[i].x = NPCs[i].hismove.originalX;
                    NPCs[i].y = NPCs[i].hismove.originalY;
                }
            }
        }
    }

//EVENT 6    
    event6s0(){
        this.player.frame = 2;
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "henry"){
                this.targetNPC1 = NPCs[i];
            }
        }
        
        this.eraseText();
        this.continueThing.destroy();
        
        this.targetNPC1.x = this.player.x;
        this.targetNPC1.y = this.player.y - (1280*1.5);
        
        this.targetNPC1.animations.add("downFast", [3, 5, 4, 5], walkingAnimFPS*2, true);
        this.targetNPC1.animations.play("downFast");
        this.targetNPC1.hismove.y2 = this.player.y - 128;
        this.targetNPC1.hismove.walkingState = 3;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
            this.game.camera.flash('#000000');
            this.game.camera.follow(this.targetNPC1);
        }, this);
        
        var NPCvelocityTemp = NPCvelocity;
        NPCvelocity = NPCvelocity*3;
        
        var that = this;
        
        var checkNPCposition = setInterval(function(){
            if(Math.round(that.targetNPC1.y / 128) == Math.round(that.targetNPC1.hismove.y2 / 128)){
                
                that.game.time.events.add(Phaser.Timer.SECOND * 0.5,that.goBackTest, that);
                NPCvelocity = NPCvelocityTemp;
                clearInterval(checkNPCposition);
            }
        }, 1);
    }
    
    event6s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.targetNPC1.hismove.y2 = this.player.y - (1280*1.5);
        this.targetNPC1.animations.play("up");
        this.targetNPC1.hismove.walkingState = 4;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
            this.game.camera.flash('#000000');
            this.game.camera.follow(this.player);
            this.goBackTest();
            runningShoes = true;
            
            this.targetNPC1.animations.stop();
            this.targetNPC1.body.velocity.x = 0;
            this.targetNPC1.body.velocity.y = 0;
            this.targetNPC1.hismove.walkingState = 0;
            this.targetNPC1.x = this.targetNPC1.hismove.originalX;
            this.targetNPC1.y = this.targetNPC1.hismove.originalY;
            this.targetNPC1.hismove.y = this.targetNPC1.y;
            this.targetNPC1.hismove.y2 = this.targetNPC1.y;
            this.targetNPC1 = null;
        }, this);
    }
    
//EVENT 7   
    event7s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "se6camera"){
                this.targetNPC1 = walkablesArr[i];
            }
        }
        
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function(){
            this.goBackTest();
        }, this);
    }
    
    event7s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function(){
            this.game.camera.flash('#000000');
            this.game.camera.follow(this.player);
            this.goBackTest();
        }, this);
    }
    
//EVENT 8    
    event8s0(){
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
            this.goBackTest();
        }, this);
    }
    
//EVENT 9    
    event9s0(){
//        this.continueThing.destroy();
        console.log("start battle here!");
//        this.game.camera.fade();
        battleProc = true;
//        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
//            this.isText = 2;
//        }, this);
        
        eventNumber++;
        eventTextNumber = 0;
    }
    
//EVENT 13    
    event13s0(){
        this.eraseText();
        this.continueThing.destroy();
        console.log("13p1");
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "ne1camera"){
                this.targetNPC1 = walkablesArr[i];
            }
        }
        
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.015, 0.015);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
            this.goBackTest();
        }, this);
    }
    
    event13s1(){
        this.eraseText();
        this.continueThing.destroy();
        console.log("13p1");
        
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.015, 0.015);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
            this.goBackTest();
        }, this);
    }
    
    event13s2(){
        this.eraseText();
        this.continueThing.destroy();
        console.log("13p2");
        
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        this.game.time.events.add(Phaser.Timer.SECOND * 1,this.goBackTest, this);
        
    }
    
//EVENT 14    
    event14s0(){
//        this.eraseText();
        this.continueThing.destroy();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function(){
            for(var i = 0; i < NPCs.length - 1; i++){
                if(NPCs[i].hismove.npcName == "ne1lamp"){
                    console.log("found the lamp");
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
//                    NPCs[i].destroy();
                }
            }
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function(){
            this.goBackTest();
        }, this);
    }
    
//EVENT 15    
    event15s0(){
//        this.continueThing.destroy();
        console.log("start battle here!");
        //
        battleProc = true;
        console.log("IS GALYNAS BATTLE SOMEHOW PROCING THIS EVENT !15?????");
//        chapter = 8;
//        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
//            this.goBackTest();
//        }, this);
        eventNumber++;
        eventTextNumber = 0;
    }
    
//EVENT 18    
    event18s0(){
        this.continueThing.destroy();
        console.log("pan camera here");
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
            this.goBackTest();
        }, this);
    }
    
//EVENT 20    
    event20s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        currentDoor = undefined;
        currentNPC = null;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function(){
            this.goBackTest();
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
            TopDownGame.game.state.start('dorm');
        }, this);
    }
    
//EVENT 21  
    event21s0(){
        this.eraseText();
        this.continueThing.destroy();
        
         for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "dormCamera"){
                this.targetNPC1 = walkablesArr[i];
            }
        }
        
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.6, function(){
            this.goBackTest();
        }, this);
    }
    
    event21s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.6, function(){
            this.goBackTest();
        }, this);
    }
    
    event21s2(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.flash('#000000');
        this.game.camera.follow(this.player);
        this.game.time.events.add(Phaser.Timer.SECOND * 1,this.goBackTest, this);
    }
    
//EVENT 22    
    event22s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.shake(0.005, 1000);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2,this.goBackTest, this);
    }
    
    event22s1(){
    }
    
//EVENT 24    
    event24s0(){
        //        this.continueThing.destroy();
        console.log("start battle here!");
//        this.game.camera.fade();
        battleProc = true;
//        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
//            this.isText = 2;
//        }, this);
        
        eventNumber++;
        eventTextNumber = 0;
    }
    
//EVENT 25    
    event25s0(){
        this.continueThing.destroy();
        console.log("battle here!");
        
        
        this.game.camera.shake(0.005, 1000);
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "ramin"){
                console.log("should move him now");
                NPCs[i].x = 0;
                NPCs[i].y = 0;
                NPCs[i].hismove.x = 0;
                NPCs[i].hismove.x2 = 0;
                NPCs[i].hismove.y = 0;
                NPCs[i].hismove.y2 = 0;
            }
        }
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
            this.goBackTest();
        }, this);
    }
    
//EVENT 27    
    event27s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "jessie"){
                this.targetNPC1 = NPCs[i];
            }
        }
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){
            this.targetNPC1.frame = 5;
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            for(var i = 0; i < NPCs.length - 1; i++){
                if(NPCs[i].hismove.npcName == "microwaveItem"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
                }
            }
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.6, function(){
            this.targetNPC1.frame = 8;
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            gotMicrowave = true;
            this.goBackTest();
        }, this);
    }
    
//EVENT 28    
    event28s0(){
        this.eraseText();
        this.continueThing.destroy();
        gotNachos = true;
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "jakub"){
                this.targetNPC1 = NPCs[i];
            }
        }
        
        if(this.player.frame == 11){
        //moving the player    
            this.player.mymove.state = 3;
            this.player.mymove.y2 = this.player.mymove.y + 128;
            this.player.animations.play("down");
//            this.player.mymove.y2 = this.player.y;
            
        //turning the player back up    
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                this.player.frame = 2;
            }, this);
        //moving jakub NPC    
            this.game.time.events.add(Phaser.Timer.SECOND * 1.3, function(){
                this.targetNPC1.animations.play("left");
                this.targetNPC1.hismove.x2 = this.targetNPC1.x - Math.round(2 * 128);
                this.targetNPC1.hismove.walkingState = 2;
                
                
                var that = this;
                var checkNPCposition = setInterval(function(){
                if(Math.round(that.targetNPC1.x / 128) == Math.round(that.targetNPC1.hismove.x2 / 128)){
                    console.log("made it to x dest");
                    that.targetNPC1.hismove.x = that.targetNPC1.hismove.x2;
                    that.targetNPC1.hismove.walkingState = 0;
                    that.targetNPC1.body.velocity.x = 0;
                    
                    
                    that.targetNPC1.animations.play("up");
                    that.targetNPC1.hismove.y2 = that.targetNPC1.y - 1280;
                    that.targetNPC1.hismove.walkingState = 4;
                    clearInterval(checkNPCposition);
                }

                }, 1000);
            }, this);
            
        //moving the character after jakub
            this.game.time.events.add(Phaser.Timer.SECOND * 4.5, function(){
                this.player.mymove.state = 4;
                this.player.mymove.y2 = this.player.mymove.y - 128;
                this.player.animations.play("up");
            }, this);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5, function(){
                this.player.mymove.state = 1;
                this.player.mymove.x2 = this.player.mymove.x + 128;
                this.player.animations.play("right");
            }, this);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5.5, function(){
                this.player.frame = 2;
                this.targetNPC1.x = 0;
                this.targetNPC1.hismove.x = 0;
                this.targetNPC1.hismove.x2 = 0;
                this.targetNPC1.y = 0;
                this.targetNPC1.hismove.y = 0;
                this.targetNPC1.hismove.y2 = 0;
            }, this);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5.6, function(){
                this.goBackTest();
            }, this);
        }
        
        else if(this.player.frame == 8){
            this.game.time.events.add(Phaser.Timer.SECOND * 1.3, function(){
                this.targetNPC1.animations.play("left");
                this.targetNPC1.hismove.x2 = this.targetNPC1.x - Math.round(2 * 128);
                this.targetNPC1.hismove.walkingState = 2;
                
                
                var that = this;
                var checkNPCposition = setInterval(function(){
                if(Math.round(that.targetNPC1.x / 128) == Math.round(that.targetNPC1.hismove.x2 / 128)){
                    console.log("made it to x dest");
                    that.targetNPC1.hismove.x = that.targetNPC1.hismove.x2;
                    that.targetNPC1.hismove.walkingState = 0;
                    that.targetNPC1.body.velocity.x = 0;
                    
                    
                    that.targetNPC1.animations.play("up");
                    that.targetNPC1.hismove.y2 = that.targetNPC1.y - 1280;
                    that.targetNPC1.hismove.walkingState = 4;
                    clearInterval(checkNPCposition);
                }

                }, 1000);
            }, this);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5, function(){
                this.player.mymove.state = 2;
                this.player.mymove.x2 = this.player.mymove.x - 128;
                this.player.animations.play("left");
            }, this);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5.5, function(){
                this.player.frame = 2;
                this.targetNPC1.x = 0;
                this.targetNPC1.hismove.x = 0;
                this.targetNPC1.hismove.x2 = 0;
                this.targetNPC1.y = 0;
                this.targetNPC1.hismove.y = 0;
                this.targetNPC1.hismove.y2 = 0;
            }, this);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5.6, function(){
                this.goBackTest();
            }, this);
        }
    }
    
    event28s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "NACHOS"){
                this.targetNPC2 = NPCs[i];
            }
        }
        
        this.targetNPC2.x = 0;
        this.targetNPC2.y = 0;
        this.targetNPC2.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                this.goBackTest();
            }, this);
    }
    
//EVENT 29    
    event29s0(){
        this.continueThing.destroy();
        gotLaptop = true;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            for(var i = 0; i < NPCs.length - 1; i++){
                if(NPCs[i].hismove.npcName == "henryLaptop"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
                }
            }
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
            this.goBackTest();
        }, this);
    }
    
    event29s1(){
        this.continueThing.destroy();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function(){
            this.goBackTest();
        }, this);
    }
    
//EVENT 30    
    event30s0(){
        this.continueThing.destroy();
        gotKettle = true;
        
        for(var i = 0; i < NPCs.length - 1; i++){
                if(NPCs[i].hismove.npcName == "KETLLE"){
                    NPCs[i].x = 0;
                    NPCs[i].y = 0;
                }
            }
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
            this.goBackTest();
        }, this);
    }
    
//EVENT 32    
    event32s0(){
        //        this.continueThing.destroy();
        console.log("start battle here!");
//        this.game.camera.fade();
        battleProc = true;
//        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
//            this.isText = 2;
//        }, this);
        
        eventNumber++;
        eventTextNumber = 0;
    }
    
//EVENT 33    
    event33s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function(){
            this.goBackTest();
        }, this);
    }
//EVENT 34    
    event34s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        currentDoor = undefined;
        currentNPC = null;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function(){
            this.goBackTest();
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
            TopDownGame.game.state.start('tunnel');
        }, this);
    }
//EVENT 37    
    event37s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.shake(0.005, 1000);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
            this.goBackTest();
        }, this);
    }
//EVENT 38    
    event38s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.camera.shake(0.005, 1000);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
            this.goBackTest();
        }, this);
    }
//EVENT 39
    event39s0(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "tunnelCamera"){
                this.targetNPC1 = walkablesArr[i];
            }
        }
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.015, 0.015);
        
        music.fadeOut(1500)
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
            music.destroy();
            music = this.game.add.audio("findRamin-music");
            music.fadeIn(1500);
            music.loopFull(1);
        }, this);
        

        
        this.game.time.events.add(Phaser.Timer.SECOND * 3.5, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s1(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < walkablesArr.length - 1; i++){
            if(walkablesArr[i].coolProperties.eventNPC && walkablesArr[i].coolProperties.eventID == "tunnelCamera2"){
                this.targetNPC1 = walkablesArr[i];
            }
        }
        this.game.camera.follow(this.targetNPC1, Phaser.Camera.FOLLOW_LOCKON, 0.015, 0.015);
        
        this.player.mymove.state = 4;
        this.player.animations.play("up");
        this.player.mymove.y2 = Math.floor(this.player.mymove.y) - (Math.round(128 * 6));
        
        this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s2(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "ramin"){
                this.targetNPC2 = NPCs[i];
            }
        }
        
        this.targetNPC2.frame = 5
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.0000001, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s3(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.targetNPC2.animations.play("down");
        this.targetNPC2.hismove.y2 = this.targetNPC2.y - Math.round(128);
        this.targetNPC2.hismove.walkingState = 4;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s4(){
        this.eraseText();
        this.continueThing.destroy();
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "monk1"){
                this.targetNPC3 = NPCs[i];
            } else if(NPCs[i].hismove.npcName == "monk2"){
                this.targetNPC4 = NPCs[i];
            }
        }
        
        var NPCvelocityTemp = NPCvelocity;
        NPCvelocity = NPCvelocity/2;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
            this.targetNPC3.animations.play("right");
            this.targetNPC3.hismove.x2 = this.targetNPC3.hismove.x + Math.round(128);
            this.targetNPC3.hismove.walkingState = 1;
            
            this.targetNPC4.animations.play("left");
            this.targetNPC4.hismove.x2 = this.targetNPC4.hismove.x - Math.round(128);
            this.targetNPC4.hismove.walkingState = 2;
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            this.targetNPC3.hismove.x = this.targetNPC3.hismove.x2;
            this.targetNPC3.hismove.walkingState = 0;
            this.targetNPC3.body.velocity.x = 0;
            
            this.targetNPC3.animations.play("down");
            this.targetNPC3.hismove.y2 = this.targetNPC3.hismove.y + Math.round(128 * 1);
            this.targetNPC3.hismove.walkingState = 3;
            
            this.targetNPC4.hismove.x = this.targetNPC4.hismove.x2;
            this.targetNPC4.hismove.walkingState = 0;
            this.targetNPC4.body.velocity.x = 0;
            
            this.targetNPC4.animations.play("down");
            this.targetNPC4.hismove.y2 = this.targetNPC4.hismove.y + Math.round(128 * 1);
            this.targetNPC4.hismove.walkingState = 3;
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
            NPCvelocity = NPCvelocityTemp;
            this.goBackTest();
        }, this);
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "henry"){
                this.targetNPC5 = NPCs[i];
            }
        }
        
        this.tempX = Math.round(this.player.x / 128);
        this.targetNPC5.x = Math.round((this.tempX + 1) * 128);
        this.targetNPC5.y = this.player.y + 512;
    }
    
    event39s5(){
        this.eraseText();
        this.continueThing.destroy();
        
        faceDownAfterWalkingUp = false;
        
        this.targetNPC5.animations.play("up");
        this.targetNPC5.hismove.y2 = this.player.mymove.y;
        this.targetNPC5.hismove.walkingState = 4;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s6(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
            this.game.camera.flash('0xffffff');
            this.targetNPC3.x = 0;
            this.targetNPC3.y = 0;
        }, this);
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s7(){
        this.eraseText();
        this.continueThing.destroy();
        
        faceDownAfterWalkingUp = true;
        
        this.targetNPC4.hismove.x = this.targetNPC4.hismove.x2;
        this.targetNPC4.hismove.walkingState = 0;
        this.targetNPC4.body.velocity.x = 0;

        this.targetNPC4.animations.play("down");
        this.targetNPC4.hismove.y2 = this.targetNPC4.hismove.y - Math.round(128 * 1);
        this.targetNPC4.hismove.walkingState = 4;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
            this.goBackTest();
        }, this);
    }
    
    event39s8(){
        this.eraseText();
        this.continueThing.destroy();
        
        faceDownAfterWalkingUp = false;
        var NPCvelocityTemp = NPCvelocity;
        NPCvelocity = NPCvelocity/1.5;
        
        this.targetNPC5.hismove.x = this.targetNPC5.hismove.x2;
        this.targetNPC5.hismove.walkingState = 0;
        this.targetNPC5.body.velocity.x = 0;

        this.targetNPC5.animations.play("up");
        this.targetNPC5.hismove.y2 = this.targetNPC5.hismove.y - Math.round(128 * 2);
        this.targetNPC5.hismove.walkingState = 4;
        
        for(var i = 0; i < NPCs.length - 1; i++){
            if(NPCs[i].hismove.npcName == "finalBlock"){
                NPCs[i].x = NPCs[i].hismove.originalX;
                NPCs[i].y = NPCs[i].hismove.originalY;
            }
        }
        
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            NPCvelocity = NPCvelocityTemp;
            this.goBackTest();
        }, this);
    }
    
    event39s9(){
        this.eraseText();
        this.continueThing.destroy();
        
        this.game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){
            this.game.camera.flash('0x000000');
            this.game.camera.follow(this.player);
            this.goBackTest();
        }, this);
    }
        
    event40s0(){
        this.eraseText();
        this.continueThing.destroy();
        console.log("fight here");
        
        music.pause();
        this.game.camera.fade('#000000');
//        music.pause();
//        music.destroy();
//        TopDownGame.game.state.start("splash2");
        
//        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
//            this.goBackTest();
//        }, this);
    }
        
}

