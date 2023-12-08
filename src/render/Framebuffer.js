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
        this.m_Spec = spec;

        this.Invalidate();
    }

    Invalidate() 
    {
        this.m_FramebufferId = gl.createFramebuffer();

        this.Bind();
        
        this.m_ColorAttachment = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.m_ColorAttachment);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_Spec.Width, this.m_Spec.Height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.m_ColorAttachment, 0);

        if (!gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE) 
        {
            Log.Core_Error('Framebuffer is incomplete!');
        }
        
        this.Unbind();
    }

    Bind() 
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_FramebufferId);
    }

    Unbind() 
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    GetColorAttachmentId() 
    {
        return this.m_ColorAttachment;
    }
}