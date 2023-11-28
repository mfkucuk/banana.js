import { Event } from "./Event.js"

export class KeyboardEvent extends Event 
{
    constructor(key) 
    {
        super();
        this.m_Key = key;
    }

    GetCategoryFlags()
    {
        return Event.EventCategory.Keyboard;
    }

    GetKey() 
    {
        return this.m_Key;
    }

    toString() 
    {
        return `${this.GetEventName()}: Key=${this.GetKey()}`;
    }
}

export class KeyboardButtonPressedEvent extends KeyboardEvent 
{
    GetEventType() 
    {
        return Event.EventType.KeyboardButtonPressedEvent;
    }

    GetEventName() 
    {
        return 'keydown';
    }
}

export class KeyboardButtonReleasedEvent extends KeyboardEvent 
{
    GetEventType() 
    {
        return Event.EventType.KeyboardButtonReleasedEvent;
    }

    GetEventName() 
    {
        return 'keyup';
    }
}