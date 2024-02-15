export class Log 
{
    static Time() 
    {
        const now = new Date();
        return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
    }
    
    static Core_Info(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'CORE');
        event.Dispatch();

        console.info(message);
    }
    
    static Core_Warn(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'CORE');
        event.Dispatch();
        
        console.warn(message);
    }
    
    static Core_Error(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'CORE');
        event.Dispatch();
        
        console.error(message);
    }
    
    static Core_Trace(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'CORE');
        event.Dispatch();
        
        console.trace(message);
    }
    
    static Info(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'APP');
        event.Dispatch();
        
        console.info(message);
    }
    
    static Warn(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'APP');
        event.Dispatch();
        
        console.warn(message);
    }
    
    static Error(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'APP');
        event.Dispatch();
        
        console.error(message);
    }
    
    static Trace(object) 
    {
        const message = `${Log.Time()}: ${object}`;

        const event = new LogEvent(message, 'APP');
        event.Dispatch();
        
        console.trace(message);
    }

}

class LogEvent 
{
    constructor(message, dest) 
    {
        this.m_Message = message;        
        this.m_Dest = dest;
    }

    Dispatch() 
    {
        const logEvent = new CustomEvent('logEvent', {
            detail: { message: this.m_Message, dest: this.m_Dest },
        });
        
        document.dispatchEvent(logEvent);
    }
}