import { Log } from "../core/Log.js"
import { IndexBuffer, VertexBuffer } from "./Buffer.js"
import { Color } from "./Color.js"
import { Shader } from "./Shader.js"
import { Texture } from "./Texture.js"
import { gl } from "./WebGLContext.js"
import * as weml from '../ext/weml.js/weml.js'

function Render2DData()
{
};
Render2DData.MaxQuads = 10000;
Render2DData.MaxVertices = Render2DData.MaxQuads * 4;
Render2DData.MaxIndices = Render2DData.MaxQuads * 6; 

Render2DData.QuadVertexPositions = [
    weml.Vec4(-50, -50, 0, 1),
    weml.Vec4(50, -50, 0, 1),
    weml.Vec4(-50, 50, 0, 1),
    weml.Vec4(50, 50, 0, 1)
];

Render2DData.QuadVertexCount = 0;
Render2DData.QuadIndexCount = 0;

Render2DData.MaxTextureSlots = 16;
Render2DData.TextureSlotIndex = 1;
Render2DData.TextureSlots = [];

function QuadVertex() 
{

    this.Position; // 4
    this.TexCoord; // 2
    this.TexIndex; // 1
    this.Color;    // 4
    this.Translation; // 3
    this.Rotation; // 1
    this.Scaling; // 3

    this.Flat = function() 
    {
        let flatArray = [];

        flatArray[0] = this.Position[0];
        flatArray[1] = this.Position[1];
        flatArray[2] = this.Position[2];
        flatArray[3] = this.Position[3];

        flatArray[4] = this.TexCoord[0];
        flatArray[5] = this.TexCoord[1];

        flatArray[6] = this.TexIndex;

        flatArray[7] = this.Color[0];
        flatArray[8] = this.Color[1];
        flatArray[9] = this.Color[2];
        flatArray[10] = this.Color[3];

        flatArray[11] = this.Translation[0];
        flatArray[12] = this.Translation[1];
        flatArray[13] = this.Translation[2];

        flatArray[14] = this.Rotation;

        flatArray[15] = this.Scaling[0];
        flatArray[16] = this.Scaling[1];
        flatArray[17] = this.Scaling[2];

        return flatArray;
    }

}

QuadVertex.VertexSize = 18;

export class Renderer2D 
{
    static Black_Texture;
    static Stats = {
        BatchCount: 0,
        QuadCount: 0,

        GetTotalTriangleCount : function() 
        {
            return this.QuadCount * 2;
        },

        GetTotalVertexCount : function() 
        {
            return this.QuadCount * 4;
        },

        GetTotalIndexCount : function() 
        {
            return this.QuadCount * 6;
        }
    }
    
    static Init() 
    {
        Renderer2D.Black_Texture = new Texture();

        Render2DData.BasicShader = new Shader('/sandbox/assets/shader/basic.glsl');

        let quadIndices = new Uint16Array( Render2DData.MaxIndices );

        let offset = 0;
        for (let i = 0; i < Render2DData.MaxIndices; i += 6) 
        {
            quadIndices[i + 0] = offset + 0;
            quadIndices[i + 1] = offset + 1;
            quadIndices[i + 2] = offset + 2;

            quadIndices[i + 3] = offset + 1;
            quadIndices[i + 4] = offset + 2;
            quadIndices[i + 5] = offset + 3;

            offset += 4;
        }

        Render2DData.QuadVertexBuffer = new VertexBuffer(Render2DData.MaxVertices * QuadVertex.VertexSize);
        Render2DData.QuadIndexBuffer = new IndexBuffer(quadIndices);

        const aPosition = Render2DData.BasicShader.GetAttributeLocation('a_Position');
        const aTexCoord = Render2DData.BasicShader.GetAttributeLocation('a_TexCoord');
        const aTexIndex = Render2DData.BasicShader.GetAttributeLocation('a_TexIndex');
        const aColor = Render2DData.BasicShader.GetAttributeLocation('a_Color');
        const aTranslation = Render2DData.BasicShader.GetAttributeLocation('a_Translation');
        const aRotation = Render2DData.BasicShader.GetAttributeLocation('a_Rotation');
        const aScaling = Render2DData.BasicShader.GetAttributeLocation('a_Scaling');

        Render2DData.QuadVertexBuffer.PushAttribute(aPosition, 4);
        Render2DData.QuadVertexBuffer.PushAttribute(aTexCoord, 2);
        Render2DData.QuadVertexBuffer.PushAttribute(aTexIndex, 1);
        Render2DData.QuadVertexBuffer.PushAttribute(aColor, 4);
        Render2DData.QuadVertexBuffer.PushAttribute(aTranslation, 3);
        Render2DData.QuadVertexBuffer.PushAttribute(aRotation, 1);
        Render2DData.QuadVertexBuffer.PushAttribute(aScaling, 3);
        Render2DData.QuadVertexBuffer.LinkAttributes();

        let samplers = [];
        for (let i = 0; i < Render2DData.MaxTextureSlots; i++) 
        {
            samplers[i] = i;
        }

        Render2DData.BasicShader.SetUniform1iv('u_Textures', samplers);

        Render2DData.TextureSlots[0] = Renderer2D.Black_Texture;
    }

    static BeginScene(ortographicCamera) 
    {
        Renderer2D.NewBatch();
        
        Render2DData.BasicShader.Bind();
        Render2DData.BasicShader.SetCamera(ortographicCamera);
    }

    static EndScene() 
    {        
        Renderer2D.Flush();
    }

    static Flush() 
    {
        Render2DData.QuadVertexBuffer.Bind();
        Render2DData.QuadIndexBuffer.Bind();

        for (let i = 0; i < Render2DData.TextureSlotIndex; i++) 
        {
            Render2DData.TextureSlots[i].Bind(i);
        }

        gl.drawElements(gl.TRIANGLES, Render2DData.QuadIndexCount, gl.UNSIGNED_SHORT, 0);
        Renderer2D.Stats.BatchCount++;
    }

    static NewBatch() 
    {
        Render2DData.QuadIndexCount = 0;
        Render2DData.QuadVertexCount = 0;
        Render2DData.TextureSlotIndex = 1;
    }

    static DrawColoredQuad(transform, color)  
    {
        if (Render2DData.QuadIndexCount >= Render2DData.MaxIndices) 
        {
            Renderer2D.Flush();
            Renderer2D.NewBatch();
        }

        let v1 = new QuadVertex();
        v1.Position = Render2DData.QuadVertexPositions[0];
        v1.TexCoord = weml.Vec2(0, 0);
        v1.TexIndex = 0;
        v1.Color = color;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.Position = Render2DData.QuadVertexPositions[1];
        v1.TexCoord = weml.Vec2(1, 0);
        v1.TexIndex = 0;
        v1.Color = color;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.Position = Render2DData.QuadVertexPositions[2];
        v1.TexCoord = weml.Vec2(0, 1);
        v1.TexIndex = 0;
        v1.Color = color;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.Position = Render2DData.QuadVertexPositions[3];
        v1.TexCoord = weml.Vec2(1, 1);
        v1.TexIndex = 0;
        v1.Color = color;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;
        
        Render2DData.QuadIndexCount += 6;

        Renderer2D.Stats.QuadCount++;
    }

    static DrawTexturedQuad(transform, texture) 
    {
        if (Render2DData.QuadIndexCount >= Render2DData.MaxIndices) 
        {
            Renderer2D.Flush();
            Renderer2D.NewBatch();
        }

        let useTextureSlot = -1;

        for (let i = 0; i < Render2DData.TextureSlotIndex; i++) 
        {
            if (Render2DData.TextureSlots[i] == texture) 
            {
                useTextureSlot = i;
                break;
            }
        }

        if (useTextureSlot == -1) 
        {
            useTextureSlot = Render2DData.TextureSlotIndex;
            Render2DData.TextureSlots[Render2DData.TextureSlotIndex++] = texture;
        }

        if (Render2DData.TextureSlotIndex >= 16) 
        {
            Renderer2D.Flush();
            Renderer2D.NewBatch();
        }

        let v1 = new QuadVertex();
        v1.Position = Render2DData.QuadVertexPositions[0];
        v1.TexCoord = weml.Vec2(0, 0);
        v1.TexIndex = useTextureSlot;
        v1.Color = Color.TRANSPARENT;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.Position = Render2DData.QuadVertexPositions[1];
        v1.TexCoord = weml.Vec2(1, 0);
        v1.TexIndex = useTextureSlot;
        v1.Color = Color.TRANSPARENT;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.Position = Render2DData.QuadVertexPositions[2];
        v1.TexCoord = weml.Vec2(0, 1);
        v1.TexIndex = useTextureSlot;
        v1.Color = Color.TRANSPARENT;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.Position = Render2DData.QuadVertexPositions[3];
        v1.TexCoord = weml.Vec2(1, 1);
        v1.TexIndex = useTextureSlot;
        v1.Color = Color.TRANSPARENT;
        v1.Translation = transform.GetPosition();
        v1.Rotation = transform.GetRotation();
        v1.Scaling = transform.GetScale();
        Render2DData.QuadVertexBuffer.AddVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        Render2DData.QuadIndexCount += 6;

        Renderer2D.Stats.QuadCount++;
    }

    // following functions only exist within the engine, once the game is built they shouldn't be called
    static ResetStats() 
    {
        Renderer2D.Stats.BatchCount = 0;
        Renderer2D.Stats.QuadCount = 0;
    }
}