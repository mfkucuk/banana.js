export class ConsolePanel 
{
    constructor() 
    {
        this.m_Console = new LiteGUI.Panel({ id: "bottom_panel", title:"Console",hide:true, scroll: true});
        this.m_Inspector = new LiteGUI.Inspector();
        this.m_ClearButton = new LiteGUI.Button('Clear', {callback: () => {
            LiteGUI.remove(this.m_Inspector);

            this.m_Inspector = new LiteGUI.Inspector();

            this.m_Console.add( this.m_Inspector );
        }});

        this.m_Console.add( this.m_ClearButton );
        this.m_Console.add( this.m_Inspector ); 
    }

    OnGUIRender() 
    {
        window.mainarea.getSection(0).split("vertical", ['70%', "30%"], false);
        mainarea.getSection(0).getSection(1).add( this.m_Console );

        document.addEventListener('logEvent', (event) => 
        {
            this.m_Inspector.addInfo(event.detail.dest, event.detail.message);
        });
    }
}