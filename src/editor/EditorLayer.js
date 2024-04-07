import * as banana from '../API/banana.js'
import { Vec3 } from '../API/math/MV.ts';

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
    
        this.activeScene = new banana.Scene('NewScene');
        
        this.cameraController = new banana.EditorCameraController();
        
        this.clearColor = new banana.Color(0, 0, 0, 255);
        
        this.cameraEntity = this.activeScene.createEntity('Camera');
        this.squareEntity = this.activeScene.createEntity('Square');
     
        this.cameraEntity.addComponent(banana.ComponentType.CameraComponent);
        this.squareEntity.addComponent(banana.ComponentType.SpriteRendererComponent);
        this.rigidBody = this.squareEntity.addComponent(banana.ComponentType.RigidBody2DComponent);
        this.rigidBody.rigidBody2D.velocity = new Vec3(0, 0, 0);

        this.transform = this.squareEntity.getComponent(banana.ComponentType.TransformComponent);

        //this.m_MenubarPanel = new MenubarPanel();
        //this.m_ViewportPanel = new ViewportPanel();
        SceneHierarchyPanel.setScene(this.activeScene);
        //this.m_ConsolePanel = new ConsolePanel();

        this.sceneData = banana.SceneSerializer.serialize(this.activeScene);

        banana.SceneSerializer.deserialize(this.sceneData);
    }

    onAttach() 
    {
        banana.RenderCommand.setClearColor( this.clearColor ); 
    }

    onUpdate(deltaTime) 
    {        
        banana.Renderer2D.ResetStats();
        
        banana.RenderCommand.clear();

        //console.log(this.transform.GetPosition());

        // if (this.m_MenubarPanel.IsGameRunning()) 
        // {
        //    this.activeScene.onUpdateRuntime(deltaTime);
        // }
        // else 
        // {
            this.cameraController.update(deltaTime);
            this.activeScene.onUpdateEditor(deltaTime, this.cameraController);
        //}
    }

    onGUIRender() 
    {
        //this.m_MenubarPanel.OnGUIRender();
        //this.m_ViewportPanel.OnGUIRender();
        //this.m_SceneHierarchyPanel.OnGUIRender();
        //this.m_ConsolePanel.OnGUIRender();
    }

    onEvent(event) 
    {
        this.cameraController.onEvent(event);
        this.activeScene.onEvent(event);
    }
}