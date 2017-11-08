class gridtestmovement extends abstractLevel {

    static params() {
        return {
            tilemap: "testtilepack",
            tileSetImage: {
                "1": "testtilepack",
                "2": "testtilepack"
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
        super(() => (TopDownGame), gridtestmovement.params(), gridtestmovement.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.gridtestmovement = gridtestmovement;