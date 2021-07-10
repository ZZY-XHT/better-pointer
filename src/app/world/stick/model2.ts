import { MousePoint } from '../../util/mouse';
import { createRenderer, IModel } from '../interface';
import { World } from './world';

export class Model extends IModel {
    renderer = createRenderer();
    world = new World();
    stick = this.world.stick;

    updateCanvas(screen2: MousePoint): void {
        const newTop = this.world.getMouseWorldPosition(screen2);
        const curBottom = this.stick.getBottom();
        this.stick.placeTopLine(newTop, curBottom);
        this.renderer.render(this.world.scene, this.world.camera);
    }
}