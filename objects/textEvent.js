class testEvent extends abstractObject {

    constructor() {
        super();
        this.person1text = ["This is bs", 
            "I can't believe I have to do this again", 
            "Please make it stop", 
            "It's already dead!"];
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
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.game.physics.arcade.overlap(this.player, this.textEvents.children, this.readText, null, this);
    }

    readText() {

        if (this.enterBut.isDown){
            makeABox();

        }
    }
    
    printing(person, lineNum) {

        var letter = 0;
        var id = setInterval(frame, 20);
        function frame() {  
            if (letter >= person[lineNum].length) {
                clearInterval(id);
            } else {
                var addLetters = text.substring(0,letter);
                tester.innerText = addLetters;
                letter++; 

            }
          }
    }    
   
}      

var text = null;

var theBody = document.getElementById("container");
console.log(theBody, "body");

function makeABox(){
    var tBox = document.createElement("div");
    tBox.style.position = "absolute";
    tBox.style.bottom = "0";
    tBox.style.left = "0";
    //console.log(tBox, theBody);
    theBody.appendChild(tBox); 
}


