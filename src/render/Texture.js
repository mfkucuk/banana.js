import { Log } from "../core/Log.js"
import { gl } from "./WebGLContext.js"

export class Texture 
{
    constructor(src) 
    {
        this.m_TextureId = gl.createTexture();
        this.m_OnTextureLoad = function() {}
        this.Bind();
        

        // Fill the texture with a 1x1 black pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 255]));

        this.m_Width = 1;
        this.m_Height = 1;
            
        if (typeof src == 'undefined') 
        {
            return;
        }

        this.OnLoad = this.OnLoad.bind(this)
        
        this.m_Image = new Image();
        this.m_Image.src = src;
        this.m_Image.addEventListener('load', this.OnLoad);
        
        // error handling
        this.m_Image.addEventListener('error', (error) => {
            Log.Core_Error(`${error.type}: Loading image`);
            this.m_Image.removeEventListener('error', this);
        });
    }

    Bind(unit = 0) 
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this.m_TextureId);
    }

    Unbind() 
    {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    OnLoad() 
    {     
        this.Bind();

        this.m_Width = this.m_Image.width;
        this.m_Height = this.m_Height.height;
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.m_Image);
        // gl.generateMipmap(gl.TEXTURE_2D);

        Log.Core_Info(`Loaded texture with:
                    Width: ${this.m_Width}px
                    Height: ${this.m_Height}px
                    Source: ${this.m_Image.src}`);

        this.m_Image.removeEventListener('load', this.OnLoad);
        
        this.Unbind();
        this.m_OnTextureLoad();
    }

    GetWidth() 
    {
        return this.m_Width;
    }

    GetHeight() 
    {
        return this.m_Height;
    }
}