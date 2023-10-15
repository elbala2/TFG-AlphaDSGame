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
