import { Writer } from "./FileManager.js";
import { Log } from "./Log.js"

export class Profiler 
{
    static BeginProfile(name, filepath = 'results.json') 
    {
        Instrumentor.Get().BeginSession(name, filepath);
    }

    static EndProfile() 
    {
        Instrumentor.Get().EndSession();
    }

    static ProfileScope(scopeName) 
    {
        return new Timer(scopeName);
    }
}

class Timer 
{
    // starts timer
    constructor(name) 
    {
        this.m_Name = name;
        this.m_Stopped = false;

        this.m_StartTime = performance.now();
    }

    // stops timer
    ScopeEnd() 
    {
        const stopTime = performance.now(); 

        this.m_Stopped = true;

        const duration = stopTime - this.m_StartTime;

        Instrumentor.Get().WriteProfile(new ProfileResult(this.m_Name, duration, this.m_StartTime));

        Log.Core_Info(`${this.m_Name} duration: ${duration}ms`);
    }
}

function ProfileResult(name, duration, start) 
{
    this.GetName = function() 
    {
        return name;
    }

    this.GetDuration = function() 
    {
        return duration;
    }

    this.GetStart = function() 
    {
        return start;
    }
}

function InstrumentationSession(name) 
{
    this.m_Name = name;
}

class Instrumentor 
{
    constructor() 
    {
        this.WriteProfile = this.WriteProfile.bind(this);

        this.m_CurrentSession = undefined;
        this.m_Output = '';
        this.m_ProfileCount = 0;
        this.m_Filepath = '';

        //singleton
        this.m_Instance;
    }

    BeginSession(name, filepath) 
    {
        this.m_Output = '';
        this.WriteHeader();
        this.m_CurrentSession = new InstrumentationSession(name);
        this.m_Filepath = filepath;
    }

    EndSession() 
    {
        this.WriteFooter();

        //download the file
        Writer.SaveStringAsJson(this.m_Output, this.m_Filepath);

        this.m_CurrentSession = undefined;
        this.m_ProfileCount = 0;
    }

    WriteProfile(profileResult) 
    {
        if (this.m_ProfileCount++ > 0) 
        {
            this.m_Output += ',';
        }

        const name = profileResult.GetName();

        this.m_Output += '{';
        this.m_Output += '"cat": "function",';
        this.m_Output += `"dur":${profileResult.GetDuration()},`;
        this.m_Output += `"name":"${name}",`;
        this.m_Output += `"ph":"X",`;
        this.m_Output += `"pid":0,`;
        this.m_Output += `"tid":0,`;
        this.m_Output += `"ts":${profileResult.GetStart()}`;
        this.m_Output += `}`;
    }

    WriteHeader()
    {
        this.m_Output += '{"otherData": {}, "traceEvents":[';
    }

    WriteFooter() 
    {
        this.m_Output += ']}';
    }

    static Get() 
    {
        if (typeof this.m_Instance == 'undefined') 
        {
            this.m_Instance = new Instrumentor();
        }

        return this.m_Instance;
    }
}