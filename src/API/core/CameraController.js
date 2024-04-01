import { Input } from "./Input.js"
import { EditorCamera } from "../render/Camera.js"
import { MouseButton } from "./MouseButtonCode.js"
import * as weml from '../ext/weml.js/weml.js'
import { Event, EventDispatcher } from "../event/Event.js"
import { canvas } from "./Window.js"
import { KeyCode } from "./KeyCode.js"
import { GamepadButtonCode } from "./GamepadButtonCode.js"

export class EditorCameraController 
{
    constructor() 
    {
        this.OnMouseButtonClicked = this.OnMouseButtonClicked.bind(this);
        this.OnMouseScrolled = this.OnMouseScrolled.bind(this);
        this.OnWindowResized = this.OnWindowResized.bind(this);

        this.cameraPanSpeed = 60;
        this.cameraAngle = 0;
        this.zoomLevel = 1.0
        this.previousMousePosition = weml.Vec2(Input.mousePosition[0], Input.mousePosition[1]);

        this.editorCamera = new EditorCamera();
    }

    GetCamera() 
    {
        return this.editorCamera;
    }

    Update(deltaTime) 
    {
        if (Input.IsMouseButtonPressed(MouseButton.MOUSE_MIDDLE)) 
        {
            let direction = weml.Vec2();
            direction[0] = (this.previousMousePosition[0] - Input.mousePosition[0]) * this.zoomLevel / 1.5;
            direction[1] = (this.previousMousePosition[1] - Input.mousePosition[1]) * this.zoomLevel / 1.5;

            this.editorCamera.SetPosition(this.editorCamera.GetPosition()[0] + direction[0], this.editorCamera.GetPosition()[1] + direction[1], 0.0);
            
            this.previousMousePosition = weml.Vec2(Input.mousePosition[0], Input.mousePosition[1]);
        }

        if (Input.IsKeyPressed(KeyCode.Q) || Input.IsGamepadButtonPressed(GamepadButtonCode.Dpad_Down)) 
        {
            this.cameraAngle--;
            this.editorCamera.SetRotation(this.cameraAngle);
        }
        if (Input.IsKeyPressed(KeyCode.E)) 
        {
            this.cameraAngle++;
            this.editorCamera.SetRotation(this.cameraAngle);
        }
    }

    OnEvent(event) 
    {
        let dispatcher = new EventDispatcher(event);

        dispatcher.Dispatch(this.OnMouseButtonClicked, Event.EventType.MouseButtonClickedEvent);
        dispatcher.Dispatch(this.OnMouseScrolled, Event.EventType.MouseScrolledEvent);
        dispatcher.Dispatch(this.OnWindowResized, Event.EventType.WindowResizedEvent);
    }

    OnMouseScrolled(event) 
    {
        if (event.GetOffsetY() > 0) // zoom out
        {
            this.zoomLevel += 0.25;
            this.zoomLevel = Math.min(2.0, this.zoomLevel);
            this.editorCamera.SetOrthographic(
                446 * this.zoomLevel,
                this.editorCamera.near,
                this.editorCamera.far);
        }
        else if (event.GetOffsetY() < 0) // zoom in 
        {
            this.zoomLevel -= 0.25;
            this.zoomLevel = Math.max(0.25, this.zoomLevel);
            this.editorCamera.SetOrthographic(
                446 * this.zoomLevel,
                this.editorCamera.near,
                this.editorCamera.far);
        }

        this.editorCamera.RecalculateViewProjectionMatrix();

        return true;
    }

    OnMouseButtonClicked(event) 
    {
        this.previousMousePosition = weml.Vec2(Input.mousePosition[0], Input.mousePosition[1]);

        return true;
    }

    OnWindowResized(event) 
    {
        this.editorCamera.m_AspectRatio = parseFloat(event.GetWidth()) / parseFloat(event.GetHeight());
        this.editorCamera.SetViewportSize();
        this.editorCamera.RecalculateViewProjectionMatrix();

        return true;
    }
}