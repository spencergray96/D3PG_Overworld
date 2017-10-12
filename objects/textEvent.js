var person1text = ["This is bullshit", 
            "I can't believe I have to do this again for another semester", 
            "Please make it stop", 
            "It's already dead!"
           ];
        var style = { font: "24px Arial", fill: "#ffffff", align: "center" };        
        var text = null;

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
            text = this.game.add.text(0, 0, person1text[3], style);
            text.fixedToCamera = true;
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

            //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
            text.setTextBounds(0, 100, 800, 100);
            
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

var theBody = document.getElementById("container");

function makeABox(){
    var tBox = document.createElement("div");
    tBox.width = "90vw";
    tBox.height = "20vw";
    theBody.appendChild(tBox); 
}


