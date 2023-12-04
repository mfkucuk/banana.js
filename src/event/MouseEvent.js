import { Event } from "./Event.js";

class MouseEvent extends Event 
{
    constructor(mousePositionX, mousePositionY) 
    {
        super();
        this.m_MousePositionX = mousePositionX;
        this.m_MousePositionY = mousePositionY;
    }

    GetCategoryFlags()
    {
        return Event.EventCategory.Mouse;
    }

    toString() 
    {
        return `${this.GetEventName()}: Pos=(${this.m_MousePositionX}, ${this.m_MousePositionY})`;
    }
}

export class MouseMovedEvent extends MouseEvent 
{
    GetEventType() 
    {
        return Event.EventType.MouseMovedEvent;
    }

    GetEventName() 
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

    GetCategoryFlags()
    {
        return Event.EventCategory.Mouse;
    }

    GetEventType() 
    {
        return Event.EventType.MouseScrolledEvent;
    }

    GetEventName() 
    {
        return 'wheel';
    }

    GetOffsetY() 
    {
        return this.m_OffsetY;
    }

    toString() 
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

    GetCategoryFlags() 
    {
        return Event.EventCategory.Mouse & EventCategory.MouseButtonEvent;
    }

    toString() 
    {
        return `${this.GetEventName()}: Button=${this.m_Button}, Pos=(${this.m_MousePositionX}, ${this.m_MousePositionY})`;
    }
}


export class MouseButtonClickedEvent extends MouseButtonEvent 
{
    GetEventType() 
    {
        return Event.EventType.MouseButtonClickedEvent;
    }

    GetEventName() 
    {
        return 'mousedown';
    }
}

export class MouseButtonReleasedEvent extends MouseButtonEvent 
{
    GetEventType() 
    {
        return Event.EventType.MouseButtonReleasedEvent;
    }

    GetEventName() 
    {
        return 'mouseup';
    }
} 