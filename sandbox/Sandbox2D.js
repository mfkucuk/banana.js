import * as banana from "../banana.js"

export class Sandbox2D extends banana.Layer 
{
    constructor() 
    {
        super('Sandbox2D');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.OrthographicCameraController();

        this.m_BlueTransform = new banana.Transform2D();

        this.m_RedTransform = new banana.Transform2D();
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(100, 100, 100, 255) ); 

        this.m_BlueTransform.SetPosition(100, 0, 0);
        this.m_RedTransform.SetPosition(-100, 0, 0);
    }
    
    OnUpdate(deltaTime) 
    {
        this.m_CameraController.Update(deltaTime);

        banana.RenderCommand.Clear();

        banana.Renderer2D.BeginScene(this.m_CameraController.GetCamera());
    
        banana.Renderer2D.DrawColoredQuad(this.m_BlueTransform, banana.Color.BLUE);

        banana.Renderer2D.DrawColoredQuad(this.m_RedTransform, banana.Color.RED);
        
        banana.Renderer2D.EndScene();

    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
}