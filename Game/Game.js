import * as banana from '../src/banana.js'
import { Sandbox2D } from './Sandbox2D.js'

class Game extends banana.Application
{
    constructor() 
    {
        super('Game', 600, 600);

        this.PushLayer(new Sandbox2D());
    }
}

banana.Application.CreateApplication = function() 
{
    return new Game();
}