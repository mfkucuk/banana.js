import * as banana from '../src/banana.js'
import * as weml from '../src/ext/weml.js/weml.js'

class Player extends banana.ScriptableEntity 
{
    OnCreate() 
    {
        this.transform = this.GetComponent(banana.ComponentType.TransformComponent);
        console.log(this.transform);
    }
    
    OnUpdate(deltaTime) 
    {
        if (banana.Input.IsKeyPressed(banana.KeyCode.D)) 
        {
            this.transform.Translate(1, 0, 0);
        }

        if (banana.Input.IsKeyPressed(banana.KeyCode.Q)) 
        {
            this.transform.Rotate(0, 0, 1);
        }
    }
}

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

        this.m_Transform = this.m_Entity.GetComponent(banana.ComponentType.TransformComponent);
     
        this.m_SpriteRendererComponent = new banana.SpriteRendererComponent();
        this.m_Entity.AddComponent(banana.ComponentType.SpriteRendererComponent);
        this.m_Entity.AddComponent(banana.ComponentType.NativeScriptComponent).Bind(Player);

        this.m_CameraEntity = this.m_ActiveScene.CreateEntity();
        this.m_CameraComponent = this.m_CameraEntity.AddComponent(banana.ComponentType.CameraComponent);

        this.m_CameraTransform = this.m_CameraEntity.GetComponent(banana.ComponentType.TransformComponent);


        this.m_IsGameRunning = false;
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( new banana.Color(0, 0, 0, 255) ); 
    }

    OnUpdate(deltaTime) 
    {        
        banana.Renderer2D.ResetStats();
        
        banana.RenderCommand.Clear();
        
        if (this.m_IsGameRunning) 
        {
            this.m_ActiveScene.OnUpdateRuntime(deltaTime);
        }
        else 
        {
            this.m_CameraController.Update(deltaTime);
            this.m_ActiveScene.OnUpdateEditor(deltaTime, this.m_CameraController);
        }
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
        this.m_ActiveScene.OnEvent(event);
    }
}