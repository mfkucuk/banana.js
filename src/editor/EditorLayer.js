import * as banana from '../API/banana.js'

//import { MenubarPanel } from './panels/MenubarPanel.js'
//import { ViewportPanel } from './panels/ViewportPanel.js';
import SceneHierarchyPanel from './panels/SceneHierarchyPanel'
//import { ConsolePanel } from './panels/ConsolePanel.js';

export class EditorLayer extends banana.Layer 
{
    constructor() 
    {
        super('Editor Layer');

        banana.Renderer2D.Init();
    
        this.m_ActiveScene = new banana.Scene();
        
        this.m_CameraController = new banana.EditorCameraController();
        
        this.m_ClearColor = new banana.Color(0, 0, 0, 255);
        
        this.m_CameraEntity = this.m_ActiveScene.CreateEntity('Camera');
        this.m_SquareEntity = this.m_ActiveScene.CreateEntity('Square');
     
        this.m_CameraEntity.AddComponent(banana.ComponentType.CameraComponent);
        this.m_SquareEntity.AddComponent(banana.ComponentType.SpriteRendererComponent);

        //this.m_MenubarPanel = new MenubarPanel();
        //this.m_ViewportPanel = new ViewportPanel();
        SceneHierarchyPanel.SetScene(this.m_ActiveScene);
        //this.m_ConsolePanel = new ConsolePanel();
    }

    OnAttach() 
    {
        banana.RenderCommand.SetClearColor( this.m_ClearColor ); 
    }

    OnUpdate(deltaTime) 
    {        
        banana.Renderer2D.ResetStats();
        
        banana.RenderCommand.Clear();

        // if (this.m_MenubarPanel.IsGameRunning()) 
        // {
        //     this.m_ActiveScene.OnUpdateRuntime(deltaTime);
        // }
        // else 
        // {
            this.m_CameraController.Update(deltaTime);
            this.m_ActiveScene.OnUpdateEditor(deltaTime, this.m_CameraController);
        //}
    }

    OnGUIRender() 
    {
        //this.m_MenubarPanel.OnGUIRender();
        //this.m_ViewportPanel.OnGUIRender();
        //this.m_SceneHierarchyPanel.OnGUIRender();
        //this.m_ConsolePanel.OnGUIRender();
    }

    OnEvent(event) 
    {
        this.m_CameraController.OnEvent(event);
        this.m_ActiveScene.OnEvent(event);
    }
}