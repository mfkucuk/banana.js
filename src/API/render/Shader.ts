import { initShadersFromHTML, initShadersFromFiles } from "./initShaders.ts"
import { gl } from "./WebGLContext.ts"
import { Log } from "../core/Log.ts"

// export const ShaderSource = 
// {
//     html: 0,
//     file: 1
// }

export class Shader {
    shaderId: number;
    uniformLookupTable: Object;

    constructor(source: string) {        
        this.shaderId = initShadersFromFiles(gl, source);        
        this.bind();

        this.uniformLookupTable = {};
    }

    bind() {
        gl.useProgram(this.shaderId);
    }

    unbind() {
        gl.useProgram(null);
    }

    getAttributeLocation(attributeName) {
        return gl.getAttribLocation(this.shaderId, attributeName);
    }

    getUniformLocation(uniformName) {
        if (typeof this.uniformLookupTable[uniformName] != 'undefined') {
            return this.uniformLookupTable[uniformName];
        }

        let uniformLoc = gl.getUniformLocation(this.shaderId, uniformName);

        this.uniformLookupTable[uniformName] = uniformLoc;
        
        return uniformLoc;
    }

    setUniformMatrix4fv(uniformName, value, transpose = false) {
        const uniformLocation = this.getUniformLocation(uniformName);

        gl.uniformMatrix4fv(uniformLocation, transpose, value);
    }

    setUniform4f(uniformName, value) {
        const uniformLocation = this.getUniformLocation(uniformName);

        gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
    }

    setUniform1i(uniformName, value) {
        const uniformLocation = this.getUniformLocation(uniformName);

        gl.uniform1i(uniformLocation, value);
    }

    setUniform1iv(uniformName, value) {
        const uniformLocation = this.getUniformLocation(uniformName);

        gl.uniform1iv(uniformLocation, value);
    }

    UseTexture(unit) {
        this.setUniform1i('u_Texture', unit);

        //Log.Core_Info(`Current texture: ${unit}`);
    }

}

export class ShaderLibrary {

    shaderDict: Object;

    constructor() {
        this.shaderDict = {};
    }

    addShader(name: string, shader: Shader) {
        this.shaderDict[name] = shader;
    }

    loadShader(name: string, shaderSrc: string) {
        this.shaderDict[name] = new Shader(shaderSrc);
    }

    getShader(name: string) {
        if (typeof this.shaderDict[name] == 'undefined') {
            Log.Core_Error(`Shader ${name} could not be found!`);
            return null;
        }

        return this.shaderDict[name];
    }
}

