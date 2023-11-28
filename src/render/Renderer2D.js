import { MV } from "../math/MV.js"
import { Log } from "../core/Log.js"
import { IndexBuffer, VertexBuffer } from "./Buffer.js"
import { Color } from "./Color.js"
import { Shader } from "./Shader.js"
import { Texture } from "./Texture.js"
import { gl } from "./WebGLContext.js"

let PrimitiveData = 
{
    MaxQuads: 10000,
    MaxVertices: 40000,
    MaxIndices: 60000, 

    DefaultQuadSize: 100,

    QuadVertexCount: 0,
    QuadIndexCount: 0
};

function QuadVertex() 
{
    this.Position;
    this.TexCoord;
    this.Color;

    this.Flat = function() 
    {
        return [this.Position, this.TexCoord, this.Color];
    }
}

export class Renderer2D 
{
    static Black_Texture;

    static Init() 
    {
        Renderer2D.Black_Texture = new Texture();

        PrimitiveData.BasicShader = new Shader('/sandbox/assets/shader/basic.glsl');

        let quadIndices = [];

        let offset = 0;
        for (let i = 0; i < PrimitiveData.MaxIndices; i += 6) 
        {
            quadIndices[i + 0] = offset + 0;
            quadIndices[i + 1] = offset + 1;
            quadIndices[i + 2] = offset + 2;

            quadIndices[i + 3] = offset + 1;
            quadIndices[i + 4] = offset + 2;
            quadIndices[i + 5] = offset + 3;

            offset += 4;
        }

        PrimitiveData.QuadVertexBuffer = new VertexBuffer();
        PrimitiveData.QuadIndexBuffer = new IndexBuffer(quadIndices);

        const aPosition = PrimitiveData.BasicShader.GetAttributeLocation('a_Position');
        const aTexCoord = PrimitiveData.BasicShader.GetAttributeLocation('a_TexCoord');
        const aColor = PrimitiveData.BasicShader.GetAttributeLocation('a_Color');

        PrimitiveData.QuadVertexBuffer.PushAttribute(aPosition, 3);
        PrimitiveData.QuadVertexBuffer.PushAttribute(aTexCoord, 2);
        PrimitiveData.QuadVertexBuffer.PushAttribute(aColor, 4);
        PrimitiveData.QuadVertexBuffer.LinkAttributes();
    }

    static BeginScene(ortographicCamera) 
    {
        PrimitiveData.QuadIndexCount = 0;
        PrimitiveData.QuadVertexCount = 0;
        
        PrimitiveData.BasicShader.Bind();
        PrimitiveData.BasicShader.SetCamera(ortographicCamera);
    }

    static EndScene() 
    {
        PrimitiveData.QuadVertexBuffer.Bind();
        PrimitiveData.QuadIndexBuffer.Bind();

        Renderer2D.Flush();
    }

    static Flush() 
    {
        gl.drawElements(gl.TRIANGLES, PrimitiveData.QuadIndexCount, gl.UNSIGNED_BYTE, 0);
    }

    static DrawColoredQuad(transform, color)  
    {
        let v1 = new QuadVertex();
        v1.Position = MV.vec3(transform.GetPosition()[0], transform.GetPosition()[1], transform.GetPosition()[2]);
        v1.TexCoord = MV.vec2(0, 0);
        v1.Color = color;
        PrimitiveData.QuadVertexBuffer.AddVertex(PrimitiveData.QuadVertexCount, v1.Flat());
        PrimitiveData.QuadVertexCount++;

        let v2 = new QuadVertex();
        v2.Position = MV.vec3(transform.GetPosition()[0] + PrimitiveData.DefaultQuadSize * transform.GetScale()[0], transform.GetPosition()[1], transform.GetPosition()[2]);
        v2.TexCoord = MV.vec2(1, 0);
        v2.Color = color;
        PrimitiveData.QuadVertexBuffer.AddVertex(PrimitiveData.QuadVertexCount, v2.Flat());
        PrimitiveData.QuadVertexCount++;

        let v3 = new QuadVertex();
        v3.Position = MV.vec3(transform.GetPosition()[0], transform.GetPosition()[1] + PrimitiveData.DefaultQuadSize * transform.GetScale()[1], transform.GetPosition()[2]);
        v3.TexCoord = MV.vec2(0, 1);
        v3.Color = color;
        PrimitiveData.QuadVertexBuffer.AddVertex(PrimitiveData.QuadVertexCount, v3.Flat());
        PrimitiveData.QuadVertexCount++;

        let v4 = new QuadVertex();
        v4.Position = MV.vec3(transform.GetPosition()[0] + PrimitiveData.DefaultQuadSize * transform.GetScale()[0], transform.GetPosition()[1] + PrimitiveData.DefaultQuadSize * transform.GetScale()[1], transform.GetPosition()[2]);
        v4.TexCoord = MV.vec2(1, 1);
        v4.Color = color;
        PrimitiveData.QuadVertexBuffer.AddVertex(PrimitiveData.QuadVertexCount, v4.Flat());
        PrimitiveData.QuadVertexCount++;
        
        PrimitiveData.QuadIndexCount += 6;
    }

    static DrawTexturedQuad(transform, texture) 
    {
        PrimitiveData.QuadVertexBuffer.Bind();
        PrimitiveData.QuadIndexBuffer.Bind();
        texture.Bind(0);

        PrimitiveData.BasicShader.SetUniformMatrix4fv('u_Transform', transform.Get());
        PrimitiveData.BasicShader.SetUniform4f('u_Color', Color.TRANSPARENT);
        PrimitiveData.BasicShader.UseTexture(0);

        gl.drawElements(gl.TRIANGLES, PrimitiveData.QuadIndexBuffer.GetCount(), gl.UNSIGNED_BYTE, 0);
    }

    static DrawColoredRotatedQuad(transform, color)  
    {
        PrimitiveData.QuadVertexBuffer.Bind();
        PrimitiveData.QuadIndexBuffer.Bind();
        Renderer2D.Black_Texture.Bind(0);

        PrimitiveData.BasicShader.SetUniformMatrix4fv('u_Transform', transform.Get());
        PrimitiveData.BasicShader.SetUniform4f('u_Color', color);
        PrimitiveData.BasicShader.UseTexture(0);

        gl.drawElements(gl.TRIANGLES, PrimitiveData.QuadIndexBuffer.GetCount(), gl.UNSIGNED_BYTE, 0);
    }

    static DrawTexturedRotatedQuad(transform, texture) 
    {
        PrimitiveData.QuadVertexBuffer.Bind();
        PrimitiveData.QuadIndexBuffer.Bind();
        texture.Bind(0);

        PrimitiveData.BasicShader.SetUniformMatrix4fv('u_Transform', transform.Get());
        PrimitiveData.BasicShader.SetUniform4f('u_Color', Color.TRANSPARENT);
        PrimitiveData.BasicShader.UseTexture(0);

        gl.drawElements(gl.TRIANGLES, PrimitiveData.QuadIndexBuffer.GetCount(), gl.UNSIGNED_BYTE, 0);
    }

}