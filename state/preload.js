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
        this.load.image("gameTiles", "/assets/images/tiles.png");
        this.load.image("player", "/assets/images/player.png");
        this.load.image("browndoor", "/assets/images/browndoor.png");

    },
    create: function () {

        this.state.start("TestLevel");
    }
};