class se14 extends abstractLevel {

    static params() {
        return {
            tilemap: "se14",
            tileSetImage: {
                "1": "task13",
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
                "decorationLayer_d",
                "decorationLayer2",
            ]
        }};

    static updatables() {
//        window.battleClass = new battle();        
        return [
//            window.battleClass,
            new door(),
            new battle(),
            new spawn(),
            new textEvent(),
            new pauseMenu(),
            new walkables(),
            new songs()
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