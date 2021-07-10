import { Model } from './app/world/stick/model4';

const model = new Model();

function animate() {
    requestAnimationFrame(animate);
    model.update();
}
animate();