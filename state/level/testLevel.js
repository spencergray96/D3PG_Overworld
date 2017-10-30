class testLevel extends abstractLevel {

    static params() {
        return {
            tilemap: "test",
            tileSetImage: {
                "1": "tiles",
                "2": "gameTiles"
            },
            layers: ["backgroundLayer", "blockedLayer_c"],
            collisionRange: {
                min: 1,
                max: 1300,
                visible: true,
                name: "blockedLayer_c"
            }
        }};

    static updatables() {
        return [
            new player(),
            new door(),
            new textEvent(),
            new spawn()
        ]
    }

    constructor() {
        super(() => (TopDownGame), testLevel.params(), testLevel.updatables());
    }

    create() {
        super.create();
    }
    
    


}

TopDownGame.testLevel = testLevel;
