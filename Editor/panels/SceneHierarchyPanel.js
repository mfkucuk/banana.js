import * as banana from '../../src/banana.js'
import { ContextMenuPanel } from './ContextMenuPanel.js';

export class SceneHierarchyPanel 
{
    constructor(scene) 
    {
        this.m_Context = scene; 
        this.m_SelectionContext;

        this.m_HierarchyTree;
        this.m_Properties;
        this.m_Inspector;

        this.m_AddComponentInspector = new LiteGUI.Inspector();
        this.m_AddComponentDialog;
    }

    OnGUIRender() 
    {
        window.mainarea.split("horizontal", [null, "29.2%"], true);

        this.m_HierarchyTree = new LiteGUI.Panel("right_panel", {title:'Hierarchy Tree', close: true});
        this.m_Properties = new LiteGUI.Panel('properties', { title: 'Properties', close: true, scroll: true});

        
        LiteGUI.bind(this.m_HierarchyTree.root, 'contextmenu', (e) => {
            e.preventDefault();

            let contextMenu = new LiteGUI.ContextMenu([], { left: e.x, top: e.y });
            contextMenu.addItem('Add Entity', { callback: (e) => { 
                this.m_Context.CreateEntity('Entity');
                this.DrawTree();
            }});

            ContextMenuPanel.Reopen(contextMenu);
        });

        window.mainarea.getSection(1).split('vertical', [null, '50%'], true);
        
        window.mainarea.getSection(1).getSection(0).add( this.m_HierarchyTree );
        window.mainarea.getSection(1).getSection(1).add(this.m_Properties);

        this.DrawTree();
    }

    DrawTree() 
    {
        this.m_HierarchyTree.clear();

        // fetch the entities with their tags.
        const entities = this.m_Context.m_Registry.get_all_with_entity(banana.ComponentType.TagComponent);

        for ( const [id, tag] of Object.entries(entities)) 
        {
            let entity = { id: tag.GetName(), entityId: id, tag: tag }

            let tree = new LiteGUI.Tree( entity, { allow_rename: true });

            this.m_HierarchyTree.add( tree );

            tree.onItemContextMenu = (e, data) => {
                let contextMenu = new LiteGUI.ContextMenu([], { left: e.x, top: e.y });
                    contextMenu.addItem('Destroy', { callback: (e) => { 
                        this.m_Context.DestroyEntity(new banana.Entity(id, this.m_Context));
                        this.DrawTree();
                    }});
        
                    ContextMenuPanel.Reopen(contextMenu);
            }

            LiteGUI.bind( tree.root, "item_selected", (e) => {
                this.m_SelectionContext = e.detail.data.entityId;

                this.DrawComponents(this.m_SelectionContext);
            });
    
            LiteGUI.bind( tree.root, 'item_renamed', (e) => {
                e.detail.data.tag.SetName(e.detail.new_name);
                e.detail.data.id = e.detail.new_name; 
                this.DrawComponents(this.m_SelectionContext);
            });
        }
    }

    DrawComponents(entityId) 
    {
        LiteGUI.remove(this.m_Inspector);

        this.m_Inspector = new LiteGUI.Inspector();

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.TagComponent)) 
        {
            this.m_Inspector.addButton('Tag');

            let tag = this.m_Context.m_Registry.get(entityId, banana.ComponentType.TagComponent);

            let tagField = this.m_Inspector.addString('Name:', tag.GetName());

            LiteGUI.bind(tagField, 'wchange', (e) => {
                tag.SetName(e.detail);
                this.DrawTree();
            });

            this.m_Inspector.addSeparator();
        }

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.TransformComponent)) 
        {
            this.m_Inspector.addButton('Transform');

            let transform = this.m_Context.m_Registry.get(entityId, banana.ComponentType.TransformComponent);

            const position = this.m_Inspector.addVector3('Position:', transform.GetPosition());
            const rotation = this.m_Inspector.addVector3('Rotation:', transform.GetRotation());
            const scale = this.m_Inspector.addVector3('Scale:', transform.GetScale());

            LiteGUI.bind(position, 'wchange', (e) => {
                transform.SetPosition(e.detail[0][0], e.detail[0][1], e.detail[0][2]);
            });

            LiteGUI.bind(rotation, 'wchange', (e) => {
                transform.SetRotation(e.detail[0][0], e.detail[0][1], e.detail[0][2]);
            });

            LiteGUI.bind(scale, 'wchange', (e) => {
                transform.SetScale(e.detail[0][0], e.detail[0][1], e.detail[0][2]);
            });

            this.m_Inspector.addSeparator();
        }

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.SpriteRendererComponent)) 
        {
            this.m_Inspector.addButton('Sprite', 'Delete', { callback: () => {
                this.m_Context.m_Registry.remove(this.m_SelectionContext, banana.ComponentType.SpriteRendererComponent);
                this.DrawComponents(this.m_SelectionContext);
            }});

            let sprite = this.m_Context.m_Registry.get(entityId, banana.ComponentType.SpriteRendererComponent);
            const c = sprite.GetColor();

            const color = this.m_Inspector.addColor('Color:', [c[0], c[1], c[2]]);

            LiteGUI.bind(color, 'wchange', (e) => {
                console.log(e.detail[0]);
                sprite.SetColor(new banana.Color(e.detail[0][0]*255, e.detail[0][1]*255, e.detail[0][2]*255, 255));
            });

            this.m_Inspector.addSeparator();
        } 

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.CameraComponent)) 
        {
            this.m_Inspector.addButton('Camera', 'Delete', { callback: () => {
                this.m_Context.m_Registry.remove(this.m_SelectionContext, banana.ComponentType.CameraComponent);
                this.DrawComponents(this.m_SelectionContext);
            }});

            let camera = this.m_Context.m_Registry.get(entityId, banana.ComponentType.CameraComponent);

            let primary = this.m_Inspector.addCheckbox('Primary', camera.IsPrimary());

            let projection = camera.GetCamera().GetCameraType() == banana.CameraType.Orthographic ? 'Orthographic' : 'Perspective';

            let projectionCombo = this.m_Inspector.addCombo('Projection', projection, { values: ['Orthographic', 'Perspective'] });

            if (camera.GetCamera().GetCameraType() == banana.CameraType.Orthographic) 
            {
                let size = this.m_Inspector.addNumber('Size', camera.GetSize());
                let near = this.m_Inspector.addNumber('Near', camera.GetNear());
                let far = this.m_Inspector.addNumber('Far', camera.GetFar());
    
                this.m_Inspector.addCheckbox('Fixed Ratio', false);
    
                LiteGUI.bind(size, 'wchange', (e) => {
                    camera.m_SceneCamera.SetOrthographic(
                        e.detail,
                        camera.GetNear(),
                        camera.GetFar(),
                    );
                });
    
                LiteGUI.bind(near, 'wchange', (e) => {
                    console.log(e.detail);
                    camera.m_SceneCamera.SetOrthographic(
                        camera.GetSize(),
                        parseFloat(e.detail),
                        camera.GetFar(),
                    );
                });
    
                LiteGUI.bind(far, 'wchange', (e) => {
                    camera.m_SceneCamera.SetOrthographic(
                        camera.GetSize(),
                        camera.GetNear(),
                        parseFloat(e.detail),
                    );
                });
            }
            else 
            {
                let fovy = this.m_Inspector.addNumber('Fovy', camera.GetSize());
                let near = this.m_Inspector.addNumber('Near', camera.GetNear());
                let far = this.m_Inspector.addNumber('Far', camera.GetFar());

                LiteGUI.bind(fovy, 'wchange', (e) => {
                    camera.m_SceneCamera.SetPerspective(
                        e.detail,
                        camera.GetNear(),
                        camera.GetFar(),
                    );
                });
    
                LiteGUI.bind(near, 'wchange', (e) => {
                    console.log(e.detail);
                    camera.m_SceneCamera.SetPerspective(
                        camera.GetSize(),
                        parseFloat(e.detail),
                        camera.GetFar(),
                    );
                });
    
                LiteGUI.bind(far, 'wchange', (e) => {
                    camera.m_SceneCamera.SetPerspective(
                        camera.GetSize(),
                        camera.GetNear(),
                        parseFloat(e.detail),
                    );
                });
            }

            LiteGUI.bind(primary, 'wchange', (e) => {
                let isPrimary = e.detail;

                camera.SetPrimary(isPrimary);
            });

            LiteGUI.bind(projectionCombo, 'wchange', (e) => {
                if (e.detail == 'Orthographic') 
                {
                    camera.GetCamera().SetOrthographic(446, -1, 1);
                    this.DrawComponents(this.m_SelectionContext);
                }
                else 
                {
                    camera.GetCamera().SetPerspective(45, 0.1, 1000);
                    this.DrawComponents(this.m_SelectionContext);
                }
            });
        }

        this.m_Inspector.addButton('', 'Add Component', { callback: this.DrawAddComponentDialog });

        this.m_Properties.add(this.m_Inspector);
    }

    DrawAddComponentDialog = (name) =>
    {
        this.m_AddComponentInspector.clear();

        // add component popup init
        this.m_AddComponentInspector.addButton(null, 'Camera', { callback: (handle) => {
            this.m_Context.m_Registry.emplace(this.m_SelectionContext, new banana.CameraComponent());
            this.m_AddComponentDialog.close();
            this.DrawComponents(this.m_SelectionContext);
        }});
        
        this.m_AddComponentInspector.addButton(null, 'Sprite Renderer', { callback: (handle) => {
            this.m_Context.m_Registry.emplace(this.m_SelectionContext, new banana.SpriteRendererComponent());
            this.m_AddComponentDialog.close();
            this.DrawComponents(this.m_SelectionContext);
        }});

        LiteGUI.remove(this.m_AddComponentDialog);

        this.m_AddComponentDialog = new LiteGUI.Dialog({
            title: 'Add Component',
            close: true,
            width: 300,
            height: 400,
            draggable: true,
        });

        this.m_AddComponentDialog.show();
        this.m_AddComponentDialog.setPosition(600, 300);
        this.m_AddComponentDialog.add( this.m_AddComponentInspector );
    }
}