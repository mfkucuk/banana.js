// export { ApplicationEvent } from './ApplicationEvent.js'
// export { MouseEvent } from './MouseEvent.js'
// export { KeyboardEvent } from './KeyboardEvent.js'

export class Event
{
    static EventCategory = {
        None: 0,        // 00000   
        Application: 1, // 00001
        Mouse: 2,       // 00010
        MouseButton: 3, // 00100
        Keyboard: 4,    // 01000
    }
    
    static EventType = {
        None: 0,
        MouseMovedEvent: 20,
        MouseScrolledEvent: 21,
        MouseButtonClickedEvent: 30,
        MouseButtonReleasedEvent: 31,
        KeyboardButtonPressedEvent: 40,
        KeyboardButtonReleasedEvent: 41,
        WindowResizedEvent: 50,
        WindowClosedEvenet: 51
    }

    constructor() 
    {    
        this.m_Handled = false;
    }

    GetCategoryFlags() 
    {
        return EventCategory.None;
    }

    GetEventType()
    {
        return EventType.None;
    }
    
    GetEventName() 
    {
        return '';
    }

    IsInCategory(category) 
    {
        return GetCategoryFlags() & category;
    }
}

export class EventDispatcher 
{
    constructor(event) 
    {
        this.m_Event = event;
    }

    Dispatch(dispatchFn, eventType) 
    {
        if (this.m_Event.GetEventType() == eventType) 
        {
            this.m_Event.m_Handle = dispatchFn(this.m_Event);
            return true;
        }

        return false;
    }
}