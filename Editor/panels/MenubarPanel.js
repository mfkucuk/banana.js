export class MenubarPanel 
{
    constructor() 
    {
        this.m_GameRunning = false;
    }

    OnGUIRender() 
    {
        const mainmenu = new LiteGUI.Menubar("mainmenubar");
        
        mainmenu.add("Game/Run", () => {
            this.m_GameRunning = !this.m_GameRunning;
        });
        
        window.mainarea.add(mainmenu);
    }

    IsGameRunning() 
    {
        return this.m_GameRunning;
    }
}