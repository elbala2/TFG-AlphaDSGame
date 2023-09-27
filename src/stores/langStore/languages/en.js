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

export default {
  homePage,
  tradeModal,
  rigthUI,
  leftUI,
  market,
  successModal,
  nextPlayerModal,
  failModal,
  utils,
};