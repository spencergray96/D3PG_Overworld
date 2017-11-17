class testing128 extends abstractLevel {

    static params() {
        return {
            tilemap: "testmap-128",
            tileSetImage: {
                "1": "testtilepack-128",
            },
            layers: [
                "backgroundLayer",
                "backgroundLayer2",
                "blockedLayer_c",
            ],
            collisionRange: {
                min: 1,
                max: 100,
                visible: true,
                name: "blockedLayer_c"
            },
            renderAboveLayers: [
                "decorationLayer_d",
                "blockedLayer_c",
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
        super(() => (TopDownGame), testing128.params(), testing128.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.testing128 = testing128;