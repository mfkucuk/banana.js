import { Renderer } from "../src/render/Renderer.js"
import { Application } from "../src/core/Application.js"

class Sandbox extends Application
{
    Run = function() 
    { 
        let rend = new Renderer();

        rend.DrawRectangle(200.0, 200.0, 200.0, 200.0);

        rend.Flush();
    }
}

Application.CreateApplication = function() 
{
    return new Sandbox();
}