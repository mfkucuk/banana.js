import { Event } from "./Event.js"

export class KeyboardEvent extends Event 
{
    constructor(key) 
    {
        super();
        this.m_Key = key;
    }

    GetCategoryFlags = function()
    {
        return Event.EventCategory.Keyboard;
    }

    GetKey = function() 
    {
        return this.m_Key;
    }

    toString = function() 
    {
        return `${this.GetEventName()}: Key=${this.GetKey()}`;
    }
}

export class KeyboardButtonPressedEvent extends KeyboardEvent 
{
    GetEventType = function() 
    {
        return Event.EventType.KeyboardButtonPressedEvent;
    }

    GetEventName = function() 
    {
        return 'keydown';
    }
}

export class KeyboardButtonReleasedEvent extends KeyboardEvent 
{
    GetEventType = function() 
    {
        return Event.EventType.KeyboardButtonReleasedEvent;
    }

    GetEventName = function() 
    {
        return 'keyup';
    }
}