import { Application } from "./Application.js"
import { Log } from "./Log.js"
import { Profiler } from "./Profiler.js";

function main() 
{
    Log.Core_Info('Engine initialized');

    // init profiling
    //Profiler.BeginProfile('Application Init');
    let bananaApp = Application.CreateApplication(); 
    //Profiler.EndProfile();

    Log.Info('Game started');

    Profiler.BeginProfile('Application Runtime', 'Runtime.json');
    bananaApp.Run();

}

window.onload = main;