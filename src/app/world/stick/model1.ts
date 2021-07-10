import * as THREE from 'three';
import { MousePoint } from '../../util/mouse';
import { createRenderer, IModel } from '../interface';
import { World } from './world';

export class Model extends IModel{
    renderer = createRenderer();
    world = new World();
    stick = this.world.stick;
    
    anchor = new THREE.Vector3(0, -5, 10);

    ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );

    constructor(){
        super();
        this.ball.position.copy(this.anchor);
        this.world.scene.add(this.ball);

    }

    updateCanvas(screen2: MousePoint): void {
        const screen3 = this.world.getMouseWorldPosition(screen2);
        this.stick.placeTopLine(screen3,this.anchor.clone());
        this.ball.position.copy(this.stick.getTop());
        this.renderer.render(this.world.scene, this.world.camera);
    }
}