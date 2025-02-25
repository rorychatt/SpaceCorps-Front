import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export class SpaceshipManager {

  private maxInstances: number;
  private scene: THREE.Scene;
  private playerDictionary: Map<string, { shipName: string; instanceIndex: number }>;
  private shipMeshes: Map<string, { instancedMesh: THREE.InstancedMesh, matrixArray: THREE.Matrix4[] }>;

  constructor(scene: THREE.Scene, maxInstances: number = 1000) {
    this.maxInstances = maxInstances;
    this.scene = scene;
    this.playerDictionary = new Map<string, { shipName: string; instanceIndex: number }>();
    this.shipMeshes = new Map<string, { instancedMesh: THREE.InstancedMesh, matrixArray: THREE.Matrix4[] }>();
  }

  private async loadShipModel(shipName: string): Promise<void> {
    if (this.shipMeshes.has(shipName)) return;
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        `/models/ships/${shipName}/${shipName}.glb`,
        (gltf) => {
          const spaceship = gltf.scene.children[0];
          const geometry = (spaceship as THREE.Mesh).geometry as THREE.BufferGeometry;
          const material = (spaceship as THREE.Mesh).material as THREE.Material;

          const instancedMesh = new THREE.InstancedMesh(geometry, material, this.maxInstances);
          instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

          this.scene.add(instancedMesh);

          this.shipMeshes.set(shipName, {
            instancedMesh: instancedMesh,
            matrixArray: new Array(this.maxInstances),
          });

          console.log(`Ship model "${shipName}" loaded.`);
          resolve();
        },
        undefined,
        (error) => {
          console.error(`Failed to load ship model "${shipName}":`, error);
          reject(error);
        }
      );
    });
  }


  /** Add a player with a specific ship */
  public async addPlayer(playerId: string, shipName: string, position: THREE.Vector3, rotation: THREE.Euler): Promise<void> {
    if (this.playerDictionary.has(playerId)) return; // Player already exists

    if (shipName === '') {
      console.error('Ship name is empty! Loading default ship');
      shipName = 'Echelon';
    }

    // Ensure the ship model for this shipName is loaded
    await this.loadShipModel(shipName);

    const shipData = this.shipMeshes.get(shipName);
    if (!shipData) {
      console.warn(`Ship "${shipName}" not found, cannot add player.`);
      return;
    }

    const {instancedMesh, matrixArray} = shipData;

    const instanceIndex = Array.from(this.playerDictionary.values())
      .filter((entry) => entry.shipName === shipName).length;

    if (instanceIndex >= this.maxInstances) {
      console.warn(`Max instances reached for ship "${shipName}".`);
      return;
    }

    // Add player to the dictionary
    this.playerDictionary.set(playerId, {shipName, instanceIndex});

    // Create transformation matrix
    const transformMatrix = new THREE.Matrix4();
    transformMatrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(1, 1, 1));

    instancedMesh.setMatrixAt(instanceIndex, transformMatrix);
    matrixArray[instanceIndex] = transformMatrix;

    instancedMesh.instanceMatrix.needsUpdate = true;
  }


  /** Update the position and rotation of a player's ship */
  public updatePlayerPosition(playerId: string, position: THREE.Vector3, rotation: THREE.Euler): void {
    const playerData = this.playerDictionary.get(playerId);
    if (!playerData) return;

    const {shipName, instanceIndex} = playerData;
    const shipData = this.shipMeshes.get(shipName);

    if (!shipData) return;

    const {instancedMesh, matrixArray} = shipData;

    const transformMatrix = matrixArray[instanceIndex];
    transformMatrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(1, 1, 1));

    instancedMesh.setMatrixAt(instanceIndex, transformMatrix);
    instancedMesh.instanceMatrix.needsUpdate = true;
  }


  /** Remove a player and free up the instance slot */
  public removePlayer(playerId: string): void {
    const playerData = this.playerDictionary.get(playerId);
    if (!playerData) return;

    const {shipName, instanceIndex} = playerData;
    const shipData = this.shipMeshes.get(shipName);

    if (!shipData) return;

    const {instancedMesh, matrixArray} = shipData;
    const lastInstanceIndex = Array.from(this.playerDictionary.values())
      .filter((entry) => entry.shipName === shipName).length - 1;

    // Remove player from dictionary
    this.playerDictionary.delete(playerId);

    if (instanceIndex !== lastInstanceIndex) {
      const lastMatrix = matrixArray[lastInstanceIndex];

      instancedMesh.setMatrixAt(instanceIndex, lastMatrix);
      matrixArray[instanceIndex] = lastMatrix;
    }

    matrixArray.pop();
    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  async removeAllPlayers() {
    for (const playerId of this.playerDictionary.keys()) {
      this.removePlayer(playerId);
    }
  }
}
