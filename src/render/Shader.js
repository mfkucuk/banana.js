import { initShadersFromHTML, initShadersFromFiles } from "../Common/initShaders.js"
import { gl } from "./WebGLContext.js"
import { MV } from "../math/MV.js"
import { Log } from "../core/Log.js"

// export const ShaderSource = 
// {
//     html: 0,
//     file: 1
// }

export class Shader
{
    constructor(source) 
    {        
        this.m_ShaderId = initShadersFromFiles(gl, source);        
        this.Bind();

        this.m_UniformLookupTable = {};
    }

    Bind() 
    {
        gl.useProgram(this.m_ShaderId);
    }

    Unbind() 
    {
        gl.useProgram(null);
    }

    GetAttributeLocation(attributeName) 
    {
        return gl.getAttribLocation(this.m_ShaderId, attributeName);
    }

    GetUniformLocation(uniformName) 
    {
        if (typeof this.m_UniformLookupTable[uniformName] != 'undefined') 
        {
            return this.m_UniformLookupTable[uniformName];
        }

        let uniformLoc = gl.getUniformLocation(this.m_ShaderId, uniformName);

        this.m_UniformLookupTable[uniformName] = uniformLoc;
        
        return uniformLoc;
    }

    SetUniformMatrix4fv(uniformName, value, transpose = false) 
    {
        const uniformLocation = this.GetUniformLocation(uniformName);

        gl.uniformMatrix4fv(uniformLocation, transpose, MV.flatten(value));
    }

    SetUniform4f(uniformName, value) 
    {
        const uniformLocation = this.GetUniformLocation(uniformName);

        gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
    }

    SetUniform1i(uniformName, value) 
    {
        const uniformLocation = this.GetUniformLocation(uniformName);

        gl.uniform1i(uniformLocation, value);
    }

    SetUniform1iv(uniformName, value) 
    {
        const uniformLocation = this.GetUniformLocation(uniformName);

        gl.uniform1iv(uniformLocation, value);
    }

    SetCamera(camera) 
    {
        this.SetUniformMatrix4fv("u_ViewProjectionMatrix", camera.GetViewProjectionMatrix());
    }

    UseTexture(unit) 
    {
        this.SetUniform1i('u_Texture', unit);

        //Log.Core_Info(`Current texture: ${unit}`);
    }

}

export class ShaderLibrary 
{
    constructor() 
    {
        this.m_ShaderDict = {};
    }

    AddShader(name, shader) 
    {
        this.m_ShaderDict[name] = shader;
    }

    LoadShader(name, shaderSrc) 
    {
        this.m_ShaderDict[name] = new Shader(shaderSrc);
    }

    GetShader(name) 
    {
        if (typeof this.m_ShaderDict[name] == 'undefined') 
        {
            Log.Core_Error(`Shader ${name} could not be found!`);
            return null;
        }

        return this.m_ShaderDict[name];
    }
}

