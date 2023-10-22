import { Event } from "./Event.js";

export class ApplicationEvent extends Event 
{
    GetCategoryFlags = function()
    {
        return this.EventCategory.Application;
    }
}

class WindowResizeEvent extends ApplicationEvent 
{
    constructor(width, height) 
    {
        this.m_Width = width;
        this.m_Height = height;
    }

    GetEventType = function() 
    {
        return Event.EventType.WindowResizeEvent;
    }

    toString = function() 
    {

    }
}

class WindowCloseEvent extends ApplicationEvent 
{
    GetEventType = function() 
    {

    }

    GetEventName = function() 
    {
        return 'close';
    }

    toString = function() 
    {
        return `${this.GetEventName()}`;
    }
}