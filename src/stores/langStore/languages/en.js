import { BLUE, GREEN, RED, YELLOW } from "../../../constants";
import { EN, ES } from "../constants";

const utils = {
    appName: 'AlphaDSGame',
    player: 'Player',
    start: 'Start',
    cancel: 'Cancel',
    accept: 'Accept',
    trade: 'Trade',
    endTurn: 'Finish turn',
    nextAction: 'Next action',
    fix: 'Fix',
    gameOver: 'Game over',
    goBackHome: 'Go back home',
    [EN]: 'English',
    [ES]: 'Spanish',
};

const leftUI = {
  dataInWay: 'The data is in your data way, you lose your turn',
};

const homePage = {
  wellcomeTo: `Wellcome to ${utils.appName}`,
};

const tradeModal = { // will be deleted
  title: 'Please select which cards you want to trade',
};

const rigthUI = {
  misionTitles: {
    [BLUE]: 'Data mission',
    [YELLOW]: 'Processing mission',
    [RED]: 'Modeling mission',
    [GREEN]: 'Visualization mission',
  },
  misionDescription: {
    [BLUE]: 'Help Shannon to collect all the possible information about her sheep and their behavior when the wolf is around',
    [YELLOW]: 'Help the computer scientist to explore the sheep data using computer software!',
    [RED]: 'Help the mathematician to build a model to detect when the wolf is going to attack!',
    [GREEN]: 'Help the computer scientist to create a mobile app to alert Shannon when the wolf is dangerously near her sheep!',
  },
  misionCompletedDescription: {
    [BLUE]: 'You fully understand what Shannon needs.\nYou have collected the data about the sheep.\nYou have stored the data in a computer.',
    [YELLOW]: 'You have an overview of the sheep and their features.\nAfter organizing and cleaning your data, they are ready for the next step.',
    [RED]: 'You have tried and evaluate different models.\nYou have chosen the best one to detect the wolf’s attack. \nYou are ready to tell Shannon the good news',
    [GREEN]: 'You have developed a useful mobile app that alerts Shannon whenever the wolf is about to attack her sheep.\nYou have explained the model and the app to Shannon and she is so happy because she masters it',
  },
};

const market = {
  riskMsg: 'The game will pause until the risk is resolved.',
};

const successModal = {
  points: 'points',
  winnerAnnouncement: 'The winner is',
};

const nextPlayerModal = {
  title: 'Are you sure to finish the turn?',
};

const failModal = {
  systemCompromised: 'The system was compromised',
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
    cmplxModel: `Use ${cards.subTypes.simpModel} to fix the risk`,
    dngData: `Use ${cards.subTypes.protData} to fix the risk`,
    noData: `Use ${cards.subTypes.dataBase} to fix the risk`,
    oldSW: `Use ${cards.subTypes.openSource} to fix the risk`,
    oldTech: `Use ${cards.subTypes.newTech} to fix the risk`,
    slowModel: `Use ${cards.subTypes.fastModel} to fix the risk`,
    virus: `Use ${cards.subTypes.antivirus} to fix the risk`,
    workingAlone: `Use ${cards.subTypes.teamSpirit} to fix the risk`,
    wrongModel: `Use ${cards.subTypes.rightModel} to fix the risk`,
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

export default {
  homePage,
  tradeModal,
  rigthUI,
  leftUI,
  market,
  successModal,
  nextPlayerModal,
  failModal,
  cards,
  risks,
  specialSlabs,
  utils,
};