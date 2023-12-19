import * as banana from '../../src/banana.js'

export class ViewportPanel 
{
    constructor() 
    {

    }

    OnGUIRender() 
    {
        window.mainarea.content.appendChild(banana.canvas);
    }
}