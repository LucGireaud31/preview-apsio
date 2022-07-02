import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { AmbientLight, DirectionalLight, PointLight } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

export function CustomShape() {
  const { setSize, scene, camera, gl } = useThree();

  addEventListener("resize", () => {
    setSize(innerWidth, innerHeight);
  });

  const light = new PointLight();
  light.position.set(0, 150, 150);
  
  scene.clear();
  scene.add(light);
  
  // Custom obj
  const mtl = useLoader(MTLLoader, "customShape/around.mtl");
  const obj = useLoader(OBJLoader, "customShape/around.obj",
   (l: any) => {
    mtl.preload();
    l.setMaterials(mtl);
  });
  const mtl2 = useLoader(MTLLoader, "customShape/center.mtl");
  const obj2 = useLoader(OBJLoader, "customShape/center.obj",
   (l: any) => {
    mtl2.preload();
    l.setMaterials(mtl2);

    obj.position.y = 500

    gsap.to(obj.position,{
        y:0,
        duration:2.5,
        ease:"elastic.out(0.5, 0.3)"
    })
  });

  camera.position.z = 500;
  camera.position.y = 200;



  // orbital control
  const o = new OrbitControls(camera, gl.domElement);
  
  useFrame(()=>{
    obj.rotation.y+=0.01
    obj2.rotation.y-=0.01
  })
  
  scene.add(obj);
  scene.add(obj2);

  return <></>;
}
