import { ComponentType, Log, Scene } from "../banana.js"
import { ComponentCreator } from "./Component.js"

export class Entity {

    entityHandle: string;
    scene: Scene;

    constructor(entityHandle, scene) {
        this.entityHandle = entityHandle;
        this.scene = scene;
    }

    addComponent(type: ComponentType) {
        return this.scene.registry.emplace(this.entityHandle, new ComponentCreator[type]());
    }

    hasComponent(type: ComponentType) {
        return this.scene.registry.has(this.entityHandle, type);
    }

    getComponent(type: ComponentType) {
        if (!this.hasComponent(type)) {
            Log.Core_Warn('Entity does not have this component type');
            return null;
        }

        return this.scene.registry.get(this.entityHandle, type);
    }
}