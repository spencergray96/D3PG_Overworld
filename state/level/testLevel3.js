class testLevel3 extends abstractLevel {

    static params() {
        return {
            tilemap: "test3",
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
            new door(),
            new spawn()
        ]
    }

    constructor() {
        super(() => (TopDownGame), testLevel3.params(), testLevel3.updatables());
    }

    create() {
        super.create();
    }


}

TopDownGame.testLevel3 = testLevel3;
