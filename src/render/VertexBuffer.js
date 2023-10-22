import { Utils } from "../Common/MV.js";
import { gl } from "../core/Window.js"

function VertexBufferAttribute(location, count, normalized) 
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
            this.m_Data = data;
            this.Bind();

            // attribute related properties
            this.m_Offset = 0;
            this.m_Stride = 0;
            this.m_Attributes = [];
    }


    Bind = function()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.m_BufferId);
        gl.bufferData(gl.ARRAY_BUFFER, Utils.flatten(this.m_Data), gl.STATIC_DRAW);
    }

    Unbind = function() 
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    AddVertex = function(...vertex)
    {
        if (vertex.length != this.GetAttributeCount()) 
        {
            return;
        }

        vertex.forEach(attribute => 
        {
            this.m_Data.push(attribute);
        });

        return this.m_Data.length / this.GetAttributeCount() - 1;
    }

    PushAttribute = function(attribLocation, count, normalized = false) 
    {
        this.m_Attributes.push(new VertexBufferAttribute(attribLocation, count, normalized));

        this.m_Stride += Utils.sizeof['gl.FLOAT'] * count;
    }

    LinkAttributes = function() 
    {
        this.m_Attributes.forEach(attribute => 
        {   
            gl.enableVertexAttribArray(attribute.location);
            gl.vertexAttribPointer(attribute.location, attribute.count, gl.FLOAT, attribute.normalized, this.m_Stride, this.m_Offset);

            this.m_Offset += Utils.sizeof['gl.FLOAT'] * attribute.count;
        });
    }

    GetAttributeCount = function() 
    {
        return this.m_Attributes.length;
    }
}