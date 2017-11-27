class mainHub extends abstractLevel {

    static params() {
        return {
            tilemap: "mainHubTest",
            tileSetImage: {
                "1": "task14"
            },
            layers: [
                "backgroundLayer",
//                "backgroundLayer2",
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
//                "blockedLayer2",
//                "decorationLayer_d",
//                "decorationLayer2"
            ]
        }};

    static updatables() {
        return [
            new door(),
            new spawn(),
            new pauseMenu(),
            new walkables(),
            new textEvent(),
        ]
    }

    constructor() {
        super(() => (TopDownGame), mainHub.params(), mainHub.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.mainHub = mainHub;