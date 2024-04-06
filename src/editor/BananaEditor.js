import React, { useEffect, useState } from "react";
import * as banana from "../API/banana";
import { EditorLayer } from "./EditorLayer";
import SceneHierarchyPanel from "./panels/SceneHierarchyPanel";

import './editor.css';

class BananaEditor extends banana.Application 
{
    constructor() 
    {
        super('banana.js Editor', 1280, 800);

        document.addEventListener('click', (event) => {
            //ContextMenuPanel.Close();
        });

        this.pushLayer(new EditorLayer());
    }

    onWindowResized(event) 
    {
        banana.canvas.width = event.getWidth() * (0.7);
        banana.canvas.height = event.getHeight() * (0.7);
        banana.RenderCommand.setViewport(banana.canvas.width, banana.canvas.height);
        return true;
    }
}

banana.Application.createApplication = function() 
{
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
    
    function handleBananaMainComplete() {
        setBananaMainComplete(true);
    }

    return (
        <div className="container">
            <Window handleBananaMainComplete={handleBananaMainComplete}/>
            { bananaMainComplete && <SceneHierarchyPanel/> }
        </div>
    );
}


export default Editor