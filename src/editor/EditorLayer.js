import * as banana from '../API/banana.js'
import { Vec3 } from '../API/math/MV.ts';

import SceneHierarchyPanel from './panels/SceneHierarchyPanel'

export class EditorLayer extends banana.Layer 
{
    constructor() 
    {
        super('Editor Layer');

        banana.Renderer2D.init();
    
        this.activeScene = new banana.Scene('NewScene');
        
        this.cameraController = new banana.EditorCameraController();
        
        this.clearColor = new banana.Color(0, 0, 0, 255);
        
        this.cameraEntity = this.activeScene.createEntity('Camera');
        this.squareEntity = this.activeScene.createEntity('Square');
        this.circleEntity = this.activeScene.createEntity('Circle');
     
        this.cameraEntity.addComponent(banana.ComponentType.CameraComponent);
        this.squareEntity.addComponent(banana.ComponentType.SpriteRendererComponent);
        this.circleEntity.addComponent(banana.ComponentType.CircleRendererComponent);
        this.rigidBody = this.squareEntity.addComponent(banana.ComponentType.RigidBody2DComponent);
        this.rigidBody.rigidBody2D.velocity = new Vec3(0, 0, 0);

        this.transform = this.circleEntity.getComponent(banana.ComponentType.TransformComponent);
        this.transform.translate(110, 0, 0);
    }
    
    onAttach() 
    {
        banana.RenderCommand.setClearColor( this.clearColor ); 
    }

    onUpdate(deltaTime) 
    {        
        banana.Renderer2D.resetStats();
        
        banana.RenderCommand.clear();

        //console.log(1 / deltaTime);

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