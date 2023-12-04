import * as weml from '../ext/weml.js/weml.js'
import { Gamepad } from './Gamepad.js'
import { Log } from './Log.js'

export class Input 
{
    static GamepadWarningFlag = true;

    static IsKeyPressed(key) 
    {
        if (typeof Input.s_KeyStates[key] == 'undefined') 
        {
            Input.s_KeyStates[key] = false;
        }

        return Input.s_KeyStates[key];
    }

    static IsMouseButtonPressed(button) 
    {
        let key = `${button}`;
        
        if (typeof Input.s_ButtonStates[key] == 'undefined') 
        {
            Input.s_ButtonStates[key] = false;
        }

        return Input.s_ButtonStates[key];
    }

    static IsGamepadButtonPressed(button) 
    {
        if (!Gamepad.Instance.IsGamepadConnected()) 
        {
            if (this.GamepadWarningFlag) 
            {
                Log.Core_Warn('No gamepad is connected!');
                this.GamepadWarningFlag = false;
            }
            return false;
        } 
        
        this.GamepadWarningFlag = true;
        return Gamepad.Instance.CurrentGamepad().buttons[button].pressed;
    }

    static GetJoystickStrength(axis) 
    {
        if (!Gamepad.Instance.IsGamepadConnected()) 
        {
            if (this.GamepadWarningFlag) 
            {
                Log.Core_Warn('No gamepad is connected!');
                this.GamepadWarningFlag = false;
            }
            return false;
        } 

        this.GamepadWarningFlag = true;
        return Gamepad.Instance.CurrentGamepad().axes[axis].value;
    }

    static mousePosition = weml.Vec2(0, 0);

    static s_KeyStates = {};
    static s_ButtonStates = {};
}