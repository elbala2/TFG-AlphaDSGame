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

import red_mision from '../resources/slabs/mision/red/red-box-1.png';
import blue_mision from '../resources/slabs/mision/blue/blue-box-1.png';
import yellow_mision from '../resources/slabs/mision/yellow/yellow-box-1.png';
import green_mision from '../resources/slabs/mision/green/green-box-1.png';

import DataBase from '../resources/Cards/Data Base.png';
import TeamSpirit from '../resources/Cards/Team Spirit.png';
import ProtectedData from '../resources/Cards/Protected Data.png';
import OpenSource from '../resources/Cards/Open Source.png';
import Antivirus from '../resources/Cards/Antivirus.png';
import NewTechnology from '../resources/Cards/New Technology.png';
import RightModel from '../resources/Cards/Right Model.png';
import SimpleModel from '../resources/Cards/Simple Model.png';
import FastModel from '../resources/Cards/Fast Model.png';

export const getSlabImg = (slab) => {
  if (slab)
    switch (slab.type) {
      case 'normal':
        switch (JSON.stringify(slab.linker)) {
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
      case 'gold':
        switch (JSON.stringify(slab.linker)) {
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
      case 'silver':
        switch (JSON.stringify(slab.linker)) {
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
      case 'red':
        return red_mision; 
      case 'blue':
        return blue_mision;
      case 'yellow':
        return yellow_mision;
      case 'green':
        return green_mision;
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
