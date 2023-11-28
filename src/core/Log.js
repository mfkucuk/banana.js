export class Log 
{
    static Time() 
    {
        const now = new Date();
        return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
    }
    
    static Core_Info(object) 
    {
        console.info(`${Log.Time()} CORE: ${object}`);
    }
    
    static Core_Warn(object) 
    {
        console.warn(`${Log.Time()} CORE: ${object}`);
    }
    
    static Core_Error(object) 
    {
        console.error(`${Log.Time()} CORE: ${object}`);
    }
    
    static Core_Trace(object) 
    {
        console.trace(`${Log.Time()} CORE: ${object}`);
    }
    
    static Info(object) 
    {
        console.info(`${Log.Time()} APP: ${object}`);
    }
    
    static Warn(object) 
    {
        console.warn(`${Log.Time()} APP: ${object}`);
    }
    
    static Error(object) 
    {
        console.error(`${Log.Time()} APP: ${object}`);
    }
    
    static Trace(object) 
    {
        console.trace(`${Log.Time()} APP: ${object}`);
    }

}
