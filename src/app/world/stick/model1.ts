import * as THREE from 'three';
import { createRenderer, ModelInterface } from '../modelInterface';
import { Scene } from './scene';

export class Model1 extends Scene implements ModelInterface{
    renderer = createRenderer();
    ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    
    constructor(){
        super();
        this.ball.position.set(0, -5, 10);
        this.scene.add(this.ball);
    }

    updateCanvas(): void {
        this.placeStickTopLine(this.getMouseWorldPosition(), new THREE.Vector3(0, -5, 10));
        this.renderer.render(this.scene, this.camera);
    }
}