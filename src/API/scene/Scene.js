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
        this.registry = ntt.create_registry();
    }

    CreateEntity(name) 
    {
        const entity = new Entity(this.registry.create(), this);
        
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
        if (!this.registry.valid(entity.m_EntityHandle)) 
        {
            Log.Core_Error('Cannot destroy a non-existing entity!');
            return false;
        }

        this.registry.release(entity.m_EntityHandle);
        return true;
    }

    RenderScene() 
    {
        const entities = this.registry.group(ComponentType.TransformComponent, ComponentType.SpriteRendererComponent);

        entities.forEach(entity => {
            const transform = this.registry.get(entity, ComponentType.TransformComponent);
            const sprite = this.registry.get(entity, ComponentType.SpriteRendererComponent);

            Renderer2D.DrawColorQuad(transform, sprite.GetColor());
        });
    }

    OnUpdateRuntime(deltaTime) 
    {
        {
            // scriptable entities
            const nativeScripts = this.registry.get_all_with_entity(ComponentType.NativeScriptComponent);
            
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

        const cameraEntities = this.registry.group(ComponentType.TransformComponent, ComponentType.CameraComponent);
        cameraEntities.forEach(cameraEntity => {
            const transform = this.registry.get(cameraEntity, ComponentType.TransformComponent)
            const camera = this.registry.get(cameraEntity, ComponentType.CameraComponent);

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
        const cameraComponents = this.registry.get_all(ComponentType.CameraComponent);

        cameraComponents.forEach(cc => {
            cc.GetCamera().OnEvent(event);
        });
    }
}