import * as banana from '../src/banana.js'
import * as weml from '../src/ext/weml.js/weml.js'

export class EditorGUI extends banana.Layer 
{
    constructor() 
    {
        super('Editor GUI');

    }

    OnAttach() 
    {
        



        let glCanvas = document.getElementById('gl-canvas');

        


        

        //hierarchyTree.dockTo( mainarea.getSection(1).content,"full");
        //hierarchyTree.show();
        LiteGUI.bind( mainmenu, "closed", function() { mainarea.merge(); } );
        LiteGUI.bind( hierarchyTree, "closed", function() { mainarea.merge(); });

        window.sidepanel = hierarchyTree;

        //mainarea.getSection(0).split("horizontal", ["79.8%","20%"], true);
        //mainarea.getSection(1).split("vertical", [null, "0%"], true);
        mainarea.getSection(0).split("vertical", [null, "30%"], true);

        var console = new LiteGUI.Panel({ id: "bottom_panel", title:"Content Browser",hide:true});
        mainarea.getSection(0).getSection(1).add( console );
        LiteGUI.bind( console,"closed",function() { LiteGUI.mainarea.getSection(0).merge() });
    }

    OnUpdate(deltaTime) 
    {
        
    }

    OnEvent(event) 
    {

    }

    OnRunButtonClicked() 
    {
        window.open("/Game/game.html", "", `width=100,height=100`);
    }
}