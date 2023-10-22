import { Utils } from "../Common/MV.js"
import { gl } from "../core/Window.js"

export class IndexBuffer 
{
    constructor(data) 
    {
        this.m_BufferId = gl.createBuffer();
        this.m_Data = data;
        this.Bind();
    }


    Bind = function() 
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_BufferId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Utils.flatten(this.m_Data, true), gl.STATIC_DRAW);
    }

    Unbind = function() 
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    AddIndex = function(indices) 
    {
        this.m_Data.push(indices);
    }

    GetCount = function() 
    {
        return this.m_Data.length * 3;
    }
}