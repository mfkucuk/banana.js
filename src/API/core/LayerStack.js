import { Log } from "./Log.js";

export class LayerStack 
{
    constructor() 
    {
        this.m_Layers = [];
        this.m_LastLayerIndex = 0;
    }

    PushLayer(layer) 
    {
        this.m_Layers.splice(this.m_LastLayerIndex, 0, layer);
        this.m_LastLayerIndex++;
    }

    PushOverlay(overlay)
    {
        this.m_Layers.push(overlay);
    }

    PopLayer(layer) 
    {
        let index = this.m_Layers.indexOf(layer);

        if (index == -1) 
        {
            Log.Core_Error(`Layer '${layer.GetDebugName()}' does not exist!`);
            return;
        }

        this.m_Layers.splice(index, 1);
        this.m_LastLayerIndex--;
    }

    PopOverlay(overlay) 
    {
        let index = this.m_Layers.indexOf(overlay);

        if (index == -1) 
        {
            Log.Core_Error(`Overlay '${overlay.GetDebugName()}' does not exist!`);
            return;
        }

        this.m_Layers.splice(index, 1);
    }

    GetLayers() 
    {
        return this.m_Layers;
    }
}