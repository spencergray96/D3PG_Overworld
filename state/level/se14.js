class se14 extends abstractLevel {

    static params() {
        return {
            tilemap: "se14",
            tileSetImage: {
                "1": "task13",
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
            new spawn()
        ]
    }

    constructor() {
        super(() => (TopDownGame), se14.params(), se14.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.se14 = se14;