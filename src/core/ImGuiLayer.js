import * as ImGui from '../ext/imgui/build/imgui.js'

export class ImGuiLayer extends Layer 
{
    constructor() 
    {
        super('ImGuiLayer');
    }

    OnAttach = function() 
    {
        ImGui.CreateContext();
    }

    OnDetach = function() 
    {

    }

    OnUpdate = function() 
    {

    }

    OnEvent = function(event) 
    {

    }
}
