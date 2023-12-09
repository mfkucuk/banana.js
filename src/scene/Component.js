import { Color } from '../render/Color.js'
import { ComponentType } from '../core/Type.js'
import * as weml from '../ext/weml.js/weml.js'
import { SceneCamera } from '../render/Camera.js'

export class TagComponent 
{
    constructor() 
    {
        this.m_Name = 'Banana';

        this.type = ComponentType.TagComponent
    }

    SetName(name) 
    {
        this.m_Name = name;
    }

    GetName() 
    {
        return this.m_Name;
    }
}

export class TransformComponent
{
    constructor() 
    {
        this.m_Position = weml.Vec3(0, 0, 0);
        this.m_Rotation = weml.Vec3(0, 0, 0);
        this.m_Scale = weml.Vec3(1, 1, 1);

        this.type = ComponentType.TransformComponent;
    }

    GetPosition() 
    {
        return this.m_Position;
    }

    SetPosition(x, y, z) 
    {
        this.m_Position[0] = x;
        this.m_Position[1] = y;
        this.m_Position[2] = z;
    }

    GetRotation() 
    {
        return this.m_Rotation;
    }

    SetRotation(angleX, angleY, angleZ) 
    {
        this.m_Rotation[0] = angleX;
        this.m_Rotation[1] = angleY;
        this.m_Rotation[2] = angleZ;
    }

    GetScale() 
    {
        return this.m_Scale;
    }

    SetScale(x, y, z) 
    {
        this.m_Scale[0] = x;
        this.m_Scale[1] = y;
        this.m_Scale[2] = z;
    }
}

export class SpriteRendererComponent 
{
    constructor() 
    {
        this.m_Color = Color.WHITE;

        this.type = ComponentType.SpriteRendererComponent;
    }

    SetColor(color) 
    {
        this.m_Color = color;
    }

    GetColor() 
    {
        return this.m_Color;
    }
}

export class CameraComponent 
{
    constructor() 
    {
        this.m_SceneCamera = new SceneCamera();
        this.m_Primary = true;

        this.type = ComponentType.CameraComponent;
    }

    IsPrimary() 
    {
        return this.m_Primary;
    }

    SetPrimary(flag) 
    {
        this.m_Primary = flag;
    }

    GetCamera() 
    {
        return this.m_SceneCamera;
    }
}

export const ComponentCreator = {}
ComponentCreator[ComponentType.TagComponent] = new TagComponent();
ComponentCreator[ComponentType.TransformComponent] = new TransformComponent();
ComponentCreator[ComponentType.SpriteRendererComponent] = new SpriteRendererComponent();
ComponentCreator[ComponentType.CameraComponent] = new CameraComponent();