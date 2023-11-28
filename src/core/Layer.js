export class Layer 
{
    constructor(name = 'Layer') 
    {
        this.m_DebugName = name;
    }

    OnAttach() {}
    OnDetach() {}
    OnUpdate(deltaTime) {}
    OnEvent(event) {}

    GetDebugName() 
    {
        return this.m_DebugName;
    }
}