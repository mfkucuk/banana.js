import { Application } from "./Application.ts"
import { Log } from "./Log.ts"
import { Profiler } from "./Profiler.ts";

export function main() {
    Log.Core_Info('Engine initialized');

    // init profiling
    //Profiler.BeginProfile('Application Init');
    let bananaApp = Application.createApplication(); 
    //Profiler.EndProfile();

    Log.Info('Game started');

    Profiler.beginProfile('Application Runtime', 'Runtime.json');
    bananaApp.run();

}

//window.onload = main;