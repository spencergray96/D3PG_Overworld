var playerSpriteSheet = "spencer_spritesheet";
var tempX;
var tempY;

var levels = [
    level0 = {
        
    },
    level1 = {
        baseXP: 0,
        nextXP: 100
    },
    level2 = {
        baseXP: 100,
        nextXP: 250
    },
    level3 = {
        baseXP: 250,
        nextXP: 450
    },
]

var experiencePoints = [
    spencer = {
        level: 1,
        xp: 0,
    },
    dov = {
        level: 1,
        xp: 0,
    },
    james = {
        level: 1,
        xp: 0,
    },
    raymond = {
        level: 1,
        xp: 0,
    }
]

var playerStats = [
    spencer = {
        name: "Spencer",
        spritesheet: "spencer_spritesheet",
        spritesheetBattle: "spencer_spritesheet_battle",
        ch: "spencerCH",
        currentHP: 19,
        maxHP: 100,
        currentEN: 10,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "He's the leader of the bunch",
        specDesc: "hits a lot",
        
        skillColor: 0x00ff00,
        
        level: experiencePoints[0].level,
        nextLevel: levels[experiencePoints[0].level].nextXP - experiencePoints[0].xp,
        
        basicWeapon: "TV",
        lastWeapon: "TVGold"
    },
    dov = {
        name: "Dov",
        spritesheet: "dov_spritesheet",
        spritesheetBattle: "dov_spritesheet_battle",
        ch: "dovCH",
        currentHP: 18,
        maxHP: 100,
        currentEN: 10,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "You know him well",
        specDesc: "hits a lot",
        
        skillColor: 0xff0000,
        
        level: experiencePoints[1].level,
        nextLevel: levels[experiencePoints[1].level].nextXP - experiencePoints[1].xp,
        
        basicWeapon: "pickle",
        lastWeapon: "pickleGold"        
    },
    james = {
        name: "James",
        spritesheet: "james_spritesheet",
        spritesheetBattle: "james_spritesheet_battle",
        ch: "jamesCH",
        currentHP: 17,
        maxHP: 100,
        currentEN: 10,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "He's finally back",
        specDesc: "hits a lot",
        
        skillColor: 0x0000ff,
        
        level: experiencePoints[2].level,
        nextLevel: levels[experiencePoints[2].level].nextXP - experiencePoints[2].xp,
        
        basicWeapon: "laptop",
        lastWeapon: "laptopGold"
    },
    raymond = {
        name: "Raymond",
        spritesheet: "raymond_spritesheet",
        spritesheetBattle: "raymond_spritesheet_battle",
        ch: "raymondCH",
        currentHP: 16,
        maxHP: 100,
        currentEN: 10,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "To kick some tail!",
        specDesc: "hits a lot",
        
        skillColor: 0xffff00,
        
        level: experiencePoints[3].level,
        nextLevel: levels[experiencePoints[3].level].nextXP - experiencePoints[3].xp,
        
        basicWeapon: "chopsticks",
        lastWeapon: "chopsticksGold"
    },
]