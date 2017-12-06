class songs extends abstractObject {

    constructor() {
        super();
    }

    createThis(game) {
        super.createThis(game);
        console.log("hello world");
        
        switch(TopDownGame.game.state.current){
            case "overworld":
                this.music = this.game.add.audio('cave-music');
                this.music.play();
                break;
                
        }
    }

    updateThis(game, player) {
        super.updateThis(game, player);
    }

}