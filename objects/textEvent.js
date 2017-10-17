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
            }

            //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        } 

}


var person1text = ["This is bs", 
            "I can't believe I have to do this again", 
            "Please make it stop", 
            "It's already dead!"];  

var theBody = document.getElementById("container");

function makeABox() {

        var tBox = document.createElement("div");
        tBox.style.bottom = "10px";
        tBox.style.left = "0";
        tBox.style.right = "0";
        tBox.style.height = "200px";
        tBox.style.width = "100%";
        tBox.style.position = "absolute";
        tBox.style.backgroundImage = "url('../assets/ui/menuBar.svg')";
        tBox.style.backgroundRepeat = "no-repeat";
        tBox.style.backgroundSize = "cover";
        tBox.style.position = "absolute";
        tBox.style.textAlign = "center";
        theBody.appendChild(tBox); 
        printText(tBox, person1text, 1);
    }    

function printText(textBox, personTalking, lineNum) {

    var letter = 0;
    var id = setInterval(frame, 80);
    
    function frame() {  
        if (letter > personTalking[lineNum].length) {
            clearInterval(id);
            if (!letter){
                theBody.removeChild(textBox);
                console.log("hello");
            }
            
        } else {
            var addLetters = personTalking[lineNum].substring(0,letter);
            textBox.innerText = addLetters;
            letter++; 

        }
    }
}



