import * as banana from '../src/banana.js'
import * as weml from '../src/ext/weml.js/weml.js'

export class EditorLayer extends banana.Layer 
{
    constructor() 
    {
        super('Editor Layer');

        banana.Renderer2D.Init();
    
        this.m_CameraController = new banana.EditorCameraController();

        this.m_SpriteSheet = new banana.Texture('/Game/assets/tex/NpcGuest.png');
           
        this.m_ActiveScene = new banana.Scene();
        
        this.m_Entity = this.m_ActiveScene.CreateEntity();
     
        this.m_SpriteRendererComponent = new banana.SpriteRendererComponent();
        this.m_Entity.AddComponent(banana.ComponentType.SpriteRendererComponent);

        this.m_CameraEntity = this.m_ActiveScene.CreateEntity();
        this.m_CameraComponent = this.m_CameraEntity.AddComponent(banana.ComponentType.CameraComponent);

        this.m_CameraComponent.GetCamera().SetOrthographic(
            -banana.canvas.width / 2, 
            banana.canvas.width / 2,
            banana.canvas.height / 2,
            -banana.canvas.height / 2, 
            -1,
            1
        );

        this.m_IsGameRunning = false;
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(0, 0, 0, 255) ); 
    
    }

    OnUpdate(deltaTime) 
    {
        
        banana.Renderer2D.ResetStats();
        
        this.m_CameraController.Update(deltaTime);
        
        banana.RenderCommand.Clear();
        
        if (this.m_IsGameRunning) 
        {
            this.m_ActiveScene.OnUpdateRuntime(deltaTime);
        }
        else 
        {
            this.m_ActiveScene.OnUpdateEditor(deltaTime, this.m_CameraController);
        }
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
    }
}