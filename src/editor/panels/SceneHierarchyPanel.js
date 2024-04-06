import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";
import * as banana from "../../API/banana";

import '../editor.css';

class SceneHierarchyPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEntity: null,
        };
    }

    static setScene(scene) {
        SceneHierarchyPanel.scene = scene;
    }

    handleTreeItemClick = (id) => {
        this.setState({ selectedEntity: id });
    }

    render() {
        return (
            <div className="item">
                <Tree handleTreeItemClick={this.handleTreeItemClick}/>
                <InspectorPanel/>
                { this.state.selectedEntity && <InspectorContent id={this.state.selectedEntity}/>}
            </div>
        );
    }
}

function Tree(props) {

    const names = [];

    const entities = SceneHierarchyPanel.scene.registry.get_all_with_entity(banana.ComponentType.TagComponent);

    for (const [id, tag] of Object.entries(entities)) {
        names.push(<TreeItem key={id} name={tag.getName()} id={id} handleTreeItemClick={props.handleTreeItemClick}/>);
    }


    return (
        <div>{names}</div>
    );
}

function TreeItem(props) {

    function handleItemClick(event) {
        event.preventDefault();
        props.handleTreeItemClick(props.id);
    }

    return (
        <a className="tree-item" href="#" onClick={handleItemClick}><div>{props.name}</div></a>
    );
}

function InspectorPanel() {
    return (
        <div>
            <h1 key={'Inspector'}>Inspector</h1>
        </div>
    );
}

function InspectorContent(props) {

    const components = [];

    const tag = SceneHierarchyPanel.scene.registry.get(props.id, banana.ComponentType.TagComponent);

    if (SceneHierarchyPanel.scene.registry.has(props.id, banana.ComponentType.SpriteRendererComponent)) {
        const spriteRenderer = SceneHierarchyPanel.scene.registry.get(props.id, banana.ComponentType.SpriteRendererComponent);
    }

    components.push(<p key={tag.getName()}>Tag Component: {tag.getName()}</p>);

    return (
        <div>
            {components}
        </div>
    );
}

export default SceneHierarchyPanel