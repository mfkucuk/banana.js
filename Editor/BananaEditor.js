import * as banana from '../src/banana.js'
import { EditorGUI } from './EditorGUI.js'
import { EditorLayer } from './EditorLayer.js'

class BananaEditor extends banana.Application 
{
    constructor() 
    {
        super('banana.js Editor', 1280, 720);

        LiteGUI.init();

        window.mainarea = new LiteGUI.Area({ id: "mainarea", content_id:"canvasarea", height: "calc(100%)", main:true, inmediateResize: true});
        LiteGUI.add( window.mainarea );

        this.PushLayer(new EditorLayer());
        //this.PushLayer(new EditorGUI());
    }

    OnWindowResized(event) 
    {
        banana.canvas.width = event.GetWidth() * (0.7);
        banana.canvas.height = event.GetHeight() * (0.7);
        banana.RenderCommand.SetViewport(banana.canvas.width, banana.canvas.height);
        return true;
    }
}

banana.Application.CreateApplication = function() 
{
    return new BananaEditor();
}