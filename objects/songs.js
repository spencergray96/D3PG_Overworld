var music;

class songs extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        console.log("hello world");
        
        if(music != undefined){
            music.pause();
            music.destroy(); 
        }
        
//        switch(TopDownGame.game.state.current){
//            case "overworld":
//                music = this.game.add.audio('overworld-music');
//                this.startMusic();
//                break;
//            case "tunnel":
//                music = this.game.add.audio('cave-music');
//                this.startMusic();
//                break;
//            case "se6office":
//                music = this.game.add.audio("se6-music");
//                this.startMusic();
//                break;
//            case "NE1":
//                music = this.game.add.audio("ne1-music");
//                this.startMusic();
//                break;
//            case "dorm":
//                music = this.game.add.audio("dorm-music");
//                this.startMusic();
//                break;
//            case "theStand":
//                music = this.game.add.audio("stand-music");
//                this.startMusic();
//                break;
//            case "se14":
//                music = this.game.add.audio("se14-music");
//                this.startMusic();
//                break;
//            case "sw03":
//                music = this.game.add.audio("sw3-music");
//                this.startMusic();
//                break;
//        }
        
    }

    updateThis(game, player) {
        super.updateThis(game, player);
    }

    startMusic(){
        music.play();
        music.loopFull(1);
    }
}