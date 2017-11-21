class theStand extends abstractLevel {

    static params() {
        return {
            tilemap: "theStand",
            tileSetImage: {
                "1": "task14",
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
                "blockedLayer_c",
                "decorationLayer_d",
                "decorationLayer2",
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
        super(() => (TopDownGame), theStand.params(), theStand.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.theStand = theStand;