import { RigidBodyComponent, TransformComponent } from "../banana";

class PhysicsSystem {

    static update(rigidBodyComponent: RigidBodyComponent, transformComponent: TransformComponent, dt: number) {

        rigidBodyComponent.rigidBody.integrate(dt, transformComponent);
    }
}

export default PhysicsSystem;