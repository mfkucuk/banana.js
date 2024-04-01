import { Log } from "./Log.js";

export class LayerStack 
{
    constructor() 
    {
        this.layers = [];
        this.lastLayerIndex = 0;
    }

    PushLayer(layer) 
    {
        this.layers.splice(this.lastLayerIndex, 0, layer);
        this.lastLayerIndex++;
    }

    PushOverlay(overlay)
    {
        this.layers.push(overlay);
    }

    PopLayer(layer) 
    {
        let index = this.layers.indexOf(layer);

        if (index == -1) 
        {
            Log.Core_Error(`Layer '${layer.GetDebugName()}' does not exist!`);
            return;
        }

        this.layers.splice(index, 1);
        this.lastLayerIndex--;
    }

    PopOverlay(overlay) 
    {
        let index = this.layers.indexOf(overlay);

        if (index == -1) 
        {
            Log.Core_Error(`Overlay '${overlay.GetDebugName()}' does not exist!`);
            return;
        }

        this.layers.splice(index, 1);
    }

    GetLayers() 
    {
        return this.layers;
    }
}