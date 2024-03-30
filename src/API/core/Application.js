import { Log } from "./Log.js"
import { Window, canvas } from "./Window.js"
import { Event, EventDispatcher } from "../event/Event.js"
import { LayerStack } from "./LayerStack.js"
import { RenderCommand } from "../render/RenderCommand.js"
import { Gamepad } from "./Gamepad.js"


export class Application
{
    constructor(appName, windowWidth, windowHeight) 
    {
        this.OnEvent = this.OnEvent.bind(this);
        this.OnTick = this.OnTick.bind(this);
        this.OnWindowClosed = this.OnWindowClosed.bind(this);
        this.OnWindowResized = this.OnWindowResized.bind(this);

        this.m_IsRunning = true;

        this.m_Window = new Window(appName, windowWidth, windowHeight);
        this.m_Window.SetEventCallback(this.OnEvent);

        this.m_Gamepad = new Gamepad();

        this.m_LayerStack = new LayerStack();

        this.m_LastFrameTime = 0;

        this.m_Window.Resize(windowWidth, windowHeight);
    }

    Run() 
    {
        this.m_LayerStack.GetLayers().forEach(layer => 
        {
            layer.OnGUIRender();
        });

        this.OnTick();
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
        let fps = parseInt(1 / deltaTimeSeconds);

        //Log.Core_Info(`Delta time: ${deltaTimeSeconds}s (${deltaTimeMilliseconds}ms)`);
        //Log.Core_Info(`FPS: ${fps}`);

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

        dispatcher.Dispatch(this.OnWindowClosed, Event.EventType.WindowClosedEvent);
        dispatcher.Dispatch(this.OnWindowResized, Event.EventType.WindowResizedEvent);

        for (let i = 0; i < this.m_LayerStack.GetLayers().length; i++) 
        {
            this.m_LayerStack.GetLayers()[i].OnEvent(event);
            if ( event.m_Handled ) { break; }
        }

        Gamepad.Instance.OnEvent(event);

        Log.Core_Info(event);
    }

    OnWindowClosed(event) 
    {
        //Profiler.EndProfile();
        
        return true;
    }

    OnWindowResized(event) 
    {
        canvas.width = event.GetWidth();
        canvas.height = event.GetHeight();
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

        Log.Core_Info(`${overlay.GetDebugName()} is attached`);
    }

    SetTitle(title) 
    {
        this.m_Window.SetTitle(title);
    }

    static CreateApplication() 
    {
        
    }
}