import { Log } from "../core/Log.js"
import { gl } from "./WebGLContext.js"

export function FramebufferSpecification() 
{
    let Width, Height;

    let Samples = 1;

    let SwapChainTarget = false;
}

export class Framebuffer 
{
    constructor(spec) 
    {
        this.spec = spec;

        this.Invalidate();
    }

    Invalidate() 
    {
        this.framebufferId = gl.createFramebuffer();

        this.Bind();
        
        this.colorAttachment = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.colorAttachment);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.spec.Width, this.spec.Height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorAttachment, 0);

        if (!gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE) 
        {
            Log.Core_Error('Framebuffer is incomplete!');
        }
        
        this.Unbind();
    }

    Bind() 
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebufferId);
    }

    Unbind() 
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    GetColorAttachmentId() 
    {
        return this.colorAttachment;
    }
}