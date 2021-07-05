import { Model2 } from './app/world/stick/model2';

const model = new Model2();

function animate() {
    requestAnimationFrame(animate);
    model.updateCanvas();
}
animate();