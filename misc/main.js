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
TopDownGame.game.state.add("sw03", TopDownGame.sw03);
TopDownGame.game.state.add("theStand", TopDownGame.theStand);
TopDownGame.game.state.add("NE1", TopDownGame.NE1);
TopDownGame.game.state.add("dorm", TopDownGame.dorm);
TopDownGame.game.state.add("mainHub", TopDownGame.mainHub);

//testing128
TopDownGame.game.state.add("testing128", TopDownGame.testing128);

TopDownGame.game.state.start("Boot");