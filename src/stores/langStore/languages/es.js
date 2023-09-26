import { BLUE, GREEN, RED, YELLOW } from "../../../constants";
import { EN, ES } from "../constants";

const utils = {
    appName: 'AlphaDSGame',
    player: 'Jugador',
    start: 'Comenzar',
    cancel: 'Cancelar',
    accept: 'Aceptar',
    [EN]: 'Ingles',
    [ES]: 'Español',
};

const homePage = {
  wellcomeTo: `Bienvenido a ${utils.appName}`,
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
    [BLUE]: 'Entiendes perfectamente lo que Shannon necesita.\NHas recopilado los datos sobre las ovejas.\NHas almacenado los datos en un ordenador.',
    [YELLOW]: 'Tienes una visión general de las ovejas y sus características.\NDespués de organizar y limpiar tus datos, están listos para el siguiente paso',
    [RED]: 'Has probado y evaluado diferentes modelos.\NHas elegido el mejor para detectar el ataque del lobo. \Están listos para dar la buena noticia a Shannon',
    [GREEN]: 'Has desarrollado una útil aplicación móvil que alerta a Shannon cuando el lobo está a punto de atacar a sus ovejas.\NLe has explicado el modelo y la aplicación a Shannon y está muy contenta porque lo domina',
  },
};

export default {
  homePage,
  tradeModal,
  rigthUI,
  utils,
};