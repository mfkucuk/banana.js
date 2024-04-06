#version 300 es

in vec4 a_Position;
in vec2 a_TexCoord;
in float a_TexIndex;
in vec4 a_Color;
in vec3 a_Translation, a_Scaling;
in float a_Rotation;

out vec2 v_TexCoord;
out float v_TexIndex;
out vec4 v_Color;

uniform mat4 u_ViewProjectionMatrix;

mat4 translate(vec3 t) {
    mat4 result = mat4(1.0);
    result[3] = vec4(t, 1.0);
    return result;
}

mat4 rotateZ(float angle) {
    float c = cos(radians(angle));
    float s = sin(radians(angle));

    return mat4(
        vec4(c, -s, 0.0, 0.0),
        vec4(s, c,  0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

mat4 scale(vec3 s) {
    mat4 result = mat4(1.0);
    result[0][0] = s.x;
    result[1][1] = s.y;
    result[2][2] = s.z;
    return result;
}


void main()
{
    v_TexCoord = a_TexCoord;
    v_TexIndex = a_TexIndex;
    v_Color = a_Color;

    mat4 translationMatrix = translate(a_Translation);
    mat4 rotationMatrix = rotateZ(a_Rotation);
    mat4 scalingMatrix = scale(a_Scaling);

    gl_Position = u_ViewProjectionMatrix * translationMatrix * rotationMatrix * scalingMatrix * a_Position; 
}

$#version 300 es

precision mediump float;

in vec2 v_TexCoord;
in float v_TexIndex;
in vec4 v_Color;

uniform sampler2D u_Textures[16];

out vec4 fragColor;

void main()
{
    vec4 l_Texture;
    int l_TexIndex = int(v_TexIndex);

    switch (l_TexIndex) {
        case 0:  l_Texture = texture(u_Textures[0],  v_TexCoord); break;
        case 1:  l_Texture = texture(u_Textures[1],  v_TexCoord); break;
        case 2:  l_Texture = texture(u_Textures[2],  v_TexCoord); break;
        case 3:  l_Texture = texture(u_Textures[3],  v_TexCoord); break;
        case 4:  l_Texture = texture(u_Textures[4],  v_TexCoord); break;
        case 5:  l_Texture = texture(u_Textures[5],  v_TexCoord); break;
        case 6:  l_Texture = texture(u_Textures[6],  v_TexCoord); break;
        case 7:  l_Texture = texture(u_Textures[7],  v_TexCoord); break;
        case 8:  l_Texture = texture(u_Textures[8],  v_TexCoord); break;
        case 9:  l_Texture = texture(u_Textures[9],  v_TexCoord); break;
        case 10: l_Texture = texture(u_Textures[10], v_TexCoord); break;
        case 11: l_Texture = texture(u_Textures[11], v_TexCoord); break;
        case 12: l_Texture = texture(u_Textures[12], v_TexCoord); break;
        case 13: l_Texture = texture(u_Textures[13], v_TexCoord); break;
        case 14: l_Texture = texture(u_Textures[14], v_TexCoord); break;
        case 15: l_Texture = texture(u_Textures[15], v_TexCoord); break;
      }

    fragColor = l_Texture * v_Color;
}