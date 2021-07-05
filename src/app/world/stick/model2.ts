import { createRenderer, ModelInterface } from '../modelInterface';
import { Scene } from './scene';

export class Model2 extends Scene implements ModelInterface {
    renderer = createRenderer();

    constructor() {
        super();
    }

    updateCanvas(): void {
        //TODO: Optimize
        const curBottom = this.getStickBottomPosition();
        const newTop = this.getMouseWorldPosition();
        this.placeStickTopLine(newTop, curBottom);
        this.renderer.render(this.scene, this.camera);
    }
}