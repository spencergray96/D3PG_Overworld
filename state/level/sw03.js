class sw03 extends abstractLevel {

    static params() {
        return {
            tilemap: "sw03",
            tileSetImage: {
                "1": "task14",
            },
            layers: [
                "backgroundLayer",
                "backgroundLayer2",
                "backgroundLayer3",
                "blockedLayer_c",
            ],
            collisionRange: {
                min: 1,
                max: 100,
                visible: true,
                name: "blockedLayer_c"
            },
            renderAboveLayers: [
                "blockedLayer_c",
                "decorationLayer_d",
                "blockedLayer2"
            ]
        }};

    static updatables() {
        return [
            new door(),
            new spawn(),
            new pauseMenu()
        ]
    }

    constructor() {
        super(() => (TopDownGame), sw03.params(), sw03.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.sw03 = sw03;