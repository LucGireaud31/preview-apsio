import { useLoader, useThree } from "@react-three/fiber";
import { AmbientLight } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function CustomShape() {
  const { setSize, scene, camera, gl } = useThree();

  addEventListener("resize", () => {
    setSize(innerWidth, innerHeight);
  });

  const light = new AmbientLight();
  light.position.set(0, 0, 1);

  scene.clear();
  scene.add(light);

  // Custom obj
  const mtl = useLoader(MTLLoader, "customShape/center.mtl");
  const obj = useLoader(OBJLoader, "customShape/center.obj", (l: any) => {
    mtl.preload();
    l.setMaterials(mtl);
  });

  camera.position.z = 200;

  // orbital control
  const o = new OrbitControls(camera, gl.domElement);

  scene.add(obj);

  return <></>;
}
