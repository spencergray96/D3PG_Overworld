class splash extends Phaser.State {

    constructor() {
        super();
    }

    create(game) {
        super.create();
        
        this.splashVideo = this.game.add.video("splash");
        this.sprite = this.splashVideo.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 1, 1);
        this.splashVideo.play(true);
        
        this.d3pgtitle = this.game.add.image(this.game.width/16, this.game.height/6, "d3pg-title");
        
        this.pressEnter = this.game.add.sprite(this.game.width/8, (this.game.height - this.game.height/4), "press-enter");
        this.enterToZero();
        
        this.pressEnter2 = this.game.add.sprite(this.game.width/8, (this.game.height - this.game.height/4), "press-enter");
        this.pressEnter2.animations.add("flashEnter", [0, 1], 8, true);
        this.pressEnter2.animations.play("flashEnter");
        this.pressEnter2.alpha = 0;
        
        this.fadeContainer = this.game.add.image(0, 0, "full-blank");
        this.fadeContainer.alpha = 0;
        
        this.pressedEnterYet = false;
        this.EnterButtSplash = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        music = this.game.add.audio('intro-music');
        music.play();
        music.loopFull(1);
    }

    update(game, player) {
        this.createControlsSplash();
        
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
    
    createControlsSplash(){
        if(this.EnterButtSplash.isDown && !this.pressedEnterYet){
            this.pressedEnterYet = true;
            
            this.sfx = this.game.add.audio("UISelect2");
            this.sfx.volume = 1;
            this.sfx.play();
            
            this.pressEnter.destroy();
            this.pressEnter2.alpha = 1;
            
            
            this.game.add.tween(this.fadeContainer).to({alpha: 1}, Phaser.Timer.SECOND * 1, "Linear", true);

            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){

                    console.log("going back to preload");
                    this.sprite.destroy();
                    this.splashVideo.destroy();
                    TopDownGame.game.state.start('overworld');

            }, this)
        }
    }
}

TopDownGame.splash = splash;