import { ComponentType } from "../core/Type.ts";
import { CameraComponent, SpriteRendererComponent, TagComponent, TransformComponent } from "./Component.ts";
import { Entity } from "./Entity.ts";
import { Scene } from "./Scene.ts";

export class SceneSerializer {
    static serialize(scene: Scene): string {

        let sceneData: string = '';

        sceneData += `Scene: ${scene.name}\n`;
        sceneData += `Entities:\n`;

        const entities = scene.registry.get_all_entities();

        for (const entity of entities) {
            sceneData += ` - Entity: ${entity}\n`;

            // tag component
            const tagComponent = scene.registry.get<TagComponent>(entity, ComponentType.TagComponent);
            sceneData += ` ${tagComponent}`;

            // transform component
            const transformComponent = scene.registry.get<TransformComponent>(entity, ComponentType.TransformComponent);
            sceneData += ` ${transformComponent}`;

            if (scene.registry.has(entity, ComponentType.SpriteRendererComponent)) {
                const spriteRendererComponent = scene.registry.get<SpriteRendererComponent>(entity, ComponentType.SpriteRendererComponent);
                sceneData += ` ${spriteRendererComponent}`;
            }

            if (scene.registry.has(entity, ComponentType.CameraComponent)) {
                const cameraComponent = scene.registry.get<CameraComponent>(entity, ComponentType.CameraComponent);
                sceneData += ` ${cameraComponent}`;
            }
        }

        console.log(sceneData);

        return sceneData;
    }

    static serializeEntity(entity: Entity): string {
        return '';
    }

    static deserialize(sceneData: string): Scene {

        return null;
    }
}