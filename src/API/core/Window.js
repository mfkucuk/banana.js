import { WebGLContext } from '../render/WebGLContext.js' 
import { Log } from './Log.js'
import { Input } from './Input.js'
import * as mouse from '../event/MouseEvent.js'
import * as keyboard from '../event/KeyboardEvent.js'
import * as application from '../event/ApplicationEvent.js'
import * as gamepad from '../event/GamepadEvent.js'

export let canvas;

export class Window 
{
    constructor(title, width, height) 
    {
        this.title = title;
        this.width = width;
        this.height = height;
        this.eventCallbackFn = function(event) {}

        canvas = document.getElementById('gl-canvas');
        if ( !canvas ) { Log.Core_Error('Canvas could not be loaded'); }

        canvas.width = this.width;
        canvas.height = this.height;

        canvas.focus();

        // disable the context menu
        canvas.addEventListener('contextmenu', (event) => 
        {
            event.preventDefault();
        });

        Log.Core_Info(`Creating window ${this.title}, ${this.width}x${this.height}`);
        this.SetTitle(this.title);

        this.context = new WebGLContext(canvas);

        // mouse events

        canvas.addEventListener('mousedown', (event) => 
        {
            let mouseButtonClickedEvent = new mouse.MouseButtonClickedEvent(event.x, event.y, event.button);

            this.eventCallbackFn(mouseButtonClickedEvent);

            Input.buttonStates[`${event.button}`] = true;
        });

        canvas.addEventListener('mouseup', (event) => 
        {
            let mouseButtonReleasedEvent = new mouse.MouseButtonReleasedEvent(event.x, event.y, event.button);

            this.eventCallbackFn(mouseButtonReleasedEvent);

            Input.buttonStates[`${event.button}`] = false;
        });

        canvas.addEventListener('mouseleave', (event) => 
        {
            Object.keys(Input.buttonStates).forEach(button => {
                Input.buttonStates[`${button}`] = false;
            });
        })

        canvas.addEventListener('mousemove', (event) => {

            Input.mousePosition[0] = event.x;
            Input.mousePosition[1] = event.y;
        })

        canvas.addEventListener('wheel', (event) => 
        {
            let mouseScrolledEvent = new mouse.MouseScrolledEvent(event.deltaX, event.deltaY);

            this.eventCallbackFn(mouseScrolledEvent);
        });

        // keyboard events

        canvas.addEventListener('keydown', (event) => 
        {
            let keyboardButtonPressedEvent = new keyboard.KeyboardButtonPressedEvent(event.key);

            this.eventCallbackFn(keyboardButtonPressedEvent);

            Input.keyStates[event.key] = true;
        })

        canvas.addEventListener('keyup', (event) => 
        {
            let keyboardButtonReleasedEvent = new keyboard.KeyboardButtonReleasedEvent(event.key);

            this.eventCallbackFn(keyboardButtonReleasedEvent);

            Input.keyStates[event.key] = false;
        })

        window.addEventListener('resize', (event) => 
        {
            let windowResizedEvent = new application.WindowResizedEvent(window.innerWidth, window.innerHeight);

            this.eventCallbackFn(windowResizedEvent);
        })

        window.addEventListener('beforeunload', (event) => 
        {

            let windowClosedEvent = new application.WindowClosedEvent();

            this.eventCallbackFn(windowClosedEvent);
        })

        // gamepad events
        window.addEventListener('gamepadconnected', (event) => 
        {
            let gamepadConnectedEvent = new gamepad.GamepadConnectedEvent(event.gamepad);

            this.eventCallbackFn(gamepadConnectedEvent);
        });

        window.addEventListener('gamepaddisconnected', (event) => 
        {
            let gamepadDisconnectedEvent = new gamepad.GamepadDisconnectedEvent(event.gamepad);

            this.eventCallbackFn(gamepadDisconnectedEvent);
        });
    }

    GetWidth() 
    {
        return this.width;
    }

    GetHeight() 
    {
        return this.height;
    }

    SetEventCallback(callbackFn) 
    {
        this.eventCallbackFn = callbackFn;
    }

    SetTitle(titleText) 
    {
        const title = document.getElementById('title');

        if (!title) 
        {
            return;
        }

        title.innerText = titleText;
    }

    Resize(width, height) 
    {
        this.width = width;
        this.height = height;
        
        window.resizeTo(width, height);

        let windowResizedEvent = new application.WindowResizedEvent(window.innerWidth, window.innerHeight);

        this.eventCallbackFn(windowResizedEvent);
    }
}