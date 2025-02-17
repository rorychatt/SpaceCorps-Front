import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { HubService } from './services/hub.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceMapData } from './types/SpaceMapData';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initializeThreeJs, loadNewSpaceMap, clearScene, loadMapEnvironment, createEntity, updateEntities } from './game.utils';
import { EntityDTO } from './types/Entity';
import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public camera?: THREE.PerspectiveCamera;
  public renderer?: THREE.WebGLRenderer;
  public scene?: THREE.Scene;
  public controls?: OrbitControls
  public entities: Map<string, THREE.Mesh> = new Map();

  constructor(
    private hubService: HubService,
    private route: ActivatedRoute,
    private keyboardService: KeyboardService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      this.hubService.initializeSignalR(username);
      this.setupSignalREvents(this.hubService, this.updateEntities.bind(this));
      initializeThreeJs(this);
    });

    document.body.style.overflow = 'hidden';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.renderer!.setSize(window.innerWidth, window.innerHeight);
    this.camera!.aspect = window.innerWidth / window.innerHeight;
    this.camera!.updateProjectionMatrix();
  }

  public async loadNewSpaceMap(spaceMapData: SpaceMapData) {
    await clearScene(this);
    await loadMapEnvironment(this, spaceMapData);
  }

  public updateEntities(entities: EntityDTO[]): void {
    updateEntities(this, entities);
  }

  public setupSignalREvents(hubService: HubService, updateEntities: (entities: { id: string, position: THREE.Vector3 }[]) => void): void {
    hubService.on('server-side-log', (data) => {
      console.log('Received data:', data);
    });

    hubService.on('server-side-error', (error) => {
      console.warn('Received error:', error);
    });
  
    hubService.on('update-entities', (entities) => {
      updateEntities(entities);
    });

    hubService.on('loginSuccessful', (response) => {
      console.log('Login successful:', response);
    })

    hubService.on('loginFailed', (response: string) => {
      console.error('Login failed:', response);
    });

    hubService.on('logEntities', (entities) => {
      console.log('Entities:', entities);
    })
  }
}