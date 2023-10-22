import { Log } from "./Log.js";

export class LayerStack 
{
    constructor() 
    {
        this.m_Layers = [];
        this.m_LastLayerIndex = 0;
    }

    PushLayer = function(layer) 
    {
        this.m_Layers.splice(m_LastLayerIndex, 0, layer);
        this.m_LastLayerIndex++;
    }

    PushOverlay = function(overlay)
    {
        this.m_Layers.push(overlay);
    }

    PopLayer = function(layer) 
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

    PopOverlay = function(overlay) 
    {
        let index = this.m_Layers.indexOf(overlay);

        if (index == -1) 
        {
            Log.Core_Error(`Overlay '${layer.GetDebugName()}' does not exist!`);
            return;
        }

        this.m_Layers.splice(index, 1);
    }

    GetLayers = function() 
    {
        return this.m_Layers;
    }
}