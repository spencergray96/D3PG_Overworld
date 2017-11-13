var TopDownGame = TopDownGame || {};

var theGameZoom = 200;

TopDownGame.game = new Phaser.Game(theGameZoom, theGameZoom, Phaser.AUTO, "testdiv");

TopDownGame.game.state.add("Boot", TopDownGame.Boot);
TopDownGame.game.state.add("Preload", TopDownGame.Preload);

TopDownGame.game.state.add("gridtestmovement", TopDownGame.gridtestmovement);
TopDownGame.game.state.add("se14", TopDownGame.se14);

TopDownGame.game.state.start("Boot");