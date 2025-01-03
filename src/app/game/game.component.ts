import { Component, OnInit } from '@angular/core';
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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }

  private setupSignalREvents (): void {
    this.hubService.on('server-side-log', (data) => {
      console.log('Received data:', data);
    });
  }
}
