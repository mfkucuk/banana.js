import { Log } from "./Log.js"
import { Window } from "./Window.js"
import { Event, EventDispatcher } from "../event/Event.js"
import { Layer } from "./Layer.js"
import { LayerStack } from "./LayerStack.js"

export class Application
{
    constructor() 
    {
        this.OnEvent = this.OnEvent.bind(this);
        this.OnTick = this.OnTick.bind(this);

        this.m_Window = new Window('Engine', 600, 600);
        this.m_Window.SetEventCallback(this.OnEvent);

        this.m_LayerStack = new LayerStack();
        
        requestAnimationFrame(this.OnTick);
    }

    Run = function() 
    {

    }

    Update = function()
    {

    }

    OnTick = function() 
    {
        this.Update();

        this.m_LayerStack.GetLayers().forEach(layer => 
        {
            layer.OnUpdate();
        });

        requestAnimationFrame(this.OnTick);
    }


    OnEvent = function(event) 
    {
        let dispatcher = new EventDispatcher(event);

        for (let i = 0; i < this.m_LayerStack.GetLayers().length; i++) 
        {
            this.m_LayerStack.GetLayers()[i].OnEvent(event);
            if ( event.m_Handled ) { break; }
        }

        Log.Core_Info(event);
    }

    PushLayer = function(layer) 
    {
        this.m_LayerStack.PushLayer(layer);
        layer.OnAttach();
    }

    PushOverlay = function(overlay) 
    {
        this.m_LayerStack.PushOverlay(overlay);
        overlay.OnAttach();
    }
}