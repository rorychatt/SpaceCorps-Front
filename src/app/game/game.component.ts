import {Component, HostListener, OnInit} from '@angular/core';
import * as THREE from 'three';
import {HubService} from './services/hub.service';
import {ActivatedRoute} from '@angular/router';
import {PlayerDto, SpaceMapData} from './types/SpaceMapData';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {
  initializeThreeJs,
  loadNewSpacemap, loadPlayers,
  updateSpacemap
} from './game.utils';
import {EntityDTO} from './types/Entity';
import {KeyboardService} from './services/keyboard.service';
import {PlayerData} from '../models/player/PlayerData';

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
  public entities: Map<string, PlayerDto> = new Map();

  public currentMapName?: string;
  public playerData: PlayerData | undefined;

  constructor(
    private hubService: HubService,
    private route: ActivatedRoute,
    private keyboardService: KeyboardService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const username = params['username'];
      await this.hubService.initializeSignalR(username);
      this.setupSignalREvents(this.hubService);
      await initializeThreeJs(this);
      await this.keyboardService.setScene(this.scene);
    });

    document.body.style.overflow = 'hidden';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.renderer!.setSize(window.innerWidth, window.innerHeight);
    this.camera!.aspect = window.innerWidth / window.innerHeight;
    this.camera!.updateProjectionMatrix();
  }

  public setupSignalREvents(hubService: HubService): void {
    hubService.on('server-side-log', (data) => {
      console.log('HubMessage: Received data:', data);
    });

    hubService.on('server-side-error', (error) => {
      console.warn('HubMessage: Received error:', error);
    });

    hubService.on('loginSuccessful', (response: PlayerData) => {
      console.log('HubMessage: Login successful:', response);
      this.playerData = response;
    })

    hubService.on('loginFailed', (response: string) => {
      console.error('HubMessage: Login failed:', response);
    });

    hubService.on('logEntities', (entities) => {
      console.log('HubMessage: Entities:', entities);
    });

    hubService.on('spacemapUpdate', async (spaceMapData: SpaceMapData) => {
      if (this.currentMapName != spaceMapData.mapName) {
        await loadNewSpacemap(this, spaceMapData);
        await loadPlayers(spaceMapData.mapObject.players);
      } else {
        await updateSpacemap(this, spaceMapData);
      }
    });
  }
}
