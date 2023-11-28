attribute vec4 a_Position;
attribute vec2 a_TexCoord;
attribute vec4 a_Color;

varying vec2 v_TexCoord;
varying vec4 v_Color;

uniform mat4 u_ViewProjectionMatrix;

void main()
{
    v_TexCoord = a_TexCoord;
    v_Color = a_Color;
    gl_Position = u_ViewProjectionMatrix * a_Position; 
}

$

precision mediump float;

varying vec2 v_TexCoord;
varying vec4 v_Color;

uniform sampler2D u_Texture;

void main()
{
    // gl_FragColor = texture2D(u_Texture, v_TexCoord) + v_Color;
    gl_FragColor = v_Color;
}