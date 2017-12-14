var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function () {};

TopDownGame.Preload.prototype = {
    preload: function () {

        //show loading screen
//        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadbar");
//        this.preloadBar.anchor.setTo(0.5);

//        this.load.setPreloadSprite(this.preloadBar);
        
        this.loadingSprite = this.game.add.sprite(this.game.width / 6, this.game.height / 2.3, "loading_spritesheet");
        this.loadingSprite.animations.add("loadingAnim", [0, 1, 2, 3], 4, true);
        this.loadingSprite.animations.play("loadingAnim");
        
//        this.load.setPreloadSprite(this.loadingSprite);
        
        //grid movement velocity testing
        this.load.tilemap("testtilepack", "/assets/tilemaps/testtilepack.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("testtilepack", "/assets/images/testtilepack.png");
        
        //se14
        this.load.tilemap("se14", "/assets/tilemaps/se14.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("task13", "/assets/images/task13.png");
        this.load.image("nov24", "/assets/images/nov24-copy.png");
        
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
        
        //se6
        this.load.tilemap("se6office", "/assets/tilemaps/se6office.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("nov14", "/assets/images/nov14.png");
        
        //overworld
        this.load.tilemap("overworld", "/assets/tilemaps/overworld.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("brick", "/assets/images/background-overworld/brick.png");
        this.load.image("brick2", "/assets/images/background-overworld/brick2.png");
        this.load.image("cementcopy", "/assets/images/background-overworld/cementcopy.png");
        this.load.image("dirt", "/assets/images/background-overworld/dirt.png");
        this.load.image("grass1", "/assets/images/background-overworld/grass1.png");
        this.load.image("grass2", "/assets/images/background-overworld/grass2.png");
        this.load.image("parkingLines", "/assets/images/background-overworld/parkingLines.png");
        this.load.image("SE6", "/assets/images/background-overworld/SE6.png");
        this.load.image("se12", "/assets/images/background-overworld/se12.png");
        this.load.image("se14", "/assets/images/background-overworld/se14.png");
        this.load.image("sidewalk", "/assets/images/background-overworld/sidewalk.png");
        this.load.image("sidewalkWithCurb", "/assets/images/background-overworld/sidewalkWithCurb.png");
        this.load.image("treeandbush", "/assets/images/background-overworld/treeandbush.png");
        this.load.image("zzzCone", "/assets/images/zzzCone.png");
        this.load.image("Dec1meeting", "/assets/images/Dec1meeting.png");
        this.load.image("sign", "/assets/Sign/sign.png");
        this.load.image("sign2", "/assets/Sign/Sign2/sign2.png");
        
        //tunnel
        this.load.tilemap("tunnel", "/assets/tilemaps/tunnel.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("nov21", "/assets/images/nov21.png");
        this.load.image("nov22", "/assets/images/nov22.png");
        
        //overworld test
        this.load.tilemap("mainHubTest", "/assets/tilemaps/mainHubTest.json", null, Phaser.Tilemap.TILED_JSON);
        
        
        //TESTING 64
//        this.load.tilemap("se14", "/assets/tilemaps/testing64/se14-64.json", null, Phaser.Tilemap.TILED_JSON);
//        this.load.image("task13", "/assets/images/64testing/task13_copy64.png");
        
        this.load.image("gameTiles", "/assets/images/tiles.png");
        this.load.image("player", "/assets/characters/spritesheet/spencer/spencer-facing-forward.png");
        this.load.image("dov", "/assets/characters/spritesheet/dove/dove-front-still.png");
        this.load.image("browndoor", "/assets/images/browndoor.png");
        
        this.load.image("bluecup", "/assets/images/bluecup.png");
        
        //ui
        this.load.image("mainBox", "/assets/ui/containers/mainMenu-container.png");
        this.load.image("longBox", "/assets/ui/containers/smallTextBox-container.png");
        this.load.image("singleBox", "/assets/ui/containers/oneWordTextBox-container.png");
        this.load.image("textBox", "/assets/ui/containers/textBox-container.png");
        this.load.image("whiteBox", "/assets/ui/containers/whiteBox.png");
        
        this.load.image("hand", "/assets/ui/cursor.png");
        this.load.image("hand-left", "/assets/ui/cursor-left.png");
//        this.load.image("hand-down", "/assets/ui/triangle-down.png");
//        this.load.image("hand-up", "/assets/ui/triangle-up.png");
        
        this.load.image("pauseMap", "/assets/ui/map/map.png");
        
        this.load.spritesheet("loading_spritesheet", "/assets/ui/loadingSprite/loadingspritesheet.png", 533, 200);
        
        //character spritesheets
        
        //main characters
        this.load.spritesheet("spencer_spritesheet", "/assets/characters/spritesheet/spencer/spencer-spritesheet.png", 128, 128);
        this.load.spritesheet("dov_spritesheet", "/assets/characters/spritesheet/dove/dove-spritesheet.png", 128, 128);
        this.load.spritesheet("james_spritesheet", "/assets/characters/spritesheet/james/james-spritesheet.png", 128, 128);
        this.load.spritesheet("raymond_spritesheet", "/assets/characters/spritesheet/raymond/raymond-spritesheet.png", 128, 128);
        
        //secondary characters
        this.load.spritesheet("arron_spritesheet", "/assets/characters/spritesheet/aaron/aaron-sprite.png", 128, 128);
        this.load.spritesheet("august_spritesheet", "/assets/characters/spritesheet/august/august.png", 128, 128);
        this.load.spritesheet("construction_spritesheet", "/assets/characters/spritesheet/construction-worker/construction-sprite.png", 128, 128);
        this.load.spritesheet("daemon_spritesheet", "/assets/characters/spritesheet/daemon/daemon-sprite.png", 128, 128);
        this.load.spritesheet("galyna_spritesheet", "/assets/characters/spritesheet/galyna/galyna-spritesheet.png", 128, 128);
        this.load.spritesheet("henry_spritesheet", "/assets/characters/spritesheet/henry/henry-spritesheet.png", 128, 128);
        this.load.spritesheet("jakub_spritesheet", "/assets/characters/spritesheet/jakub/jakub-spritesheet.png", 128, 128);
        this.load.spritesheet("jessie_spritesheet", "/assets/characters/spritesheet/Jessie/Jessie.png", 128, 128);
        this.load.spritesheet("monk_spritesheet", "/assets/characters/spritesheet/npc/npc.png", 128, 128);
        this.load.spritesheet("ramin_spritesheet", "/assets/characters/spritesheet/ramin/ramin-sprite.png", 128, 128);
        
        this.load.spritesheet("genericman_spritesheet", "/assets/characters/spritesheet/generic-man/genericman-sprite.png", 128, 128);
        this.load.spritesheet("genericwoman_spritesheet", "/assets/characters/spritesheet/generic-woman/genericwoman-sprite.png", 128, 128);
        
        this.load.spritesheet("genericman_spritesheet2", "/assets/characters/spritesheet/generic-man/modifications/genericman-sprite2.png", 128, 128);
        this.load.spritesheet("genericman_spritesheet3", "/assets/characters/spritesheet/generic-man/modifications/genericman-sprite3.png", 128, 128);
        this.load.spritesheet("genericman_spritesheet4", "/assets/characters/spritesheet/generic-man/modifications/genericman-sprite4.png", 128, 128);
        this.load.spritesheet("genericman_spritesheet5", "/assets/characters/spritesheet/generic-man/modifications/genericman-sprite5.png", 128, 128);
        
        this.load.spritesheet("genericwoman_spritesheet2", "/assets/characters/spritesheet/generic-woman/modifications/genericwoman-sprite2.png", 128, 128);
        this.load.spritesheet("genericwoman_spritesheet3", "/assets/characters/spritesheet/generic-woman/modifications/genericwoman-sprite3.png", 128, 128);
        this.load.spritesheet("genericwoman_spritesheet4", "/assets/characters/spritesheet/generic-woman/modifications/genericwoman-sprite4.png", 128, 128);
        this.load.spritesheet("genericwoman_spritesheet5", "/assets/characters/spritesheet/generic-woman/modifications/genericwoman-sprite5.png", 128, 128);
        
        //FIRE ANIMATION
        this.load.spritesheet("fire_spritesheet", "/assets/images/fireSpriteSheet/fireSpriteSheet.png", 128, 128);
        
        //ARROW ANIMATIONS
        this.load.spritesheet("hand-down", "/assets/ui/triangle-down/triangle-down.png", 13, 20);
        this.load.spritesheet("hand-up", "/assets/ui/triangle-up/triangle-up.png", 13, 20);
        
        //PIN ANIMATION
        this.load.spritesheet("pin-animation", "/assets/ui/pin-animation/pin-animation.png", 128, 128);
        this.load.spritesheet("pin-animation-green", "/assets/ui/pin-animation/pin-animation-green.png", 128, 128);
        this.load.spritesheet("pin-animation-purple", "/assets/ui/pin-animation/pin-animation-purple.png", 128, 128);
        this.load.spritesheet("pin-animation-yellow", "/assets/ui/pin-animation/pin-animation-yellow.png", 128, 128);
        this.load.spritesheet("pin-animation-brown", "/assets/ui/pin-animation/pin-animation-brown.png", 128, 128);
        
        this.load.image("daemonBattle", "/assets/characters/BattleCharacter/DEMON.png");
        this.load.image("galynaBattle", "/assets/characters/mainBosses/galynaMainBoss.png");
        this.load.image("henryBattle", "/assets/characters/mainBosses/henryMainBoss.png");
        this.load.image("arronBattle", "/assets/characters/mainBosses/arronBattle.png");
        this.load.image("raminBattle", "/assets/characters/mainBosses/Ramin.png");
        
        
    //chat heads
        //main characters
        this.load.image("spencerCH", "/assets/characters/chatHeads/Spencerflipped.png");
        this.load.image("dovCH", "/assets/characters/chatHeads/Doveflipped.png");
        this.load.image("jamesCH", "/assets/characters/chatHeads/James2flipped.png");
        this.load.image("raymondCH", "/assets/characters/chatHeads/Raymondflipped.png");
        //others
        this.load.image("jessieCH", "/assets/characters/chatHeads/Jessie.png");
        this.load.image("jakubCH", "/assets/characters/chatHeads/jakub.png");
        this.load.image("augustCH", "/assets/characters/chatHeads/augustCH.png");
        
        this.load.image("henryCH", "/assets/characters/chatHeads/herny.png");
        this.load.image("raminCH", "/assets/characters/chatHeads/ramin.png");
        this.load.image("daemonCH", "/assets/characters/chatHeads/Demon.png");
        this.load.image("galynaCH", "/assets/characters/chatHeads/galina.png");
        this.load.image("arronCH", "/assets/characters/chatHeads/Arron.png");
        
        this.load.image("monkCH", "/assets/characters/chatHeads/npc.png");
        this.load.image("conCH", "/assets/characters/chatHeads/constructionworker.png");
        
        //background characters
        this.load.image("boy1CH", "/assets/characters/chatHeads/boy1.png");
        this.load.image("boy2CH", "/assets/characters/chatHeads/boy2.png");
        this.load.image("boy3CH", "/assets/characters/chatHeads/boy3.png");
        this.load.image("boy4CH", "/assets/characters/chatHeads/boy4.png");
        this.load.image("boy5CH", "/assets/characters/chatHeads/boy5.png");
        
        this.load.image("girl1CH", "/assets/characters/chatHeads/girl1.png");
        this.load.image("girl2CH", "/assets/characters/chatHeads/girl2.png");
        this.load.image("girl3CH", "/assets/characters/chatHeads/girl3.png");
        this.load.image("girl4CH", "/assets/characters/chatHeads/girl4.png");
        this.load.image("girl5CH", "/assets/characters/chatHeads/girl5.png");
        
        //other pngs
        this.load.spritesheet("microwaveItem", "/assets/AttackElements/micro-wave.png", 128, 128);
        this.load.spritesheet("henryLaptop", "/assets/AttackElements/LAPTOP.png", 128, 128);
        this.load.spritesheet("KETLLE", "/assets/AttackElements/KETLLE.png", 128, 128);
        this.load.spritesheet("LAMP", "/assets/AttackElements/light.png", 128, 128);
        this.load.spritesheet("NACHOS", "/assets/AttackElements/cheese.png", 128, 128);
        this.load.spritesheet("CANDLE", "/assets/images/candleNPC.png", 128, 128);
        
        //SPLASH VIDEO
        this.load.video("splash", '/assets/ui/map/splashScreen-lowres.mp4');
        this.load.spritesheet("press-enter", '/assets/ui/splash-screen/press-enter-spritesheet.png', 610, 60);
        this.load.image("full-blank", '/assets/ui/splash-screen/fullBlank.png');
        this.load.image("d3pg-title", '/assets/ui/splash-screen/d3pg-title.png');
        
    //AUDIO
        //SONGS
        this.load.audio('intro-music', '/assets/audio/songs/Dov_intro_music.mp3');
        this.load.audio('overworld-music', '/assets/audio/songs/makinItWork.mp3');
        this.load.audio('cave-music', '/assets/audio/songs/osrs-inadequacy.mp3');
        this.load.audio('se6-music', '/assets/audio/songs/osrs-witching.mp3');
        this.load.audio('ne1-music', '/assets/audio/songs/osrs-danceofdeath.mp3');
        this.load.audio('dorm-music', '/assets/audio/songs/osrs-spirit.mp3');
        this.load.audio('stand-music', '/assets/audio/songs/osrs-mudskipper.mp3');
        this.load.audio('se14-music', '/assets/audio/songs/osrs-homesweethome.mp3');
        this.load.audio('sw3-music', '/assets/audio/songs/osrs-pheasantPeasant.mp3');
        this.load.audio('findRamin-music', '/assets/audio/songs/osrs-maus.mp3');
        this.load.audio('attack2-music', '/assets/audio/songs/osrs-attack2.mp3');
        
        //SOUND EFFECTS
        this.load.audio('intro-music', '/assets/audio/songs/Dov_intro_music.mp3');
        
        this.load.audio('UIBump', '/assets/audio/sfx/UIBump.wav');
        this.load.audio('UICan', '/assets/audio/sfx/UICan.wav');
        this.load.audio('UIChopstick', '/assets/audio/sfx/UIChopstick.wav');
        this.load.audio('UIKitKat', '/assets/audio/sfx/UIKitKat.wav');
        this.load.audio('UIMove', '/assets/audio/sfx/UIMove.wav');
        this.load.audio('UIPickle', '/assets/audio/sfx/UIPickle.wav');
        this.load.audio('UISelect', '/assets/audio/sfx/UISelect.wav');
        this.load.audio('UISelect2', '/assets/audio/sfx/UISelect2.wav');
        this.load.audio('UISlash', '/assets/audio/sfx/UISlash.wav');
        
    //battle sprites
        this.load.spritesheet("spencer_spritesheet_battle", "/assets/characters/spritesheet/attack-animation/fix/spencer/spencerBattleFix.png", 256, 128);
        this.load.spritesheet("dov_spritesheet_battle", "/assets/characters/spritesheet/attack-animation/fix/dov/dovBattleFix.png", 256, 128);
        this.load.spritesheet("james_spritesheet_battle", "/assets/characters/spritesheet/attack-animation/fix/james/jamesBattleFix.png", 256, 128);
        this.load.spritesheet("raymond_spritesheet_battle", "/assets/characters/spritesheet/attack-animation/fix/raymond/raymondBattleFix.png", 256, 128);
        
    //weapons
        this.load.spritesheet("chopsticks", "/assets/AttackElements/chopsticks/chop/chop.png", 192, 96);
        this.load.spritesheet("chopsticksGold", "/assets/AttackElements/chopsticks/goldchop/goldchop.png", 192, 96);
        this.load.spritesheet("laptop", "/assets/AttackElements/JamesLaptop/JamesLaptop/Jameslaptop.png", 192, 96);
        this.load.spritesheet("laptopGold", "/assets/AttackElements/JamesLaptop/Jame_sLaptopGold/goldLaptop.png", 192, 96);
        this.load.spritesheet("pickle", "/assets/AttackElements/pickle/greenpickle/pickle.png", 192, 96);
        this.load.spritesheet("pickleGold", "/assets/AttackElements/pickle/goldpickle/goldPikle.png", 192, 96);
        this.load.spritesheet("TV", "/assets/AttackElements/TV/TV/TV.png", 192, 96);
        this.load.spritesheet("TVGold", "/assets/AttackElements/TV/goldTV/goldTV.png", 192, 96);
    },
    
    create: function(){
        this.state.start("overworld");
    }
};