import { Event, EventDispatcher } from "../event/Event.js"

export class Gamepad 
{
    static Instance;

    constructor() 
    {
        if (!Gamepad.Instance) 
        {
            Gamepad.Instance = this;

            this.m_CurrentGamepad;
            this.m_IsGamepadConnected = false;
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
        this.m_CurrentGamepad = event.GetGamepad(); 

        this.m_IsGamepadConnected = true;
    }
    
    OnGamepadDisconnected(event) 
    {
        this.m_CurrentGamepad = undefined;

        this.m_IsGamepadConnected = false;
    }

    CurrentGamepad() 
    {
        return navigator.getGamepads()[this.m_CurrentGamepad.index];
    }

    IsGamepadConnected() 
    {
        return this.m_IsGamepadConnected;
    }
}