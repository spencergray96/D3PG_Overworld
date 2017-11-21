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
        
        //sw03
        this.load.tilemap("sw03", "/assets/tilemaps/sw3.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("task14", "/assets/images/task14.png");
        
        //the Stand
        this.load.tilemap("theStand", "/assets/tilemaps/stand.json", null, Phaser.Tilemap.TILED_JSON);
        
        //NE1
        this.load.tilemap("NE1map", "/assets/tilemaps/NE1.json", null, Phaser.Tilemap.TILED_JSON);
//        this.load.image("backgroundTiles", "/assets/images/background.png");
        this.load.image("NE1", "/assets/images/NE1.png");
        
        //dorm
        this.load.tilemap("dorm", "/assets/tilemaps/dorm.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("dormcopy", "/assets/images/dormcopy.png");
        this.load.image("dorm2copy", "/assets/images/dorm2copy.png");
        
        //overworld test
        this.load.tilemap("mainHubTest", "/assets/tilemaps/mainHubTest.json", null, Phaser.Tilemap.TILED_JSON);
        
        
        //TESTING 64
//        this.load.tilemap("se14", "/assets/tilemaps/testing64/se14-64.json", null, Phaser.Tilemap.TILED_JSON);
//        this.load.image("task13", "/assets/images/64testing/task13_copy64.png");
        
        this.load.image("gameTiles", "/assets/images/tiles.png");
        this.load.image("player", "/assets/characters/spritesheet/spencer/spencer-facing-forward.png");
        this.load.image("dov", "/assets/characters/spritesheet/dove/dove-front-still.png");
        this.load.image("browndoor", "/assets/images/browndoor.png");
        
        this.load.image("watermelon", "/assets/images/bluecup.png");
        
        //ui
        this.load.image("mainBox", "/assets/ui/containers/mainMenu-container.png");
        this.load.image("longBox", "/assets/ui/containers/smallTextBox-container.png");
        this.load.image("singleBox", "/assets/ui/containers/oneWordTextBox-container.png");
        
        this.load.image("hand", "/assets/ui/cursor.png");
        this.load.image("hand-left", "/assets/ui/cursor-left.png");
        this.load.image("hand-down", "/assets/ui/triangle-down.png");
        this.load.image("hand-up", "/assets/ui/triangle-up.png");
        
        this.load.spritesheet("spencer_spritesheet", "/assets/characters/spritesheet/spencer/spencer-spritesheet.png", 128, 128);
        this.load.spritesheet("dov_spritesheet", "/assets/characters/spritesheet/dove/dove-spritesheet.png", 128, 128);
        this.load.spritesheet("james_spritesheet", "/assets/characters/spritesheet/james/james-spritesheet.png", 128, 128);
        this.load.spritesheet("raymond_spritesheet", "/assets/characters/spritesheet/raymond/raymond-spritesheet.png", 128, 128);
        
        //chat heads
        this.load.image("spencerCH", "/assets/characters/chatHeads/Spencerflipped.png");
        this.load.image("dovCH", "/assets/characters/chatHeads/Doveflipped.png");
        this.load.image("jamesCH", "/assets/characters/chatHeads/James2flipped.png");
        this.load.image("raymondCH", "/assets/characters/chatHeads/Raymondflipped.png");

    },
    create: function () {

        this.state.start("mainHub");
    }
};