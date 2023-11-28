import { MV } from "../math/MV.js";

class Camera
{
    constructor() 
    {
        this.m_ViewMatrix;
        this.m_ProjectionMatrix;  
        this.m_ViewProjectionMatrix;
        
        this.m_CameraPosition = MV.vec3(0.0, 0.0, 0.0);
        this.m_CameraRotation = 0;

        this.SetViewMatrix();
    }

    SetViewMatrix() 
    {
        this.m_ViewMatrix = MV.translate(this.m_CameraPosition);

        this.m_ViewMatrix = MV.mult(this.m_ViewMatrix, MV.rotate(this.m_CameraRotation, [0, 0, 1]));

        this.m_ViewMatrix = MV.inverse(this.m_ViewMatrix);
    }

    SetProjectionMatrix() { }

    RecalculateViewProjectionMatrix() 
    {
        this.m_ViewProjectionMatrix = MV.mult(this.m_ProjectionMatrix, this.m_ViewMatrix);
    }

    GetViewProjectionMatrix() 
    {
        return this.m_ViewProjectionMatrix;
    }

    GetPosition() 
    {
        return MV.vec3(this.m_CameraPosition[0], this.m_CameraPosition[1], this.m_CameraPosition[2]);
    }

    SetPosition(x, y, z) 
    {
        this.m_CameraPosition[0] = x;
        this.m_CameraPosition[1] = y;
        this.m_CameraPosition[2] = z;

        this.SetViewMatrix();
        this.RecalculateViewProjectionMatrix();
    }

    GetRotation() 
    {
        return this.m_CameraRotation;
    }

    SetRotation(angle) 
    {
        this.m_CameraRotation = angle;

        this.SetViewMatrix();
        this.RecalculateViewProjectionMatrix();
    }
}

export class OrthographicCamera extends Camera 
{
    constructor(x1, x2, y1, y2, z1, z2) 
    {
        super();

        this.SetProjectionMatrix(x1, x2, y1, y2, z1, z2);
        this.RecalculateViewProjectionMatrix();
    }

    SetProjectionMatrix(x1, x2, y1, y2, z1, z2)
    {
        this.m_ProjectionMatrix = MV.ortho(x1, x2, y1, y2, z1, z2);
    }
}

export class PerspectiveCamera extends Camera 
{
    constructor() 
    {
        super();

        //this.SetProjectionMatrix();
        this.RecalculateViewProjectionMatrix();
    }

    SetProjectionMatrix(fovy, aspect, near, far) 
    {
        this.m_ProjectionMatrix = MV.perspective(fovy, aspect, near, far);
    }
}