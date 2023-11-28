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
        this.m_Width = width;
        this.m_Height = height;
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
        return this.m_Width;
    }

    GetHeight() 
    {
        return this.m_Height;
    }

    toString() 
    {
        return `${this.GetEventName()}: [${this.m_Width}, ${this.m_Height}]`
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