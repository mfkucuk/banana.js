import { WebGLUtils } from '../Common/webgl-utils.js'
import { Log } from "../core/Log.js"

export let gl;

export class WebGLContext 
{
    constructor(canvas) 
    {
        gl = canvas.getContext('webgl2');
        if ( !gl ) 
        { 
            Log.Core_Error('WebGL isn\'t available'); 
        }
        else 
        {
            gl.viewport( 0, 0, canvas.width, canvas.height );

            this.m_MaxTextureCount = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

            //gl.enable(gl.CULL_FACE);
            //gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            Log.Core_Info(`WebGL Renderer:
                    Vendor: ${gl.getParameter(gl.VENDOR)}
                    Renderer: ${gl.getParameter(gl.RENDERER)}
                    Version: ${gl.getParameter(gl.VERSION)}
                    Shading Language Version: ${gl.getParameter(gl.SHADING_LANGUAGE_VERSION)}`);
        }
    }
}