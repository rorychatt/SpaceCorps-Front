import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { HubService } from './services/hub.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceMapData } from './types/SpaceMapData';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initializeThreeJs, setupSignalREvents, loadNewSpaceMap, clearScene, loadMapEnvironment, createEntity, updateEntities } from './game.utils';
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
    private keyboardService: KeyboardService // Inject KeyboardService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      this.hubService.initializeSignalR(username);
      setupSignalREvents(this.hubService, this.updateEntities.bind(this));
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
}