var TopDownGame = TopDownGame || {};

var theGameZoom = 400;

TopDownGame.game = new Phaser.Game(theGameZoom, theGameZoom, Phaser.AUTO, "container");

TopDownGame.game.state.add("Boot", TopDownGame.Boot);
TopDownGame.game.state.add("Preload", TopDownGame.Preload);
TopDownGame.game.state.add("TestLevel", TopDownGame.testLevel);
TopDownGame.game.state.add("TestLevel2", TopDownGame.testLevel2);
TopDownGame.game.state.add("TestLevel3", TopDownGame.testLevel3);

TopDownGame.game.state.start("Boot");