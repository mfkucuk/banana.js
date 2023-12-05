import * as weml from '../ext/weml.js/weml.js'

let isString = value => typeof value === 'string';

const hex = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15
};


export function Color(r, g, b, a) 
{
    const map = 255.0;

    if (!isString(r)) 
    {
        return weml.Vec4(r/map, g/map, b/map, a/map);
    }

    if (!(r[0] === '#')) 
    {
        console.error("Invalid hex format")    
        return weml.Vec4(1.0, 1.0, 1.0, 1.0);
    }
    
    let hexString = r;

    r = (hex[hexString[1]] * 16 + hex[hexString[2]]) / map;
    g = (hex[hexString[3]] * 16 + hex[hexString[4]]) / map;
    b = (hex[hexString[5]] * 16 + hex[hexString[6]]) / map;

    return weml.Vec4(r, g, b, 1.0);
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