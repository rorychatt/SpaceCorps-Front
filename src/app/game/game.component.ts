import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { HubService } from '../services/hub.service';
import { ActivatedRoute } from '@angular/router';

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
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';

    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      this.renderer!.render(scene, this.camera!);
    };

    animate();
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
}
