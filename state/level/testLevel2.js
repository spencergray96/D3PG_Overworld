class testLevel2 extends abstractLevel {

    static params() {
        return {
            tilemap: "test2",
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
            new door()
        ]
    }

    constructor() {
        super(() => (TopDownGame), testLevel2.params(), testLevel2.updatables());
    }

    create() {
        super.create();
    }


}

TopDownGame.testLevel2 = testLevel2;
