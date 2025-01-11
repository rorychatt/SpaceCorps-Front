import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SpaceMapData } from './types/SpaceMapData';
import { HubService } from './services/hub.service';
import { GameComponent } from './game.component';

export function initializeThreeJs(component: GameComponent): void {
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

  const animate = () => {
    requestAnimationFrame(animate);
    component.renderer!.render(component.scene!, component.camera!);
  };

  animate();

  void component.loadNewSpaceMap({
    mapname: 'G-1',
    id: "1"
  });
}

export function setupSignalREvents(hubService: HubService, updateEntities: (entities: { id: string, position: THREE.Vector3 }[]) => void): void {
  hubService.on('server-side-log', (data) => {
    console.log('Received data:', data);
  });

  hubService.on('update-entities', (entities) => {
    updateEntities(entities);
  });
}

export async function loadNewSpaceMap(component: GameComponent, spaceMapData: SpaceMapData): Promise<void> {
  await clearScene(component);
  await loadMapEnvironment(component, spaceMapData);
}

export async function clearScene(component: GameComponent): Promise<void> {
  component.entities.forEach(entity => {
    component.scene!.remove(entity);
  });
  component.entities.clear();
}

export async function loadMapEnvironment(component: GameComponent, spaceMapData: SpaceMapData): Promise<void> {
  await createStars(component);
  await createLighting(component);
  await createSkybox(component, spaceMapData.mapname);
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

export function createEntity(component: GameComponent, id: string, position: THREE.Vector3): THREE.Mesh {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const entity = new THREE.Mesh(geometry, material);
  entity.position.copy(position);
  component.scene!.add(entity);
  component.entities.set(id, entity);
  return entity;
}

export function updateEntities(component: GameComponent, entities: { id: string, position: THREE.Vector3 }[]): void {
  entities.forEach(entityData => {
    const entity = component.entities.get(entityData.id);
    if (entity) {
      entity.position.copy(entityData.position);
    } else {
      createEntity(component, entityData.id, entityData.position);
    }
  });
}