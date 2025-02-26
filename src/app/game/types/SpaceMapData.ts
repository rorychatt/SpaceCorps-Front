import {Position3} from '../../models/entity/Position3';

export type SpaceMapData = {
  mapName: string;
  mapObject: {
    aliens: any[];
    players: PlayerDto[];
    preferredColor: string;
    Size: {
      width: number;
      height: number;
    }
    staticEntities: any[];
  }

};

export type PlayerDto = {
  activeShipName: string;
  currentMapName: string;
  id: string;
  position: Position3;
  username: string;
}
