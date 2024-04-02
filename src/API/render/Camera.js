import { canvas } from '../core/Window.ts'
import { Log } from '../core/Log.ts'
import * as weml from '../ext/weml.js/weml.js'
import { Event, EventType, EventDispatcher } from '../event/Event.ts'

export const CameraType = {
    Orthographic: 0, 
    Perspective: 1,
};

class Camera {
    constructor() {
        this.projectionMatrix = weml.Mat4();  
    
        this.cameraType = CameraType.Orthographic;      
        this.aspectRatio = parseFloat(canvas.width) / parseFloat(canvas.height)
    }

    setOrthographic(size, near, far) {
        this.cameraType = CameraType.Orthographic;

        this.size = size;
        this.near = near;
        this.far = far;

        this.setViewportSize();
    }

    setPerspective(fovy, near, far) {
        this.cameraType = CameraType.Perspective;

        this.projectionMatrix.setPerspective(weml.weml.toRadians(fovy), this.aspectRatio, near, far);
        this.size = fovy;
        this.near = near;
        this.far = far;
    }

    getViewProjectionMatrix() {
        return this.projectionMatrix;
    }

    getCameraType() {
        return this.cameraType;
    }

    setViewportSize() {
        let orthoLeft = -this.size * this.aspectRatio * 0.5;
        let orthoRight = this.size * this.aspectRatio * 0.5;
        let orthoBottom = this.size * 0.5;
        let orthoTop = -this.size * 0.5;

        this.projectionMatrix.setOrtho(orthoLeft, orthoRight, orthoBottom, orthoTop, this.near, this.far);
    }
}

export class SceneCamera extends Camera {
    constructor() {
        super();

        this.onWindowResized = this.onWindowResized.bind(this);

        this.setOrthographic(446, -1, 1);
    }

    onEvent(event) {
        const dispatcher = new EventDispatcher(event);

        dispatcher.dispatch(this.onWindowResized, EventType.WindowResizedEvent);
    }

    onWindowResized(event) {
        this.aspectRatio = parseFloat(canvas.width) / parseFloat(canvas.height)
        this.setViewportSize();

        return true;
    }
}

export class EditorCamera extends Camera {
    constructor() {
        super();

        this.viewMatrix = weml.Mat4();
        this.viewProjectionMatrix = weml.Mat4();
        
        this.cameraPosition = weml.Vec3(0, 0, 0);
        this.cameraRotation = 0;

        this.setView();
        this.setOrthographic(446, -1, 1);
        this.recalculateViewProjectionMatrix();
    }

    setView() {
        this.viewMatrix.setTranslationVec3(this.cameraPosition);

        this.viewMatrix.applyRotationZ(this.cameraRotation);

        this.viewMatrix.invert();
    }

    getViewProjectionMatrix() {
        return this.viewProjectionMatrix;
    }

    recalculateViewProjectionMatrix() {
        this.viewProjectionMatrix = weml.Mat4();
        this.viewProjectionMatrix.mul(this.projectionMatrix);
        this.viewProjectionMatrix.mul(this.viewMatrix);
    }

    getPosition() {
        return weml.Vec3(this.cameraPosition[0], this.cameraPosition[1], this.cameraPosition[2]);
    }

    setPosition(x, y, z) {
        this.cameraPosition[0] = x;
        this.cameraPosition[1] = y;
        this.cameraPosition[2] = z;

        this.setView();
        this.recalculateViewProjectionMatrix();
    }

    GetRotation() {
        return this.cameraRotation;
    }

    setRotation(angle) {
        this.cameraRotation = angle;

        this.setView();
        this.recalculateViewProjectionMatrix();
    }
}