export class Layer 
{
    constructor(name = 'Layer') 
    {
        this.debugName = name;
    }

    OnAttach() {}
    OnDetach() {}
    OnUpdate(deltaTime) {}
    OnGUIRender() {}
    OnEvent(event) {}

    GetDebugName() 
    {
        return this.debugName;
    }
}