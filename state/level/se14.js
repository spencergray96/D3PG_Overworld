class se14 extends abstractLevel {

    static params() {
        return {
            tilemap: "se14",
            tileSetImage: {
                "1": "task13",
            },
            layers: [
                "decorationLayer",
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
            }
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