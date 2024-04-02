import { ntt } from './ntt.ts'
import { ComponentType } from '../core/Type.ts'
import { Renderer2D } from '../render/Renderer2D.js'
import { Entity } from './Entity.ts'
import * as weml from '../ext/weml.js/weml.js'
import { Log } from '../banana.js'
import PhysicsSystem from '../physics/PhysicsSystem.ts'
 
export class Scene 
{
    constructor() 
    {
        this.registry = new ntt();
    }

    createEntity(name) {
        const entity = new Entity(this.registry.create(), this);
        
        entity.addComponent(ComponentType.TransformComponent);
        const tag = entity.addComponent(ComponentType.TagComponent);

        if (typeof name != 'undefined') {
            tag.setName(name);
        }

        return entity;
    }

    // entity is the entity object not the entity id.
    destroyEntity(entity) {
        if (!this.registry.valid(entity.m_EntityHandle)) {
            Log.Core_Error('Cannot destroy a non-existing entity!');
            return false;
        }

        this.registry.release(entity.m_EntityHandle);
        return true;
    }

    renderScene() {
        const entities = this.registry.group(ComponentType.TransformComponent, ComponentType.SpriteRendererComponent);

        entities.forEach(entity => {
            const transform = this.registry.get(entity, ComponentType.TransformComponent);
            const sprite = this.registry.get(entity, ComponentType.SpriteRendererComponent);

            Renderer2D.DrawColorQuad(transform, sprite.getColor());
        });
    }

    onUpdateRuntime(deltaTime) {
        {
            // scriptable entities
            const nativeScripts = this.registry.get_all_with_entity(ComponentType.NativeScriptComponent);
            
            for (const [entity, ns] of Object.entries(nativeScripts)) {
                if (!ns.Instance) 
                {
                    ns.Instance = ns.instaceScriptFn();
                    ns.Instance.m_Entity = new Entity(entity, this);
                    ns.Instance.onCreateSealed();
                    ns.Instance.onCreate();
                }

                ns.Instance.onUpdate(deltaTime);
            }
        }

        {
            // physics
            const groupedEntities = this.registry.group(ComponentType.TransformComponent, ComponentType.RigidBodyComponent);

            groupedEntities.forEach(entity => {
                const transformComponent = this.registry.get(entity, ComponentType.TransformComponent);
                const rigidBodyComponent = this.registry.get(entity, ComponentType.RigidBodyComponent);

                PhysicsSystem.update(rigidBodyComponent, transformComponent, deltaTime);
            });
        }

        let mainCamera = null;
        let mainCameraTransform = null;

        const cameraEntities = this.registry.group(ComponentType.TransformComponent, ComponentType.CameraComponent);
        cameraEntities.forEach(cameraEntity => {
            const transform = this.registry.get(cameraEntity, ComponentType.TransformComponent)
            const camera = this.registry.get(cameraEntity, ComponentType.CameraComponent);

            if (camera.isPrimary()) 
            {
                mainCameraTransform = transform;
                mainCamera = camera.getCamera();
            }
        });


        if (!mainCamera) {
            return;
        }


        let view = weml.Mat4();
        view.setTranslationVec3(mainCameraTransform.getPosition());
        view.applyRotationZ(mainCameraTransform.getRotation()[2]);

        Renderer2D.BeginScene(mainCamera, view);

        this.renderScene();

        Renderer2D.EndScene();
    }

    onUpdateEditor(deltaTime, editorCameraController) 
    {
        Renderer2D.BeginScene(editorCameraController.getCamera());

        this.renderScene();

        Renderer2D.EndScene();
    }

    onEvent(event) 
    {
        const cameraComponents = this.registry.get_all(ComponentType.CameraComponent);

        cameraComponents.forEach(cc => {
            cc.getCamera().onEvent(event);
        });
    }
}