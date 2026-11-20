/*
  Judges Jeopardy content.
  Question text, titles and labels are copied exactly from the original slide deck.
  Answers are only shown in "With answers" mode (they are not part of the deck).
*/
window.GAME_DATA = {
  title: {
    kicker: "Ignite",
    heading: "Book of judges jeopardy",
    button: "Let’s Play"
  },

  rules: {
    heading: ["How to", "Play"],
    button: "GOOD LUCK",
    cards: [
      "You will compete individually",
      "Choose a category and point value.",
      "Each team has 20 seconds to answer.",
      "Correct answer? Add the points to your score.",
      "Wrong answer? Another team gets a chance to steal.",
      "Keep playing until the board is complete.",
      "The team with the most points wins!"
    ]
  },

  board: {
    heading: "Judges jeopardy",
    legend: ["1pt", "2pts", "3pts", "5pts", "10pts"]
  },

  timerSeconds: 20,

  categories: [
    {
      label: "Who am i?",
      clues: [
        { points: 1,  title: ["Who Am I?, 1 Pointer"],  question: ["I was the woman judges who led Israel and sat under a palm tree to settle disputes. my name starts with ‘d’"], answer: "Deborah", ref: "Judges 4:4-5" },
        { points: 2,  title: ["Who Am I?, 2 Pointer"],  question: ["I was a woman who killed the enemy commander sisera with a tent peg while he slept"], answer: "Jael", ref: "Judges 4:21" },
        { points: 3,  title: ["Who Am I?, 3 Pointer"],  question: ["i was driven out by my half-brothers, then led israel against the ammonites"], answer: "Jephthah", ref: "Judges 11:1-33" },
        { points: 5,  title: ["Who Am I?, 5 Pointer"],  question: ["i was gideon’s son. i killed my 70 brothers and made myself king of shechem"], answer: "Abimelech", ref: "Judges 9:1-6" },
        { points: 10, title: ["Who Am I?, 10 Pointer"], question: ["i was israel’s first judge, and i was caleb’s nephew"], answer: "Othniel", ref: "Judges 3:9-11" }
      ]
    },
    {
      label: "Gideon",
      clues: [
        { points: 1,  title: ["Gideon, 1 Pointer"],  question: ["how many men were in gideon’s final army: 30, 300 or 3000?"], answer: "300", ref: "Judges 7:7" },
        { points: 2,  title: ["Gideon, 2 Pointer"],  question: ["gideon’s men surrounded the enemy with trumpets and what else: swords, jars with torches inside, or spears?"], answer: "Jars with torches inside", ref: "Judges 7:16-20" },
        { points: 3,  title: ["Gideon, 3 Pointer"],  question: ["god cut gideon’s army down from 32,000. why?"], answer: "So Israel could not boast that its own strength saved it. The victory would clearly be God’s.", ref: "Judges 7:2" },
        { points: 5,  title: ["Gideon, 5 Pointer"],  question: ["what did gideon lay out overnight twice, to test god?"], answer: "A wool fleece", ref: "Judges 6:36-40" },
        { points: 10, title: ["Gideon, 10 Pointer"], question: ["gideon made something out of gold from the plunder that later led israel astray. what was it?"], answer: "An ephod", ref: "Judges 8:24-27" }
      ]
    },
    {
      label: "Samson",
      clues: [
        { points: 1,  title: ["Samson, 1 Pointer"],  question: ["what was the source of Samson’s great strength?"], answer: "God. The Spirit of the LORD came on him, and his uncut hair was the sign of his Nazirite vow.", ref: "Judges 14:6; 16:17" },
        { points: 2,  title: ["Samson, 2 Pointer"],  question: ["who told Samson’s parents, before he was born, that they would have a son?"], answer: "The angel of the LORD", ref: "Judges 13:3" },
        { points: 3,  title: ["Samson, 3 Pointer"],  question: ["what did samson use to defeat a crowd of philistines: a sword, donkey’s jawbone or a sling?"], answer: "A donkey’s jawbone", ref: "Judges 15:15" },
        { points: 5,  title: ["Samson, 5 Pointer"],  question: ["samson’s wedding feast-riddle was about what sweet food?"], answer: "Honey", ref: "Judges 14:8-14" },
        { points: 10, title: ["Samson, 10 Pointer"], question: ["samson was a nazarite from birth. what things was he to avoid?"], answer: "Cutting his hair, wine or anything from the grapevine, and anything unclean (including touching dead bodies)", ref: "Judges 13:4-5; Numbers 6:1-8" }
      ]
    },
    {
      label: "Tent peg showdown",
      clues: [
        { points: 1,  title: ["Tent Peg Showdown, ", "1 Pointer"],  question: ["which woman killed the enemy commander with a tent peg. her name starts with a ‘J’"], answer: "Jael", ref: "Judges 4:21" },
        { points: 2,  title: ["Tent Peg Showdown, ", "2 Pointer"],  question: ["who was the enemy commander. his name starts with ‘s’"], answer: "Sisera", ref: "Judges 4:2" },
        { points: 3,  title: ["Tent Peg Showdown, ", "3 Pointer"],  question: ["which general did the woman judge call to lead israel‘s army"], answer: "Barak", ref: "Judges 4:6" },
        { points: 5,  title: ["Tent Peg Showdown, 5 Pointer"],      question: ["the enemy commander asked for water. what did she give him instead?"], answer: "Milk", ref: "Judges 4:19; 5:25" },
        { points: 10, title: ["Tent Peg Showdown, 10 Pointer"],     question: ["which river swept away the enemy’s chariots?"], answer: "The river Kishon", ref: "Judges 5:21" }
      ]
    },
    {
      label: "numbers and places",
      clues: [
        { points: 1,  title: ["Numbers and Places,", "1 Pointer"],  question: ["how many main pillars did samson push apart to bring down the temple: 1, 2 or 4?"], answer: "2", ref: "Judges 16:29-30" },
        { points: 2,  title: ["Numbers and Places,", "2 Pointer"],  question: ["samson carried off the gates of which city: gaza, jerusalem or bethlehem?"], answer: "Gaza", ref: "Judges 16:1-3" },
        { points: 3,  title: ["Numbers and Places,", "3 Pointer"],  question: ["how many philistines did samson kill with the jawbone?"], answer: "1,000", ref: "Judges 15:15-16" },
        { points: 5,  title: ["Numbers and Places,", "5 Pointer"],  question: ["how many foxes did samson tie torches to?"], answer: "300", ref: "Judges 15:4-5" },
        { points: 10, title: ["Numbers and Places,", "10 Pointer"], question: ["how many judges are named in the book of judges?"], answer: "12", ref: "Othniel, Ehud, Shamgar, Deborah, Gideon, Tola, Jair, Jephthah, Ibzan, Elon, Abdon, Samson" }
      ]
    },
    {
      label: "wild cards",
      clues: [
        { points: 1,  title: ["Wild Cards, 1 Pointer"],  question: ["which book comes straight after judges?"], answer: "Ruth", ref: "" },
        { points: 2,  title: ["Wild Cards, 2 Pointer"],  question: ["finish the line:", "“everyone did was right in their", "__________________”"], answer: "“…own eyes”", ref: "Judges 17:6; 21:25" },
        { points: 3,  title: ["Wild Cards, 3 Pointer"],  question: ["why did enemies keep attacking Israel in judges?"], answer: "Israel kept turning away from God to worship other gods, so God let their enemies defeat them", ref: "Judges 2:11-15" },
        { points: 5,  title: ["Wild Cards, 5 Pointer"],  question: ["king abhimelek was fatally wounded when a woman dropped something on his head from a tower. what was it?"], answer: "An upper millstone", ref: "Judges 9:53" },
        { points: 10, title: ["Wild Cards, 10 Pointer"], question: ["name four enemies of israel mentioned in the book of judges?"], answer: "Any four of: Canaanites, Midianites, Philistines, Moabites, Ammonites, Amalekites, Mesopotamia (Aram)", ref: "Judges 3-13" }
      ]
    }
  ],

  bonus: {
    label: "Bonus",
    title: ["BONUS QUESTION"],
    question: ["NAME AS MANY JUDGES AS YOU CAN FROM THE BOOK OF JUDGES"],
    answer: "Othniel, Ehud, Shamgar, Deborah, Gideon, Tola, Jair, Jephthah, Ibzan, Elon, Abdon, Samson",
    ref: "Barak, Abimelech and Eli (1 Samuel) are sometimes counted too"
  }
};
