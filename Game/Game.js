import * as banana from '../src/banana.js'
import { Sandbox2D } from './Sandbox2D.js'

class Game extends banana.Application
{
    constructor() 
    {
        super();

        this.SetTitle('Sandbox2D');

        //this.PushLayer(new Sandbox2D());   
        //this.PushLayer(new SolarSystem());   
        this.PushLayer(new Sandbox2D());   
    }
}

banana.Application.CreateApplication = function() 
{
    return new Game();
}