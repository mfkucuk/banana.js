import { ntt } from './ntt.ts'
import { ComponentType } from '../core/Type.ts'
import { Renderer2D } from '../render/Renderer2D.ts'
import { Entity } from './Entity.ts'
import { CameraComponent, Log, NativeScriptComponent, RigidBody2DComponent, SceneCamera, SpriteRendererComponent, TagComponent, TransformComponent } from '../banana.js'
import PhysicsSystem from '../physics/PhysicsSystem.ts'
import { Mat4 } from '../math/MV.ts'
 
export class Scene 
{
    registry: ntt;
    private _name: string;

    constructor(name: string) 
    {
        this.registry = new ntt();
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    createEntity(name: string): Entity {
        const entity = new Entity(this.registry.create(), this);
        
        entity.addComponent(ComponentType.TransformComponent);
        const tag = entity.addComponent<TagComponent>(ComponentType.TagComponent);

        if (typeof name != 'undefined') {
            tag.setName(name);
        }

        return entity;
    }

    // entity is the entity object not the entity id.
    destroyEntity(entity: Entity) {
        if (!this.registry.valid(entity.entityHandle)) {
            Log.Core_Error('Cannot destroy a non-existing entity!');
            return false;
        }

        this.registry.release(entity.entityHandle);
        return true;
    }

    renderScene() {
        const entities = this.registry.group(ComponentType.TransformComponent, ComponentType.SpriteRendererComponent);

        entities.forEach(entity => {
            const transform = this.registry.get<TransformComponent>(entity, ComponentType.TransformComponent);
            const sprite = this.registry.get<SpriteRendererComponent>(entity, ComponentType.SpriteRendererComponent);

            Renderer2D.DrawColorQuad(transform, sprite.getColor());
        });
    }

    onUpdateRuntime(deltaTime) {
        {
            // scriptable entities
            const nativeScripts = this.registry.get_all_with_entity<NativeScriptComponent>(ComponentType.NativeScriptComponent);
            
            for (const [entity, ns] of Object.entries(nativeScripts)) {
                if (!ns.Instance) 
                {
                    ns.Instance = ns.instanceScriptFn();
                    ns.Instance.entity = new Entity(entity, this);
                    ns.Instance.onCreateSealed();
                    ns.Instance.onCreate();
                }

                ns.Instance.onUpdate(deltaTime);
            }
        }

        {
            // physics
            const groupedEntities = this.registry.group(ComponentType.TransformComponent, ComponentType.RigidBody2DComponent);

            groupedEntities.forEach(entity => {
                const transformComponent = this.registry.get(entity, ComponentType.TransformComponent) as TransformComponent;
                const rigidBodyComponent = this.registry.get(entity, ComponentType.RigidBody2DComponent) as RigidBody2DComponent;

                PhysicsSystem.update(rigidBodyComponent, transformComponent, deltaTime);
            });
        }

        let mainCamera: SceneCamera = null;
        let mainCameraTransform: TransformComponent = null;

        const cameraEntities = this.registry.group(ComponentType.TransformComponent, ComponentType.CameraComponent);
        cameraEntities.forEach(cameraEntity => {
            const transform = this.registry.get(cameraEntity, ComponentType.TransformComponent) as TransformComponent;
            const camera = this.registry.get(cameraEntity, ComponentType.CameraComponent) as CameraComponent;

            if (camera.isPrimary()) 
            {
                mainCameraTransform = transform;
                mainCamera = camera.getCamera();
            }
        });


        if (!mainCamera) {
            return;
        }


        let view = new Mat4();
        view.setTranslation(mainCameraTransform.getPosition());
        view.applyRotationZ(mainCameraTransform.getRotation().z);

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
        const cameraComponents = this.registry.get_all<CameraComponent>(ComponentType.CameraComponent);

        cameraComponents.forEach(cc => {
            cc.getCamera().onEvent(event);
        });
    }
}