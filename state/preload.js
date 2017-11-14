var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function () {};

TopDownGame.Preload.prototype = {
    preload: function () {

        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadbar");
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap("test", "/assets/tilemaps/test.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap("test2", "/assets/tilemaps/test2.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap("test3", "/assets/tilemaps/test3.json", null, Phaser.Tilemap.TILED_JSON);
        
        //grid movement velocity testing
        this.load.tilemap("testtilepack", "/assets/tilemaps/testtilepack.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("testtilepack", "/assets/images/testtilepack.png");
        
        //se14
        this.load.tilemap("se14", "/assets/tilemaps/se14.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("task13", "/assets/images/task13.png");
        
        this.load.image("gameTiles", "/assets/images/tiles.png");
        this.load.image("player", "/assets/characters/spritesheet/spencer/spencer-facing-forward.png");
        this.load.image("dov", "/assets/characters/spritesheet/dove/dove-front-still.png");
        this.load.image("browndoor", "/assets/images/browndoor.png");
        
        this.load.image("watermelon", "/assets/images/bluecup.png");
        
        this.load.image("textBox", "/assets/ui/menuBar.png");
        this.load.image("hand", "/assets/ui/cursor.png");
        this.load.image("hand-left", "/assets/ui/cursor-left.png");
        this.load.image("hand-down", "/assets/ui/cursor-down.png");
        this.load.image("hand-up", "/assets/ui/cursor-up.png");
        
        this.load.spritesheet("spencer_spritesheet", "/assets/characters/compiledCharacterSpritesheets/spencer_spritesheet.png", 32, 32);
        
        //chat heads
        this.load.image("spencerCH", "/assets/characters/chatHeads/Spencerflipped.png");
        this.load.image("dovCH", "/assets/characters/chatHeads/Doveflipped.png");
        this.load.image("jamesCH", "/assets/characters/chatHeads/James2flipped.png");
        this.load.image("raymondCH", "/assets/characters/chatHeads/Raymondflipped.png");

    },
    create: function () {

        this.state.start("se14");
    }
};