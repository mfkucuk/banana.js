import { gl } from "./WebGLContext.js"

export class RenderCommand 
{
    static SetViewport(width, height) 
    {
        gl.viewport(0, 0, width, height);
    }

    static SetClearColor(color) 
    {
        gl.clearColor(color[0], color[1], color[2], color[3]);
    }

    /**
     * Clears the canvas.
     */
    static Clear() 
    {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    }

}