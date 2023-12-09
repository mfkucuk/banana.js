import * as banana from '../src/banana.js'
import * as weml from '../src/ext/weml.js/weml.js'

export class Sandbox2D extends banana.Layer 
{
    constructor() 
    {
        super('Sandbox2D');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.OrthographicCameraController();

        this.m_Transform1 = new banana.Transform2D();
        this.m_Transform2 = new banana.Transform2D();
        this.m_SpriteSheet = new banana.Texture('/Game/assets/tex/NpcGuest.png');

        this.m_PurpleGirl = new banana.SubTexture(this.m_SpriteSheet, weml.Vec2(8, 0), weml.Vec2(16, 16));
        this.m_GreenGirl = new banana.SubTexture(this.m_SpriteSheet, weml.Vec2(6, 2), weml.Vec2(16, 16));
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(0, 0, 0, 255) ); 
        
        this.m_Transform2.SetPosition(100, 0, 0);
    }
    
    OnUpdate(deltaTime) 
    {
        banana.Renderer2D.ResetStats();

        this.m_CameraController.Update(deltaTime);

        banana.RenderCommand.Clear();

        banana.Renderer2D.BeginScene(this.m_CameraController.GetCamera());

        // sprite sheet
        banana.Renderer2D.DrawSubTextureQuad(this.m_Transform1, this.m_PurpleGirl);
        banana.Renderer2D.DrawSubTextureQuad(this.m_Transform2, this.m_GreenGirl);


        banana.Renderer2D.EndScene();
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
}