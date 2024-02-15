export class ContextMenuPanel 
{
    static s_ContextMenu = null;

    static Reopen(contextMenu) 
    {
        if (this.s_ContextMenu) 
        {
            this.s_ContextMenu.close();
        }

        this.s_ContextMenu = contextMenu;
    }

    static Close() 
    {
        if (this.s_ContextMenu) 
        {
            this.s_ContextMenu.close();
        }
    }
}