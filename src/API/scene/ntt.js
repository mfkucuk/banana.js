import { GUID } from "../core/GUID.js"

export class ntt 
{
    static create_registry() 
    {
        return {
            count: 0,
            list: [],
            component: {},
    
            create: function() 
            {
                const id = GUID.GenerateGUID();
            
                this.list[this.count++] = id;
    
                return id;
            },
    
            release: function(entity) 
            {
                const index = this.list.indexOf(entity);
    
                if (index == -1) 
                {
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
            },
    
            valid: function(entity) 
            {
                return this.list.indexOf(entity) != -1;
            },
    
            // component functions
    
            emplace: function(entity, component) 
            {
                if (!this.valid(entity)) 
                {
                    return;
                }
    
                if (typeof this.component[component.type] == 'undefined') 
                {
                    this.component[component.type] = {};
                }
    
                this.component[component.type][entity] = component;

                return component;
            },
    
            remove: function(entity, componentType) 
            {
                if (!this.valid(entity) || !this.component[componentType]) 
                {
                    return;
                }
    
                delete this.component[componentType][entity];
            },
    
            clear: function() 
            {
                this.list = [];
                this.count = 0;
                this.component = {};
            },

            has: function(entity, componentType) 
            {
                if (typeof this.component[componentType] == 'undefined') 
                {
                    this.component[componentType] = {};
                }

                return this.component[componentType][entity] != null;
            },
    
            get: function(entity, componentType) 
            {
                if (!this.valid(entity) || !this.component[componentType]) 
                {
                    return;
                }
    
                return this.component[componentType][entity] || null;
            },
    
            get_all: function(componentType) 
            {
                if (!this.component[componentType]) 
                {
                    return [];
                }
    
                return Object.values(this.component[componentType]);
            },

            get_all_with_entity: function(componentType) 
            {
                if (!this.component[componentType]) 
                {
                    return {};
                }
    
                return this.component[componentType];
            },

            group: function(...componentType) 
            {
                return this.list.filter(entity =>
                    componentType.every(componentType =>
                        this.component[componentType] && this.component[componentType][entity]
                    )
                );
            }
        };
    }
}