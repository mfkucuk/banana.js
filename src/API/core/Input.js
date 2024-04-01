import * as weml from '../ext/weml.js/weml.js'
import { Gamepad } from './Gamepad.js'
import { Log } from './Log.js'

export class Input 
{
    static gamepadWarningFlag = true;

    static IsKeyPressed(key) 
    {
        if (typeof Input.keyStates[key] == 'undefined') 
        {
            Input.keyStates[key] = false;
        }

        return Input.keyStates[key];
    }

    static IsMouseButtonPressed(button) 
    {
        let key = `${button}`;
        
        if (typeof Input.buttonStates[key] == 'undefined') 
        {
            Input.buttonStates[key] = false;
        }

        return Input.buttonStates[key];
    }

    static IsGamepadButtonPressed(button) 
    {
        if (!Gamepad.Instance.IsGamepadConnected()) 
        {
            if (this.gamepadWarningFlag) 
            {
                Log.Warn('No gamepad is connected!');
                this.gamepadWarningFlag = false;
            }
            return false;
        } 
        
        this.gamepadWarningFlag = true;
        return Gamepad.Instance.CurrentGamepad().buttons[button].pressed;
    }

    static GetJoystickStrength(axis) 
    {
        if (!Gamepad.Instance.IsGamepadConnected()) 
        {
            if (this.gamepadWarningFlag) 
            {
                Log.Warn('No gamepad is connected!');
                this.gamepadWarningFlag = false;
            }
            return false;
        } 

        this.gamepadWarningFlag = true;
        return Gamepad.Instance.CurrentGamepad().axes[axis].value;
    }

    static mousePosition = weml.Vec2(0, 0);

    static keyStates = {};
    static buttonStates = {};
}