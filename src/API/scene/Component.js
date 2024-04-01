import { Color } from '../render/Color.js'
import { ComponentType } from '../core/Type.js'
import * as weml from '../ext/weml.js/weml.js'
import { SceneCamera } from '../render/Camera.js'
import { Movement } from './Movement.js'

export class TagComponent 
{
    constructor() 
    {
        this.name = 'Banana';

        this.type = ComponentType.TagComponent
    }

    SetName(name) 
    {
        this.name = name;
    }

    GetName() 
    {
        return this.name;
    }
}

export class TransformComponent
{
    constructor() 
    {
        this.position = weml.Vec3(0, 0, 0);
        this.rotation = weml.Vec3(0, 0, 0);
        this.scale = weml.Vec3(1, 1, 1);

        this.type = ComponentType.TransformComponent;
    }

    GetPosition() 
    {
        return this.position;
    }

    SetPosition(x, y, z) 
    {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
    }

    Translate(x, y, z) 
    {
        this.position[0] += x;
        this.position[1] += y;
        this.position[2] += z;
    }

    GetRotation() 
    {
        return this.rotation;
    }

    SetRotation(angleX, angleY, angleZ) 
    {
        this.rotation[0] = angleX;
        this.rotation[1] = angleY;
        this.rotation[2] = angleZ;
    }

    Rotate(angleX, angleY, angleZ) 
    {
        this.rotation[0] += angleX;
        this.rotation[1] += angleY;
        this.rotation[2] += angleZ;
    }

    GetScale() 
    {
        return this.scale;
    }

    SetScale(x, y, z) 
    {
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
    }
}

export class SpriteRendererComponent 
{
    constructor() 
    {
        this.color = Color.WHITE;

        this.type = ComponentType.SpriteRendererComponent;
    }

    SetColor(color) 
    {
        this.color = color;
    }

    GetColor() 
    {
        return this.color;
    }
}

export class CameraComponent 
{
    constructor() 
    {
        this.sceneCamera = new SceneCamera();

        this.primary = true;

        this.type = ComponentType.CameraComponent;
    }

    IsPrimary() 
    {
        return this.primary;
    }

    SetPrimary(flag) 
    {
        this.primary = flag;
    }

    GetCamera() 
    {
        return this.sceneCamera;
    }

    GetSize() 
    {
        return this.sceneCamera.size;
    }

    GetNear() 
    {
        return this.sceneCamera.near;
    }

    GetFar() 
    {
        return this.sceneCamera.far;
    }
}

export class NativeScriptComponent 
{
    constructor() 
    {
        this.Instance = null;
        this.m_InstanceScriptFn = function() {}
        this.m_DestroyScriptFn = function(nativeScriptComponent) {}

        this.type = ComponentType.NativeScriptComponent;
    }

    Bind(scriptableEntityClass) 
    {
        this.m_InstanceScriptFn = function() { return new scriptableEntityClass(); }
        this.m_DestroyScriptFn = function(nativeScriptComponent) { nativeScriptComponent.Instance = null; }
    }
}

export class MovementComponent extends NativeScriptComponent
{
    constructor() 
    {
        super();

        this.Bind(Movement);
    }
}

export const ComponentCreator = {}
ComponentCreator[ComponentType.TagComponent] = TagComponent;
ComponentCreator[ComponentType.TransformComponent] = TransformComponent;
ComponentCreator[ComponentType.SpriteRendererComponent] = SpriteRendererComponent;
ComponentCreator[ComponentType.CameraComponent] = CameraComponent;
ComponentCreator[ComponentType.NativeScriptComponent] = NativeScriptComponent;
ComponentCreator[ComponentType.MovementComponent] = MovementComponent;