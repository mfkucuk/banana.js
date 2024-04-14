import React, { useEffect, useState } from "react";
import * as banana from "../../API/banana";
import { useBananaEditor } from "../BananaEditor";

import '../editor.css';

function SceneHierarchyPanel() {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [scene, setScene] = useState(null);

    const bananaEditor = useBananaEditor();

    console.log(bananaEditor);

    useEffect(() => {
        if (bananaEditor) {
            setScene(bananaEditor.getScene());
        }
    }, []);

    const entities = [];

    const handleTreeItemClick = (id) => {
        setSelectedEntity(id);
    }

    if (scene) {
        const entitiesWithTag = scene.registry.get_all_with_entity(banana.ComponentType.TagComponent);
        for (const [id, tag] of Object.entries(entitiesWithTag)) {
            entities.push(<TreeItem key={id} name={tag.getName()} id={id} handleTreeItemClick={handleTreeItemClick}/>);
        }
    }

    const components = [];
    if (selectedEntity && scene) {
        const tag = scene.registry.get(selectedEntity, banana.ComponentType.TagComponent);

        if (scene.registry.has(selectedEntity, banana.ComponentType.SpriteRendererComponent)) {
            const spriteRenderer = scene.registry.get(selectedEntity, banana.ComponentType.SpriteRendererComponent);
        }

        components.push(<p key={tag.getName()}>Tag Component: {tag.getName()}</p>);
    }

    return (
        <div className="item">
            { entities }
            <h1 key={'Inspector'}>Inspector</h1>
            { selectedEntity && components }
        </div>
    );
}

function TreeItem(props) {
    return (
        <a className="tree-item" href="#" onClick={props.handleTreeItemClick}><div>{props.name}</div></a>
    );
}

export default SceneHierarchyPanel;
