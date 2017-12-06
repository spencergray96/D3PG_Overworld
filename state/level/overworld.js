class overworld extends abstractLevel {

    static params() {
        return {
            tilemap: "overworld",
            tileSetImage: {
                "1": "brick",
                "2": "brick2",
                "3": "cementcopy",
                "4": "dirt",
                "5": "grass1",
                "6": "grass2",
                "7": "parkingLines",
                "8": "se12",
                "9": "se14",
                "10": "SE6",
                "11": "sidewalk",
                "12": "sidewalkWithCurb",
                "13": "task14",
                "14": "treeandbush",
                "15": "zzzCone",
            },
            layers: [
                "backgroundLayer",
                "backgroundLayer2",
                "backgroundLayer3",
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
        window.battleClass = new battle();
        return [
            window.battleClass,
            new door(),
            new spawn(),
            new textEvent(),
            new pauseMenu(),
            new walkables()
        ]
    }

    constructor() {
        super(() => (TopDownGame), overworld.params(), overworld.updatables());
    }

    create() {
        super.create();
    }

}

TopDownGame.overworld = overworld;