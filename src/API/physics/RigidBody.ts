import { TransformComponent } from "../banana";
import { Vec3 } from "../math/MV.ts";

class RigidBody {
    mass: number;
    velocity: Vec3;

    constructor() {
        this.mass = 1;
        this.velocity = new Vec3(0, 0, 0);
    }

    integrate(dt: number, transformComponent: TransformComponent) {
        transformComponent.translate(this.velocity.x * dt, this.velocity.y * dt, this.velocity.z * dt);
    }
}

export default RigidBody;