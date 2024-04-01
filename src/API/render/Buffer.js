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
        this.bufferId = gl.createBuffer();
        
        if (!Array.isArray(data)) 
        {
            this.data = new Float32Array( data );
            this.usage = gl.DYNAMIC_DRAW;
        }
        else 
        {
            this.data = data;
            this.usage = gl.STATIC_DRAW;
        }
        this.Bind();
        
        // attribute related properties
        this.offset = 0;
        this.stride = 0;
        this.attributes = [];
    }


    Bind()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, this.data, this.usage);
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
        for (let i = 0; i < vertex.length; i++) 
        {
            this.data[index * vertex.length + i] = vertex[i];
        }
    }

    PushAttribute(attribLocation, count, normalized = false) 
    {
        this.attributes.push(new VertexAttribute(attribLocation, count, normalized));

        this.stride += 4 * count;
    }

    LinkAttributes() 
    {
        this.attributes.forEach(attribute => 
        {   
            gl.enableVertexAttribArray(attribute.location);
            gl.vertexAttribPointer(attribute.location, attribute.count, gl.FLOAT, attribute.normalized, this.stride, this.offset);

            this.offset += 4 * attribute.count;
        });
    }

    GetAttributeCount() 
    {
        return this.attributes.length;
    }
}

export class IndexBuffer 
{
    constructor(data) 
    {
        this.bufferId = gl.createBuffer();
        this.data = data;
        this.Bind();
    }


    Bind() 
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
    }

    Unbind() 
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    AddIndex(indices) 
    {
        this.data.push(indices);
    }

    GetCount() 
    {
        return this.data.length;
    }
}