import * as weml from '../ext/weml.js/weml.js'
import { Renderer2D } from './Renderer2D.js'

export class SubTexture 
{
    constructor(spriteSheet, min, max) 
    {
        this.m_SpriteSheet = spriteSheet;
        this.m_TexCoords = [
            weml.Vec2(min[0], min[1]),
            weml.Vec2(max[0], min[1]),
            weml.Vec2(min[0], max[1]),
            weml.Vec2(max[0], max[1])
        ];
    }

    static CreateFromCoords(spriteSheet, coords, spriteSize) 
    {
        spriteSheet.m_OnTextureLoad = function() 
        {
            const min = weml.Vec2(coords[0] * spriteSize[0] / spriteSheet.GetWidth(),
                                  coords[1] * spriteSize[1] / spriteSheet.GetHeight());
    
            const max = weml.Vec2((coords[0] + 1) * spriteSize[0] / spriteSheet.GetWidth(),
                                  (coords[1] + 1) * spriteSize[1] / spriteSheet.GetHeight());
    
            return new SubTexture(spriteSheet, min, max);
        }
    }

    GetTexCoords() 
    {
        if (typeof this.m_TexCoords == 'undefined') 
        {
            return [weml.Vec2(0, 0), weml.Vec2(1, 0), weml.Vec2(0, 1), weml.Vec2(1, 1)]
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