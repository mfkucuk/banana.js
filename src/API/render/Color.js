import * as weml from '../ext/weml.js/weml.js'

export function Color(r, g, b, a) 
{
    const map = 255.0;

    return weml.Vec4(r/map, g/map, b/map, a/map);
    
}

Color.BLACK = weml.Vec4(0.0, 0.0, 0.0, 1.0);
Color.RED = weml.Vec4(1.0, 0.0, 0.0, 1.0);
Color.GREEN = weml.Vec4(0.0, 1.0, 0.0, 1.0);
Color.BLUE = weml.Vec4(0.0, 0.0, 1.0, 1.0);
Color.PURPLE = weml.Vec4(0.5, 0.0, 0.5, 1.0);
Color.YELLOW = weml.Vec4(1.0, 1.0, 0.0, 1.0);
Color.ORANGE = weml.Vec4(1.0, 0.47, 0.0, 1.0);
Color.CYAN = weml.Vec4(0.0, 1.0, 1.0, 1.0);
Color.WHITE = weml.Vec4(1.0, 1.0, 1.0, 1.0);
Color.TRANSPARENT = weml.Vec4(0.0, 0.0, 0.0, 0.0);