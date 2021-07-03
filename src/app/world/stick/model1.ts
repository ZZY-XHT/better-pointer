import * as THREE from 'three';
import { Scene } from './scene';

export class Model1 extends Scene implements ModelInterface{
    updateCanvas(): void {
        this.placeStickTopLine(this.getMouseWorldPosition(), new THREE.Vector3(0, -5, 10));
        this.renderer.render(this.scene, this.camera);
    }
}