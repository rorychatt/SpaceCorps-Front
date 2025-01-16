import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-ship-model',
  templateUrl: './ship-model.component.html',
  styleUrls: ['./ship-model.component.scss']
})
export class ShipModelComponent implements OnInit {
  @ViewChild('rendererContainer', {static: true}) rendererContainer: ElementRef | undefined;

  private scene!: THREE.Scene | undefined;
  private camera!: THREE.PerspectiveCamera | undefined;
  private renderer!: THREE.WebGLRenderer | undefined;
  private cube: THREE.Mesh | undefined;

  ngOnInit(): void {
    this.initThreeJS();
  }

  private initThreeJS(): void {

    if (!this.rendererContainer) {
      console.error('Renderer container not found');
      return;
    }
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.getContainerWidth(), this.getContainerHeight());
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Render the scene
    this.animate();
  }

  private animate = (): void => {

    if(!this.renderer || !this.scene || !this.camera || !this.cube) {
      console.error('Renderer, scene, camera or cube not found');
      return
    }

    requestAnimationFrame(this.animate);

    // Rotate the cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  private getAspectRatio(): number {
    return this.getContainerWidth() / this.getContainerHeight();
  }

  private getContainerWidth(): number {
    if(!this.rendererContainer) {
      console.error('Renderer container not found');
      return 0;
    }
    return this.rendererContainer.nativeElement.clientWidth;
  }

  private getContainerHeight(): number {
    if(!this.rendererContainer) {
      console.error('Renderer container not found');
      return 0;
    }
    return this.rendererContainer.nativeElement.clientHeight;
  }
}
