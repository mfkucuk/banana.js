import * as banana from '../banana.js'

export class SpriteSheetExample extends banana.Layer 
{
    constructor() 
    {
        super('SpriteSheetExample');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.OrthographicCameraController();

        this.m_Transform = new banana.Transform2D();
        this.m_SpriteSheet = new banana.Texture('/sandbox/assets/tex/NpcGuest.png');
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
        banana.Renderer2D.DrawTexturedQuad(this.m_Transform, this.m_SpriteSheet);


        banana.Renderer2D.EndScene();
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
} 