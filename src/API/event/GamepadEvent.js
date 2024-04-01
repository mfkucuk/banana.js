import { Event } from "./Event.js"

class GamepadEvent extends Event 
{
    constructor(gamepad) 
    {
        super();

        this.gamepad = gamepad;
    }

    GetGamepad() 
    {
        return this.gamepad;
    }

    GetCategoryFlags() 
    {
        return Event.EventCategory.Gamepad;
    }

    toString() 
    {
        return `${this.GetEventName()}: Gamepad id: ${this.GetGamepad().id}
                                        buttons: ${this.GetGamepad().buttons.length}`;
    }
}

export class GamepadConnectedEvent extends GamepadEvent 
{
    GetEventType() 
    {
        return Event.EventType.GamepadConnectedEvent;
    }

    GetEventName() 
    {
        return 'gamepadconnected';
    }
}

export class GamepadDisconnectedEvent extends GamepadEvent 
{
    GetEventType() 
    {
        return Event.EventType.GamepadDisconnectedEvent;
    }

    GetEventName() 
    {
        return 'gamepaddisconnected';
    }
}