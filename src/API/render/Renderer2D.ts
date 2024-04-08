import { IndexBuffer, VertexBuffer } from "./Buffer.ts"
import { Color } from "./Color.ts"
import { Shader } from "./Shader.ts"
import { Texture } from "./Texture.ts"
import { gl } from "./WebGLContext.ts"
import { Mat4, Vec2, Vec4 } from "../math/MV.ts"

class Render2DData
{
    static MaxQuads = 10000;
    static MaxVertices = Render2DData.MaxQuads * 4;
    static MaxIndices = Render2DData.MaxQuads * 6; 
    static QuadVertexPositions = [
        new Vec4(-50, -50, 0, 1),
        new Vec4(50, -50, 0, 1),
        new Vec4(-50, 50, 0, 1),
        new Vec4(50, 50, 0, 1)
    ];
    static QuadVertexCount = 0;
    static QuadIndexCount = 0;
    
    static MaxTextureSlots = 16;
    static TextureSlotIndex = 1;
    static TextureSlots = [];

    static BasicShader = null;
    static QuadVertexBuffer = null;
    static QuadIndexBuffer = null;
};



function QuadVertex() 
{

    this.position = null; // 4
    this.texCoord = null; // 2
    this.texIndex = null; // 1
    this.color    = null;    // 4
    this.translation = null; // 3
    this.rotation = null; // 1
    this.scaling = null; // 3

    this.Flat = function() 
    {
        let flatArray = [];

        flatArray[0] = this.position.x;
        flatArray[1] = this.position.y;
        flatArray[2] = this.position.z;
        flatArray[3] = this.position.w;

        flatArray[4] = this.texCoord.x;
        flatArray[5] = this.texCoord.y;

        flatArray[6] = this.texIndex;

        flatArray[7] = this.color.x;
        flatArray[8] = this.color.y;
        flatArray[9] = this.color.z;
        flatArray[10] = this.color.w;

        flatArray[11] = this.translation.x;
        flatArray[12] = this.translation.y;
        flatArray[13] = this.translation.z;

        flatArray[14] = this.rotation.z;

        flatArray[15] = this.scaling.x;
        flatArray[16] = this.scaling.y;
        flatArray[17] = this.scaling.z;

        return flatArray;
    }

}

QuadVertex.VertexSize = 18;

export class Renderer2D 
{
    static White_Texture;
    static viewProj = new Mat4();
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
        Renderer2D.White_Texture = new Texture();

        Render2DData.BasicShader = new Shader('/shader/basic.glsl');

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

        const aPosition = Render2DData.BasicShader.getAttributeLocation('a_Position');
        const aTexCoord = Render2DData.BasicShader.getAttributeLocation('a_TexCoord');
        const aTexIndex = Render2DData.BasicShader.getAttributeLocation('a_TexIndex');
        const aColor = Render2DData.BasicShader.getAttributeLocation('a_Color');
        const aTranslation = Render2DData.BasicShader.getAttributeLocation('a_Translation');
        const aRotation = Render2DData.BasicShader.getAttributeLocation('a_Rotation');
        const aScaling = Render2DData.BasicShader.getAttributeLocation('a_Scaling');

        Render2DData.QuadVertexBuffer.pushAttribute(aPosition, 4);
        Render2DData.QuadVertexBuffer.pushAttribute(aTexCoord, 2);
        Render2DData.QuadVertexBuffer.pushAttribute(aTexIndex, 1);
        Render2DData.QuadVertexBuffer.pushAttribute(aColor, 4);
        Render2DData.QuadVertexBuffer.pushAttribute(aTranslation, 3);
        Render2DData.QuadVertexBuffer.pushAttribute(aRotation, 1);
        Render2DData.QuadVertexBuffer.pushAttribute(aScaling, 3);
        Render2DData.QuadVertexBuffer.linkAttributes();

        let samplers = [];
        for (let i = 0; i < Render2DData.MaxTextureSlots; i++) 
        {
            samplers[i] = i;
        }

        Render2DData.BasicShader.setUniform1iv('u_Textures', samplers);

        Render2DData.TextureSlots[0] = Renderer2D.White_Texture;
    }

    static BeginScene(camera, transform?: Mat4) 
    {
        Renderer2D.NewBatch();
        
        Render2DData.BasicShader.bind();

        if (typeof transform == 'undefined') 
        {
            Render2DData.BasicShader.setUniformMatrix4fv('u_ViewProjectionMatrix', camera.getViewProjectionMatrix().data);
        }
        else 
        {

            this.viewProj.identity();
            this.viewProj.mul(camera.getViewProjectionMatrix());
            this.viewProj.mul(transform.invert());
            Render2DData.BasicShader.setUniformMatrix4fv('u_ViewProjectionMatrix', this.viewProj);
        }

    }

    static EndScene() 
    {        
        Renderer2D.Flush();
    }

    static Flush() 
    {
        Render2DData.QuadVertexBuffer.bind();
        Render2DData.QuadIndexBuffer.bind();

        for (let i = 0; i < Render2DData.TextureSlotIndex; i++) 
        {
            Render2DData.TextureSlots[i].bind(i);
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

    static DrawColorQuad(transform, color)  
    {
        if (Render2DData.QuadIndexCount >= Render2DData.MaxIndices) 
        {
            Renderer2D.Flush();
            Renderer2D.NewBatch();
        }

        let v1 = new QuadVertex();
        v1.position = Render2DData.QuadVertexPositions[0];
        v1.texCoord = new Vec2(0, 0);
        v1.texIndex = 0;
        v1.color = color;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[1];
        v1.texCoord = new Vec2(1, 0);
        v1.texIndex = 0;
        v1.color = color;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[2];
        v1.texCoord = new Vec2(0, 1);
        v1.texIndex = 0;
        v1.color = color;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[3];
        v1.texCoord = new Vec2(1, 1);
        v1.texIndex = 0;
        v1.color = color;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;
        
        Render2DData.QuadIndexCount += 6;

        Renderer2D.Stats.QuadCount++;
    }

    static DrawTextureQuad(transform, texture) 
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
        v1.position = Render2DData.QuadVertexPositions[0];
        v1.texCoord = new Vec2(0, 0);
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[1];
        v1.texCoord = new Vec2(1, 0);
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[2];
        v1.texCoord = new Vec2(0, 1);
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[3];
        v1.texCoord = new Vec2(1, 1);
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        Render2DData.QuadIndexCount += 6;

        Renderer2D.Stats.QuadCount++;
    }

    static DrawSubTextureQuad(transform, subTexture) 
    {
        const texCoords = subTexture.getTexCoords();
        const texture = subTexture.getTexture();

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
        v1.position = Render2DData.QuadVertexPositions[0];
        v1.texCoord = texCoords[0];
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[1];
        v1.texCoord = texCoords[1];
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[2];
        v1.texCoord = texCoords[2];
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
        Render2DData.QuadVertexCount++;

        v1.position = Render2DData.QuadVertexPositions[3];
        v1.texCoord = texCoords[3];
        v1.texIndex = useTextureSlot;
        v1.color = Color.TRANSPARENT;
        v1.translation = transform.getPosition();
        v1.rotation = transform.getRotation();
        v1.scaling = transform.getScale();
        Render2DData.QuadVertexBuffer.addVertex(Render2DData.QuadVertexCount, v1.Flat());
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