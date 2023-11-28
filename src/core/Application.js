import { Log } from "./Log.js"
import { Window } from "./Window.js"
import { Event, EventDispatcher } from "../event/Event.js"
import { Input } from "./Input.js"
import { LayerStack } from "./LayerStack.js"
import { Renderer } from "../render/Renderer.js"
import { RenderCommand } from "../render/RenderCommand.js"
import { Profiler } from "./Profiler.js"


export class Application
{
    constructor() 
    {
        this.OnEvent = this.OnEvent.bind(this);
        this.OnTick = this.OnTick.bind(this);
        this.OnWindowClosed = this.OnWindowClosed.bind(this);
        this.OnWindowResized = this.OnWindowResized.bind(this);

        this.m_Window = new Window('Engine', 600, 600);
        this.m_Window.SetEventCallback(this.OnEvent);

        this.m_LayerStack = new LayerStack();

        this.m_LastFrameTime = 0;
        
        requestAnimationFrame(this.OnTick);
    }

    Run() 
    {
        
    }

    OnUpdate(deltaTime)
    {

    }

    OnTick() 
    {
        let currentFrameTime = Date.now();
        let deltaTimeMilliseconds = currentFrameTime - this.m_LastFrameTime;
        let deltaTimeSeconds = deltaTimeMilliseconds / 1000;
        this.m_LastFrameTime = currentFrameTime;

        //Log.Core_Info(`Delta time: ${deltaTimeSeconds}s (${deltaTimeMilliseconds}ms)`);
        //Log.Core_Info(`FPS: ${1 / deltaTimeSeconds}`);

        this.OnUpdate(deltaTimeSeconds);

        this.m_LayerStack.GetLayers().forEach(layer => 
        {
            layer.OnUpdate(deltaTimeSeconds);
        });

        requestAnimationFrame(this.OnTick);
    }


    OnEvent(event) 
    {
        let dispatcher = new EventDispatcher(event);

        dispatcher.Dispatch(this.OnWindowClosed, Event.EventType.WindowClosedEvenet);
        dispatcher.Dispatch(this.OnWindowResized, Event.EventType.WindowResizedEvent);

        for (let i = 0; i < this.m_LayerStack.GetLayers().length; i++) 
        {
            this.m_LayerStack.GetLayers()[i].OnEvent(event);
            if ( event.m_Handled ) { break; }
        }

        Log.Core_Info(event);
    }

    OnWindowClosed(event) 
    {
        return true;
    }

    OnWindowResized(event) 
    {
        RenderCommand.SetViewport(event.GetWidth(), event.GetHeight());

        return true;
    }

    PushLayer(layer) 
    {
        this.m_LayerStack.PushLayer(layer);
        layer.OnAttach();
    
        Log.Core_Info(`${layer.GetDebugName()} is attached`);
    }

    PushOverlay(overlay) 
    {
        this.m_LayerStack.PushOverlay(overlay);
        overlay.OnAttach();

        Log.Core_Info(`${layer.GetDebugName()} is attached`);
    }

    SetTitle(title) 
    {
        this.m_Window.SetTitle(title);
    }
}