import { Input } from "./Input.js"
import { OrthographicCamera } from "../render/Camera.js"
import { MouseButton } from "./MouseButtonCode.js"
import * as weml from '../ext/weml.js/weml.js'
import { Event, EventDispatcher } from "../event/Event.js"
import { canvas } from "./Window.js"
import { KeyCode } from "./KeyCode.js"

export class OrthographicCameraController 
{
    constructor() 
    {
        this.OnMouseButtonClicked = this.OnMouseButtonClicked.bind(this);
        this.OnMouseScrolled = this.OnMouseScrolled.bind(this);
        this.OnWindowResized = this.OnWindowResized.bind(this);

        this.m_CameraPanSpeed = 60;
        this.m_CameraAngle = 0;
        this.m_ZoomLevel = 1.0
        this.m_PreviousMousePosition = weml.Vec2(Input.mousePosition[0], Input.mousePosition[1]);

        this.m_Camera = new OrthographicCamera(
            -canvas.width / 2 * this.m_ZoomLevel, 
            canvas.width / 2 * this.m_ZoomLevel,
            canvas.height / 2 * this.m_ZoomLevel,
            -canvas.height / 2 * this.m_ZoomLevel, 
            -1,
            1);
    }

    GetCamera() 
    {
        return this.m_Camera;
    }

    Update(deltaTime) 
    {
        if (Input.IsMouseButtonPressed(MouseButton.MOUSE_MIDDLE)) 
        {
            let direction = weml.Vec2();
            direction[0] = (this.m_PreviousMousePosition[0] - Input.mousePosition[0]) * this.m_ZoomLevel;
            direction[1] = (this.m_PreviousMousePosition[1] - Input.mousePosition[1]) * this.m_ZoomLevel;

            this.m_Camera.SetPosition(this.m_Camera.GetPosition()[0] + direction[0], this.m_Camera.GetPosition()[1] + direction[1], 0.0);
            
            this.m_PreviousMousePosition = weml.Vec2(Input.mousePosition[0], Input.mousePosition[1]);
        }

        if (Input.IsKeyPressed(KeyCode.Q)) 
        {
            this.m_CameraAngle--;
            this.m_Camera.SetRotation(this.m_CameraAngle);
        }
        if (Input.IsKeyPressed(KeyCode.E)) 
        {
            this.m_CameraAngle++;
            this.m_Camera.SetRotation(this.m_CameraAngle);
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
            this.m_ZoomLevel += 0.25;
            this.m_ZoomLevel = Math.min(2.0, this.m_ZoomLevel);
            this.m_Camera.SetProjectionMatrix(
                -canvas.width / 2 * this.m_ZoomLevel, 
                canvas.width / 2 * this.m_ZoomLevel,
                canvas.height / 2 * this.m_ZoomLevel,
                -canvas.height / 2 * this.m_ZoomLevel, 
                -1,
                1);
        }
        else if (event.GetOffsetY() < 0) // zoom in 
        {
            this.m_ZoomLevel -= 0.25;
            this.m_ZoomLevel = Math.max(0.25, this.m_ZoomLevel);
            this.m_Camera.SetProjectionMatrix(
                -canvas.width / 2 * this.m_ZoomLevel, 
                canvas.width / 2 * this.m_ZoomLevel,
                canvas.height / 2 * this.m_ZoomLevel,
                -canvas.height / 2 * this.m_ZoomLevel, 
                -1,
                1);
        }

        this.m_Camera.RecalculateViewProjectionMatrix();

        return true;
    }

    OnMouseButtonClicked(event) 
    {
        this.m_PreviousMousePosition = weml.Vec2(Input.mousePosition[0], Input.mousePosition[1]);

        return true;
    }

    OnWindowResized(event) 
    {
        this.m_Camera.SetProjectionMatrix(
            -canvas.width / 2 * this.m_ZoomLevel, 
            canvas.width / 2 * this.m_ZoomLevel,
            canvas.height / 2 * this.m_ZoomLevel,
            -canvas.height / 2 * this.m_ZoomLevel, 
            -1,
            1);
        this.m_Camera.RecalculateViewProjectionMatrix();

        return true;
    }
}