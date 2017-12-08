var sfx;
class splashClass extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        this.createSplash(game);
    }

    updateThis(game, player) {
        super.updateThis(game, player);
        this.createControls();
    }
    
    createSplash(game){
        console.log("splashclass");
        
        this.splashVideo = this.game.add.video("splash");
        this.sprite = this.splashVideo.addToWorld(0, 0, 0, 0, 1, 1);
        this.sprite.fixedToCamera = true;
        this.splashVideo.play(true);
        
        this.pressEnter = this.game.add.sprite(this.game.width/8, (this.game.height - this.game.height/4), "press-enter");
        this.pressEnter.animations.add("flashEnter", [0, 1], 8, true);
        this.enterToZero();
        
        this.pressedEnterYet = false;
        this.EnterButt = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    enterToZero(){
        if(!this.pressedEnterYet){
            this.game.add.tween(this.pressEnter).to({alpha: 0}, Phaser.Timer.SECOND * 1, "Linear", true);
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
            if(!this.pressedEnterYet){
                this.enterToFull();
            } else {
                this.game.add.tween(this.pressEnter).to({alpha: 1}, Phaser.Timer.SECOND * 0.000000001, "Linear", true);
            }
        }, this);
    }
    
    enterToFull(){
        
        this.game.add.tween(this.pressEnter).to({alpha: 1}, Phaser.Timer.SECOND * 1, "Linear", true);

        if(!this.pressedEnterYet){            
            this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
                if(!this.pressedEnterYet){
                    this.enterToZero();
                }
            }, this);
        } else {

        }
    }
    
    createControls(){
        if(this.EnterButt.isDown && !this.pressedEnterYet){
            this.pressedEnterYet = true;
                    sfx = this.game.add.audio("UISelect2");
                    sfx.volume = 1;
                    sfx.play();            
//            this.game.add.tween(this.pressEnter).to({alpha: 1}, Phaser.Timer.SECOND * 0.000000001, "Linear", true);
            this.pressEnter.destroy();
            this.pressEnter = this.game.add.sprite(this.game.width/8, (this.game.height - this.game.height/4), "press-enter");
            this.pressEnter.animations.add("flashEnter", [0, 1], 8, true);
            this.pressEnter.animations.play("flashEnter");
            
            this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function(){
                this.game.camera.fade('#000000', 1000);
                
                this.game.camera.onFadeComplete.add(function(){
                    this.pressEnter.destroy();
                    this.sprite.destroy();
                    this.game.camera.flash(0x000000, 500);
                },this);
                
            }, this)
        }
    }
}