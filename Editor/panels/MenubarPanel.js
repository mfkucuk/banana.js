import { gl } from "../../src/render/WebGLContext.js"

export class MenubarPanel 
{
    constructor() 
    {
        this.m_GameRunning = false;

        this.m_RendererInfo = new LiteGUI.Inspector();
        this.m_RendererDialog;

        this.m_BatchInfo = new LiteGUI.Inspector();
        this.m_BatchDialog;
    }

    OnGUIRender() 
    {
        // renderer info
        this.m_RendererInfo.addInfo('Vendor:', gl.getParameter(gl.VENDOR));
        this.m_RendererInfo.addInfo('Renderer:', gl.getParameter(gl.RENDERER));
        this.m_RendererInfo.addInfo('Version:', gl.getParameter(gl.VERSION));
        this.m_RendererInfo.addInfo('Shader:', gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
        
        // batch info

        const mainmenu = new LiteGUI.Menubar("mainmenubar");

        mainmenu.add("Game/Run", () => {
            this.m_GameRunning = !this.m_GameRunning;
        });

        mainmenu.add('Info/Renderer', () => {

            LiteGUI.remove(this.m_RendererDialog);

            // renderer info
            this.m_RendererDialog = new LiteGUI.Dialog({
                title: 'Renderer Info',
                close: true,
                width: 300,
                height: 120,
                draggable: true,
            });

            this.m_RendererDialog.show();
            this.m_RendererDialog.setPosition(50, 50);
            this.m_RendererDialog.add( this.m_RendererInfo );
        });
        
        window.mainarea.add(mainmenu);
    }

    IsGameRunning() 
    {
        return this.m_GameRunning;
    }
}