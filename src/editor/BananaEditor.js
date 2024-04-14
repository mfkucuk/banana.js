import React, { useEffect, useState, createContext, useContext } from "react";
import * as banana from "../API/banana";
import { EditorLayer } from "./EditorLayer";
import SceneHierarchyPanel from "./panels/SceneHierarchyPanel";

import './editor.css';

// Context for BananaEditor instance
const BananaEditorContext = createContext(null);

class BananaEditor extends banana.Application {
    constructor() {
        super('banana.js Editor', 1280, 800);
        this.editorLayer = new EditorLayer();
        this.pushLayer(this.editorLayer);
    }

    // Method to retrieve scene
    getScene() {
        // Logic to retrieve the scene dynamically
        return this.editorLayer.activeScene;
    }

    onWindowResized(event) {
        banana.canvas.width = event.getWidth() * (0.7);
        banana.canvas.height = event.getHeight() * (0.7);
        banana.RenderCommand.setViewport(banana.canvas.width, banana.canvas.height);
        return true;
    }
}

banana.Application.createApplication = function () {
    return new BananaEditor();
}

function Window({ handleBananaMainComplete }) {
    useEffect(() => {
        banana.main();
        handleBananaMainComplete();
    }, [])

    return <canvas className="item" id="gl-canvas" width={600} height={600} tabIndex={1}></canvas>;
}

function Editor() {
    const [bananaMainComplete, setBananaMainComplete] = useState(false);
    const [bananaEditorInstance, setBananaEditorInstance] = useState(null);

    useEffect(() => {
        const editorInstance = BananaEditor.createApplication();
        setBananaEditorInstance(editorInstance);
        return () => {
            // Clean up editor instance if needed
        };
    }, []);

    function handleBananaMainComplete() {
        setBananaMainComplete(true);
    }

    return (
        <div className="container">
            <BananaEditorContext.Provider value={bananaEditorInstance}>
                <Window handleBananaMainComplete={handleBananaMainComplete} />
                {bananaMainComplete && <SceneHierarchyPanel />}
            </BananaEditorContext.Provider>
        </div>
    );
}

// Custom hook to access BananaEditor instance
function useBananaEditor() {
    return useContext(BananaEditorContext);
}

export default Editor;
export { useBananaEditor };
