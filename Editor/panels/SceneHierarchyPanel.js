import * as banana from '../../src/banana.js'

export class SceneHierarchyPanel 
{
    constructor(scene) 
    {
        this.m_Context = scene; 
        this.m_SelectionContext;

        this.m_HierarchyTree;
        this.m_Properties;
        this.m_Inspector;
    }

    OnGUIRender() 
    {
        window.mainarea.split("horizontal", [null, "29.2%"], true);

        this.m_HierarchyTree = new LiteGUI.Panel("right_panel", {title:'Hierarchy Tree', close: true});
        this.m_Properties = new LiteGUI.Panel('properties', { title: 'Properties', close: true });

        window.mainarea.getSection(1).split('vertical', [null, '40%'], true);
        
        window.mainarea.getSection(1).getSection(0).add( this.m_HierarchyTree );
        window.mainarea.getSection(1).getSection(1).add(this.m_Properties);

        // fetch the entities with their tags.
        const entities = this.m_Context.m_Registry.get_all_with_entity(banana.ComponentType.TagComponent);

        for ( const [id, tag] of Object.entries(entities)) 
        {
            let entity = { id: tag.GetName(), entityId: id, tag: tag }

            let tree = new LiteGUI.Tree( entity, { allow_rename: true });

            this.m_HierarchyTree.add( tree );

            LiteGUI.bind( tree.root, "item_selected", (e) => {
                console.log("Node selected: ", e.detail.data.id); 
                this.m_SelectionContext = e.detail.data.entityId;

                this.DrawComponents(this.m_SelectionContext);
            });
    
            LiteGUI.bind( tree.root, 'item_renamed', (e) => {
                e.detail.data.tag.SetName(e.detail.new_name);
                e.detail.data.id = e.detail.new_name;
            });
        }
    }

    DrawComponents(entityId) 
    {
        LiteGUI.remove(this.m_Inspector);

        this.m_Inspector = new LiteGUI.Inspector();

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.TagComponent)) 
        {
            this.m_Inspector.addInfo('Tag');

            let tag = this.m_Context.m_Registry.get(entityId, banana.ComponentType.TagComponent);

            this.m_Inspector.addString('Name:', tag.GetName());
            this.m_Inspector.addSeparator();
        }

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.TransformComponent)) 
        {
            this.m_Inspector.addInfo('Transform');

            let transform = this.m_Context.m_Registry.get(entityId, banana.ComponentType.TransformComponent);

            const position = this.m_Inspector.addVector3('Position:', transform.GetPosition());
            const rotation = this.m_Inspector.addVector3('Rotation:', transform.GetRotation());
            const scale = this.m_Inspector.addVector3('Scale:', transform.GetScale());

            LiteGUI.bind(position, 'wchange', (e) => {
                console.log(e.detail[0]);
                transform.SetPosition(e.detail[0][0], e.detail[0][1], e.detail[0][2]);
            });

            LiteGUI.bind(rotation, 'wchange', (e) => {
                console.log(e.detail[0]);
                transform.SetRotation(e.detail[0][0], e.detail[0][1], e.detail[0][2]);
            });

            LiteGUI.bind(scale, 'wchange', (e) => {
                console.log(e.detail[0]);
                transform.SetScale(e.detail[0][0], e.detail[0][1], e.detail[0][2]);
            });

            this.m_Inspector.addSeparator();
        }

        if (this.m_Context.m_Registry.has(entityId, banana.ComponentType.SpriteRendererComponent)) 
        {
            this.m_Inspector.addInfo('Sprite');

            let sprite = this.m_Context.m_Registry.get(entityId, banana.ComponentType.SpriteRendererComponent);
            const c = sprite.GetColor();

            console.log(c);

            const color = this.m_Inspector.addVector4('Color:', [c[0]*255, c[1]*255, c[2]*255, c[3]*255], {max: 255, min: 0});

            LiteGUI.bind(color, 'wchange', (e) => {
                sprite.SetColor(new banana.Color(e.detail[0][0], e.detail[0][1], e.detail[0][2], e.detail[0][3]));
            });

            this.m_Inspector.addSeparator();
        } 

        this.m_Properties.add(this.m_Inspector);
    }
}