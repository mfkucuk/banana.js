import { Log } from "../core/Log.js"
import { gl } from "./WebGLContext.js"

export class Texture 
{
    constructor(src) 
    {
        this.m_TextureId = gl.createTexture();
        this.Bind();

        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 255]));

            
        if (typeof src == 'undefined') 
        {
            return;
        }

        this.LoadImage = this.LoadImage.bind(this)
        
        this.m_Image = new Image();
        this.m_Image.src = src;
        this.m_Image.addEventListener('load', this.LoadImage);
        
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

    LoadImage() 
    {
        this.Bind();
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.m_Image);
        // gl.generateMipmap(gl.TEXTURE_2D);

        this.Unbind();

        Log.Core_Info(`Loaded texture with:
                    Width: ${this.m_Image.width}px
                    Height: ${this.m_Image.height}px
                    Source: ${this.m_Image.src}`);

        this.m_Image.removeEventListener('load', this.LoadImage);
    }
}