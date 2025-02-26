import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {PlayerDto, SpaceMapData} from './types/SpaceMapData';
import {GameComponent} from './game.component';
import {EntityDTO} from './types/Entity';
import {SpaceshipManager} from './SpaceshipManager';

let spaceshipManager: SpaceshipManager;

export async function initializeThreeJs(component: GameComponent): Promise<void> {
  component.scene = new THREE.Scene();
  component.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  component.renderer = new THREE.WebGLRenderer();
  component.renderer.setSize(window.innerWidth, window.innerHeight);

  component.renderer.domElement.style.position = 'absolute';
  component.renderer.domElement.style.top = '0';

  document.body.appendChild(component.renderer.domElement);

  component.controls = new OrbitControls(
    component.camera!,
    component.renderer!.domElement
  );

  component.controls.enableDamping = true;
  component.camera.position.z = 5;

  await createSpaceshipManager(component);

  const animate = () => {
    requestAnimationFrame(animate);
    component.renderer!.render(component.scene!, component.camera!);
  };

  animate();
}

export async function loadNewSpacemap(component: GameComponent, spaceMapData: SpaceMapData): Promise<void> {
  console.log('Loading new space map: ', spaceMapData);
  component.currentMapName = spaceMapData.mapName;
  await clearScene(component);
  await loadMapEnvironment(component, spaceMapData);
}

export async function clearScene(component: GameComponent): Promise<void> {
  await spaceshipManager.removeAllPlayers();
}

async function loadMapEnvironment(component: GameComponent, spaceMapData: SpaceMapData): Promise<void> {
  await createStars(component);
  await createLighting(component);
  await createSkybox(component, spaceMapData.mapName);
  await createStaticEntities(component);
}

export async function createStars(component: GameComponent): Promise<void> {
  // Implementation here
}

export async function createLighting(component: GameComponent): Promise<void> {
  if (!component.scene) {
    console.error('Scene not initialized, cannot create lighting');
    return;
  }
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  component.scene.add(directionalLight);
  component.scene.add(ambientLight);
}

export async function createSkybox(component: GameComponent, mapname?: string): Promise<void> {
  if (!component.scene) {
    console.error('Scene not initialized');
    return;
  }

  const loader = new THREE.CubeTextureLoader();
  const defaultMapname = 'G-1';

  if (!mapname) {
    mapname = defaultMapname;
    console.log(`No mapname provided, loading default map ${defaultMapname}`);
  }

  const loadSkybox = (name: string) => {
    return loader.load([
      `./spacemaps/${name}/right.png`,
      `./spacemaps/${name}/left.png`,
      `./spacemaps/${name}/top.png`,
      `./spacemaps/${name}/bottom.png`,
      `./spacemaps/${name}/front.png`,
      `./spacemaps/${name}/back.png`,
    ]);
  };

  try {
    component.scene.background = loadSkybox(mapname);
  } catch (error) {
    console.error(`Failed to load skybox for ${mapname}, loading default skybox`, error);
    component.scene.background = loadSkybox(defaultMapname);
  }
}

export async function createStaticEntities(component: GameComponent): Promise<void> {
  // Implementation here
}

function parsePositionDTOtoVector3(position: { x: number, y: number, z: number }): THREE.Vector3 {
  return new THREE.Vector3(position.x, position.y, position.z);
}

async function createSpaceshipManager(component: GameComponent): Promise<void> {
  if (component.scene === undefined) {
    console.error('Scene not initialized');
    return;
  }
  spaceshipManager = new SpaceshipManager(component.scene, 100)
}

export async function loadPlayers(playerDtos: PlayerDto[]) {
  if (spaceshipManager === undefined) {
    console.error('Spaceship manager not initialized');
  }
  for (const player of playerDtos) {
    await spaceshipManager.addPlayer(
      player.id,
      player.activeShipName,
      parsePositionDTOtoVector3(player.position),
      new THREE.Euler(0, 0, 0)
    )
  }
}

export async function updateSpacemap(component: GameComponent, spaceMapData: SpaceMapData): Promise<void> {
  const entities = component.entities;
  const entitiesIn = spaceMapData.mapObject.players;

  for(const entity of entitiesIn) {
    if (entities.has(entity.id)) {
      const oldEntity = entities.get(entity.id)!;
      const newEntity = entity;

      //TODO: better check later, for now only based on position
      if(oldEntity.position.x !== newEntity.position.x || oldEntity.position.y !== newEntity.position.y || oldEntity.position.z !== newEntity.position.z) {
        await spaceshipManager.updatePlayerPosition(
          entity.id,
          parsePositionDTOtoVector3(entity.position),
          new THREE.Euler(0, 0, 0)
        )
      }

      oldEntity.position = newEntity.position;
    } else {
      entities.set(entity.id, entity);
      await spaceshipManager.addPlayer(
        entity.id,
        entity.activeShipName,
        parsePositionDTOtoVector3(entity.position),
        new THREE.Euler(0, 0, 0)
      )
    }
  }

  for(const entity of entities) {
    if (!entitiesIn.find(e => e.id === entity[0])) {
      await spaceshipManager.removePlayer(entity[0]);
      entities.delete(entity[0]);
    }
  }


}

