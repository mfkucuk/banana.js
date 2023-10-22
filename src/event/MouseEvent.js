import { Event } from "./Event.js";

export class MouseEvent extends Event 
{
    constructor(mousePositionX, mousePositionY) 
    {
        super();
        this.m_MousePositionX = mousePositionX;
        this.m_MousePositionY = mousePositionY;
    }

    GetCategoryFlags = function()
    {
        return Event.EventCategory.Mouse;
    }

    toString = function() 
    {
        return `${this.GetEventName()}: Pos=(${this.m_MousePositionX}, ${this.m_MousePositionY})`;
    }
}

export class MouseMovedEvent extends MouseEvent 
{
    GetEventType = function() 
    {
        return Event.EventType.MouseMovedEvent;
    }

    GetEventName = function() 
    {
        return 'mousemove';
    }
}

export class MouseScrolledEvent extends Event 
{
    constructor(offsetX, offsetY) 
    {
        super();
        this.m_OffsetX = offsetX;
        this.m_OffsetY = offsetY;
    }

    GetCategoryFlags = function()
    {
        return Event.EventCategory.Mouse;
    }

    GetEventType = function() 
    {
        return Event.EventType.MouseScrollEvent;
    }

    GetEventName = function() 
    {
        return 'wheel';
    }

    toString = function() 
    {
        return `${this.GetEventName()}: Offset=(${this.m_OffsetX}, ${this.m_OffsetY})`;
    }
}

class MouseButtonEvent extends MouseEvent 
{
    constructor(mousePositionX, mousePositionY, button) 
    {
        super(mousePositionX, mousePositionY);
        this.m_Button = button;
    }

    GetCategoryFlags = function() 
    {
        return Event.EventCategory.Mouse & EventCategory.MouseButtonEvent;
    }

    toString = function() 
    {
        return `${this.GetEventName()}: Button=${this.m_Button}, Pos=(${this.m_MousePositionX}, ${this.m_MousePositionY})`;
    }
}


export class MouseButtonClickedEvent extends MouseButtonEvent 
{
    GetEventType = function() 
    {
        return Event.EventType.MouseButtonClickedEvent;
    }

    GetEventName = function() 
    {
        return 'mousedown';
    }
}

export class MouseButtonReleasedEvent extends MouseButtonEvent 
{
    GetEventType = function() 
    {
        return Event.EventType.MouseButtonReleasedEvent;
    }

    GetEventName = function() 
    {
        return 'mouseup';
    }
} 