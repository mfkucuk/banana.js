import { Event, EventDispatcher } from "../event/Event.js"

export class Gamepad 
{
    static Instance;

    constructor() 
    {
        if (!Gamepad.Instance) 
        {
            Gamepad.Instance = this;

            this.isGamepadConnected = false;
            this.OnGamepadConnected = this.OnGamepadConnected.bind(this);
            this.OnGamepadDisconnected = this.OnGamepadDisconnected.bind(this);
        }

        return Gamepad.Instance;
    }

    OnEvent(event) 
    {
        let dispatcher = new EventDispatcher(event);

        dispatcher.Dispatch(this.OnGamepadConnected, Event.EventType.GamepadConnectedEvent);
        dispatcher.Dispatch(this.OnGamepadDisconnected, Event.EventType.GamepadDisconnectedEvent);
    }

    OnGamepadConnected(event) 
    {
        this.currentGamepad = event.GetGamepad(); 

        this.isGamepadConnected = true;
    }
    
    OnGamepadDisconnected(event) 
    {
        this.currentGamepad = undefined;

        this.isGamepadConnected = false;
    }

    CurrentGamepad() 
    {
        return navigator.getGamepads()[this.currentGamepad.index];
    }

    IsGamepadConnected() 
    {
        return this.isGamepadConnected;
    }
}