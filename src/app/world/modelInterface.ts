import * as THREE from 'three';

export interface ModelInterface{
    updateCanvas(): void
}

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

//TODO: user a proper json loader
//TODO: add documentation
export const renderConfig = {
    useAntiAlias: false,
    pixelRatio: window.devicePixelRatio
};