import { Color } from '../render/Color.ts'
import { ComponentType } from '../core/Type.ts'
import { SceneCamera } from '../render/Camera.ts'
import { Movement } from './Movement.ts'
import RigidBody2D from '../physics/RigidBody2D.ts'
import { Vec3 } from '../math/MV.ts'
import { ScriptableEntity } from './ScriptableEntity.ts'

export class Component {
    type: ComponentType;
}

export class TagComponent extends Component {

    name: string;

    constructor() {
        super();

        this.name = 'Banana';

        this.type = ComponentType.TagComponent
    }

    setName(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    toString() {
        return `TagComponent:\n  Tag: ${this.name}\n`;
    }
}

export class TransformComponent extends Component {

    position: Vec3;
    rotation: Vec3;
    scale: Vec3;

    constructor() {
        super();
        this.position = new Vec3(0, 0, 0);
        this.rotation = new Vec3(0, 0, 0);
        this.scale = new Vec3(1, 1, 1);

        this.type = ComponentType.TransformComponent;
    }

    getPosition(): Vec3 {
        return this.position;
    }

    setPosition(x: number, y: number, z: number) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    translate(x: number, y: number, z: number) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
    }

    getRotation(): Vec3 {
        return this.rotation;
    }

    setRotation(angleX, angleY, angleZ) {
        this.rotation.x = angleX;
        this.rotation.y = angleY;
        this.rotation.z = angleZ;
    }

    rotate(angleX, angleY, angleZ) {
        this.rotation.x += angleX;
        this.rotation.y += angleY;
        this.rotation.z += angleZ;
    }

    getScale() {
        return this.scale;
    }

    setScale(x, y, z) {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
    }

    toString() {

        const position = `Position: ${this.getPosition()}`;
        const rotation = `Rotation: ${this.getRotation()}`;
        const scale = `Scale: ${this.getScale()}`;

        return `TransformComponent:\n  ${position}\n  ${rotation}\n  ${scale}\n`;
    }
}

export class SpriteRendererComponent extends Component {
    
    color: Color;
    
    constructor() {
        super();
        this.color = Color.WHITE;

        this.type = ComponentType.SpriteRendererComponent;
    }

    setColor(color: Color) {
        this.color = color;
    }

    getColor(): Color {
        return this.color;
    }

    toString() {
        return `SpriteRendererComponent:\n  Color: ${this.color}`
    }
}

export class CameraComponent extends Component {

    sceneCamera: SceneCamera;
    primary: boolean

    constructor() {
        super();
        this.sceneCamera = new SceneCamera();

        this.primary = true;

        this.type = ComponentType.CameraComponent;
    }

    isPrimary(): boolean {
        return this.primary;
    }

    setPrimary(flag: boolean) {
        this.primary = flag;
    }

    getCamera(): SceneCamera {
        return this.sceneCamera;
    }

    getType() {
        return this.sceneCamera.getCameraType();
    }

    getFovy() {
        return this.sceneCamera.fovy;
    }

    getSize(): number {
        return this.sceneCamera.size;
    }

    getNear(): number {
        return this.sceneCamera.near;
    }

    getFar(): number {
        return this.sceneCamera.far;
    }

    toString() {
        const type = `ProjectionType: ${this.getType().valueOf()}`;
        const fov = `ProjectionFOV: ${this.getFovy()}`;

        return `CameraComponent:\n  Camera:\n   ${type}\n   ${fov}\n`;
    }
}

export class NativeScriptComponent extends Component {

    Instance: ScriptableEntity;
    instanceScriptFn: Function;
    destroyScriptFn: Function;

    constructor() {
        super();
        this.Instance = null;
        this.instanceScriptFn = function() {}
        this.destroyScriptFn = function(nativeScriptComponent: NativeScriptComponent) {}

        this.type = ComponentType.NativeScriptComponent;
    }

    bind(scriptableEntityClass: { new(): ScriptableEntity }) {
        this.instanceScriptFn = function() { return new scriptableEntityClass(); }
        this.destroyScriptFn = function(nativeScriptComponent: NativeScriptComponent) { nativeScriptComponent.Instance = null; }
    }
}

export class MovementComponent extends NativeScriptComponent {
    constructor() {
        super();
        
        this.bind(Movement);
    }
}

// PHYSICS-RELATED COMPONENTS
export class RigidBody2DComponent extends Component {

    rigidBody2D: RigidBody2D;

    constructor() {
        super();
        this.rigidBody2D = new RigidBody2D();

        this.type = ComponentType.RigidBody2DComponent;
    }
}

export const ComponentCreator = {}
ComponentCreator[ComponentType.TagComponent] = TagComponent;
ComponentCreator[ComponentType.TransformComponent] = TransformComponent;
ComponentCreator[ComponentType.SpriteRendererComponent] = SpriteRendererComponent;
ComponentCreator[ComponentType.CameraComponent] = CameraComponent;
ComponentCreator[ComponentType.NativeScriptComponent] = NativeScriptComponent;
ComponentCreator[ComponentType.MovementComponent] = MovementComponent;
ComponentCreator[ComponentType.RigidBody2DComponent] = RigidBody2DComponent;