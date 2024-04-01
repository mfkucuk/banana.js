import { canvas } from '../core/Window.js'
import { Log } from '../core/Log.js'
import * as weml from '../ext/weml.js/weml.js'
import { Event, EventDispatcher } from '../event/Event.js'

export const CameraType = 
{
    Orthographic: 0, 
    Perspective: 1,
};

class Camera
{
    constructor() 
    {
        this.projectionMatrix = weml.Mat4();  
    
        this.cameraType = CameraType.Orthographic;      
        this.aspectRatio = parseFloat(canvas.width) / parseFloat(canvas.height)
    }

    SetOrthographic(size, near, far)
    {
        this.cameraType = CameraType.Orthographic;

        this.size = size;
        this.near = near;
        this.far = far;

        this.SetViewportSize();
    }

    SetPerspective(fovy, near, far) 
    {
        this.cameraType = CameraType.Perspective;

        this.projectionMatrix.setPerspective(weml.weml.toRadians(fovy), this.aspectRatio, near, far);
        this.size = fovy;
        this.near = near;
        this.far = far;
    }

    GetViewProjectionMatrix() 
    {
        return this.projectionMatrix;
    }

    GetCameraType() 
    {
        return this.cameraType;
    }

    SetViewportSize() 
    {
        let orthoLeft = -this.size * this.aspectRatio * 0.5;
        let orthoRight = this.size * this.aspectRatio * 0.5;
        let orthoBottom = this.size * 0.5;
        let orthoTop = -this.size * 0.5;

        this.projectionMatrix.setOrtho(orthoLeft, orthoRight, orthoBottom, orthoTop, this.near, this.far);
    }
}

export class SceneCamera extends Camera
{
    constructor() 
    {
        super();

        this.OnWindowResized = this.OnWindowResized.bind(this);

        this.SetOrthographic(446, -1, 1);
    }

    OnEvent(event) 
    {
        const dispatcher = new EventDispatcher(event);

        dispatcher.Dispatch(this.OnWindowResized, Event.EventType.WindowResizedEvent);
    }

    OnWindowResized(event) 
    {
        this.aspectRatio = parseFloat(canvas.width) / parseFloat(canvas.height)
        this.SetViewportSize();

        return true;
    }
}

export class EditorCamera extends Camera
{
    constructor() 
    {
        super();

        this.viewMatrix = weml.Mat4();
        this.viewProjectionMatrix = weml.Mat4();
        
        this.cameraPosition = weml.Vec3(0, 0, 0);
        this.cameraRotation = 0;

        this.SetView();
        this.SetOrthographic(446, -1, 1);
        this.RecalculateViewProjectionMatrix();
    }

    SetView() 
    {
        this.viewMatrix.setTranslationVec3(this.cameraPosition);

        this.viewMatrix.applyRotationZ(this.cameraRotation);

        this.viewMatrix.invert();
    }

    GetViewProjectionMatrix() 
    {
        return this.viewProjectionMatrix;
    }

    RecalculateViewProjectionMatrix() 
    {
        this.viewProjectionMatrix = weml.Mat4();
        this.viewProjectionMatrix.mul(this.projectionMatrix);
        this.viewProjectionMatrix.mul(this.viewMatrix);
    }

    GetPosition() 
    {
        return weml.Vec3(this.cameraPosition[0], this.cameraPosition[1], this.cameraPosition[2]);
    }

    SetPosition(x, y, z) 
    {
        this.cameraPosition[0] = x;
        this.cameraPosition[1] = y;
        this.cameraPosition[2] = z;

        this.SetView();
        this.RecalculateViewProjectionMatrix();
    }

    GetRotation() 
    {
        return this.cameraRotation;
    }

    SetRotation(angle) 
    {
        this.cameraRotation = angle;

        this.SetView();
        this.RecalculateViewProjectionMatrix();
    }
}