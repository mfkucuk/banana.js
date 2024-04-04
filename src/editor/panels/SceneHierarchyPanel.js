import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";
import * as banana from "../../API/banana";

import '../editor.css';

class SceneHierarchyPanel extends React.Component {
    static setScene(scene) {
        SceneHierarchyPanel.scene = scene;
    }


    render() {
        return (
            <div className="item">
                <Tree/>
                <InspectorPanel/>
                { false && <InspectorContent/>}
            </div>
        );
    }
}

function Tree(props) {

    const names = [];

    const entities = SceneHierarchyPanel.scene.registry.get_all_with_entity(banana.ComponentType.TagComponent);

    for (const [id, tag] of Object.entries(entities)) {
        names.push(<TreeItem key={id} name={tag.getName()} id={id}/>);
    }


    return (
        <div>{names}</div>
    );
}

function TreeItem(props) {

    function handleTreeItemClick() {
        console.log(props.id);
        SceneHierarchyPanel.selectedEntity = props.id;
    }

    return (
        <a className="tree-item" href="#" onClick={handleTreeItemClick}><div>{props.name}</div></a>
    );
}

function InspectorPanel() {
    return (
        <div>
            <h1 key={'Inspector'}>Inspector</h1>
        </div>
    );
}

function InspectorContent() {

    const components = [];

    const tag = SceneHierarchyPanel.scene.registry.get(SceneHierarchyPanel.selectedEntity, banana.ComponentType.TagComponent);

    if (SceneHierarchyPanel.scene.registry.has(SceneHierarchyPanel.selectedEntity, banana.ComponentType.SpriteRendererComponent)) {
        const spriteRenderer = SceneHierarchyPanel.scene.registry.get(SceneHierarchyPanel.selectedEntity, banana.ComponentType.SpriteRendererComponent);
    }

    components.push(<p key={tag.getName()}>Tag Component: {tag.getName()}</p>);

    return (
        <div>
            {components}
        </div>
    );
}

export default SceneHierarchyPanel