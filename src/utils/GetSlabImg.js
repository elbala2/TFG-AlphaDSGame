import red_start from '../resources/slabs/red-start.png';
import green_start from '../resources/slabs/green-start.png';
import yellow_start from '../resources/slabs/yellow-start.png';
import blue_start from '../resources/slabs/blue-start.png';

import DataBase from '../resources/Cards/Data Base.png';
import TeamSpirit from '../resources/Cards/Team Spirit.png';
import ProtectedData from '../resources/Cards/Protected Data.png';
import OpenSource from '../resources/Cards/Open Source.png';
import Antivirus from '../resources/Cards/Antivirus.png';
import NewTechnology from '../resources/Cards/New Technology.png';
import RightModel from '../resources/Cards/Right Model.png';
import SimpleModel from '../resources/Cards/Simple Model.png';
import FastModel from '../resources/Cards/Fast Model.png';

import Mision_Blue from '../resources/Misiones/Mision_4.png';
import Mision_Blue_Completed from '../resources/Misiones/Mision_4_Completada.png';
import Mision_Yellow from '../resources/Misiones/Mision_3.png';
import Mision_Yellow_Completed from '../resources/Misiones/Mision_3_Completada.png';
import Mision_Red from '../resources/Misiones/Mision_2.png';
import Mision_Red_Completed from '../resources/Misiones/Mision_2_Completada.png';
import Mision_Green from '../resources/Misiones/Mision_1.png';
import Mision_Green_Completed from '../resources/Misiones/Mision_1_Completada.png';


import ComplexModel from '../resources/Risks/Complex Model.png';
import DangerData from '../resources/Risks/Danger Data.png';
import NoData from '../resources/Risks/No Data.png';
import OldSW from '../resources/Risks/Old Software.png';
import OldTech from '../resources/Risks/Old Technology.png';
import SlowModel from '../resources/Risks/Slow Model.png';
import Virus from '../resources/Risks/Virus.png';
import WorkingAlone from '../resources/Risks/Working Alone.png';
import WrongModel from '../resources/Risks/Wrong Model.png';

export const getSlabImg = (slab) => {
  switch (slab.type) {
    case 'redStart':
    case 'Start_RED':
      return red_start;
    case 'blueStart':
    case 'Start_BLUE':
      return blue_start;
    case 'yellowStart':
    case 'Start_YELLOW':
      return yellow_start;
    case 'greenStart':
    case 'Start_GREEN':
      return green_start;

    case 'cmplxModel':
      return ComplexModel;
    case 'dngData':
      return DangerData;
    case 'noData':
      return NoData;
    case 'oldSW':
      return OldSW;
    case 'oldTech':
      return OldTech;
    case 'slowModel':
      return SlowModel;
    case 'virus':
      return Virus;
    case 'workingAlone':
      return WorkingAlone;
    case 'wrongModel':
      return WrongModel;
    default:
      return'';
  }
};

export const getCardIMG = (subType) => {
  switch (subType) {
    case 'fastModel': //Green
      return FastModel;

    case 'simpModel':
      return SimpleModel;

    case 'rightModel':
      return RightModel;

    case 'newTech': //Red
      return NewTechnology;

    case 'antivirus':
      return Antivirus;

    case 'openSource':
      return OpenSource;

    case 'dataBase': //Blue
      return DataBase;

    case 'protData':
      return ProtectedData;  

    case 'teamSpirit':
      return TeamSpirit;

    default:
  }
};

export const getMision = (type, completed) => {
  switch(type) {
    case 0:
      return !completed ? Mision_Red : Mision_Red_Completed;
    case 1:
      return !completed ? Mision_Green : Mision_Green_Completed;
    case 2:
      return !completed ? Mision_Blue : Mision_Blue_Completed;
    case 3:
      return !completed ? Mision_Yellow : Mision_Yellow_Completed;
    default:
  }
}
