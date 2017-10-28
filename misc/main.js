var TopDownGame = TopDownGame || {};

var zoomthingy = 200;
TopDownGame.game = new Phaser.Game(zoomthingy, zoomthingy, Phaser.AUTO, "testdiv");

TopDownGame.game.state.add("Boot", TopDownGame.Boot);
TopDownGame.game.state.add("Preload", TopDownGame.Preload);
TopDownGame.game.state.add("TestLevel", TopDownGame.testLevel);
TopDownGame.game.state.add("TestLevel2", TopDownGame.testLevel2);
TopDownGame.game.state.add("TestLevel3", TopDownGame.testLevel3);

TopDownGame.game.state.add("gridtestmovement", TopDownGame.gridtestmovement);

TopDownGame.game.state.start("Boot");