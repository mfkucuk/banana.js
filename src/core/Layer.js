export class Layer 
{
    constructor(name = 'Layer') 
    {
        this.m_DebugName = name;
    }

    OnAttach = function() {}
    OnDetach = function() {}
    OnUpdate = function() {}
    OnEvent = function(event) {}

    GetDebugName = function() 
    {
        return this.m_DebugName;
    }
}