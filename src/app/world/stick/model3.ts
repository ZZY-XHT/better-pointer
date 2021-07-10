import * as THREE from 'three';
import { MousePoint } from '../../util/mouse';
import { randFloat } from 'three/src/math/MathUtils';
import { createRenderer, IModel } from '../interface';
import { World } from './world';
import { stickProperty } from './stick';

const k=0.9999;
export class Model extends IModel {
    renderer = createRenderer();
    world = new World();
    stick = this.world.stick;

    updateCanvas(screen2: MousePoint): void {
        const len = stickProperty.length;
        //const newTop = new Vector3(0,5,0);
        //const curBottom = new Vector3(0,0,0);
        const newTop = this.world.getMouseWorldPosition(screen2);
        const curBottom = this.stick.getBottom();
        const disp = curBottom.clone().sub(newTop).normalize();
        const newbase = newTop.clone().addScaledVector(disp,k*len);
        const r = Math.sqrt(1-k*k) * len;
        
        const xAxis = new THREE.Vector3(1,0,0);
        const xbase = disp.clone().applyAxisAngle(xAxis, Math.PI/2);

        const zAxis = new THREE.Vector3(0,0,1);
        const zbase = disp.clone().applyAxisAngle(zAxis, Math.PI/2);

        const theta = randFloat(0, 2* Math.PI);

        const newBottom = newbase.addScaledVector(xbase,r*Math.sin(theta))
            .addScaledVector(zbase,r*Math.cos(theta));

        console.log(curBottom);
        this.stick.placeTopLine(newTop, newBottom);
        this.renderer.render(this.world.scene, this.world.camera);
    }
}