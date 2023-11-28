import { MV } from "../math/MV.js"

export class Transform2D
{
    constructor() 
    {
        this.m_Position = MV.vec3(0, 0, 0);
        this.m_Rotation = 0;
        this.m_Scale = MV.vec3(1, 1, 1);

        this.m_Pivot = MV.vec3(0, 0, 0);

        this.m_TransformMatrix = MV.mat4();
        this.UpdateTransform();
    }

    Get() 
    {
        return this.m_TransformMatrix;
    }

    Copy(matrix) 
    {
        let copy = MV.mat4();
        copy = MV.mult(copy, matrix);
        this.m_TransformMatrix = copy;
    }

    UpdateTransform() 
    {
        this.m_TransformMatrix = MV.translate(this.m_Position);

        this.m_TransformMatrix = MV.mult(this.m_TransformMatrix, MV.translate(MV.negate(this.m_Pivot)));
        
        this.m_TransformMatrix = MV.mult(this.m_TransformMatrix, MV.rotate(this.m_Rotation, [0, 0, 1]));

        this.m_TransformMatrix = MV.mult(this.m_TransformMatrix, MV.translate(this.m_Pivot));

        this.m_TransformMatrix = MV.mult(this.m_TransformMatrix, MV.scale(this.m_Scale));
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

        this.UpdateTransform();
    }

    GetRotation() 
    {
        return this.m_Rotation;
    }

    SetRotation(angle) 
    {
        this.m_Rotation = angle;
        
        this.UpdateTransform();
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

        this.UpdateTransform();
    }

    SetPivot(x, y, z) 
    {
        this.m_Pivot[0] = x; 
        this.m_Pivot[1] = y; 
        this.m_Pivot[2] = z; 
    }
}