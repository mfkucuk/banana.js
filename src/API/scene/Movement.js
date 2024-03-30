import { Input, KeyCode, Log } from "../banana.js"
import { ScriptableEntity } from "./ScriptableEntity.js"

export class Movement extends ScriptableEntity 
{    
    OnCreate() 
    {
        Log.Info('I AM ALIVE');

        this.speed = 10;
    }

    OnUpdate(deltaTime) 
    {
        if (Input.IsKeyPressed(KeyCode.A)) 
        {
            this.transform.Translate(-this.speed, 0, 0);
        }

        if (Input.IsKeyPressed(KeyCode.D)) 
        {
            this.transform.Translate(this.speed, 0, 0);
        }

        if (Input.IsKeyPressed(KeyCode.W)) 
        {
            this.transform.Translate(0, -this.speed, 0);
        }

        if (Input.IsKeyPressed(KeyCode.S)) 
        {
            this.transform.Translate(0, this.speed, 0);
        }
    }
}