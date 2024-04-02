import { ComponentType } from "../banana.js"

export class ScriptableEntity {
    constructor() {
        this.entity = null;
    }

    getComponent(componentType) {
        return this.entity.getComponent(componentType);
    }

    onCreate() {}
    onUpdate(deltaTime) {}
    onDestroy() {}

    // DONT INHERIT THESE METHODS
    onCreateSealed() {
        this.tag = this.getComponent(ComponentType.TagComponent);
        this.transform = this.getComponent(ComponentType.TransformComponent);
    }
}