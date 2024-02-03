import { BLUE, GREEN, MISSION_TYPE_DNA_SHERIFF, MISSION_TYPE_TO_SAFETY, MISSION_TYPE_WOLFS, RED, YELLOW } from "../../../constants";
import { EN, ES } from "../constants";

const utils = {
    appName: 'AlphaDSGame',
    player: 'Player',
    start: 'Start',
    cancel: 'Cancel',
    accept: 'Accept',
    trade: 'Trade',
    offer: 'Offer',
    endTurn: 'Finish turn',
    nextAction: 'Next action',
    fix: 'Fix',
    gameOver: 'Game over',
    goBackHome: 'Go back home',
    [EN]: 'English',
    [ES]: 'Spanish',
};

const instructionsModal = {
  title: 'Instructions',
  startGame: 'Start of the game',
  objective: 'Objective',
  buyComponents: 'Buy and place components',
  tradeCards: 'Trade cards',
  finishGame: 'End of the game',

  homPageExplanation: `.
    This screen is the welcome screen of the app, to start the game the players must be configured.`,
  homePlayerInputsExplanation: `.
    To configure the players use these fields in which you can change the name and type of player (by clicking on the arrows that appear when you hover the cursor over them) between bot and player.`,
  homPageTransitionExplanation: `
    Once this is done simply click on the button containing the text '${utils.start}' to start the game`,
  mainPageStartExplanation: `
    When the game starts it shows us the interface of the game, there are different elements each one with a very concrete objective that will be developed later. However, the game has already started.`,

  mainMissionExplanation: `
    The objective of the game is to help Shannon by creating an application that tells him when the wolf is near, for this the team in charge will have to work on different key modules for the correct functioning of the application.`,
  boardObjectiveExplanation: `
    These modules will have to be connected to each other by a network in charge of communicating the different components of the application.
    Therefore, in first instance, the objective is to connect your module with the rest and, later, to increase the complexity of the module by adding more components.`,

  marketExplanation: `
    This part of the interface is where the components available for purchase will be shown together with their costs, these components will have a red shading when it is not possible to buy them.
    There are different types of components that can be displayed in this marketplace:`,
  normalComponentExplanation: `.
    These are the three most normal types of components, it should be noted that each component has an associated score, the gold is worth more than the silver and the silver more than the basic, it should be noted that there are variations of these components that do not connect in all directions and that these components can be rotated by clicking on the buttons that appear when you hold the cursor over them.`,
  specialComponentExplanation: `
    Throughout the game there will be components like these, these components can only be bought by the person in charge of the corresponding module, there are three special components per module and as you can imagine they have more value than the previous components, also these components always connect in all directions.`,
  riskExplanation: `.
    In addition, it is possible that risks may arise during the game, which will be shown as follows in the market, with a red shadow if they cannot be solved.
    These risks will force the players to solve them if they want to continue the game, since, it will not be possible to buy any item while there is a risk in the market.
    To solve the risks you must have the right cards for each type, and select them, once selected the button is enabled and allows you to solve the risk.
    Solving the risk gives points to the player who has managed to solve it.`,
  cardsExplanation: `
    Under the market each player has a maximum of 4 cards with which you can buy components and solve risks, these cards can be selected by clicking on them and can be discarded by clicking on the button that appears when you put the cursor over them.`,
  placingExplanation: `
    To place a component you have to select the cards that meet the specific costs of the component to buy, then you can drag the component and place it on the board where it will be placed in a valid square.`,
  
  tradeExplanation: `
    A key feature of the interface is the fact of being able to trade cards between players, to do this, you must click on the button that says '${utils.trade}', this will display the interface in charge of the trades.
    To perform a trade, the player must select cards from his deck. Next, select the player with whom he wants to trade, and then select the cards of this player.
    Then, a modal will be displayed to the player to whom the trade is offered where he can accept or refuse the trade.`,
};

const leftUI = {
  dataInWay: 'The data is in your data way, you lose your turn',
};

const homePage = {
  wellcomeTo: `Wellcome to ${utils.appName}`,
  missions: {
    [MISSION_TYPE_WOLFS]: 'Wolfs!',
    [MISSION_TYPE_DNA_SHERIFF]: 'DNA Sheriff',
    [MISSION_TYPE_TO_SAFETY]: 'Highway to safety',
  },
  objectiveDescriptions: {
    [MISSION_TYPE_WOLFS]: `
      Shannon the shepherd is worried about a wolf attacking her sheep.
      Data science can help her!
      Your job is to help her by developing an application that alerts Shannon when the wolf is going to attack.`,
    
    [MISSION_TYPE_DNA_SHERIFF]: `
      Margarita Salas, biochemist needs help with her research.
      Data science can help her!
      Your job is to help her by developing an application that analyzes and classifies DNA samples from various viruses.`,
    
    [MISSION_TYPE_TO_SAFETY]: `
      Prudens and her siblings are worried about safety on their way to school.
      Data science can help her!
      Your job is to help them by developing an application that provides them with the safest way to class.`,
  },
};

const tradeModal = { // will be deleted
  title: (name = 'Please') => `${name} select which cards you want to trade`,
  onTradeAcceptQst: 'Do you want to accept the trade?',
  noPlayersToTrade: 'No players to trade',
};

const rigthUI = {
  misionTitles: {
    [BLUE]: 'Data mission',
    [YELLOW]: 'Processing mission',
    [RED]: 'Modeling mission',
    [GREEN]: 'Visualization mission',
  },
  misionDescription: {
    [BLUE]: {
      [MISSION_TYPE_WOLFS]: 'Help Shannon to collect all the possible information about her sheep and their behavior when the wolf is around',
      [MISSION_TYPE_DNA_SHERIFF]: 'Help Margarita to collect all the possible information about the viruses',
      [MISSION_TYPE_TO_SAFETY]: 'Help Prudens and his brothers to collect all the possible information about the ways on their town',
    },
    [YELLOW]: 'Help the computer scientist to explore the sheep data using computer software!',
    [RED]: 'Help the mathematician to build a model to detect when the wolf is going to attack!',
    [GREEN]: 'Help the computer scientist to create a mobile app to alert Shannon when the wolf is dangerously near her sheep!',
  },
  misionCompletedDescription: {
    [BLUE]: {
      [MISSION_TYPE_WOLFS]: 'You fully understand what Shannon needs.\nYou have collected the data about the sheep.\nYou have stored the data in a computer.',
      [MISSION_TYPE_DNA_SHERIFF]: 'You fully understand what Margarita needs.\nYou have collected the data about the viruses.\nYou have stored the data in a computer.',
      [MISSION_TYPE_TO_SAFETY]: 'You fully understand what Prudens and his brothers needs.\nYou have collected the data about the ways.\nYou have stored the data in a computer.',
    },
    [YELLOW]: 'You have an overview of the sheep and their features.\nAfter organizing and cleaning your data, they are ready for the next step.',
    [RED]: 'You have tried and evaluate different models.\nYou have chosen the best one to detect the wolf’s attack. \nYou are ready to tell Shannon the good news',
    [GREEN]: 'You have developed a useful mobile app that alerts Shannon whenever the wolf is about to attack her sheep.\nYou have explained the model and the app to Shannon and she is so happy because she masters it',
  },
};

const market = {
  riskMsg: 'The game will pause until the risks are resolved.',
  importantInfo: 'Important information',
};

const successModal = {
  points: 'points',
  winnerAnnouncement: 'The winner is',
};

const nextPlayerModal = {
  title: 'Are you sure to finish the turn?',
};

const cards = {
  types: {
    math: 'Mathematics',
    compSci: 'Computer Science',
    domain: 'Domain',
  },
  subTypes: {
    fastModel: 'Fast model',
    simpModel: 'Simple model',
    rightModel: 'Right model',
    newTech: 'New technology',
    antivirus: 'Antivirus',
    openSource: 'Open source',
    dataBase: 'Data base',
    protData: 'Protected data',
    teamSpirit: 'Team spirit',
  },
};

const risks = {
  types: {
    cmplxModel: 'Complex model',
    dngData: 'Danger data',
    noData: 'No data',
    oldSW: 'Old software',
    oldTech: 'Old technology',
    slowModel: 'Slow model',
    virus: 'Virus',
    workingAlone: 'Working alone',
    wrongModel: 'Wrong model',
  },
  descriptions: {
    cmplxModel: `Use '${cards.subTypes.simpModel}' to fix the risk`,
    dngData: `Use '${cards.subTypes.protData}' to fix the risk`,
    noData: `Use '${cards.subTypes.dataBase}' to fix the risk`,
    oldSW: `Use '${cards.subTypes.openSource}' to fix the risk`,
    oldTech: `Use '${cards.subTypes.newTech}' to fix the risk`,
    slowModel: `Use '${cards.subTypes.fastModel}' to fix the risk`,
    virus: `Use '${cards.subTypes.antivirus}' to fix the risk`,
    workingAlone: `Use '${cards.subTypes.teamSpirit}' to fix the risk`,
    wrongModel: `Use '${cards.subTypes.rightModel}' to fix the risk`,
  },
};

const specialSlabs = {
  titles: {
    bigData: 'Big Data',
    goalsDef: 'Goals definition',
    dataUnderstanding: 'Data understanding',

    patternRecognition: 'Pattern Recognition',
    outlierDetection: 'Outlier Detection',
    modelEvaluation: 'Model Evaluation',
    
    graficalExploring: 'Graphical exploring',
    numericalExploring: 'Numerical Exploring',
    dataCleaning: 'Data Cleaning',

    mobileApplication: 'Mobile Application',
    storytelling: 'Storytelling',
    deployment: 'Deployment',
  },
  subTitles: {
    lotOfData: 'A lot of data',
    questionAnswer: 'What questions do you want to answer?',
    dataOkey: 'Are your data ok?',

    patternsInData: 'Looking for patterns in your data',
    strangeData: 'Looking for strange data in your data',
    modelGood: 'How good is the model?',

    graphicalTools: 'Using graphical tools to view your data',
    mathematicalTools: 'Using mathematical tools to view your data',
    dataAnalysis: 'Preparing your data for analysis',

    phoneApp: 'An app for your mobile phone',
    userResults: 'To present the results to the users',
    finalProduct: 'To develop the final product',
  },
};

const en = {
  homePage,
  tradeModal,
  rigthUI,
  leftUI,
  market,
  successModal,
  nextPlayerModal,
  cards,
  risks,
  specialSlabs,
  instructionsModal,
  utils,
};

export default en;
