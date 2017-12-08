class tunnel extends abstractLevel {

    static params() {
        return {
            tilemap: "tunnel",
            tileSetImage: {
                "1": "nov21",
                "2": "nov22",
            },
            layers: [
                "backgroundLayer",
                "backgroundLayer2",
                "blockedLayer_c",
                "blockedLayer2",
                "blockedLayer3"
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
        window.battleClass = new battle();
        return [
            window.battleClass,
            new door(),
            new spawn(),
            new textEvent(),
            new pauseMenu(),
            new walkables(),
            new songs()
        ]
    }

    constructor() {
        super(() => (TopDownGame), tunnel.params(), tunnel.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.tunnel = tunnel;