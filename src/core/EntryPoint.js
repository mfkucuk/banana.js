import { Application } from "./Application.js"
import { Log } from "./Log.js"

function main() 
{
    Log.Core_Info('Engine initialized');

    let sandboxApp = Application.CreateApplication(); 

    Log.Info('Game started');

    sandboxApp.Run();
}

window.onload = main;