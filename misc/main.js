var TopDownGame = TopDownGame || {};

var theGameZoom = 800;

TopDownGame.game = new Phaser.Game(theGameZoom, theGameZoom, Phaser.AUTO, "testdiv");

TopDownGame.game.state.add("Boot", TopDownGame.Boot);
TopDownGame.game.state.add("Preload", TopDownGame.Preload);
TopDownGame.game.state.add("TestLevel", TopDownGame.testLevel);
TopDownGame.game.state.add("TestLevel2", TopDownGame.testLevel2);
TopDownGame.game.state.add("TestLevel3", TopDownGame.testLevel3);

TopDownGame.game.state.add("gridtestmovement", TopDownGame.gridtestmovement);
TopDownGame.game.state.add("se14", TopDownGame.se14);

//testing128
TopDownGame.game.state.add("testing128", TopDownGame.testing128);

TopDownGame.game.state.start("Boot");