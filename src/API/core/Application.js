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

        this.isRunning = true;

        this.window = new Window(appName, windowWidth, windowHeight);
        this.window.SetEventCallback(this.OnEvent);

        this.gamepad = new Gamepad();

        this.layerStack = new LayerStack();

        this.lastFrameTime = 0;

        this.window.Resize(windowWidth, windowHeight);
    }

    Run() 
    {
        this.layerStack.GetLayers().forEach(layer => 
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
        let deltaTimeMilliseconds = currentFrameTime - this.lastFrameTime;
        let deltaTimeSeconds = deltaTimeMilliseconds / 1000;
        this.lastFrameTime = currentFrameTime;
        let fps = parseInt(1 / deltaTimeSeconds);

        //Log.Core_Info(`Delta time: ${deltaTimeSeconds}s (${deltaTimeMilliseconds}ms)`);
        //Log.Core_Info(`FPS: ${fps}`);

        this.OnUpdate(deltaTimeSeconds);

        this.layerStack.GetLayers().forEach(layer => 
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

        for (let i = 0; i < this.layerStack.GetLayers().length; i++) 
        {
            this.layerStack.GetLayers()[i].OnEvent(event);
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
        this.layerStack.PushLayer(layer);
        layer.OnAttach();
    
        Log.Core_Info(`${layer.GetDebugName()} is attached`);
    }

    PushOverlay(overlay) 
    {
        this.layerStack.PushOverlay(overlay);
        overlay.OnAttach();

        Log.Core_Info(`${overlay.GetDebugName()} is attached`);
    }

    SetTitle(title) 
    {
        this.window.SetTitle(title);
    }

    static CreateApplication() 
    {
        
    }
}