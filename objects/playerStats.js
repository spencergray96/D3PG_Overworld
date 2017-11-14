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
        ch: "spencerCH",
        currentHP: 80,
        maxHP: 100,
        currentEN: 5,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "He's the leader of the bunch",
        specDesc: "Uses 3 energy, hits a lot",
        
        level: experiencePoints[0].level,
        nextLevel: levels[experiencePoints[0].level].nextXP - experiencePoints[0].xp
    },
    dov = {
        name: "Dov",
        ch: "dovCH",
        currentHP: 80,
        maxHP: 100,
        currentEN: 5,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "You know him well",
        specDesc: "Uses 3 energy, hits a lot",
        
        level: experiencePoints[1].level,
        nextLevel: levels[experiencePoints[1].level].nextXP - experiencePoints[1].xp
    },
    james = {
        name: "James",
        ch: "jamesCH",
        currentHP: 80,
        maxHP: 100,
        currentEN: 5,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "He's finally back",
        specDesc: "Uses 3 energy, hits a lot",
        
        level: experiencePoints[2].level,
        nextLevel: levels[experiencePoints[2].level].nextXP - experiencePoints[2].xp
    },
    raymond = {
        name: "Raymond",
        ch: "raymondCH",
        currentHP: 80,
        maxHP: 100,
        currentEN: 5,
        maxEN: 10,
        attack: 15,
        weapon: "default",
        weaponMult: 1,
        defence: 10,
        evasion: "5%",
        description: "To kick some tail!",
        specDesc: "Uses 3 energy, hits a lot",
        
        level: experiencePoints[3].level,
        nextLevel: levels[experiencePoints[3].level].nextXP - experiencePoints[3].xp
    },
]

console.log(playerStats);