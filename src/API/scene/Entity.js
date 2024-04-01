import { Log } from "../banana.js"
import { ComponentCreator } from "./Component.js"

export class Entity 
{
    constructor(entityHandle, scene) 
    {
        this.entityHandle = entityHandle;
        this.scene = scene;
    }

    AddComponent(type) 
    {
        return this.scene.registry.emplace(this.entityHandle, new ComponentCreator[type]());
    }

    HasComponent(type) 
    {
        return this.scene.registry.has(this.entityHandle, type);
    }

    GetComponent(type) 
    {
        if (!this.HasComponent(type)) 
        {
            Log.Core_Warn('Entity does not have this component type');
            return null;
        }

        return this.scene.registry.get(this.entityHandle, type);
    }
}