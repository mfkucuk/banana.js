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
}