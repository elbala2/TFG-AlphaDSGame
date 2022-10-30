import normal_0101 from '../resources/slabs/normal/slab_0_1_0_1.png';
import normal_1011 from '../resources/slabs/normal/slab_1_0_1_1.png';
import normal_0110 from '../resources/slabs/normal/slab_0_1_1_0.png';
import normal_1111 from '../resources/slabs/normal/slab_1_1_1_1.png';

import gold_0101 from '../resources/slabs/gold/slab-gold_0_1_0_1.png';
import gold_1011 from '../resources/slabs/gold/slab-gold_1_0_1_1.png';
import gold_0110 from '../resources/slabs/gold/slab-gold_0_1_1_0.png';
import gold_1111 from '../resources/slabs/gold/slab-gold_1_1_1_1.png';

import silver_0101 from '../resources/slabs/silver/slab-silver_0_1_0_1.png';
import silver_1011 from '../resources/slabs/silver/slab-silver_1_0_1_1.png';
import silver_0110 from '../resources/slabs/silver/slab-silver_0_1_1_0.png';
import silver_1111 from '../resources/slabs/silver/slab-silver_1_1_1_1.png';

import red_mision from '../resources/slabs/mision/red/red-box.png';
import blue_mision from '../resources/slabs/mision/blue/blue-box.png';
import yellow_mision from '../resources/slabs/mision/yellow/yellow-box.png';
import green_mision from '../resources/slabs/mision/green/green-box.png';

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

import Mision_Red from '../resources/Misiones/Mision_3.png';
import Mision_Red_Completed from '../resources/Misiones/Mision_3_Completada.png';
import Mision_Green from '../resources/Misiones/Mision_2.png';
import Mision_Green_Completed from '../resources/Misiones/Mision_2_Completada.png';
import Mision_Blue from '../resources/Misiones/Mision_1.png';
import Mision_Blue_Completed from '../resources/Misiones/Mision_1_Completada.png';
import Mision_Yellow from '../resources/Misiones/Mision_4.png';
import Mision_Yellow_Completed from '../resources/Misiones/Mision_4_Completada.png';

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
    case 'NORMAL':
      switch (JSON.stringify(slab.links)) {
        case JSON.stringify([0,1,0,1]):
          return normal_0101;
        case JSON.stringify([1,0,1,1]):
          return normal_1011;
        case JSON.stringify([0,1,1,0]):
          return normal_0110;
        case JSON.stringify([1,1,1,1]):
          return normal_1111;
        default:
          break;
      }
      break;
    case 'GOLD':
      switch (JSON.stringify(slab.links)) {
        case JSON.stringify([0,1,0,1]):
          return gold_0101;
        case JSON.stringify([1,0,1,1]):
          return gold_1011;
        case JSON.stringify([0,1,1,0]):
          return gold_0110;
        case JSON.stringify([1,1,1,1]):
          return gold_1111;
        default:
          break;
      }
      break;
    case 'SILVER':
      switch (JSON.stringify(slab.links)) {
        case JSON.stringify([0,1,0,1]):
          return silver_0101;
        case JSON.stringify([1,0,1,1]):
          return silver_1011;
        case JSON.stringify([0,1,1,0]):
          return silver_0110;
        case JSON.stringify([1,1,1,1]):
          return silver_1111;
        default:
          break;
      }
      break;
    case 'RED':
      return red_mision; 
    case 'redStart':
    case 'Start_0':
      return red_start;
    case 'BLUE':
      return blue_mision;
    case 'blueStart':
    case 'Start_2':
      return blue_start;
    case 'YELLOW':
      return yellow_mision;
    case 'yellowStart':
    case 'Start_3':
      return yellow_start;
    case 'GREEN':
      return green_mision;
    case 'greenStart':
    case 'Start_1':
      return green_start;
    case 'Complex Model':
      return ComplexModel;
    case 'Danger Data':
      return DangerData;
    case 'No Data':
      return NoData;
    case 'Old Software':
      return OldSW;
    case 'Old Technology':
      return OldTech;
    case 'Slow Model':
      return SlowModel;
    case 'Virus':
      return Virus;
    case 'Working Alone':
      return WorkingAlone;
    case 'Wrong Model':
      return WrongModel;
    default:
      return'';
  }
};

export const getCardIMG = (type) => {
  switch (type[1]) {
    case 'Fast Model': //Green
      return FastModel;

    case 'Simple Model':
      return SimpleModel;

    case 'Right Model':
      return RightModel;

    case 'New Technology': //Red
      return NewTechnology;

    case 'Antivirus':
      return Antivirus;

    case 'Open Source':
      return OpenSource;

    case 'Data Base': //Blue
      return DataBase;

    case 'Team Spirit':
      return TeamSpirit;

    case 'Protected Data':
      return ProtectedData;

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
