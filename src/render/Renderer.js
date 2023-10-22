import { Utils } from '../Common/MV.js'
import { VertexBuffer } from './VertexBuffer.js'
import { IndexBuffer } from './IndexBuffer.js'
import { Shader } from './Shader.js'
import { Camera } from './Camera.js'
import { Color } from './Color.js'
import { gl } from '../core/Window.js'
import { canvas } from '../core/Window.js'

export class Renderer 
{
    constructor() 
    {
        this.m_Shader;
        this.m_VertexBuffer;
        this.m_IndexBuffer;
        this.m_Camera;

        gl.viewport( 0, 0, canvas.width, canvas.height );
        gl.clearColor( 0.7, 0.7, 0.7, 1.0 );

        this.m_Shader = new Shader('vertex-shader', 'fragment-shader');
        this.m_Camera = new Camera();
        this.m_IndexBuffer = new IndexBuffer([]);
        this.m_VertexBuffer = new VertexBuffer([]);

        let aPosition = this.m_Shader.GetAttributeLocation('a_Position');
        let aColor = this.m_Shader.GetAttributeLocation('a_Color');

        this.m_VertexBuffer.PushAttribute(aPosition, 2);
        this.m_VertexBuffer.PushAttribute(aColor, 4);
        this.m_VertexBuffer.LinkAttributes();

        this.m_Shader.SetCamera(this.m_Camera);
    }

    /**
     * Clears the canvas.
     */
    Clear = function() 
    {
        gl.clear( gl.COLOR_BUFFER_BIT );
    }

    DrawTriangle = function(x1, y1, x2, y2, x3, y3) 
    {
        let indices = Utils.vec3();

        indices[0] = this.m_VertexBuffer.AddVertex(Utils.vec2(x1, y1), Color.BLACK);
        indices[1] = this.m_VertexBuffer.AddVertex(Utils.vec2(x2, y2), Color.BLACK);
        indices[2] = this.m_VertexBuffer.AddVertex(Utils.vec2(x3, y3), Color.BLACK);

        this.m_IndexBuffer.AddIndex(indices);
    }

    /**
     * Adds the information to the vertex and index buffers to render a rectangle.
     * @param {number} x is the x coordinate of upper-left of the rectangle.
     * @param {number} y is the y coordinate of upper-left of the rectangle.
     * @param {number} w is the width of the rectangle.
     * @param {number} h is the height of the rectangle.
     */
    DrawRectangle = function(x, y, w, h) 
    {
        let indexOfFirstVertex;

        indexOfFirstVertex = this.m_VertexBuffer.AddVertex(Utils.vec2(x, y), Color.BLACK);
        this.m_VertexBuffer.AddVertex(Utils.vec2(x + w, y), Color.BLACK);
        this.m_VertexBuffer.AddVertex(Utils.vec2(x, y + h), Color.BLACK);
        this.m_VertexBuffer.AddVertex(Utils.vec2(x + w, y + h), Color.BLACK);

        this.m_IndexBuffer.AddIndex(Utils.vec3(indexOfFirstVertex, indexOfFirstVertex + 1, indexOfFirstVertex + 2));
        this.m_IndexBuffer.AddIndex(Utils.vec3(indexOfFirstVertex + 1, indexOfFirstVertex + 2, indexOfFirstVertex + 3));
    }

    /**
     * This function flushes (clears) both the vertex and the index buffers.
     * Flushed vertices and indices are rendered.
     */
    Flush = function() 
    {
        this.m_Shader.Bind();
        this.m_VertexBuffer.Bind();
        this.m_IndexBuffer.Bind();
        
        this.Clear();
        gl.drawElements(gl.TRIANGLES, this.m_IndexBuffer.GetCount(), gl.UNSIGNED_BYTE, 0);

        this.m_Shader.Unbind();
        this.m_VertexBuffer.Unbind();
        this.m_IndexBuffer.Unbind();
    }
}