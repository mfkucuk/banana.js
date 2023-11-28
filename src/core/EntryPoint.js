import { Application } from "./Application.js"
import { Log } from "./Log.js"
import { Profiler } from "./Profiler.js";

function main() 
{
    Log.Core_Info('Engine initialized');

    // init profiling
    //Profiler.BeginProfile('Application Init');
    let sandboxApp = Application.CreateApplication(); 
    //Profiler.EndProfile();

    Log.Info('Game started');


    sandboxApp.Run();
}

window.onload = main;