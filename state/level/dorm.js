class dorm extends abstractLevel {

    static params() {
        return {
            tilemap: "dorm",
            tileSetImage: {
                "1": "dorm2copy",
                "2": "dormcopy",
                "3": "task13",
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
                "blockedLayer2",
                "decorationLayer_d",
                "decorationLayer2"
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
        super(() => (TopDownGame), dorm.params(), dorm.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.dorm = dorm;