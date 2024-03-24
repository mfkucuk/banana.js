import { ntt } from './ntt.js'
import { ComponentType } from '../core/Type.js'
import { Renderer2D } from '../render/Renderer2D.js'
import { Entity } from './Entity.js'
import * as weml from '../ext/weml.js/weml.js'
import { Log } from '../banana.js'
 
export class Scene 
{
    constructor() 
    {
        this.m_Registry = ntt.create_registry();
    }

    CreateEntity(name) 
    {
        const entity = new Entity(this.m_Registry.create(), this);
        
        entity.AddComponent(ComponentType.TransformComponent);
        const tag = entity.AddComponent(ComponentType.TagComponent);

        if (typeof name != 'undefined') 
        {
            tag.SetName(name);
        }

        return entity;
    }

    // entity is the entity object not the entity id.
    DestroyEntity(entity) 
    {
        if (!this.m_Registry.valid(entity.m_EntityHandle)) 
        {
            Log.Core_Error('Cannot destroy a non-existing entity!');
            return false;
        }

        this.m_Registry.release(entity.m_EntityHandle);
        return true;
    }

    RenderScene() 
    {
        const entities = this.m_Registry.group(ComponentType.TransformComponent, ComponentType.SpriteRendererComponent);

        entities.forEach(entity => {
            const transform = this.m_Registry.get(entity, ComponentType.TransformComponent);
            const sprite = this.m_Registry.get(entity, ComponentType.SpriteRendererComponent);

            Renderer2D.DrawColorQuad(transform, sprite.GetColor());
        });
    }

    OnUpdateRuntime(deltaTime) 
    {
        {
            // scriptable entities
            const nativeScripts = this.m_Registry.get_all_with_entity(ComponentType.NativeScriptComponent);
            
            for (const [entity, ns] of Object.entries(nativeScripts))
            {
                if (!ns.Instance) 
                {
                    ns.Instance = ns.m_InstanceScriptFn();
                    ns.Instance.m_Entity = new Entity(entity, this);
                    ns.Instance.OnCreateSealed();
                    ns.Instance.OnCreate();
                }

                ns.Instance.OnUpdate(deltaTime);
            }
        }

        let mainCamera = null;
        let mainCameraTransform = null;

        const cameraEntities = this.m_Registry.group(ComponentType.TransformComponent, ComponentType.CameraComponent);
        cameraEntities.forEach(cameraEntity => {
            const transform = this.m_Registry.get(cameraEntity, ComponentType.TransformComponent)
            const camera = this.m_Registry.get(cameraEntity, ComponentType.CameraComponent);

            if (camera.IsPrimary()) 
            {
                mainCameraTransform = transform;
                mainCamera = camera.GetCamera();
            }
        });


        if (!mainCamera) 
        {
            return;
        }


        let view = weml.Mat4();
        view.setTranslationVec3(mainCameraTransform.GetPosition());
        view.applyRotationZ(mainCameraTransform.GetRotation()[2]);

        Renderer2D.BeginScene(mainCamera, view);

        this.RenderScene();

        Renderer2D.EndScene();
    }

    OnUpdateEditor(deltaTime, editorCameraController) 
    {
        Renderer2D.BeginScene(editorCameraController.GetCamera());

        this.RenderScene();

        Renderer2D.EndScene();
    }

    OnEvent(event) 
    {
        const cameraComponents = this.m_Registry.get_all(ComponentType.CameraComponent);

        cameraComponents.forEach(cc => {
            cc.GetCamera().OnEvent(event);
        });
    }
}