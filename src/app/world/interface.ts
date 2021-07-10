import * as THREE from 'three';
import { getMouseCanvasPosition, MousePoint } from '../util/mouse';

export abstract class IModel {
    abstract updateCanvas(screen2: MousePoint): void
    
    lastMousePoint:MousePoint = {x: 10000000, y:1000000}; 
    update(): void {
        
        const curMousePoint = getMouseCanvasPosition();
        if (this.lastMousePoint.x != curMousePoint.x || this.lastMousePoint.y != curMousePoint.y){
            this.updateCanvas(curMousePoint);
        }
        this.lastMousePoint = curMousePoint;
    }
}

const renderConfig = {
    useAntiAlias: false,
    pixelRatio: window.devicePixelRatio
};

export function createRenderer(): THREE.WebGLRenderer{
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('render-canvas') as HTMLCanvasElement,
        alpha: true,
        antialias: renderConfig.useAntiAlias
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(renderConfig.pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}