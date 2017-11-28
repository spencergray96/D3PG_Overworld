var theDialogue = {
    events:{
//spawn event        
        firstSpawnEvent:[
            
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: Did we totally just pass Dov and not pick him up?;;huh",
                event:""

            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Yeah, lol",
                event:"action"
            },
//            {
//                profile:
//                    "raymondCH",
//                txt:
//                    "Raymond: Sucks for him...",
//                event:""
//            },
//            {
//                profile:
//                    "dovCH",
//                txt:
//                    "Dov: What's up nerds?? DK is finally here to kick some tail",
//                event:""
//            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: It's Thrus",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Well, let's not waste any more time. Let's do what we came here to do",
                event:"action"
            },
//            {
//                profile:
//                    "jamesCH",
//                txt:
//                    "James: first",
//                event:""
//            },
//            {
//                profile:
//                    "raymondCH",
//                txt:
//                    "Raymond: Oh baby...",
//                event:""
//            },
//            {
//                profile:
//                    "spencerCH",
//                txt:
//                    "Spencer: Yeah... Looks like it...",
//                event:""
//            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: Gross. Whatever. Let's just go find Ramin in SE14",
                event:"end"
            }
            
        ],
//first tremor event        
        secondSpawnEvent:[
            {
                profile:
                    "jamesCH",
                txt:
                    "James: Wha-? Do you guys hear that?",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: THAT REALLY MAKES SENSE, MR. BEN",
                event:"end"
            }      
        ],
//arrive at se14        
        thirdEvent:[
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: There she is...",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: Oh baby...",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: 666",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: I never thought I'd be back...",
                event:"action"
            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: filler text",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: ching chang chong;;something",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Well, let's keep going and see what happens",
                event:"end"
            },
        ],
//talk to henry first time to find ramin     
        henryEvent:[
            {
                profile:
                    "",
                txt:
                    "Henry: What's up guys?",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: You know where Ramin is? We need to talk to him",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Henry: I think he was in the meeting room, you should ask someone there",
                event:"end"
            },
        ],
//talk to guy in meeting room
        meetingRoom:[
            {
                profile:
                    "dovCH",
                txt:
                    "GUY69: IM THE GU YOU NEED TO TALK TO",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: You look like DOV!!",
                event:"action"
            },
            {
                profile:
                    "",
                txt:
                    "GUY69: BLAH BLAH BLAH BLAH",
                event:"end"
            },
        ],
//first Ramin conversation
        ramin01:[
            {
                profile:
                    "",
                txt:
                    "ramin: ramin speak 01",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: NANI??",
                event:"end"
            },
        ],
//running shoes from henry!
        henry01:[
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: huh?",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: what the heck?",
                event:"action"
            },
            {
                profile:
                    "",
                txt:
                    "Henry: I almost forgot! I want you guys to have these...;;Here take them",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Your shoes? Gross.",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Henry: Yeah but they get the job done. Hold the CTRL button to run!!",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: whaaaaaatttt",
                event:""
            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: Not sure what he mean by 'hold the CTRL button'... it's not like we're at a computer",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: whatever dude",
                event:"end"
            },
        ],
//enter Galynas office        
        galynaWalkingProc:[
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: Cool. Never been here before;;Wait... what is that?",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer:ahhahaha",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: creepy",
                event:"action"
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: ice cream cake nannanna",
                event:"end"
            },
        ],
//picking up the note        
        grabNote:[
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: found the note!",
                event:"action"
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: alright let's get outa here",
                event:"end"
            },
        ],
//talking to galyna
        galynaConvo:[
            {
                profile:
                    "",
                txt:
                    "Galyna: it is nothing to do with my grammar",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: Lights please",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Okay but its not what I wanted",
                event:"end"
            },
        ],
//after beating galyna
        galynaConvo2:[
            {
                profile:
                    "",
                txt:
                    "Galyna: argh",
                event:""
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: ...;;Okay",
                event:"end"
            },
        ],
//return to Ramin after beating Galyna
        raminConvoPostGalyna:[
            {
                profile:
                    "",
                txt:
                    "Ramin: well done defeating Galyna",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Aye... give us those letters now ya?",
                event:"end"
            },
        ],
//first talk to aaron
        arronFirstConvo:[
            {
                profile:
                    "",
                txt:
                    "Arron: u wanna learn php lol?",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: yah man",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Arron: k then, go get my lamp from NE1 thanks lol",
                event:"end"
            },
        ],
//enter NE1
        enterNE1:[
            {
                profile:
                    "dovCH",
                txt:
                    "DOV: come get some",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: yah man",
                event:"action"
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: nice",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: part2",
                event:"action"
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: end part 2",
                event:"end"
            },
        ],
//finding the lamp
        findTheLamp:[
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Here it is",
                event:"action"
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: Here it is",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: break please",
                event:"end"
            },
        ],
//first talk to aaron
        arronSecondConvo:[
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: we got the lamp dude",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Arron: scrubs!! let's fight!",
                event:"action"
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: starting to notice a pattern haha... i just want a break",
                event:"end"
            },
        ],
//arron post fight
        arronPostFight:[
            {
                profile:
                    "",
                txt:
                    "Arron: ahh you have bested me;;...;;... ...;;... ... ...",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: ha got em",
                event:"end"
            },
        ],
//ramin after arron
        raminPostArron:[
            {
                profile:
                    "",
                txt:
                    "Ramin: you cheeky scrubs!! gratz on sick hackzorz skillz",
                event:""
            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: bruh",
                event:"end"
            },
        ],
//first daemon talk
        firstDaemonEncounter:[
            {
                profile:
                    "",
                txt:
                    "Instructor: etc etc only if James hands in his assignment",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: maaaaaaaaaaan",
                event:"action"
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: ding dang dong",
                event:"end"
            },
        ],
//computer
        interactingSE14computer:[
            {
                profile:
                    "jamesCH",
                txt:
                    "James: I can't believe this is still on. It's been 3 months",
                event:""
            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: Almost as long as the air conditioning in 121...",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Looks like we need a USB stick. Let's go to James' dorm room",
                event:"end"
            },
        ],
//walk outside se14 and go to dorm
        leavingSE14goingToDorms:[
            {
                profile:
                    "jamesCH",
                txt:
                    "James: Well let's not waste any time",
                event:""
            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: For once I agree with you",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: i really hope this works",
                event:"end"
            },
        ],
//walking into james' dorm
        enteringDormFirstTime:[
            {
                profile:
                    "jamesCH",
                txt:
                    "James: Well here we are",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: nice poster dude",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: thanks bro;;We should check out the computer, I think the usb should be there",
                event:"end"
            },
        ],
//using james' computer
        jamesComputer:[
            {
                profile:
                    "jamesCH",
                txt:
                    "James: Well here is the USB",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: USB USB USB USB USB USB USB USB",
                event:"end"
            },
        ],
//grabbing the file for daemon
        se14computerRound2:[
            {
                profile:
                    "jamesCH",
                txt:
                    "James: Finally. let's get the file on here",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: USB USB USB USB USB USB USB USB",
                event:"end"
            },
        ],
//submitting the file to daemon and fighting him
        aboutToFightDaemon:[
            {
                profile:
                    "",
                txt:
                    "Daemon: ah thank you for finally submitting the file",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: yah whatever dood",
                event:""
            },
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: wowow owo wo ow owwo uwu",
                event:"end"
            },
        ],
//done fighint daemon
        doneFightingDaemon:[
            {
                profile:
                    "",
                txt:
                    "Daemon: i would have gotten away with it too, if it weren't for you damn kids",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: lol get fudged",
                event:"end"
            },
        ],
//talk to henry after beating all 3 bosses
        speakToHenryAfterAll3bossesDefeated:[
            {
                profile:
                    "",
                txt:
                    "Henry: welcome back guys",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: do you konw where ramin went??",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Henry: I can tell you... but first you must become stronger;;you must gather the 4 thingies for me",
                event:"end"
            },
        ],
//gathering stuff for henry
        //talk to jessie
        jessieMicrowave:[
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: can we take this microwave",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Jessie: no no no no no no no no no",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: pleeease",
                event:"action"
            },
            {
                profile:
                    "",
                txt:
                    "Jessie: ok here you go lol make this dialogue longer please",
                event:"end"
            },
        ],
        //talk to jakub
        jakubNachos:[
            {
                profile:
                    "",
                txt:
                    "Jakub: this is jakub's event",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: Interesting",
                event:"end"
            },
        ],
        //finding the laptop
        henryslaptop:[
            {
                profile:
                    "dovCH",
                txt:
                    "Dov: here it is boys",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: nice",
                event:"end"
            },
        ],
        //finding the kettle
        henryskettle:[
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: oh baby",
                event:"action"
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: nice nice nice nice nice nice",
                event:"end"
            },
        ],
//empty henry event, trust me, leave this here
        ohHenry:[
        ],
//talk henry post collection
        henryAllItems:[
            {
                profile:
                    "",
                txt:
                    "Henry: ah i see you have grown in power",
                event:""
            },
            {
                profile:
                    "spencerCH",
                txt:
                    "Spencer: seems like it haha",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Henry: let us fight now",
                event:"action"
            },
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: sure thing neighbourino",
                event:"end"
            },
        ],
//talk henry after fight
        henryIsDefeated:[
            {
                profile:
                    "",
                txt:
                    "Henry: ahhh you got me",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "James: yeah we did;;Time to go fight Ramin",
                event:""
            },
            {
                profile:
                    "",
                txt:
                    "Henry: behind the bookcase in the corner... now fly you fools!",
                event:"end"
            },
        ],
//leave this empty event here, trust me
        emptyEvent:[
        ],
//blocking event        
        blockEvent:[
            {
                profile:
                    "raymondCH",
                txt:
                    "Raymond: we shouldn't be here",
                event:"action"

            },
            {
                profile:
                    "spencerCH",
                txt:
                    "fudge",
                event:""
            },
            {
                profile:
                    "dovCH",
                txt:
                    "im a huge nerd",
                event:""
            },
            {
                profile:
                    "jamesCH",
                txt:
                    "We know",
                event:"end"
            },
        ],
    },
    
    
    
    
    
    
    defaults:{
        ramin:{
            profile:
                "dovCH",
            txt:{
                0:"I'm Ramin,;;What do you want?;;Get back to work.",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        arron:{
            profile:
                "",
            txt:{
                0:"I'm Arron,;;Let's write some code",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        james:{
            profile:
                "jamesCH",            
            txt:{
                0:"guy2",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy3:{
            profile:
                "raymondCH",           
            txt:{
                0:"guy3;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy4:{
            profile:
                "dovCH",            
            txt:{
                0:"guy4;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy5:{
            profile:
                "spencerCH",            
            txt:{
                0:"guy5;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        }, 
        guy6:{
            profile:
                "dovCH",
            txt:{
                0:"guy6;;!!!!;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy7:{
            profile:
                "jamesCH",            
            txt:{
                0:"guy7;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy8:{
            profile:
                "raymondCH",           
            txt:{
                0:"guy8;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy9:{
            profile:
                "spencerCH",            
            txt:{
                0:"guy9;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy10:{
            profile:
                "jamesCH",            
            txt:{
                0:"guy10;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },   
        guy11:{
            profile:
                "spencerCH",
            txt:{
                0:"guy11;;!!!!;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy12:{
            profile:
                "jamesCH",            
            txt:{
                0:"guy12;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy13:{
            profile:
                "raymondCH",           
            txt:{
                0:"guy13;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy14:{
            profile:
                "spencerCH",            
            txt:{
                0:"guy14;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy15:{
            profile:
                "dovCH",            
            txt:{
                0:"guy15;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        }, 
        guy16:{
            profile:
                "spencerCH",
            txt:{
                0:"guy16;;!!!!;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy17:{
            profile:
                "jamesCH",            
            txt:{
                0:"guy17;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy18:{
            profile:
                "raymondCH",           
            txt:{
                0:"guy18;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy19:{
            profile:
                "spencerCH",            
            txt:{
                0:"guy19;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        henry:{
            profile:
                "",            
            txt:{
                0:"henry;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        guy69:{
            profile:
                "jamesCH",            
            txt:{
                0:"guy20;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        se6note:{
            profile:
                "raymondCH",
            txt:{
                0:"guy20;;blah;;blah",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        microwaveItem:{
            profile:
                "",
            txt:{
                0:"i wave things!",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        jessie:{
            profile:
                "",
            txt:{
                0:"hi i am jessie",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        jakub:{
            profile:
                "",
            txt:{
                0:"hi i am jakubbbbbb default",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        henryLaptop:{
            profile:
                "",
            txt:{
                0:"hi i am a laptop hello",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        KETTLE:{
            profile:
                "",
            txt:{
                0:"hi i am a kettle",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
        bookcaseNPC:{
            profile:
                "",
            txt:{
                0:"It's just a conspicious looking bookcase",
                1:"blah1;;blah1;;blah1",
                5:"blah5;;blah5;;blah5",
                10:"blah;;blah;;blah"
            }
        },
    }
}

//window.dialog.defaults[this.npcid].txt[gameState].split(";;");
