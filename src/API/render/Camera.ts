import { canvas } from '../core/Window.ts'
import { Log } from '../core/Log.ts'
import { Event, EventType, EventDispatcher } from '../event/Event.ts'
import { Utils, Vec3, Mat4 } from '../math/MV.ts';

export enum CameraType {
    Orthographic, 
    Perspective,
};

class Camera {
    projectionMatrix: Mat4;
    cameraType: CameraType;
    aspectRatio: number;

    size: number;
    near: number;
    far: number;

    constructor() {
        this.projectionMatrix = new Mat4();  
    
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

        this.projectionMatrix.setPerspective(Utils.toRadians(fovy), this.aspectRatio, near, far);
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

    viewMatrix: Mat4;
    viewProjectionMatrix: Mat4;

    cameraPosition: Vec3;
    cameraRotation: number;

    constructor() {
        super();

        this.viewMatrix = new Mat4();
        this.viewProjectionMatrix = new Mat4();
        
        this.cameraPosition = new Vec3(0, 0, 0);
        this.cameraRotation = 0;

        this.setView();
        this.setOrthographic(446, -1, 1);
        this.recalculateViewProjectionMatrix();
    }

    setView() {
        this.viewMatrix.setTranslation(this.cameraPosition);

        this.viewMatrix.applyRotationZ(this.cameraRotation);

        this.viewMatrix.invert();
    }

    getViewProjectionMatrix() {
        return this.viewProjectionMatrix;
    }

    recalculateViewProjectionMatrix() {
        this.viewProjectionMatrix = new Mat4();
        this.viewProjectionMatrix.mul(this.projectionMatrix);
        this.viewProjectionMatrix.mul(this.viewMatrix);
    }

    getPosition() {
        return Vec3.copy(this.cameraPosition);
    }

    setPosition(x, y, z) {
        this.cameraPosition.x = x;
        this.cameraPosition.y = y;
        this.cameraPosition.z = z;

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