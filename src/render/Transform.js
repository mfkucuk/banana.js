import * as weml from '../ext/weml.js/weml.js'

export class Transform2D
{
    constructor(isWorld = false) 
    {
        this.m_Position = weml.Vec3(0, 0, 0);
        this.m_Rotation = 0;
        this.m_Scale = weml.Vec3(1, 1, 1);
        this.m_Pivot = weml.Vec3(0, 0, 0);
        this.m_TransformMatrix = weml.Mat4();

        
        this.m_IsWorld = isWorld;
    }

    Get() 
    {
        return this.m_TransformMatrix;
    }

    Copy(matrix) 
    {
        this.m_TransformMatrix = matrix.clone();
    }


    GetPosition() 
    {
        return this.m_Position;
    }

    SetPosition(x, y, z) 
    {
        this.m_Position[0] = x;
        this.m_Position[1] = y;
        this.m_Position[2] = z;
    }

    GetRotation() 
    {
        return this.m_Rotation;
    }

    SetRotation(angle) 
    {
        this.m_Rotation = angle;
    }

    GetScale() 
    {
        return this.m_Scale;
    }

    SetScale(x, y, z) 
    {
        this.m_Scale[0] = x;
        this.m_Scale[1] = y;
        this.m_Scale[2] = z;
    }

    SetPivot(x, y, z) 
    {
        this.m_Pivot[0] = x; 
        this.m_Pivot[1] = y; 
        this.m_Pivot[2] = z; 
    }

    static DecomposeMatrix(matrix) {
        var translation = [matrix[0][3], matrix[1][3], matrix[2][3]];

        var scaleX = Math.sqrt(matrix[0][0] * matrix[0][0] + matrix[0][1] * matrix[0][1] + matrix[0][2] * matrix[0][2]);
        var scaleY = Math.sqrt(matrix[1][0] * matrix[1][0] + matrix[1][1] * matrix[1][1] + matrix[1][2] * matrix[1][2]);
        var scaleZ = Math.sqrt(matrix[2][0] * matrix[2][0] + matrix[2][1] * matrix[2][1] + matrix[2][2] * matrix[2][2]);

        var zRotation = Math.atan2(matrix[1][0], matrix[0][0]) * (180 / Math.PI);

        return {
            translation: translation,
            scale: [scaleX, scaleY, scaleZ],
            rotation: zRotation
        };
    }
}