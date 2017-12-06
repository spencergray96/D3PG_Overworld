class NE1 extends abstractLevel {

    static params() {
        return {
            tilemap: "NE1map",
            tileSetImage: {
                "1": "NE1",
                "2": "task13",
                "3": "task14",
                "4": "sign",
            },
            layers: [
                "backgroundLayer",
                "backgroundLayer2",
                "blockedLayer_c",
                "blockedLayer2"
            ],
            collisionRange: {
                min: 1,
                max: 100,
                visible: true,
                name: "blockedLayer_c"
            },
            renderAboveLayers: [
//                "blockedLayer_c",
                "decorationLayer_d",
            ]
        }};

    static updatables() {
        return [
            new door(),
            new spawn(),
            new textEvent(),
            new pauseMenu(),
            new walkables()
        ]
    }

    constructor() {
        super(() => (TopDownGame), NE1.params(), NE1.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.NE1 = NE1;