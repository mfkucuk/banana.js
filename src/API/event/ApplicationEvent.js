import { Event } from "./Event.js";

class ApplicationEvent extends Event 
{
    GetCategoryFlags()
    {
        return this.EventCategory.Application;
    }
}

export class WindowResizedEvent extends ApplicationEvent 
{
    constructor(width, height) 
    {
        super();
        this.width = width;
        this.height = height;
    }

    GetEventType() 
    {
        return Event.EventType.WindowResizedEvent;
    }

    GetEventName() 
    {
        return 'resize';
    }

    GetWidth() 
    {
        return this.width;
    }

    GetHeight() 
    {
        return this.height;
    }

    toString() 
    {
        return `${this.GetEventName()}: [${this.width}, ${this.height}]`
    }
}

export class WindowClosedEvent extends ApplicationEvent 
{
    GetEventType() 
    {
        return Event.EventType.WindowClosedEvent;
    }

    GetEventName() 
    {
        return 'close';
    }

    toString() 
    {
        return `${this.GetEventName()}`;
    }
}