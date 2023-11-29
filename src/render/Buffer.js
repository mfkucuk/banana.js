import { MV } from "../math/MV.js";
import { gl } from "./WebGLContext.js"

function VertexAttribute(location, count, normalized) 
{
    this.location = location;
    this.count = count;
    this.normalized = normalized;
}

export class VertexBuffer 
{

    constructor(data) 
    {
        this.m_BufferId = gl.createBuffer();
        
        if (typeof data == 'undefined') 
        {
            this.m_Data = [];
            this.m_Usage = gl.DYNAMIC_DRAW;
        }
        else 
        {
            this.m_Data = data;
            this.m_Usage = gl.STATIC_DRAW;
        }
        this.Bind();
        
        // attribute related properties
        this.m_Offset = 0;
        this.m_Stride = 0;
        this.m_Attributes = [];
    }


    Bind()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.m_BufferId);
        gl.bufferData(gl.ARRAY_BUFFER, MV.flatten(this.m_Data), this.m_Usage);
    }

    Unbind() 
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    SetData() 
    {
    }

    AddVertex(index, vertex)
    {
        if (vertex.length != this.GetAttributeCount()) 
        {
            return;
        }

        for (let i = 0; i < vertex.length; i++) 
        {
            this.m_Data[index * vertex.length + i] = vertex[i];
        }
    }

    PushAttribute(attribLocation, count, normalized = false) 
    {
        this.m_Attributes.push(new VertexAttribute(attribLocation, count, normalized));

        this.m_Stride += MV.sizeof['gl.FLOAT'] * count;
    }

    LinkAttributes() 
    {
        this.m_Attributes.forEach(attribute => 
        {   
            gl.enableVertexAttribArray(attribute.location);
            gl.vertexAttribPointer(attribute.location, attribute.count, gl.FLOAT, attribute.normalized, this.m_Stride, this.m_Offset);

            this.m_Offset += MV.sizeof['gl.FLOAT'] * attribute.count;
        });
    }

    GetAttributeCount() 
    {
        return this.m_Attributes.length;
    }
}

export class IndexBuffer 
{
    constructor(data) 
    {
        this.m_BufferId = gl.createBuffer();
        this.m_Data = data;
        this.Bind();
    }


    Bind() 
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_BufferId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, MV.flatten(this.m_Data, true), gl.STATIC_DRAW);
    }

    Unbind() 
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    AddIndex(indices) 
    {
        this.m_Data.push(indices);
    }

    GetCount() 
    {
        return this.m_Data.length * 3;
    }
}