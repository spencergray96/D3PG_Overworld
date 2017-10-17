class testEvent extends abstractObject {

    constructor() {
        super();
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

            //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
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
                tBox.innerText = addLetters;
                letter++; 

            }
          }
    }    
   
}

var person1text = ["This is bs", 
            "I can't believe I have to do this again", 
            "Please make it stop", 
            "It's already dead!"
           ];

var style = { font: "24px Arial", fill: "#ffffff", align: "center" };        

var text = null;

var theBody = document.getElementById("container");
console.log(theBody, "body");
function makeABox(){
    console.log("hi");
    var tBox = document.createElement("div");
    tBox.style.width = "90vw";
    tBox.style.width = "90vw";
    tBox.style.height = "20vw";
    tBox.style.position = "absolute";
    tBox.style.color = "fff";
    tBox
    theBody.appendChild(tBox); 
}


