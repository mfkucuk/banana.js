export class Log 
{
    static Time = function() 
    {
        const now = new Date();
        return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
    }
    
    static Core_Info = function(object) 
    {
        console.info(`${Log.Time()} CORE: ${object}`);
    }
    
    static Core_Warn = function(object) 
    {
        console.warn(`${Log.Time()} CORE: ${object}`);
    }
    
    static Core_Error = function(object) 
    {
        console.error(`${Log.Time()} CORE: ${object}`);
    }
    
    static Core_Trace = function(object) 
    {
        console.trace(`${Log.Time()} CORE: ${object}`);
    }
    
    static Info = function(object) 
    {
        console.info(`${Log.Time()} APP: ${object}`);
    }
    
    static Warn = function(object) 
    {
        console.warn(`${Log.Time()} APP: ${object}`);
    }
    
    static Error = function(object) 
    {
        console.error(`${Log.Time()} APP: ${object}`);
    }
    
    static Trace = function(object) 
    {
        console.trace(`${Log.Time()} APP: ${object}`);
    }

}
