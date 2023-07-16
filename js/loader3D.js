import { GLTFLoader } from "GLTFLoader"
import { OrbitControls } from "OrbitControls"

class SceneRenderer{
    constructor(gltfObj, canvasELem){
        this.gltfObject = gltfObj;
        this.canvasElement = canvasELem;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerpectiveCamera(75, this.canvasElement.offsetWidth / this.canvasElement.offsetHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas : this.canvasElement});
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.init();
        this.addEventListener();
    }

    init(){
        this.renderer.setSize(this.canvasElement.offsetWidth, this.canvasElement.offsetHeight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1,1,1).normalize();
        this.scene.add(directionalLight)

        const loader = new GLTFLoader();
        loader.load(this.gltfObject, (gltf)=>{
            this.scene.add(gltf.Scene);
        });

        this.camera.position.z = 5;

        this.animate();
    }

    addEventListener(){
        window.addEventListener("resize", ()=>{
            this.onWIndowResize()
        }, false)
    }

    onWIndowResize(){
        this.camera.aspect = this.canvasElement.offsetWidth / this.canvasElement.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvasElement.offsetWidth ,this.canvasElement.offsetHeight)
    }

    animate(){
        requestAnimationFrame(()=>this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}


// La version qui n'afiche rien mais en recherche 

class SceneRenderer{
    constructor(gltfObj, canvasELem){
        this.gltfObject = gltfObj;
        this.canvasElement = canvasELem;
        this.parentElement = canvasELem.parentElement;

        this.canvasElement.width = this.parentElement.clientWidth;
        this.canvasElement.height = this.parentElement.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha : true, antialias : true});
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.init();
        this.addEventListener();
    }

    init(){
        this.renderer.setSize(this.parentElement.clientWidth, this.parentElement.clientHeight);
        this.canvasElement.appendChild(this.renderer.domElement);

        this.renderer.setClearColor(0x000000, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1,1,1).normalize();
        this.scene.add(directionalLight)

        const loader = new GLTFLoader();
        loader.load(this.gltfObject, (gltf)=>{
            this.scene.add(gltf.scene);
        });

        this.camera.position.z = 5;

        this.onWIndowResize();
        this.animate();
    }

    addEventListener(){
        window.addEventListener("resize", ()=>{
            this.onWIndowResize()
        }, false)
    }

    onWIndowResize(){
        const width = this.parentElement.clientWidth;
        const height = this.parentElement.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width ,height)
    }

    animate(){
        requestAnimationFrame(()=>this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

const btn_controls = document.querySelector("#all-container .btn-controls")
const menu = document.querySelector("#all-container .second-menu")
let active = true;
btn_controls.addEventListener("click", (e)=>{
    e.preventDefault()
    menu.classList.toggle("active");
    btn_controls.classList.toggle('perm')
    loadLink()
})

window.addEventListener("resize", (e)=>{
    verifyWidth()
})