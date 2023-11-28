import * as banana from '../banana.js'
import { Sandbox2D } from './Sandbox2D.js'
import { SolarSystem } from './SolarSystem.js'

class ExampleLayer extends banana.Layer 
{
    constructor() 
    {
        super('Example');

        let vertices = [
            banana.MV.vec2(-50, -50), banana.MV.vec2(0, 0),
            banana.MV.vec2(-50, 50), banana.MV.vec2(0, 1),
            banana.MV.vec2(50, -50), banana.MV.vec2(1, 0), 
            banana.MV.vec2(50, 50), banana.MV.vec2(1, 1)
        ];

        let indices = [
            banana.MV.vec3(0, 1, 2), 
            banana.MV.vec3(1, 2, 3)
        ];

        let textureShader = '/sandbox/assets/shader/2d.glsl';

        this.m_ShaderLibrary = new banana.ShaderLibrary();

        this.m_ShaderLibrary.LoadShader('Texture' ,textureShader);

        this.m_Shader;

        this.m_CameraController = new banana.OrthographicCameraController();
        this.m_VertexBuffer = new banana.VertexBuffer(vertices);
        this.m_IndexBuffer = new banana.IndexBuffer(indices);
        this.m_Texture1 = new banana.Texture('/sandbox/assets/tex/f-texture.png');
        this.m_Texture2 = new banana.Texture('/sandbox/assets/tex/shizuka.jpg');
        this.m_Texture3 = new banana.Texture('/sandbox/assets/tex/earth.png');
    }

    OnAttach() 
    {
        this.m_Shader = this.m_ShaderLibrary.GetShader('Texture');
        
        let aPosition = this.m_Shader.GetAttributeLocation('a_Position');
        let aTexCoord = this.m_Shader.GetAttributeLocation('a_TexCoord');
        
        this.m_VertexBuffer.PushAttribute(aPosition, 2);
        this.m_VertexBuffer.PushAttribute(aTexCoord, 2);
        this.m_VertexBuffer.LinkAttributes();
        
        this.m_Shader.UseTexture(2);
        
        banana.RenderCommand.SetClearColor( new banana.Color(100, 100, 100, 255) );
    }

    OnUpdate(deltaTime) 
    {
        this.m_CameraController.Update(deltaTime);

        this.m_Texture1.Bind(0);
        this.m_Texture2.Bind(1);
        this.m_Texture3.Bind(2);

        banana.Renderer.BeginScene(this.m_CameraController.GetCamera());

        let transform = banana.MV.translate(100, 100, 0);
        transform = banana.MV.mult(transform, banana.MV.rotate(45, [0, 0, 1]));

        banana.RenderCommand.Clear();
        banana.Renderer.Flush(this.m_VertexBuffer, this.m_IndexBuffer, this.m_Shader, transform);

        banana.Renderer.EndScene();
    }

    OnEvent(event) 
    {        
        this.m_CameraController.OnEvent(event);
    }
}

class Sandbox extends banana.Application
{

    Run() 
    { 
        this.SetTitle('Sandbox2D');

        this.PushLayer(new Sandbox2D());   
    }
}

banana.Application.CreateApplication = function() 
{
    return new Sandbox();
}