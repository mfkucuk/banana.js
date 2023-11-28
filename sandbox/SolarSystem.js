import * as banana from "../banana.js"

export class SolarSystem extends banana.Layer 
{
    constructor() 
    {
        super('Solar System');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.OrthographicCameraController();

        this.m_SunTexture = new banana.Texture('/sandbox/assets/tex/sun.png');
        this.m_EarthTexture = new banana.Texture('/sandbox/assets/tex/earth.png');
        this.m_MoonTexture = new banana.Texture('/sandbox/assets/tex/moon.png');

        this.m_SolarSystem = new banana.SceneGraphNode();
        this.m_Sun = new banana.SceneGraphNode();
        this.m_EarthOrbit = new banana.SceneGraphNode();
        this.m_Earth = new banana.SceneGraphNode();
        this.m_MoonOrbit = new banana.SceneGraphNode();
        this.m_Moon = new banana.SceneGraphNode();

        this.m_Angle = 0;
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(0, 0, 100, 255) ); 

        this.m_EarthOrbit.GetLocalTransform().SetPosition(-180, -180, 0);
        this.m_MoonOrbit.GetLocalTransform().SetPosition(-70, -70, 0);

        this.m_Sun.GetLocalTransform().SetScale(2.5, 2.5, 1);
        this.m_Moon.GetLocalTransform().SetScale(0.5, 0.5, 1);

        this.m_Sun.SetParent(this.m_SolarSystem);
        this.m_Earth.SetParent(this.m_EarthOrbit);
        this.m_Moon.SetParent(this.m_MoonOrbit);
        
        this.m_EarthOrbit.SetParent(this.m_SolarSystem);
        this.m_MoonOrbit.SetParent(this.m_EarthOrbit);
    }
    
    OnUpdate(deltaTime) 
    {
        if (banana.Input.IsKeyPressed(banana.KeyCode.D) || banana.Input.IsKeyPressed(banana.KeyCode.Right)) 
        {
            this.m_Angle += 0.5;
        }
        if (banana.Input.IsKeyPressed(banana.KeyCode.A) || banana.Input.IsKeyPressed(banana.KeyCode.Left)) 
        {
            this.m_Angle -= 0.5;
        }
        this.m_MoonOrbit.GetLocalTransform().SetRotation(this.m_Angle);
        this.m_EarthOrbit.GetLocalTransform().SetRotation(this.m_Angle);
        this.m_SolarSystem.GetLocalTransform().SetRotation(this.m_Angle);
        this.m_Sun.GetLocalTransform().SetRotation(this.m_Angle);
        this.m_Earth.GetLocalTransform().SetRotation(this.m_Angle);

        this.m_SolarSystem.UpdateWorldTransform();
        
        this.m_CameraController.Update(deltaTime);
        
        banana.RenderCommand.Clear();
        
        banana.Renderer2D.BeginScene(this.m_CameraController.GetCamera());
        
        banana.Renderer2D.DrawTexturedRotatedQuad(this.m_Earth.GetWorldTransform(), this.m_EarthTexture);
        banana.Renderer2D.DrawTexturedRotatedQuad(this.m_Moon.GetWorldTransform(), this.m_MoonTexture);
        banana.Renderer2D.DrawTexturedRotatedQuad(this.m_Sun.GetWorldTransform(), this.m_SunTexture);
        
        banana.Renderer2D.EndScene();
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
}