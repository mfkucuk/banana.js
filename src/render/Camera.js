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
        this.m_ProjectionMatrix = weml.Mat4();  
    
        this.m_CameraType = CameraType.Orthographic;      
        this.m_AspectRatio = parseFloat(canvas.width) / parseFloat(canvas.height)
    }

    SetOrthographic(size, near, far)
    {
        this.m_CameraType = CameraType.Orthographic;

        this.m_Size = size;
        this.m_Near = near;
        this.m_Far = far;

        this.SetViewportSize();
    }

    SetPerspective(fovy, near, far) 
    {
        this.m_CameraType = CameraType.Perspective;

        this.m_ProjectionMatrix.setPerspective(weml.weml.toRadians(fovy), this.m_AspectRatio, near, far);
        this.m_Size = fovy;
        this.m_Near = near;
        this.m_Far = far;
    }

    GetViewProjectionMatrix() 
    {
        return this.m_ProjectionMatrix;
    }

    GetCameraType() 
    {
        return this.m_CameraType;
    }

    SetViewportSize() 
    {
        let orthoLeft = -this.m_Size * this.m_AspectRatio * 0.5;
        let orthoRight = this.m_Size * this.m_AspectRatio * 0.5;
        let orthoBottom = this.m_Size * 0.5;
        let orthoTop = -this.m_Size * 0.5;

        this.m_ProjectionMatrix.setOrtho(orthoLeft, orthoRight, orthoBottom, orthoTop, this.m_Near, this.m_Far);
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
        this.m_AspectRatio = parseFloat(canvas.width) / parseFloat(canvas.height)
        this.SetViewportSize();

        return true;
    }
}

export class EditorCamera extends Camera
{
    constructor() 
    {
        super();

        this.m_ViewMatrix = weml.Mat4();
        this.m_ViewProjectionMatrix = weml.Mat4();
        
        this.m_CameraPosition = weml.Vec3(0, 0, 0);
        this.m_CameraRotation = 0;

        this.SetView();
        this.SetOrthographic(446, -1, 1);
        this.RecalculateViewProjectionMatrix();
    }

    SetView() 
    {
        this.m_ViewMatrix.setTranslationVec3(this.m_CameraPosition);

        this.m_ViewMatrix.applyRotationZ(this.m_CameraRotation);

        this.m_ViewMatrix.invert();
    }

    GetViewProjectionMatrix() 
    {
        return this.m_ViewProjectionMatrix;
    }

    RecalculateViewProjectionMatrix() 
    {
        this.m_ViewProjectionMatrix = weml.Mat4();
        this.m_ViewProjectionMatrix.mul(this.m_ProjectionMatrix);
        this.m_ViewProjectionMatrix.mul(this.m_ViewMatrix);
    }

    GetPosition() 
    {
        return weml.Vec3(this.m_CameraPosition[0], this.m_CameraPosition[1], this.m_CameraPosition[2]);
    }

    SetPosition(x, y, z) 
    {
        this.m_CameraPosition[0] = x;
        this.m_CameraPosition[1] = y;
        this.m_CameraPosition[2] = z;

        this.SetView();
        this.RecalculateViewProjectionMatrix();
    }

    GetRotation() 
    {
        return this.m_CameraRotation;
    }

    SetRotation(angle) 
    {
        this.m_CameraRotation = angle;

        this.SetView();
        this.RecalculateViewProjectionMatrix();
    }
}