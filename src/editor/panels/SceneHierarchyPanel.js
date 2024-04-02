import React from "react";
import ReactDOM from "react-dom";
import * as banana from "../../API/banana";

class SceneHierarchyPanel extends React.Component {
    static setScene(scene) {
        SceneHierarchyPanel.scene = scene;
    }

    render() {

        const names = [];

        const entities = SceneHierarchyPanel.scene.registry.get_all_with_entity(banana.ComponentType.TagComponent);

        for (const [id, tag] of Object.entries(entities)) {
            names.push(<TreeItem key={id} name={tag.getName()}/>);
            SceneHierarchyPanel.selectedEntity = id;
        }
        

        return (
            <div>
                {names}
                <Inspector/>
            </div>
        );
    }
}

function TreeItem(props) {
    return (
        <p>{props.name}</p>
    );
}

function Inspector() {

    const components = [];

    components.push(<h1 key={'Inspector'}>Inspector</h1>);

    const tag = SceneHierarchyPanel.scene.registry.get(SceneHierarchyPanel.selectedEntity, banana.ComponentType.TagComponent);

    if (SceneHierarchyPanel.scene.registry.has(SceneHierarchyPanel.selectedEntity, banana.ComponentType.SpriteRendererComponent)) {
        const spriteRenderer = SceneHierarchyPanel.scene.registry.get(SceneHierarchyPanel.selectedEntity, banana.ComponentType.SpriteRendererComponent)
    }

    components.push(<p key={tag.getName()}>Tag Component: {tag.getName()}</p>);

    return (
        <div>
            {components}
        </div>
    );
}

export default SceneHierarchyPanel