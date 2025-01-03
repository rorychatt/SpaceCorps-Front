import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { HubService } from '../services/hub.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceMapData } from './types/SpaceMapData';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private controls?: OrbitControls

  constructor (private hubService: HubService, private route: ActivatedRoute) {
  }

  ngOnInit (): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      this.hubService.initializeSignalR(username);
      this.setupSignalREvents();
      this.initializeThreeJs();
    })
  }

  private initializeThreeJs (): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(
      this.camera!,
      this.renderer!.domElement
    )

    this.controls.enableDamping = true;

    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer!.render(this.scene!, this.camera!);
    };

    animate();

    void this.loadNewSpaceMap({
      mapname: 'G-1',
      id: "1"
    })
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize (event: Event): void {
    this.renderer!.setSize(window.innerWidth, window.innerHeight);
    this.camera!.aspect = window.innerWidth / window.innerHeight;
    this.camera!.updateProjectionMatrix();
  }

  private setupSignalREvents (): void {
    this.hubService.on('server-side-log', (data) => {
      console.log('Received data:', data);
    });
  }

  private async loadNewSpaceMap (spaceMapData: SpaceMapData) {
    await this.clearScene();
    await this.loadMapEnvironment(spaceMapData);
  }

  private async clearScene () {
  }

  private async loadMapEnvironment (spaceMapData: SpaceMapData) {
    await this.createStars();
    await this.createLighting();
    await this.createSkybox(spaceMapData.mapname);
    await this.createStaticEntities();
  }

  private async createStars () {

  }

  private async createLighting () {
    if(!this.scene){
      console.error('Scene not initialized, cannot create lighting');
      return;
    }
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    this.scene.add(ambientLight);
  }

  private async createSkybox (mapname?: string) {
    if (!this.scene) {
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
      this.scene.background = loadSkybox(mapname);
    } catch (error) {
      console.error(`Failed to load skybox for ${mapname}, loading default skybox`, error);
      this.scene.background = loadSkybox(defaultMapname);
    }
  }

  private async createStaticEntities () {

  }
}
