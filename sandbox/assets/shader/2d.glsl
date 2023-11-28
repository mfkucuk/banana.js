attribute vec4 a_Position;
attribute vec2 a_TexCoord;
attribute vec4 a_Color;

uniform mat4 u_ViewProjectionMatrix;
uniform mat4 u_Transform;

varying vec2 v_TexCoord;
varying vec4 v_Color;

void main()
{
    v_TexCoord = a_TexCoord;
    v_Color = a_Color;
    gl_Position = u_ViewProjectionMatrix * u_Transform * a_Position; 
}

$

precision mediump float;

varying vec2 v_TexCoord;
varying vec4 v_Color;

uniform sampler2D u_Texture;
uniform vec4 u_Color;

void main()
{
    gl_FragColor = u_Color;
}