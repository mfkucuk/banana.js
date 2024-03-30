import { Log } from "../banana.js"
import { ComponentCreator } from "./Component.js"

export class Entity 
{
    constructor(entityHandle, scene) 
    {
        this.m_EntityHandle = entityHandle;
        this.m_Scene = scene;
    }

    AddComponent(type) 
    {
        return this.m_Scene.m_Registry.emplace(this.m_EntityHandle, new ComponentCreator[type]());
    }

    HasComponent(type) 
    {
        return this.m_Scene.m_Registry.has(this.m_EntityHandle, type);
    }

    GetComponent(type) 
    {
        if (!this.HasComponent(type)) 
        {
            Log.Core_Warn('Entity does not have this component type');
            return null;
        }

        return this.m_Scene.m_Registry.get(this.m_EntityHandle, type);
    }
}