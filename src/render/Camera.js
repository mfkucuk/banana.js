import { canvas } from '../core/Window.js'
import { Log } from '../core/Log.js'
import * as weml from '../ext/weml.js/weml.js'

const CameraType = 
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
    }

    SetOrthographic(x1, x2, y1, y2, z1, z2)
    {
        this.m_ProjectionMatrix.setOrtho(x1, x2, y1, y2, z1, z2);
    }

    SetPerspective(fovy, aspect, near, far) 
    {
        this.m_ProjectionMatrix.setPerspective(fovy, aspect, near, far);
    }

    GetViewProjectionMatrix() 
    {
        return this.m_ProjectionMatrix;
    }
}

export class SceneCamera extends Camera
{
    constructor() 
    {
        super();
    }
}

export class EditorCamera extends Camera
{
    constructor(x1, x2, y1, y2, z1, z2) 
    {
        super();

        this.m_ViewMatrix = weml.Mat4();
        this.m_ViewProjectionMatrix = weml.Mat4();
        
        this.m_CameraPosition = weml.Vec3(0, 0, 0);
        this.m_CameraRotation = 0;

        this.SetView();
        this.SetOrthographic(x1, x2, y1, y2, z1, z2);
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