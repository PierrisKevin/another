import { GLTFLoader } from "GLTFLoader"
import { OrbitControls } from "OrbitControls"


class SceneRenderer{
    constructor(gltfObj, canvasELem){
        this.gltfObject = gltfObj;
        this.canvasElement = canvasELem;
        this.parentElement = canvasELem.parentElement;

        this.canvasElement.width = this.parentElement.clientWidth-50;
        this.canvasElement.height = this.parentElement.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvasElement.offsetWidth / this.canvasElement.offsetHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas : this.canvasElement, alpha : true, antialias : true});
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.models = null;
        // this.controls.autoRotate = true

        this.init();
        this.addEventListener();
    }

    init(){
        this.renderer.setSize(this.parentElement.clientWidth-50, this.parentElement.clientHeight-50);

        this.renderer.setClearColor(0x000000, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1,1,1).normalize();
        this.scene.add(directionalLight)

        const loader = new GLTFLoader();
        loader.load(this.gltfObject, (gltf)=>{
            const model = gltf.scene;
            model.scale.set(2,2,2);

            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);

            model.position.x = 5;
            model.position.y = -10;
            model.position.z = -15;

            this.scene.add(model);

        });

        this.camera.position.z = 2;
        this.camera.position.y = 0

        

        this.animate();
    }

    addEventListener(){
        window.addEventListener("resize", ()=>{
            this.onWIndowResize()
        }, false)
    }

    onWIndowResize(){
        const width = this.parentElement.clientWidth-50;
        const height = this.parentElement.clientHeight-50;

        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width ,height)
    }

    animate(){
        requestAnimationFrame(()=>this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        // this.models.rotate.z += 0.1
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

function loadLink(n=0){
    if(n<menu.children.length+1){
        if(n!=0){
            menu.children[n-1].classList.toggle("open")
        }
        setTimeout(()=>loadLink(n+1),200);
    }
}
function verifyWidth(){
    if (window.innerWidth>850){
        // btn_controls.classList.remove("active")
        window.addEventListener("scroll", (e)=>{
            console.log(window.scrollY)
            if(window.scrollY>80){
                if (btn_controls.classList.contains("active")) return false;
                btn_controls.classList.add("active")
            }
            else{
                btn_controls.classList.remove("active")
            }
        })
    }
    else{
        btn_controls.classList.add("active")
    }
}
// Partie gestion des loaders
function removeWelcom(n=0){
    if (n==0){
        setTimeout(()=>removeWelcom(n+1),4000);
    }
    else document.querySelector("#welcome").style.display = "none";
}
window.addEventListener("load", ()=>{
    removeWelcom();
    verifyWidth();

    const gltfObject = "./scene.gltf"
    const canvas = document.querySelector("#three-contain")
    const sceneRendu = new SceneRenderer(gltfObject, canvas)
})