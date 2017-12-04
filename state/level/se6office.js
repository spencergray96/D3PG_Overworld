class se6office extends abstractLevel {

    static params() {
        return {
            tilemap: "se6office",
            tileSetImage: {
                "1": "nov14",
                "2": "nov24",
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
                "decorationLayer2",
//                "blockedLayer2"
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
        super(() => (TopDownGame), se6office.params(), se6office.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.se6office = se6office;