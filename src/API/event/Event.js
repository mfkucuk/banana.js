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
        Gamepad: 5,
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
        WindowClosedEvent: 51,
        GamepadConnectedEvent: 60,
        GamepadDisconnectedEvent: 61,
    }

    constructor() 
    {    
        this.handled = false;
    }

    GetCategoryFlags() 
    {
        return Event.EventCategory.None;
    }

    GetEventType()
    {
        return Event.EventType.None;
    }
    
    GetEventName() 
    {
        return '';
    }

    IsInCategory(category) 
    {
        return this.GetCategoryFlags() & category;
    }
}

export class EventDispatcher 
{
    constructor(event) 
    {
        this.event = event;
    }

    Dispatch(dispatchFn, eventType) 
    {
        if (this.event.GetEventType() == eventType) 
        {
            this.event.handle = dispatchFn(this.event);
            return true;
        }

        return false;
    }
}