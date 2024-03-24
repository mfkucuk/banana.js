import { ComponentType } from "../banana.js"

export class ScriptableEntity 
{
    constructor() 
    {
        this.m_Entity = null;
    }

    GetComponent(componentType) 
    {
        return this.m_Entity.GetComponent(componentType);
    }

    OnCreate() {}
    OnUpdate(deltaTime) {}
    OnDestroy() {}

    // DONT INHERIT THESE METHODS
    OnCreateSealed() 
    {
        this.tag = this.GetComponent(ComponentType.TagComponent);
        this.transform = this.GetComponent(ComponentType.TransformComponent);
    }
}