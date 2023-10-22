import { WebGLUtils } from '../Common/webgl-utils.js'
import { Log } from './Log.js'
import * as mouse from '../event/MouseEvent.js'
import * as keyboard from '../event/KeyboardEvent.js'

export let gl;
export let canvas;

export class Window 
{
    constructor(title, width, height) 
    {
        this.m_Title = title;
        this.m_Width = width;
        this.m_Height = height;
        this.m_EventCallbackFn = function(event) {}

        canvas = document.getElementById('gl-canvas');
        if ( !canvas ) { Log.Core_Error('Canvas could not be loaded'); }

        canvas.width = this.m_Width;
        canvas.height = this.m_Height;

        canvas.focus();

        // disable the context menu
        canvas.addEventListener('contextmenu', (event) => 
        {
            event.preventDefault();
        });

        Log.Core_Info(`Creating window ${this.m_Title}, ${this.m_Width}x${this.m_Height}`);

        gl = WebGLUtils.setupWebGL( canvas );
        if ( !gl ) { Log.Core_Error('WebGL isn\'t available'); }

        canvas.addEventListener('mousedown', (event) => 
        {
            let mouseButtonClickedEvent = new mouse.MouseButtonClickedEvent(event.x, event.y, event.button);

            this.m_EventCallbackFn(mouseButtonClickedEvent);
        });

        canvas.addEventListener('mouseup', (event) => 
        {
            let mouseButtonReleasedEvent = new mouse.MouseButtonReleasedEvent(event.x, event.y, event.button);

            this.m_EventCallbackFn(mouseButtonReleasedEvent);
        });

        canvas.addEventListener('wheel', (event) => 
        {
            let mouseScrolledEvent = new mouse.MouseScrolledEvent(event.deltaX, event.deltaY);

            this.m_EventCallbackFn(mouseScrolledEvent);
        });

        canvas.addEventListener('keydown', (event) => 
        {
            let keyboardButtonPressedEvent = new keyboard.KeyboardButtonPressedEvent(event.key);

            this.m_EventCallbackFn(keyboardButtonPressedEvent);
        })

        canvas.addEventListener('keyup', (event) => 
        {
            let keyboardButtonReleasedEvent = new keyboard.KeyboardButtonReleasedEvent(event.key);

            this.m_EventCallbackFn(keyboardButtonReleasedEvent);
        })
    }

    GetWidth = function() 
    {
        return m_Width;
    }

    GetHeight = function() 
    {
        return m_Height;
    }

    SetEventCallback = function(callbackFn) 
    {
        this.m_EventCallbackFn = callbackFn;
    }
}