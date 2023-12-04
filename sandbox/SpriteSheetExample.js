import * as banana from '../banana.js'
import * as weml from '../src/ext/weml.js/weml.js'

export class SpriteSheetExample extends banana.Layer 
{
    constructor() 
    {
        super('SpriteSheetExample');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.OrthographicCameraController();

        this.m_Transform = new banana.Transform2D();
        this.m_SpriteSheet = new banana.Texture('/sandbox/assets/tex/NpcGuest.png');

        this.m_PurpleGirl = new banana.SubTexture(this.m_SpriteSheet, weml.Vec2(8, 0), weml.Vec2(16, 16));
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(0, 0, 0, 255) ); 
        //this.m_Transform.SetScale(3.20, 1.84, 1);
    }
    
    OnUpdate(deltaTime) 
    {
        banana.Renderer2D.ResetStats();

        this.m_CameraController.Update(deltaTime);

        banana.RenderCommand.Clear();

        banana.Renderer2D.BeginScene(this.m_CameraController.GetCamera());

        // sprite sheet
        banana.Renderer2D.DrawSubTextureQuad(this.m_Transform, this.m_PurpleGirl);


        banana.Renderer2D.EndScene();
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
} 