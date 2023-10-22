import { initShaders } from "../Common/initShaders.js";
import { gl } from "../core/Window.js";
import { Utils } from "../Common/MV.js";

export class Shader
{
    constructor(vertex, fragment) 
    {
        this.m_ShaderId = initShaders(gl, vertex, fragment);
        this.Bind();
    }

    Bind = function() 
    {
        gl.useProgram(this.m_ShaderId);
    }

    Unbind = function() 
    {
        gl.useProgram(null);
    }

    GetAttributeLocation = function(attributeName) 
    {
        return gl.getAttribLocation(this.m_ShaderId, attributeName);
    }

    GetUniformLocation = function(uniformName) 
    {
        return gl.getUniformLocation(this.m_ShaderId, uniformName);
    }

    SetUniformMatrix4fv = function(uniformName, value, transpose = false) 
    {
        const uniformLocation = this.GetUniformLocation(uniformName);

        gl.uniformMatrix4fv(uniformLocation, transpose, Utils.flatten(value));
    }

    SetCamera = function(camera) 
    {
        this.SetUniformMatrix4fv("u_MVP", camera.GetMVPMatrix());
    }
}