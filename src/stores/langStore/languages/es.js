import { BLUE, GREEN, RED, YELLOW } from "../../../constants";
import { EN, ES } from "../constants";

const utils = {
    appName: 'AlphaDSGame',
    player: 'Jugador',
    start: 'Comenzar',
    cancel: 'Cancelar',
    accept: 'Aceptar',
    trade: 'Negociar',
    endTurn: 'Terminar el turno',
    nextAction: 'Siguiente acción',
    fix: 'Solucionar',
    gameOver: 'Fin del juego',
    goBackHome: 'Volver a la pantalla de inicio',
    [EN]: 'Ingles',
    [ES]: 'Español',
};

const homePage = {
  wellcomeTo: `Bienvenido a ${utils.appName}`,
};

const leftUI = {
  dataInWay: 'El dato esta en tu camino de datos, pierdes tu turno',
};

const tradeModal = { // will be deleted
  title: 'Seleccione las cartas que quiere intercambiar',
};

const rigthUI = {
  misionTitles: {
    [BLUE]: 'Misión de datos',
    [YELLOW]: 'Misión de procesamiento',
    [RED]: 'Misión de modelado',
    [GREEN]: 'Misión de visualización',
  },
  misionDescription: {
    [BLUE]: 'Ayuda a Shannon a recopilar toda la información posible sobre sus ovejas y su comportamiento cuando el lobo está cerca',
    [YELLOW]: '¡Ayuda al informático a explorar los datos de las ovejas utilizando software informático!',
    [RED]: '¡Ayuda al matemático a construir un modelo para detectar cuándo va a atacar el lobo!',
    [GREEN]: '¡Ayuda al informático a crear una aplicación móvil que avise a Shannon cuando el lobo se acerque peligrosamente a sus ovejas!',
  },
  misionCompletedDescription: {
    [BLUE]: 'Entiendes perfectamente lo que Shannon necesita.\nHas recopilado los datos sobre las ovejas.\nHas almacenado los datos en un ordenador.',
    [YELLOW]: 'Tienes una visión general de las ovejas y sus características.\nDespués de organizar y limpiar tus datos, están listos para el siguiente paso',
    [RED]: 'Has probado y evaluado diferentes modelos.\nHas elegido el mejor para detectar el ataque del lobo. \nEstán listos para dar la buena noticia a Shannon',
    [GREEN]: 'Has desarrollado una útil aplicación móvil que alerta a Shannon cuando el lobo está a punto de atacar a sus ovejas.\nLe has explicado el modelo y la aplicación a Shannon y está muy contenta porque lo domina',
  },
};

const market = {
  riskMsg: 'El juego se pausara hasta que se resuelva el riesgo.',
};

const successModal = {
  points: 'puntos',
  winnerAnnouncement: 'El ganador es',
};

const nextPlayerModal = {
  title: '¿Esta seguro de terminar el turno?',
};

const failModal = {
  systemCompromised: 'El sistema se vio comprometido',
};

const cards = {
  types: {
    math: 'Matematicas',
    compSci: 'Informática',
    domain: 'Campo',
  },
  subTypes: {
    fastModel: 'Modelo rápido',
    simpModel: 'Modelo simple',
    rightModel: 'Modelo correcto',
    newTech: 'Nueva tecnología',
    antivirus: 'Antivirus',
    openSource: 'Open source',
    dataBase: 'Base de datos',
    protData: 'Datos protejidos',
    teamSpirit: 'Espiritu de equipo',
  },
};

const risks = {
  types: {
    cmplxModel: 'Modelo Complejo',
    dngData: 'Datos en Peligro',
    noData: 'Sin datos',
    oldSW: 'Software antiguo',
    oldTech: 'Tecnologia antigua',
    slowModel: 'Modelo lento',
    virus: 'Virus',
    workingAlone: 'Trabajo solitario',
    wrongModel: 'Modelo incorrecto',
  },
  descriptions: {
    cmplxModel: `Usa ${cards.subTypes.simpModel} para arreglar el riesgo`,
    dngData: `Usa ${cards.subTypes.protData} para arreglar el riesgo`,
    noData: `Usa ${cards.subTypes.dataBase} para arreglar el riesgo`,
    oldSW: `Usa ${cards.subTypes.openSource} para arreglar el riesgo`,
    oldTech: `Usa ${cards.subTypes.newTech} para arreglar el riesgo`,
    slowModel: `Usa ${cards.subTypes.fastModel} para arreglar el riesgo`,
    virus: `Usa ${cards.subTypes.antivirus} para arreglar el riesgo`,
    workingAlone: `Usa ${cards.subTypes.teamSpirit} para arreglar el riesgo`,
    wrongModel: `Usa ${cards.subTypes.rightModel} para arreglar el riesgo`,
  },
};

const specialSlabs = {
  titles: {
    bigData: 'Big Data',
    goalsDef: 'Definición de objetivos',
    dataUnderstanding: 'Comprensión de datos',

    patternRecognition: 'Reconocimiento de patrones',
    outlierDetection: 'Detección de valores atípicos',
    modelEvaluation: 'Evaluación de modelos',
    
    graficalExploring: 'Exploración gráfica',
    numericalExploring: 'Exploración numérica',
    dataCleaning: 'Limpieza de datos',

    mobileApplication: 'Aplicación móvil',
    storytelling: 'Narración',
    deployment: 'Despliegue',
  },
  subTitles: {
    lotOfData: 'Muchos datos',
    questionAnswer: '¿Qué preguntas quieres responder?',
    dataOkey: '¿Están bien sus datos?',

    patternsInData: 'Buscando patrones en tus datos',
    strangeData: 'Buscando datos extraños en sus datos',
    modelGood: '¿Cómo de bueno es el modelo?',

    graphicalTools: 'Utilizando herramientas gráficas para ver sus datos',
    mathematicalTools: 'Usando herramientas matemáticas para ver tus datos',
    dataAnalysis: 'Preparar tus datos para el análisis',

    phoneApp: 'Una aplicación para tu teléfono móvil',
    usersResults: 'Presentar los resultados a los usuarios',
    finalProduct: 'Para desarrollar el producto final',
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