import { WebGLContext } from '../render/WebGLContext.js' 
import { Log } from './Log.js'
import { Input } from './Input.js'
import * as mouse from '../event/MouseEvent.js'
import * as keyboard from '../event/KeyboardEvent.js'
import * as application from '../event/ApplicationEvent.js'

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

        this.m_Context = new WebGLContext(canvas);

        canvas.addEventListener('mousedown', (event) => 
        {
            let mouseButtonClickedEvent = new mouse.MouseButtonClickedEvent(event.x, event.y, event.button);

            this.m_EventCallbackFn(mouseButtonClickedEvent);

            Input.s_ButtonStates[`${event.button}`] = true;
        });

        canvas.addEventListener('mouseup', (event) => 
        {
            let mouseButtonReleasedEvent = new mouse.MouseButtonReleasedEvent(event.x, event.y, event.button);

            this.m_EventCallbackFn(mouseButtonReleasedEvent);

            Input.s_ButtonStates[`${event.button}`] = false;
        });

        canvas.addEventListener('mouseleave', (event) => 
        {
            Object.keys(Input.s_ButtonStates).forEach(button => {
                Input.s_ButtonStates[`${button}`] = false;
            });
        })

        canvas.addEventListener('mousemove', (event) => {

            Input.mousePosition[0] = event.x;
            Input.mousePosition[1] = event.y;
        })

        canvas.addEventListener('wheel', (event) => 
        {
            let mouseScrolledEvent = new mouse.MouseScrolledEvent(event.deltaX, event.deltaY);

            this.m_EventCallbackFn(mouseScrolledEvent);
        });

        canvas.addEventListener('keydown', (event) => 
        {
            let keyboardButtonPressedEvent = new keyboard.KeyboardButtonPressedEvent(event.key);

            this.m_EventCallbackFn(keyboardButtonPressedEvent);

            Input.s_KeyStates[event.key] = true;
        })

        canvas.addEventListener('keyup', (event) => 
        {
            let keyboardButtonReleasedEvent = new keyboard.KeyboardButtonReleasedEvent(event.key);

            this.m_EventCallbackFn(keyboardButtonReleasedEvent);

            Input.s_KeyStates[event.key] = false;
        })

        window.addEventListener('resize', (event) => 
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let windowResizedEvent = new application.WindowResizedEvent(canvas.width, canvas.height);

            this.m_EventCallbackFn(windowResizedEvent);
        })

        window.addEventListener('beforeunload', (event) => 
        {
            let windowClosedEvent = new application.WindowClosedEvent();

            this.m_EventCallbackFn(windowClosedEvent);
        })
    }

    GetWidth() 
    {
        return m_Width;
    }

    GetHeight() 
    {
        return m_Height;
    }

    SetEventCallback(callbackFn) 
    {
        this.m_EventCallbackFn = callbackFn;
    }

    SetTitle(title) 
    {
        document.getElementById('title').innerText = title;
    }
}