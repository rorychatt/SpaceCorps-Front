import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export class SpaceshipManager {

  private maxInstances: number;
  private scene: THREE.Scene;
  private playerDictionary: Map<string, { shipName: string; instanceIndex: number }>;
  private shipMeshes: Map<
    string,
    {
      instancedMeshes: THREE.InstancedMesh[];
      matrixArrays: THREE.Matrix4[][];
    }
  >;

  constructor(scene: THREE.Scene, maxInstances: number = 1000) {
    this.maxInstances = maxInstances;
    this.scene = scene;
    this.playerDictionary = new Map<string, { shipName: string; instanceIndex: number }>();
    this.shipMeshes = new Map<
      string,
      {
        instancedMeshes: THREE.InstancedMesh[];
        matrixArrays: THREE.Matrix4[][];
      }
    >();
  }

  private async loadShipModel(shipName: string): Promise<void> {
    if (this.shipMeshes.has(shipName)) return; // Ship already loaded

    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        `/models/ships/${shipName}/${shipName}.glb`,
        (gltf) => {
          const instancedMeshes: THREE.InstancedMesh[] = [];
          const matrixArrays: THREE.Matrix4[][] = [];

          gltf.scene.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) {
              return;
            }
            const geometry = child.geometry as THREE.BufferGeometry;
            const material = child.material as THREE.Material;
            const instancedMesh = new THREE.InstancedMesh(geometry, material, this.maxInstances);
            instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            this.scene.add(instancedMesh);
            instancedMeshes.push(instancedMesh);
            matrixArrays.push(new Array(this.maxInstances));
          });

          if (instancedMeshes.length === 0) {
            console.warn(`No meshes found in the ship model "${shipName}".`);
            reject(new Error(`Ship model "${shipName}" has no meshes.`));
            return;
          }

          this.shipMeshes.set(shipName, {
            instancedMeshes,
            matrixArrays,
          });

          console.log(`Ship model "${shipName}" loaded with ${instancedMeshes.length} meshes.`);
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

    const { instancedMeshes, matrixArrays } = shipData;

    // Calculate the instance index for this ship
    const instanceIndex = Array.from(this.playerDictionary.values())
      .filter((entry) => entry.shipName === shipName).length;

    if (instanceIndex >= this.maxInstances) {
      console.warn(`Max instances reached for ship "${shipName}".`);
      return;
    }

    // Add player to the dictionary
    this.playerDictionary.set(playerId, { shipName, instanceIndex });

    // Update each mesh for this ship
    instancedMeshes.forEach((instancedMesh, meshIndex) => {
      // Create a transformation matrix
      const transformMatrix = new THREE.Matrix4();
      transformMatrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(1, 1, 1));

      // Update the instanced mesh and matrix array
      instancedMesh.setMatrixAt(instanceIndex, transformMatrix);
      matrixArrays[meshIndex][instanceIndex] = transformMatrix;
    });

    // Mark all meshes' instanceMatrix as needing an update
    instancedMeshes.forEach((instancedMesh) => {
      instancedMesh.instanceMatrix.needsUpdate = true;
    });
  }



  /** Update the position and rotation of a player's ship */
  public async updatePlayerPosition(playerId: string, position: THREE.Vector3, rotation: THREE.Euler): Promise<void> {
    const playerData = this.playerDictionary.get(playerId);
    if (!playerData) return;

    const { shipName, instanceIndex } = playerData;
    const shipData = this.shipMeshes.get(shipName);

    if (!shipData) return;

    const { instancedMeshes, matrixArrays } = shipData;

    // Create a transformation matrix
    const transformMatrix = new THREE.Matrix4();
    transformMatrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(1, 1, 1));

    // Update each mesh for this ship
    instancedMeshes.forEach((instancedMesh, meshIndex) => {
      matrixArrays[meshIndex][instanceIndex] = transformMatrix;
      instancedMesh.setMatrixAt(instanceIndex, transformMatrix);
      instancedMesh.instanceMatrix.needsUpdate = true;
    });
  }



  /** Remove a player and free up the instance slot */
  public async removePlayer(playerId: string): Promise<void> {
    const playerData = this.playerDictionary.get(playerId);
    if (!playerData) return;

    const { shipName, instanceIndex } = playerData;
    const shipData = this.shipMeshes.get(shipName);

    if (!shipData) return;

    const { instancedMeshes, matrixArrays } = shipData;

    // Get the last instance index for this ship
    const lastInstanceIndex = Array.from(this.playerDictionary.values())
      .filter((entry) => entry.shipName === shipName).length - 1;

    // Remove player from the dictionary
    this.playerDictionary.delete(playerId);

    // Iterate through all meshes for the ship
    instancedMeshes.forEach((instancedMesh, meshIndex) => {
      const matrixArray = matrixArrays[meshIndex];

      if (instanceIndex !== lastInstanceIndex) {
        // If the removed player's matrix is NOT the last, we swap it with the last matrix
        const lastMatrix = matrixArray[lastInstanceIndex];

        // Update the instanced mesh to reflect the swap
        instancedMesh.setMatrixAt(instanceIndex, lastMatrix);
        matrixArray[instanceIndex] = lastMatrix;
      }

      // Remove the last matrix (pop the array)
      matrixArray.pop();
      instancedMesh.count -= 1; // Adjust the instance count if necessary
      instancedMesh.instanceMatrix.needsUpdate = true;
    });
  }


  async removeAllPlayers() {
    for (const playerId of this.playerDictionary.keys()) {
      await this.removePlayer(playerId);
    }
  }
}
