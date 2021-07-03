import { Model1 } from './app/world/stick/model1';

const model = new Model1();

function animate() {
    requestAnimationFrame(animate);
    model.updateCanvas();
}
animate();