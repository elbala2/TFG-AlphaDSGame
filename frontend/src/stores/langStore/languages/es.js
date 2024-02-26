import { BLUE, GREEN, MISSION_TYPE_DNA_SHERIFF, MISSION_TYPE_TO_SAFETY, MISSION_TYPE_WOLFS, RED, YELLOW } from "../../../constants";
import { EN, ES } from "../constants";

const utils = {
    appName: 'AlphaDSGame',
    player: 'Jugador',
    start: 'Comenzar',
    cancel: 'Cancelar',
    accept: 'Aceptar',
    trade: 'Negociar',
    offer: 'Ofrecer',
    endTurn: 'Terminar el turno',
    nextAction: 'Siguiente acción',
    fix: 'Solucionar',
    gameOver: 'Fin del juego',
    goBackHome: 'Volver a la pantalla de inicio',
    [EN]: 'Ingles',
    [ES]: 'Español',
};

const instructionsModal = {
  title: 'Instrucciones',
  startGame: 'Inicio de la partida',
  objective: 'Objetivo',
  buyComponents: 'Comprar y colocar componentes',
  tradeCards: 'Intercambiar cartas',
  finishGame: 'Fin de la partida',

  homPageExplanation: `
    Esta pantalla es la pantalla de bienvenida de la app, para comenzar el juego se deben configurar los jugadores.`,
  homePlayerInputsExplanation: `
    Para configurar los jugadores se usan estos campos en los cuales puedes cambiar el nombre y el tipo de jugador (pulsando en las flechas que salen al pasar el cursor por encima) entre bot y jugador.`,
  homPageTransitionExplanation: `
    Una vez hecho esto simplemente hay que darle al boton que contiene el texto '${utils.start}' para comenzar el juego.`,
  mainPageStartExplanation: `
    Al comenzar el juego nos muestra la interfaz del juego, en ella hay diferentes elementos cada uno con un objetivo muy concreto que pasaremos a desarrollar mas adelante. No obstante, la partida ya ha comenzado.`,

  mainMissionExplanation: `
    El objetivo del juego es ayudar a Shannon creando una aplicación que le indique cuando el lobo esta cerca, para ello el equipo encargado tendra que trabajar en distintos modulos clave para el correcto funcionamiento de la aplicación.`,
  boardObjectiveExplanation: `
    Dichos modulos tendrán que estar conectados entre si mediante una red encargada de comunicar los distintos componentes de la aplicación.
    Por lo tanto, en primera instancia, el objetivo es conectar tu modulo con el resto y, posteriormente, aumentar la complejidad de dicho modulo añadiendo mas componentes.`,

  marketExplanation: `
    En esta parte de la interfaz es donde se mostrarán los componentes disponibles para comprar junto con sus costes, estos componentes tendrán un sombreado rojo cuando no sea posible comprarlos.
    Hay distintos tipos de componentes que pueden salir en este mercado:`,
  normalComponentExplanation: `
    Estos son los tres tipos de componentes mas normales, cabe destacar que cada componente tiene una puntuación asociada, el dorado vale mas que el plateado y el plateado mas que el básico, hay que tener en cuenta que de estos componentes existen variaciones que no conectan en todas direcciones y que dichos componentes se pueden rotar pulsando en los botones que aparecen al mantener el cursor encima.`,
  specialComponentExplanation: `
    A lo largo del juego saldran componetes como estos, estos componentes solo los puede comprar el encargado del modulo correspondiente, hay tres componentes especiales por modulo y como es de suponer tienen mas valor que los componentes anteriores, ademas estos componentes siempre conectan en todas direcciones.`,
  riskExplanation: `
    Ademas, es posible que surjan riesgos a lo largo de la partida, los cuales se mostraran de la siguiente manera en el mercado, viendose con una sombra roja en caso de no poder solucionarse.
    Estos riesgos forzaran a los jugadores a resolverlos si quieren continuar el juego, puesto que, no se podra comprar ningun componete mientras hay un riesgo en el mercado.
    Para solucionar los riesgos hay que tener las cartas adecuadas para cada tipo, y seleccionarlas, una vez seleccionadas el boton se habilita y te permite solucionar el riesgo.
    Solucionar los riesgos aporta puntos al jugador que ha conseguido solucionarlo.`,
  cardsExplanation: `
    Debajo del mercado cada jugador tiene un maximo de 4 cartas con las que puedes comprar componentes y resolver riesgos, estas cartas se pueden seleccionar pulsando sobre ellas y se pueden descartar haciendo click en el boton que aparece al poner el cursor encima.`,
  placingExplanation: `
    Para colocar un componente se tienen que seleccionar las cartas que cumplan los costes especificos del componente a comprar, acto seguido se podrá arrastrar el componente y colocarlo en el tablero donde se colocara en una casilla válida.`,
  
  tradeExplanation: `
    Una característica clave de la interfaz es el hecho de poder intercambiar cartas entre jugadores, para ello, se debe pulsar en el boton en el que pone '${utils.trade}', esto hara que se despliegue la interfaz encargada de los intercambios.
    Para realizar un intercambio, el jugador debe seleccionar cartas de su baraja. Porteriormente, seleccionar el jugador con el que desee intercambiar, y luego, seleccionar las cartas de este jugador.
    A continuación, se mostrará un modal al jugador al que le ofreces el intercambio donde podrá aceptar o rechazar el intercambio.`,
  
};

const homePage = {
  wellcomeTo: `Bienvenido a ${utils.appName}`,
  missions: {
    [MISSION_TYPE_WOLFS]: 'Lobos!',
    [MISSION_TYPE_DNA_SHERIFF]: 'La sheriff del ADN',
    [MISSION_TYPE_TO_SAFETY]: 'Camino a la seguridad',
  },
  objectiveDescriptions: {
    [MISSION_TYPE_WOLFS]: `
      La granjera Shannon esta preocupada, un lobo esta atacando sus ovejas.
      ¡La ciencia de datos puede ayudarla!
      Tu trabajo es ayudarla desarrollando una aplicación que alerte a Shannon cuando el lobo va a atacar.`,
      
    [MISSION_TYPE_DNA_SHERIFF]: `
      Margarita Salas, la bioquimica necesita ayuda con su investigación.
      ¡La ciencia de datos puede ayudarla!
      Tu trabajo es ayudarla desarrollando una aplicación que analice y clasifique las muestras de ADN de varios virus.`,
      
    [MISSION_TYPE_TO_SAFETY]: `
      Prudens y sus hermanos estan preocupados por la seguridad de camino al colegio.
      ¡La ciencia de datos puede ayudarla!
      Tu trabajo es ayudarlos desarrollando una aplicación que les proporcione el camino mas seguro hasta clase.`,
  },
};

const leftUI = {
  dataInWay: 'El dato esta en tu camino de datos, pierdes tu turno',
  cantBuy: 'No puedes comprar mas componentes',
};

const tradeModal = { // will be deleted
  title: (name = 'Por favor,') => ` ${name} seleccione las cartas que quiere intercambiar`,
  onTradeAcceptQst: '¿Quieres aceptar el siguiente intercambio?',
  noPlayersToTrade: 'No hay jugadores con los que intercambiar',
};

const rigthUI = {
  misionTitles: {
    [BLUE]: 'Misión de datos',
    [YELLOW]: 'Misión de procesamiento',
    [RED]: 'Misión de modelado',
    [GREEN]: 'Misión de visualización',
  },
  misionDescription: {
    [BLUE]: {
      [MISSION_TYPE_WOLFS]: 'Ayuda a Shannon a recopilar toda la información posible sobre sus ovejas y su comportamiento cuando el lobo está cerca',
      [MISSION_TYPE_DNA_SHERIFF]: 'Ayuda a Margarita a recopilar toda la información posible sobre los virus',
      [MISSION_TYPE_TO_SAFETY]: 'Ayuda a Prudens y sus hermanos a recopilar toda la información posible sobre los caminos de su ciudad',
    },
    [YELLOW]: '¡Ayuda al informático a explorar los datos de las ovejas utilizando software informático!',
    [RED]: '¡Ayuda al matemático a construir un modelo para detectar cuándo va a atacar el lobo!',
    [GREEN]: '¡Ayuda al informático a crear una aplicación móvil que avise a Shannon cuando el lobo se acerque peligrosamente a sus ovejas!',
  },
  misionCompletedDescription: {
    [BLUE]: {
      [MISSION_TYPE_WOLFS]: 'Entiendes perfectamente lo que Shannon necesita.\nHas recopilado los datos sobre las ovejas.\nHas almacenado los datos en un ordenador.',
      [MISSION_TYPE_DNA_SHERIFF]: 'Entiendes perfectamente lo que Margarita necesita.\nHas recopilado los datos sobre los virus.\nHas almacenado los datos en un ordanedor.',
      [MISSION_TYPE_TO_SAFETY]: 'Entiendes perfectamente lo que Prudens y sus hermanos necesitan.\nHas recopilado los datos sobre los caminos.\nHas almacenado los datos en un ordanedor.',
    },
    [YELLOW]: 'Tienes una visión general de las ovejas y sus características.\nDespués de organizar y limpiar tus datos, están listos para el siguiente paso',
    [RED]: 'Has probado y evaluado diferentes modelos.\nHas elegido el mejor para detectar el ataque del lobo. \nEstán listos para dar la buena noticia a Shannon',
    [GREEN]: 'Has desarrollado una útil aplicación móvil que alerta a Shannon cuando el lobo está a punto de atacar a sus ovejas.\nLe has explicado el modelo y la aplicación a Shannon y está muy contenta porque lo domina',
  },
};

const market = {
  riskMsg: 'El juego se pausara hasta que se resuelvan todos los riesgos.',
  importantInfo: 'Información importante',
};

const successModal = {
  points: 'puntos',
  winnerAnnouncement: 'El ganador es',
};

const nextPlayerModal = {
  title: '¿Esta seguro de terminar el turno?',
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
    cmplxModel: `Usa '${cards.subTypes.simpModel}' para arreglar el riesgo`,
    dngData: `Usa '${cards.subTypes.protData}' para arreglar el riesgo`,
    noData: `Usa '${cards.subTypes.dataBase}' para arreglar el riesgo`,
    oldSW: `Usa '${cards.subTypes.openSource}' para arreglar el riesgo`,
    oldTech: `Usa '${cards.subTypes.newTech}' para arreglar el riesgo`,
    slowModel: `Usa '${cards.subTypes.fastModel}' para arreglar el riesgo`,
    virus: `Usa '${cards.subTypes.antivirus}' para arreglar el riesgo`,
    workingAlone: `Usa '${cards.subTypes.teamSpirit}' para arreglar el riesgo`,
    wrongModel: `Usa '${cards.subTypes.rightModel}' para arreglar el riesgo`,
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
    userResults: 'Presentar los resultados a los usuarios',
    finalProduct: 'Para desarrollar el producto final',
  },
};

const es = {
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

export default es;