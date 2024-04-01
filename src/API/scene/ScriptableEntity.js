import { ComponentType } from "../banana.js"

export class ScriptableEntity 
{
    constructor() 
    {
        this.entity = null;
    }

    GetComponent(componentType) 
    {
        return this.entity.GetComponent(componentType);
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