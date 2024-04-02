import { Component, ComponentType } from "../banana.js";
import { GUID } from "../core/GUID.ts"

export class ntt {
    count: number;
    list: string[];
    component: Object;

    constructor() {
        this.count = 0;
        this.list = [];
        this.component = {};
    }

    create() {
        const id = GUID.generateGUID();
    
        this.list[this.count++] = id;

        return id;
    }

    release(entity: string) {
        const index = this.list.indexOf(entity);

        if (index == -1) {
            return;
        }

        this.list.splice(index, 1);
        this.count--;

        // Remove all components associated with the entity
        Object.values(this.component).forEach(componentMap => {
            if (componentMap[entity]) {
                delete componentMap[entity];
            }
        });
    }

    valid(entity: string) {
        return this.list.indexOf(entity) != -1;
    }

    // component functions

    emplace(entity: string, component: Component) {
        if (!this.valid(entity)) {
            return;
        }

        if (typeof this.component[component.type] == 'undefined') {
            this.component[component.type] = {};
        }

        this.component[component.type][entity] = component;

        return component;
    }

    remove(entity: string, componentType: ComponentType) {
        if (!this.valid(entity) || !this.component[componentType]) {
            return;
        }

        delete this.component[componentType][entity];
    }

    clear() {
        this.list = [];
        this.count = 0;
        this.component = {};
    }

    has(entity: string, componentType: ComponentType) {
        if (typeof this.component[componentType] == 'undefined') {
            this.component[componentType] = {};
        }

        return this.component[componentType][entity] != null;
    }

    get(entity: string, componentType: ComponentType) {
        if (!this.valid(entity) || !this.component[componentType]) {
            return;
        }

        return this.component[componentType][entity] || null;
    }

    get_all(componentType: ComponentType) {
        if (!this.component[componentType]) {
            return [];
        }

        return Object.values(this.component[componentType]);
    }

    get_all_with_entity(componentType: ComponentType) {
        if (!this.component[componentType]) {
            return {};
        }

        return this.component[componentType];
    }

    group(...componentType: ComponentType[]) {
        return this.list.filter(entity =>
            componentType.every(componentType =>
                this.component[componentType] && this.component[componentType][entity]
            )
        );
    }
}