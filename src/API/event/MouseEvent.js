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
        this.offsetX = offsetX;
        this.offsetY = offsetY;
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
        return this.offsetY;
    }

    toString() 
    {
        return `${this.GetEventName()}: Offset=(${this.offsetX}, ${this.offsetY})`;
    }
}

class MouseButtonEvent extends MouseEvent 
{
    constructor(mousePositionX, mousePositionY, button) 
    {
        super(mousePositionX, mousePositionY);
        this.button = button;
    }

    GetCategoryFlags() 
    {
        return Event.EventCategory.Mouse & Event.EventCategory.MouseButtonEvent;
    }

    toString() 
    {
        return `${this.GetEventName()}: Button=${this.button}, Pos=(${this.m_MousePositionX}, ${this.m_MousePositionY})`;
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