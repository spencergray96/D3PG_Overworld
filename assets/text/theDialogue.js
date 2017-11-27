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
        }  
    }
}

//window.dialog.defaults[this.npcid].txt[gameState].split(";;");
