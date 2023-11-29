import { MV } from "../math/MV.js";
import { Transform2D } from "./Transform.js"

export class SceneGraphNode 
{
    constructor() 
    {
        this.m_LocalTransform = new Transform2D();
        this.m_WorldTransform = new Transform2D(true);

        this.m_Children = [];
        this.m_Parent;
    }

    GetLocalTransform() 
    {
        return this.m_LocalTransform;
    }

    GetWorldTransform() 
    {
        return this.m_WorldTransform;
    }

    AddChild(node) 
    {
        this.m_Children.push(node);
    }

    SetParent(node) 
    {
        if (this.m_Parent) 
        {
            let index = this.m_Parent.m_Children.indexOf(this);
            if (index >= 0) 
            {
                this.m_Parent.m_Children.splice(index, 1);
            }
        }

        if (node) 
        {
            node.AddChild(this);
        }

        this.m_Parent = node;
    }

    UpdateWorldTransform(parentWorldTransform) 
    {
        if (parentWorldTransform) 
        {
            this.m_WorldTransform.Copy( MV.mult(parentWorldTransform.Get(), this.m_LocalTransform.Get()));
        }
        else 
        {
            this.m_WorldTransform.Copy(this.m_LocalTransform.Get());
        }

        this.m_Children.forEach(child => {
            child.UpdateWorldTransform(this.m_WorldTransform);
        });
    }
}

export class SceneGraph 
{
    constructor() 
    {

    }
}