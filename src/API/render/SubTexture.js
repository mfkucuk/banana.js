import * as weml from '../ext/weml.js/weml.js'
import { Renderer2D } from './Renderer2D.js'

const defaultTexCoords = [weml.Vec2(0, 0), weml.Vec2(1, 0), weml.Vec2(0, 1), weml.Vec2(1, 1)];

export class SubTexture 
{
    constructor(spriteSheet, coords, cellSize, spriteSize = weml.Vec2(1, 1)) 
    {
        this.m_SpriteSheet = spriteSheet;
        this.m_SpriteSheetCoords = coords;
        this.m_CellSize = cellSize;
        this.m_SpriteSize = spriteSize;

        this.OnTextureLoad = this.OnTextureLoad.bind(this);

        if (this.m_SpriteSheet.IsLoaded()) 
        {
            this.OnTextureLoad();
            return;
        }

        this.m_SpriteSheet.GetImage().addEventListener('load', this.OnTextureLoad);
    }

    OnTextureLoad() 
    {
        const min = weml.Vec2((this.m_SpriteSheetCoords[0] * this.m_CellSize[0]) / this.m_SpriteSheet.GetWidth(),
                              (this.m_SpriteSheetCoords[1] * this.m_CellSize[1]) / this.m_SpriteSheet.GetHeight());
    
        const max = weml.Vec2(((this.m_SpriteSheetCoords[0] + this.m_SpriteSize[0]) * this.m_CellSize[0]) / this.m_SpriteSheet.GetWidth(),
                              ((this.m_SpriteSheetCoords[1] + this.m_SpriteSize[1]) * this.m_CellSize[1]) / this.m_SpriteSheet.GetHeight());

        this.m_TexCoords = [
            weml.Vec2(min[0], min[1]),
            weml.Vec2(max[0], min[1]),
            weml.Vec2(min[0], max[1]),
            weml.Vec2(max[0], max[1])
        ];

        this.m_SpriteSheet.m_Image.removeEventListener('load', this.OnTextureLoad);
    }

    GetTexCoords() 
    {
        if (typeof this.m_TexCoords == 'undefined') 
        {
            return defaultTexCoords;
        }

        return this.m_TexCoords;
    }

    GetTexture() 
    {
        if (typeof this.m_SpriteSheet == 'undefined') 
        {
            return Renderer2D.Black_Texture;
        }

        return this.m_SpriteSheet;
    }
}