const baseCharacters = [
  {
    name: "Avery Cross",
    role: "Ultimate Detective",
    personality:
      "Calm, observant, and difficult to rattle. Avery notices tiny shifts in tone and posture before most people realize they have said too much.",
    secret:
      "You came to Blackwood already tracking rumors of an internal cover-up. You have not told anyone that the lockdown interrupted an investigation you were conducting in secret.",
    relationshipToVictim:
      "Theo treated you like a nuisance because you kept asking questions he could not comfortably answer.",
    isMurderer: false,
    packet: {
      vibe: "Measured, sharp, impossible to fully read.",
      publicBio:
        "People expect you to solve everything, which means they either cling to you or avoid you. You are used to both.",
      willingToShare:
        "You are willing to admit Theo lied about his schedule and that you never trusted him. You are not willing to share the full scope of your prior investigation.",
      roleplayNotes: [
        "Ask quiet, precise questions instead of making speeches.",
        "Treat every contradiction like a thread worth pulling.",
        "Make people feel seen even when they are trying to hide.",
      ],
      suspicionLevel:
        "Others may see you as dangerous because you are always one step ahead.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "Theo brushed past you outside the library shortly before the body was found. He was carrying a glass with condensation on it and looked more annoyed than afraid.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "You checked the east hall monitor earlier and noticed the camera gap started a few minutes before the official outage report. That felt deliberate, not random.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "The torn sketch page matters because the figure in it appears to be wearing fitted lab gloves, not the heavier athletic tape Roman usually keeps on hand.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "The partial audio clip confirms Theo was arguing with someone about records and human testing. The other voice stays controlled even while Theo gets heated.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "The vial and access data point toward someone who understood both chemistry and the academy systems well enough to move cleanly through them. That does not narrow it to one person, but it narrows the field fast.",
        },
      ],
    },
  },
  {
    name: "Lila Monroe",
    role: "Ultimate Influencer",
    personality:
      "Charismatic, dramatic, and painfully aware of how every moment looks from the outside. Lila turns nerves into performance.",
    secret:
      "A lot of your glossy public persona is fabricated. You are terrified that once the mask slips, people will decide there is nothing underneath.",
    relationshipToVictim:
      "Theo treated you like a useful accessory when cameras were around and disposable when they were not.",
    isMurderer: false,
    packet: {
      vibe: "Sparkle over panic, confidence over collapse.",
      publicBio:
        "You know how to hold a room, redirect a conversation, and keep all eyes where you want them. People underestimate how hard you work to stay that polished.",
      willingToShare:
        "You will admit Theo loved controlling appearances. You will not willingly admit how much of your own image is an illusion.",
      roleplayNotes: [
        "Answer pressure with charm before letting the fear show.",
        "Notice optics, timing, and who wants to be seen.",
        "Drop surprisingly honest lines when someone catches you off guard.",
      ],
      suspicionLevel:
        "Others may see you as fake, slippery, and too good at changing the subject.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "You saw Theo accept the drink from someone off-camera in the reflection of a dark trophy case, but the angle only showed a sleeve and a hand. You hate that the image in your head is incomplete.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "Roman stormed away from the library wing during the outage looking furious, which makes him look awful. You also know he usually stomps when he is angry, and no one heard that much noise near the library door.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "Sienna once told you sketches capture the truth people try to pose away. That torn page scares you because if she drew it, she must have seen something real.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Theo had been threatening to expose people selectively, like he was curating a scandal. He hinted to you that he had proof someone in the science lab had crossed a line.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "When the access log clue surfaced, Maya went very still instead of defensive. That is not guilt by itself, but it felt like someone bracing for impact.",
        },
      ],
    },
  },
  {
    name: "Kai Tanaka",
    role: "Ultimate Gamer",
    personality:
      "Analytical, socially awkward, and frighteningly good at spotting systems hiding inside chaos. Kai treats panic like a puzzle to solve.",
    secret:
      "The academy rules feel familiar to you in a way you cannot explain without revealing just how much time you have spent studying closed-loop game structures and manipulation systems.",
    relationshipToVictim:
      "Theo mocked your intensity, but he listened whenever you noticed flaws in the academy rules.",
    isMurderer: false,
    packet: {
      vibe: "Pattern-hunter in a room full of improvisers.",
      publicBio:
        "You are not charming, but you are very hard to fool once you start mapping a system. That makes people uneasy.",
      willingToShare:
        "You will share that the rules seem engineered to push conflict. You will not share how deeply that realization unsettles you.",
      roleplayNotes: [
        "Frame ideas like mechanics, exploits, and loops.",
        "Get fixated on patterns more than feelings.",
        "Let sincerity break through when the stakes hit someone vulnerable.",
      ],
      suspicionLevel:
        "Others may see you as detached, suspiciously prepared, and maybe too comfortable with the academy’s structure.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "Theo asked you earlier whether poison would count as a 'clever move' under the academy rules. You thought he was being smug. Now it sounds uglier.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "The camera outage happened in a sequence, not all at once. That suggests someone with procedural access rather than a random power flicker.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "The torn sketch page contains a corner annotation: 8:57. Whoever Sienna drew was near the library right before the likely time of death.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Theo’s argument in the audio file sounds like he already knew he was being watched. He was not surprised by the accusation, only by who finally pushed back.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "A tampered log means either someone edited the system or someone wanted the group to believe the system had been edited. Both possibilities are strategic plays, not accidents.",
        },
      ],
    },
  },
  {
    name: "Roman Vega",
    role: "Ultimate Athlete",
    personality:
      "Competitive, explosive, and ruled by momentum. Roman feels things at full volume and hates being cornered.",
    secret:
      "You are desperate to keep a recent scandal buried. If the full story comes out, your carefully defended reputation could collapse overnight.",
    relationshipToVictim:
      "Theo knew about your scandal and enjoyed reminding you that secrets become leverage when rich people are holding them.",
    isMurderer: false,
    packet: {
      vibe: "Raw nerves in a body built for confidence.",
      publicBio:
        "People assume you are all force and no nuance. That makes it easy for them to blame you and hard for them to notice when you are telling the truth.",
      willingToShare:
        "You will admit Theo blackmailed people with information. You will not admit what scandal he held over you unless someone forces the issue.",
      roleplayNotes: [
        "React first, then try to recover.",
        "Protect your pride even when you are clearly scared.",
        "Show flashes of real loyalty beneath the temper.",
      ],
      suspicionLevel:
        "Others may see you as the obvious hothead who could snap under pressure.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "You argued with Theo near the gym stairs around 8:40, which makes your timeline look rough. You left him alive and stormed off because you knew staying longer would make things worse.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "During the camera outage, you were actually in the locker hall cooling down and trying not to punch a wall. If you admit that, people will think you are lying to cover the murder.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "The figure in the torn sketch is too upright and controlled to be you in one of your angry spirals. Sienna captures posture brutally well, and that stance is not yours.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Theo once sneered that if he went down, he could ruin 'the scientist, the star, and the scandal machine' in one night. You know you were one of those people. You are not sure who the other two were.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "You saw Maya leave the library hall with her jaw set like she was holding herself together by force. It was the look of someone who had decided something and hated it.",
        },
      ],
    },
  },
  {
    name: "Sienna Blake",
    role: "Ultimate Artist",
    personality:
      "Intense, perceptive, and unsettlingly direct. Sienna pays attention to things other people instinctively avoid.",
    secret:
      "You have been sketching everyone in secret, not because you are creepy for fun, but because drawings preserve details that frightened people forget.",
    relationshipToVictim:
      "Theo hated how accurately you saw through him, and you hated how often he mistook attention for admiration.",
    isMurderer: false,
    packet: {
      vibe: "Elegant menace with a sketchbook full of receipts.",
      publicBio:
        "You notice hands, posture, fabric, and where fear settles in a body. People call that unsettling because it is accurate.",
      willingToShare:
        "You are willing to admit you sketch the group obsessively. You are not willing to hand over every drawing unless you choose the moment.",
      roleplayNotes: [
        "Describe details like composition and texture.",
        "Speak as if everyone is already half-translated into art.",
        "Stay calm when others get loud; it unnerves them.",
      ],
      suspicionLevel:
        "Others may see you as eerie, secretive, and far too comfortable around death.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "Theo looked nervous in the library earlier, which was unusual enough that you sketched him from memory afterward. He kept glancing toward the science wing door between sentences.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "You heard hurried footsteps during the outage, but the pace was measured rather than panicked. Whoever moved through that hallway knew where they were going.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "The torn page is yours. You ripped it out because you realized the person in the frame had a lab wristband peeking from under their sleeve, and suddenly the sketch felt dangerous to keep.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Noah asked whether you had drawn Theo arguing with Maya. You lied and said no because the drawing made Maya look cornered, not cruel.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "The missing vial matters less to you than the smear near the glass tray: a careful hand cleaned the obvious mess but missed the edge where the liquid had dried.",
        },
      ],
    },
  },
  {
    name: "Noah Price",
    role: "Ultimate Journalist",
    personality:
      "Relentless, nosy, and energized by a lead. Noah pushes too hard because he is convinced the truth is always worth the fallout.",
    secret:
      "You have been collecting damaging information on multiple players and hiding it in pieces across the academy.",
    relationshipToVictim:
      "Theo treated you like a rival investigator who had not learned the advantages of inherited power.",
    isMurderer: false,
    packet: {
      vibe: "A notebook with legs and a conscience that shows up late.",
      publicBio:
        "You chase facts the way other people chase safety. That makes you useful and deeply annoying in equal measure.",
      willingToShare:
        "You will share that Theo was keeping files on the group. You will not willingly share that you were doing the same thing.",
      roleplayNotes: [
        "Turn every answer into a follow-up question.",
        "Speak like you are building a headline in real time.",
        "Let guilt leak through whenever someone points out the harm curiosity can do.",
      ],
      suspicionLevel:
        "Others may see you as exploitative, invasive, and the kind of person who would weaponize information.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "You were supposed to meet Theo in the library later that night because he hinted he had proof of a Blackwood experiment. He never intended to tell you everything, just enough to keep you chasing.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "The outage helped someone because it erased a few minutes of movement around the library entrance. You know that because you were already watching that hall for a story.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "Sienna hides evidence inside her art when she gets scared. If the page was torn out, she either saw something damning or decided someone else would kill to get it.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "The audio clip is from your recorder. Theo accused Maya of helping design 'human trial thresholds,' and Maya told him he had no idea what the adults had asked her to build.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "You found a note in Theo’s things about Project Blackwood with one line underlined twice: 'Grant family approval required.' That means Theo was never just a bystander.",
        },
      ],
    },
  },
  {
    name: "Elara Voss",
    role: "Ultimate Psychic",
    personality:
      "Cryptic, theatrical, and impossible to tell where the performance ends. Elara can make a coincidence feel like prophecy.",
    secret:
      "Your psychic reputation is at least partly performance, but some of your guesses are based on things you notice before anyone realizes they have exposed themselves.",
    relationshipToVictim:
      "Theo mocked your act in public and quietly asked for your help in private, which told you everything you needed to know about his ego.",
    isMurderer: false,
    packet: {
      vibe: "Moonlit menace with very sharp intuition.",
      publicBio:
        "You speak in symbols because people hear symbols more clearly than warnings. Sometimes you hate how well that works.",
      willingToShare:
        "You will share your 'feeling' that Theo expected betrayal. You will not admit how much of that feeling came from listening at doors.",
      roleplayNotes: [
        "Use eerie phrasing without losing clarity.",
        "Let people wonder whether you know more than you should.",
        "Break the spooky act with occasional, startling honesty.",
      ],
      suspicionLevel:
        "Others may see you as manipulative, theatrical, and too comfortable predicting disaster.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "Earlier that evening, Theo asked whether poison leaves a different kind of ending than violence. You thought he was being melodramatic. Now you wonder if he was afraid.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "You heard someone whisper, 'You can still stop this,' in the blackout hall. The tone was urgent, not triumphant, like someone trying to halt a catastrophe rather than cause one.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "The torn page did not feel random to you. It felt like the kind of destruction people commit when a single image could force a confession.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Theo and Maya had history deeper than one argument. The rage in that recording sounds old, layered, and fed by something that happened long before tonight.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "When the chemical clue appeared, the room split instantly between people who feared being blamed and someone who feared the truth being understood.",
        },
      ],
    },
  },
  {
    name: "Theo Grant",
    role: "Ultimate Heir",
    personality:
      "Wealthy, sharp-tongued, and deeply used to controlling the room. Theo masks fear with disdain.",
    secret:
      "Your family’s influence over Blackwood Academy runs far deeper than any of the other students know, and you recently uncovered evidence tying that influence to unethical experiments.",
    relationshipToVictim:
      "You are the victim. Before the murder, you were the one person in the room arrogant enough to think you could outplay both the academy and everyone trapped inside it.",
    isMurderer: false,
    isVictim: true,
    canBeAccused: false,
    packet: {
      vibe: "A fallen prince who thought he could bargain with a machine.",
      publicBio:
        "Theo begins the night as a playable pre-discovery role. Once the body is discovered, your job shifts to observing, adding atmosphere if the host wants it, and staying quiet during accusations unless the host invites a flashback.",
      willingToShare:
        "Before the body discovery, you can hint that the academy is worse than anyone thinks and that several students are in more danger than they realize.",
      roleplayNotes: [
        "Play Theo as polished, irritated, and trying very hard not to look scared.",
        "Drop hints that you know more about Blackwood than you should.",
        "After discovery, stay in observer mode unless the host uses you for a dramatic flashback.",
      ],
      suspicionLevel:
        "Before the murder, others may see you as manipulative, smug, and impossible to fully trust.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "You knew someone might try to silence you tonight, but you misread where the real danger was coming from.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "You arranged to review Blackwood records in the library because it felt like neutral ground. It was not.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "You recognized that one of Sienna’s sketches was getting too close to the truth, which is why you tried to get it back earlier.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Your last major argument was with Maya, and it centered on whether exposing Blackwood would actually save anyone.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "If anyone finds the approval files tied to your family, they will understand that you were complicit in the academy long before you became afraid of it.",
        },
      ],
    },
  },
  {
    name: "Maya Chen",
    role: "Ultimate Scientist",
    personality:
      "Logical, restrained, and frighteningly capable. Maya is at her most emotional when she is trying the hardest not to be.",
    secret:
      "You conducted a controversial experiment before the lockdown began, and part of you still believes the work could have helped people if it had not been twisted.",
    relationshipToVictim:
      "Theo knew enough about your past to threaten you with it, but not enough to understand why that threat mattered.",
    isMurderer: true,
    packet: {
      vibe: "Precision under pressure, grief disguised as control.",
      publicBio:
        "You are the person people trust to explain mechanisms, timing, and evidence. That makes you useful, but it also means every technical detail you offer can turn back on you.",
      willingToShare:
        "You will share that poison does not require brute strength and that someone familiar with dosage could stage it cleanly. You will not initially share how personally Theo’s revelations threatened you.",
      roleplayNotes: [
        "Stay measured even when accusations sting.",
        "Answer technical questions clearly; dodge emotional ones until you cannot.",
        "Play guilt as exhaustion and moral conflict, not cartoon villainy.",
      ],
      suspicionLevel:
        "Others may see you as cold, hyper-competent, and exactly the kind of person who could execute a clean poisoning.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "Theo confronted you in the library with documents tying your old experiment to Blackwood’s hidden program. He acted like exposing you would give him leverage over the academy board.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "The camera outage was not your work. You actually used the darkness to leave because staying any longer with Theo felt dangerous for both of you.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "You noticed Sienna drawing in the library corridor and realized she might have captured the argument. That frightened you more than the accusation itself.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "The audio clip catches only the middle of the conversation. It does not include the part where Theo admitted he had proof students were being used as data points long before tonight.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "You took the vial because you could not bear the idea of Theo weaponizing those experiments any further. Part of you still thinks stopping him was necessary, even if what you did was unforgivable.",
        },
      ],
    },
  },
  {
    name: "Jordan Reed",
    role: "Ultimate Comedian",
    personality:
      "Quick, funny, and always a little sideways from sincerity. Jordan uses humor like body armor.",
    secret:
      "Behind the jokes, you are carrying something heavy and personal enough that you panic whenever the room gets too honest.",
    relationshipToVictim:
      "Theo liked your jokes when they targeted other people and hated them when they landed too close to him.",
    isMurderer: false,
    packet: {
      vibe: "Deflection with a pulse underneath it.",
      publicBio:
        "You keep people laughing because silence is where panic lives. Unfortunately, murder makes silence hard to avoid.",
      willingToShare:
        "You will share that Theo bullied people with information. You will not share the personal thing you are hiding unless someone earns it.",
      roleplayNotes: [
        "Use jokes to dodge, then let one or two moments land sincerely.",
        "Notice the emotional temperature of the room.",
        "Be the person who says the scary thing in a way people can actually hear.",
      ],
      suspicionLevel:
        "Others may see you as slippery because you never answer a hard question straight the first time.",
      privateClues: [
        {
          clueIndex: 1,
          secretInfo:
            "You bumped into Theo outside the library and he said, 'If this goes wrong, at least one of us deserves it.' You laughed because the alternative was asking what he meant.",
        },
        {
          clueIndex: 2,
          secretInfo:
            "During the outage, you heard Lila gasp and someone else hiss for her to keep moving. It sounded tense, but not like the killer calmly executing a plan.",
        },
        {
          clueIndex: 3,
          secretInfo:
            "Sienna asked you earlier whether you thought guilt changed posture. You made a joke, but she was not joking at all.",
        },
        {
          clueIndex: 4,
          secretInfo:
            "Noah’s recorder catches more than people realize. If he says Theo and Maya fought hard, believe him, but also remember Noah edits stories for impact when he is excited.",
        },
        {
          clueIndex: 5,
          secretInfo:
            "You saw Rei near a terminal before the logs came up, which makes Rei look suspicious. You also saw the panic in their face afterward, and it looked more like fear than triumph.",
          onlyWhenBonus: true,
        },
      ],
    },
  },
];

const bonusCharacter = {
  name: "Rei Sato",
  role: "Ultimate Programmer",
  personality:
    "Quiet, precise, and unnervingly composed. Rei notices how systems break before anyone else realizes there was a system at all.",
  secret:
    "You found partial access logs suggesting the academy AI is being altered by a human hand. You have not shared everything because you are not sure which truth is more dangerous.",
  relationshipToVictim:
    "Theo kept pushing you to verify whether the academy AI could be overridden. You never told him how close you were to finding out.",
  isMurderer: false,
  onlyWhenBonus: true,
  packet: {
    vibe: "A still surface hiding live current underneath.",
    publicBio:
      "You understand code, permissions, and the uncomfortable fact that a sealed system is only truly sealed until a human starts editing it from inside.",
    willingToShare:
      "You will share that the academy logs were altered. You will not initially share how early you found that evidence or why you hid it.",
    roleplayNotes: [
      "Speak carefully, like every word is a security credential.",
      "Notice system logic before social logic.",
      "Let suspicion sit on you without trying too hard to escape it.",
    ],
    suspicionLevel:
      "Others may see you as a red flag the moment anything digital stops making sense.",
    privateClues: [
      {
        clueIndex: 1,
        secretInfo:
          "Theo approached you before dinner asking whether someone could edit academy logs without full admin access. You lied and said probably not.",
      },
      {
        clueIndex: 2,
        secretInfo:
          "The camera outage was too clean to be a random failure. A human initiated it, then patched over the record badly enough that someone technical could still smell the edit.",
        onlyWhenBonus: true,
      },
      {
        clueIndex: 3,
        secretInfo:
          "The torn sketch page matters because the timestamp on it lines up with a silent terminal ping from the library wing. Someone physically present also touched the system that night.",
      },
      {
        clueIndex: 4,
        secretInfo:
          "Theo wanted proof the academy AI was being nudged by a person instead of acting alone. You think he planned to use that proof as leverage.",
      },
      {
        clueIndex: 5,
        secretInfo:
          "The tampered access log points to a manual overwrite from a maintenance console, not the AI itself. The system voice is being steered by human hands somewhere in the academy.",
        onlyWhenBonus: true,
      },
    ],
  },
};

const clues = [
  {
    title: "Round 1: Body in the Library",
    description:
      "Theo Grant is discovered collapsed beside a reading table in the library. A glass with a bitter almond smell sits near his hand, and there are no signs of a physical struggle.",
    significance:
      "This establishes poison as the method, the library as the crime scene, and a killer who likely relied on planning rather than brute force.",
  },
  {
    title: "Round 2: The Camera Gap",
    description:
      "Security footage from the east hall cuts out for several minutes between 8:56 PM and 9:04 PM. Roman was seen storming away from the library wing shortly before the gap began.",
    significance:
      "The outage suggests intentional tampering and keeps Roman in the suspect pool without directly proving he returned to kill Theo.",
  },
  {
    title: "Round 3: The Torn Sketch",
    description:
      "A torn page from Sienna’s sketchbook is recovered from a trash slot near the library. The image shows a figure in the corridor at 8:57 PM, one hand tucked into a sleeve and something small clenched near the wrist.",
    significance:
      "The sketch places a suspicious figure near the library around the likely time of death and hints at lab-related clothing or equipment.",
  },
  {
    title: "Round 4: The Audio Fragment",
    description:
      "A recorder hidden among library books captures part of a heated exchange. Theo can be heard accusing someone of helping Blackwood bury unethical experiments, while the second voice insists he has no idea what the academy really did.",
    significance:
      "This shifts the mystery toward motive and ties Theo’s death to Blackwood’s hidden experiments rather than simple personal conflict.",
  },
  {
    title: "Round 5: The Missing Vial",
    descriptionWithoutBonus:
      "A chemical vial is missing from the science prep cabinet, and residue in Theo’s glass matches a compound Maya would know how to prepare. The lab cabinet log was opened manually, but the record is damaged and incomplete.",
    descriptionWithBonus:
      "A chemical vial is missing from the science prep cabinet, and residue in Theo’s glass matches a compound Maya would know how to prepare. Rei’s recovered access log shows the academy records were manually overwritten from a maintenance console shortly after the vial disappeared.",
    significanceWithoutBonus:
      "The poison source points toward technical knowledge and access to the lab, while the damaged record suggests someone tried to erase a trail.",
    significanceWithBonus:
      "The poison source points toward technical knowledge and access to the lab. Rei’s log proves a human tampered with the academy records, tightening the timeline and making the cleanup look deliberate rather than accidental.",
  },
];

const hostGuide = {
  summary:
    "A private, anime-inspired academy mystery for a single invited group. Ten elite students are trapped inside Blackwood Academy, and Theo Grant is later found poisoned in the library. Maya Chen is the killer, but the table should have several viable suspects until the late rounds.",
  setupChecklist: [
    "Assign all active characters before starting. In standard mode, that means 10 players including Theo’s brief pre-discovery role. In bonus mode, assign Rei as the optional 11th player.",
    "Tell Theo’s player that their role shifts into silent observer mode after the body is discovered unless you invite a flashback moment.",
    "Keep the Solution section hidden until the accusation phase is over.",
  ],
  assignmentNotes: [
    "Use the mystery detail page to assign players and send mobile links exactly like any other game in the app.",
    "If you want the 11th player, toggle the bonus character before any assignments are made.",
    {
      onlyWhenBonus: true,
      text: "When Rei is active, lean into the idea that someone has tampered with the academy AI. Rei should feel suspicious without becoming the answer.",
    },
  ],
  roundFlow: [
    {
      round: "Intro / Lockdown",
      objective:
        "Set the academy tone, introduce the trapped-student premise, and let everyone read their opening packets.",
      hostScript:
        "Welcome to Blackwood Academy. The doors are sealed, the monitors are awake, and the system voice has made one thing clear: the truth will not stay buried for long.",
      notes: [
        "Give players a few minutes to settle into character before the body discovery announcement.",
      ],
    },
    {
      round: "Body Discovery",
      objective:
        "Announce Theo’s death and move the group into the first investigation phase.",
      hostScript:
        "Attention, students. A body has been discovered. Theo Grant has been found in the library. Investigation begins now.",
      notes: [
        "Reveal Round 1 immediately after the announcement.",
        "Remind Theo’s player that they are now in observer mode unless you invite a flashback.",
      ],
    },
    {
      round: "Investigation Round 1",
      objective:
        "Open suspicion widely and let the group build early theories.",
      hostScript:
        "The academy lights remain locked on the scene. Search your memories, compare stories, and decide whose timeline is already starting to crack.",
      notes: [
        "Reveal Round 2 once players have debated the initial poison clue.",
        "Roman should feel hot-headed and suspicious here.",
      ],
    },
    {
      round: "Investigation Round 2",
      objective:
        "Shift from broad suspicion into motive and premeditation.",
      hostScript:
        "The truth never arrives all at once. It arrives in fragments, in scraps, in the details someone thought they could hide.",
      notes: [
        "Reveal Round 3, then Round 4 when the table is ready for the motive turn.",
        "This is where Sienna, Noah, and Maya should become central to the conversation.",
      ],
    },
    {
      round: "Accusation Phase",
      objective:
        "Reveal the final clue, open voting, and let players make a final judgment.",
      hostScriptWithoutBonus:
        "It is time to make your accusation. The academy has one last piece of evidence, and after that, your judgment stands on its own.",
      hostScriptWithBonus:
        "It is time to make your accusation. The academy’s last hidden log has been forced into the light, and now your judgment stands on its own.",
      notes: [
        "Reveal Round 5, then open voting in the control panel.",
        "Let the table sit in the tension for a moment before reading the final reveal.",
      ],
    },
  ],
  announcements: [
    "Attention, students. A body has been discovered.",
    "The investigation phase begins now.",
    "Speak carefully. Every half-truth sharpens the next accusation.",
    "The truth always claws its way to the surface.",
    {
      onlyWhenBonus: true,
      text: "System notice: unauthorized alterations to academy records have been detected.",
    },
  ],
  bonusModeNotes: [
    {
      onlyWhenBonus: false,
      text: "Standard mode uses the ten core players and keeps the academy-override mystery in the background.",
    },
    {
      onlyWhenBonus: true,
      text: "Bonus mode adds Rei Sato and strengthens the academy AI sabotage thread without changing the killer or core solution.",
    },
  ],
  solutionSummary:
    "Maya poisoned Theo in the library after discovering he intended to use Blackwood’s experiment files as leverage instead of exposing them responsibly. She believed she was stopping a greater harm, but her choice still made her the killer.",
  finalRevealScript: [
    "The truth is no longer hiding. Theo Grant died from poison slipped into his drink in the library between 9:00 and 9:30 PM.",
    "The person who killed him was Maya Chen, the Ultimate Scientist.",
    "Maya did not act out of simple cruelty. Theo had uncovered Blackwood’s unethical experiments and planned to weaponize that knowledge for control. Maya realized he would bury more people with the truth than he would save.",
    "She took the vial, confronted him in the library, and made a choice she believed would stop something worse. The missing chemical, the argument on the recording, and the erased trail all lead back to her.",
    "In Blackwood Academy, good intentions are not innocence. The final judgment is yours to live with.",
  ],
};

export const despairAtBlackwoodAcademyTemplate = {
  slug: "despair-at-blackwood-academy",
  title: "Despair at Blackwood Academy",
  subtitle: "An elite academy mystery of secrets, suspicion, and betrayal",
  theme: "anime-inspired social deduction mystery",
  audience: "teens / family-safe older kids",
  contentRating: "PG-13-ish",
  visibility: "hidden",
  status: "private",
  hostRequired: true,
  supportsOptionalCharacter: true,
  tags: [
    "mystery",
    "academy",
    "anime-inspired",
    "social deduction",
    "teen party",
    "mobile-friendly",
  ],
  mysteryData: {
    title: "Despair at Blackwood Academy",
    subtitle: "An elite academy mystery of secrets, suspicion, and betrayal",
    premise:
      "Ten elite students, each celebrated as the \"Ultimate\" in their field, awaken inside the sealed halls of Blackwood Academy. A cold academy AI flickers across every monitor and calmly announces the new rule of survival: when murder shatters the uneasy peace, only those who uncover the truth will have any hope of escaping. Later that night, Theo Grant is found dead in the library. The remaining students must compare secrets, challenge alibis, and survive the accusation phase long enough to reach the final judgment.",
    victim: {
      name: "Theo Grant",
      background:
        "Theo is the Ultimate Heir, raised inside wealth, influence, and the assumption that every locked door eventually opens for him. At Blackwood Academy, that confidence turned sharp and ugly once he realized his family’s legacy was tangled up in the school’s darkest secrets.",
      reasonKilled:
        "Theo had uncovered evidence tying Blackwood Academy to unethical human experimentation and was prepared to use that knowledge as leverage. Too many people feared what he knew, and one person believed stopping him was the only moral choice left.",
      causeOfDeath: "Poisoned drink",
      location: "Library",
      estimatedTimeOfDeath: "Approximately 9:00–9:30 PM",
    },
    characters: [...baseCharacters, bonusCharacter],
    murdererMotive:
      "Maya discovered that Theo was entangled in the academy’s unethical experiments and intended to use that truth to manipulate the survivors rather than free them. She killed him believing she was preventing a deeper catastrophe, even though the choice destroyed any claim she had to innocence.",
    timeline: [
      {
        time: "7:30 PM",
        event:
          "The academy AI announces the lockdown rules and forces the students into a tense night of guarded alliances.",
      },
      {
        time: "8:15 PM",
        event:
          "Theo quietly pressures multiple students for information connected to Blackwood’s hidden experiment records.",
      },
      {
        time: "8:40 PM",
        event:
          "Roman and Theo argue loudly near the gym stairs, giving the group an obvious but incomplete early suspect.",
      },
      {
        time: "8:56 PM",
        event:
          "The east hall security feed drops for several minutes, obscuring movement around the library wing.",
      },
      {
        time: "9:00–9:30 PM",
        event:
          "Theo is poisoned in the library after a final confrontation about Blackwood’s experiments and who gets to control the truth.",
      },
      {
        time: "9:35 PM",
        event:
          "Theo’s body is discovered, and the academy AI orders the surviving students into an investigation.",
      },
    ],
    clues,
    solution:
      "Maya Chen poisoned Theo Grant in the library. Theo had uncovered records proving Blackwood Academy conducted unethical experiments and that his own family helped protect the program. Instead of exposing the truth cleanly, he intended to use it as leverage over the trapped students and anyone else still alive inside the academy. Maya knew how much damage that would cause because parts of her own past work had already been twisted by the same institution.\n\nThe evidence narrows toward her in layers. The poisoned glass and missing vial point to someone with scientific knowledge. The torn sketch places a lab-marked figure near the library. Noah’s audio fragment reveals that Theo and Maya were arguing specifically about the experiments. The damaged logs show deliberate cleanup, and in bonus mode Rei’s recovered overwrite proves a human hand altered the system records. Maya is not obvious at first because Roman, Noah, Sienna, Kai, Elara, and Rei all carry believable suspicion. But by the end, motive, access, technical ability, and the emotional shape of the confrontation all converge on Maya.",
    hostGuide,
    metadata: {
      theme: "anime-inspired social deduction mystery",
      audience: "teens / family-safe older kids",
      status: "private",
      visibility: "invite-only",
      playerCountMin: 10,
      playerCountMax: 11,
      supportsOptionalCharacter: true,
      tags: [
        "mystery",
        "academy",
        "anime-inspired",
        "social deduction",
        "teen party",
        "mobile-friendly",
      ],
    },
  },
};

export function createDespairAtBlackwoodAcademyInstance({
  includeBonusCharacter = false,
  createdByEmail = null,
}) {
  const id = `${despairAtBlackwoodAcademyTemplate.slug}-${Date.now()}`;

  return {
    id,
    mysteryData: despairAtBlackwoodAcademyTemplate.mysteryData,
    config: {
      templateSlug: despairAtBlackwoodAcademyTemplate.slug,
      title: despairAtBlackwoodAcademyTemplate.title,
      subtitle: despairAtBlackwoodAcademyTemplate.subtitle,
      setting: "Blackwood Academy",
      tone: "High drama",
      difficulty: "Medium",
      theme: despairAtBlackwoodAcademyTemplate.theme,
      audience: despairAtBlackwoodAcademyTemplate.audience,
      contentRating: despairAtBlackwoodAcademyTemplate.contentRating,
      playerCount: includeBonusCharacter ? 11 : 10,
      playerCountMin: 10,
      playerCountMax: 11,
      hostRequired: true,
      supportsOptionalCharacter: true,
      includeBonusCharacter,
      status: "private",
      visibility: "hidden",
      inviteOnly: true,
      hideFromPublicCatalog: true,
      revealAnswerKeyOnlyToHost: true,
      printableModeAvailable: false,
      tags: [...despairAtBlackwoodAcademyTemplate.tags],
      userEmail: createdByEmail,
    },
  };
}

