import * as weml from '../ext/weml.js/weml.js'

export class Input 
{
    static IsKeyPressed(key) 
    {
        if (Input.s_KeyStates[key] == 'undefined') 
        {
            Input.s_KeyStates[key] = false;
        }

        return Input.s_KeyStates[key];
    }

    static IsMouseButtonPressed(button) 
    {
        let key = `${button}`;
        
        if (Input.s_ButtonStates[key] == 'undefined') 
        {
            Input.s_ButtonStates[key] = false;
        }

        return Input.s_ButtonStates[key];
    }

    static mousePosition = weml.Vec2(0, 0);

    static s_KeyStates = {};
    static s_ButtonStates = {};
}