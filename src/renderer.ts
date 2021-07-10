import { Model } from './app/world/stick/model2';

const model = new Model();

function animate() {
    requestAnimationFrame(animate);
    model.update();
}
animate();