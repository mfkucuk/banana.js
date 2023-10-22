import * as banana from '../banana.js'
import { Application } from "../src/core/Application.js"

class Sandbox extends Application
{
    Run = function() 
    { 
        let rend = new banana.Renderer();

        rend.DrawRectangle(200.0, 200.0, 200.0, 200.0);

        rend.Flush();

        let gui = new banana.GUILayer();

        this.PushOverlay(gui);
    }
}

Application.CreateApplication = function() 
{
    return new Sandbox();
}