#version 300 es

in vec4 a_Position;
in vec4 a_Color;

out vec4 v_Color;

uniform mat4 u_ViewProjectionMatrix;

void main() {
    v_Color = a_Color;
    gl_Position = u_ViewProjectionMatrix * a_Position;
}

$#version 300 es

precision mediump float;

in vec4 v_Color;

out vec4 fragColor;

void main() {
    fragColor = v_Color;
}