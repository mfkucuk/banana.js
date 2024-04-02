import { Color } from '../render/Color.js'
import { ComponentType } from '../core/Type.ts'
import * as weml from '../ext/weml.js/weml.js'
import { SceneCamera } from '../render/Camera.js'
import { Movement } from './Movement.js'
import RigidBody from '../physics/RigidBody.ts'

export class Component {
    constructor() {
        this.type = undefined;
    }
}

export class TagComponent extends Component {
    constructor() {
        super();

        this.name = 'Banana';

        this.type = ComponentType.TagComponent
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export class TransformComponent extends Component {
    constructor() {
        super();
        this.position = weml.Vec3(0, 0, 0);
        this.rotation = weml.Vec3(0, 0, 0);
        this.scale = weml.Vec3(1, 1, 1);

        this.type = ComponentType.TransformComponent;
    }

    getPosition() {
        return this.position;
    }

    setPosition(x, y, z) {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
    }

    translate(x, y, z) {
        this.position[0] += x;
        this.position[1] += y;
        this.position[2] += z;
    }

    getRotation() {
        return this.rotation;
    }

    setRotation(angleX, angleY, angleZ) {
        this.rotation[0] = angleX;
        this.rotation[1] = angleY;
        this.rotation[2] = angleZ;
    }

    rotate(angleX, angleY, angleZ) {
        this.rotation[0] += angleX;
        this.rotation[1] += angleY;
        this.rotation[2] += angleZ;
    }

    getScale() {
        return this.scale;
    }

    setScale(x, y, z) {
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
    }
}

export class SpriteRendererComponent extends Component {
    constructor() {
        super();
        this.color = Color.WHITE;

        this.type = ComponentType.SpriteRendererComponent;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}

export class CameraComponent extends Component {
    constructor() {
        super();
        this.sceneCamera = new SceneCamera();

        this.primary = true;

        this.type = ComponentType.CameraComponent;
    }

    isPrimary() {
        return this.primary;
    }

    setPrimary(flag) {
        this.primary = flag;
    }

    getCamera() {
        return this.sceneCamera;
    }

    getSize() {
        return this.sceneCamera.size;
    }

    getNear() {
        return this.sceneCamera.near;
    }

    getFar() {
        return this.sceneCamera.far;
    }
}

export class NativeScriptComponent extends Component {
    constructor() {
        super();
        this.Instance = null;
        this.instanceScriptFn = function() {}
        this.destroyScriptFn = function(nativeScriptComponent) {}

        this.type = ComponentType.NativeScriptComponent;
    }

    Bind(scriptableEntityClass) {
        this.instanceScriptFn = function() { return new scriptableEntityClass(); }
        this.destroyScriptFn = function(nativeScriptComponent) { nativeScriptComponent.Instance = null; }
    }
}

export class MovementComponent extends NativeScriptComponent {
    constructor() {
        super();
        
        this.Bind(Movement);
    }
}

// PHYSICS-RELATED COMPONENTS
export class RigidBodyComponent extends Component {
    constructor() {
        super();
        this.rigidBody = new RigidBody();

        this.type = ComponentType.RigidBodyComponent;
    }
}

export const ComponentCreator = {}
ComponentCreator[ComponentType.TagComponent] = TagComponent;
ComponentCreator[ComponentType.TransformComponent] = TransformComponent;
ComponentCreator[ComponentType.SpriteRendererComponent] = SpriteRendererComponent;
ComponentCreator[ComponentType.CameraComponent] = CameraComponent;
ComponentCreator[ComponentType.NativeScriptComponent] = NativeScriptComponent;
ComponentCreator[ComponentType.MovementComponent] = MovementComponent;
ComponentCreator[ComponentType.RigidBodyComponent] = RigidBodyComponent;