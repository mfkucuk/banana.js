import { gl } from "./WebGLContext.js"

export class Renderer 
{
    static s_SceneData = {};

    static BeginScene(camera) 
    {
        Renderer.s_SceneData.camera = camera;
    }

    static EndScene() 
    {

    }
    
    /**
     * This function flushes (clears) both the vertex and the index buffers.
     * Flushed vertices and indices are rendered.
     */
    static Flush(vb, ib, shader, transform = MV.mat4()) 
    {
        vb.Bind();
        ib.Bind();
        shader.Bind();
        shader.SetCamera(Renderer.s_SceneData.camera);
        shader.SetUniformMatrix4fv('u_Transform', transform);
        
        gl.drawElements(gl.TRIANGLES, ib.GetCount(), gl.UNSIGNED_BYTE, 0);

        vb.Unbind();
        ib.Unbind();
        shader.Unbind();
    }
}