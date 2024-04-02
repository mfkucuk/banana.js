import * as weml from '../ext/weml.js/weml.js'
import { Renderer2D } from './Renderer2D.js'

const defaultTexCoords = [weml.Vec2(0, 0), weml.Vec2(1, 0), weml.Vec2(0, 1), weml.Vec2(1, 1)];

export class SubTexture {
    constructor(spriteSheet, coords, cellSize, spriteSize = weml.Vec2(1, 1)) {
        this.spriteSheet = spriteSheet;
        this.spriteSheetCoords = coords;
        this.cellSize = cellSize;
        this.spriteSize = spriteSize;

        this.OnTextureLoad = this.onTextureLoad.bind(this);

        if (this.spriteSheet.isLoaded()) {
            this.onTextureLoad();
            return;
        }

        this.spriteSheet.getImage().addEventListener('load', this.onTextureLoad);
    }

    onTextureLoad() {
        const min = weml.Vec2((this.spriteSheetCoords[0] * this.cellSize[0]) / this.spriteSheet.GetWidth(),
                              (this.spriteSheetCoords[1] * this.cellSize[1]) / this.spriteSheet.GetHeight());
    
        const max = weml.Vec2(((this.spriteSheetCoords[0] + this.spriteSize[0]) * this.cellSize[0]) / this.spriteSheet.GetWidth(),
                              ((this.spriteSheetCoords[1] + this.spriteSize[1]) * this.cellSize[1]) / this.spriteSheet.GetHeight());

        this.texCoords = [
            weml.Vec2(min[0], min[1]),
            weml.Vec2(max[0], min[1]),
            weml.Vec2(min[0], max[1]),
            weml.Vec2(max[0], max[1])
        ];

        this.spriteSheet.image.removeEventListener('load', this.OnTextureLoad);
    }

    getTexCoords() {
        if (typeof this.texCoords == 'undefined') {
            return defaultTexCoords;
        }

        return this.texCoords;
    }

    GetTexture() {
        if (typeof this.spriteSheet == 'undefined') {
            return Renderer2D.Black_Texture;
        }

        return this.spriteSheet;
    }
}