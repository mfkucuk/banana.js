import * as banana from "../banana.js"

export class Sandbox2D extends banana.Layer 
{
    constructor() 
    {
        super('Sandbox2D');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.OrthographicCameraController();

        this.m_EarthTexture = new banana.Texture('/sandbox/assets/tex/earth.png');
        this.m_MoonTexture = new banana.Texture('/sandbox/assets/tex/moon.png');

        this.m_EarthTransform = new banana.Transform2D();
        this.m_MoonTransform = new banana.Transform2D();

        this.m_BlueTransform = new banana.Transform2D();
        this.m_RedTransform = new banana.Transform2D();

        this.m_Transforms = [];

        this.m_Angle = 0;

        this.m_Width = 100;
        this.m_Height = 100;
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(100, 100, 100, 255) ); 

        this.m_EarthTransform.SetPosition(0, 100, 0);
        this.m_MoonTransform.SetPosition(0, -100, 0);

        this.m_BlueTransform.SetPosition(100, 0, 0);
        this.m_RedTransform.SetPosition(-100, 0, 0);

        for (let i = 0; i < this.m_Width; i++) 
        {
            this.m_Transforms.push([]);
            for (let j = 0; j < this.m_Height; j++) 
            {
                this.m_Transforms[i].push(new banana.Transform2D());
                this.m_Transforms[i][j].SetPosition(i*30-290, j*30-290, 0);
                this.m_Transforms[i][j].SetScale(0.2, 0.2, 1);
            }
        }
    }
    
    OnUpdate(deltaTime) 
    {
        banana.Renderer2D.ResetStats();

        this.m_CameraController.Update(deltaTime);

        banana.RenderCommand.Clear();

        banana.Renderer2D.BeginScene(this.m_CameraController.GetCamera());
    
        for (let i = 0; i < this.m_Width; i++) 
        {
            for (let j = 0; j < this.m_Height; j++) 
            {
                banana.Renderer2D.DrawColoredQuad(this.m_Transforms[i][j], banana.Color.PURPLE);

                this.m_Transforms[i][j].SetRotation(this.m_Angle);
            }
        }

        banana.Renderer2D.EndScene();

        banana.Renderer2D.BeginScene(this.m_CameraController.GetCamera());

        banana.Renderer2D.DrawColoredQuad(this.m_BlueTransform, banana.Color.BLUE);
        banana.Renderer2D.DrawColoredQuad(this.m_RedTransform, banana.Color.RED);

        banana.Renderer2D.EndScene();

        this.m_Angle++;
        this.m_BlueTransform.SetRotation(this.m_Angle);
        this.m_RedTransform.SetRotation(-this.m_Angle);
        this.m_EarthTransform.SetRotation(this.m_Angle);
        this.m_MoonTransform.SetRotation(-this.m_Angle);

    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
}