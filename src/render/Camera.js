import { Utils } from "../Common/MV.js";
import { canvas } from "../core/Window.js";

export class Camera
{
    constructor() 
    {
        this.m_ViewMatrix;
        this.m_ProjectionMatrix;  
        
        this.m_CameraPosition = Utils.vec3(0.0, 0.0, 0.0);

        this.SetViewMatrix();
        this.SetOrthographicProjectionMatrix(0, canvas.width, 0, canvas.height, -1, 1);
    }

    SetViewMatrix = function() 
    {
        this.m_ViewMatrix = Utils.translate(this.m_CameraPosition);
    }

    SetOrthographicProjectionMatrix = function(x1, x2, y1, y2, z1, z2) 
    {
        this.m_ProjectionMatrix = Utils.ortho(x1, x2, y1, y2, z1, z2);
    }

    SetPerspectiveProjectionMatrix = function(fovy, aspect, near, far) 
    {
        this.m_ProjectionMatrix = Utils.perspective(fovy, aspect, near, far);
    }

    GetMVPMatrix = function() 
    {
        return Utils.mult(this.m_ProjectionMatrix, this.m_ViewMatrix);
    }
}