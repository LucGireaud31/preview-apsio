import { useLoader, useThree } from "@react-three/fiber";
import { MaterialLoader, ObjectLoader, PointLight } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

//  export function Model({ ...props }) {
//     const group = useRef(null)

//     const { nodes, materials } = useGLTF('customShape/shape.glb')
//     return (
//       <group ref={group} {...props} dispose={null} scale={1}>
//         <mesh geometry={nodes.Box_1.geometry} material={materials['Cupcake 1']} position={[0.08, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0} />
//         <mesh geometry={nodes.Box_1_1.geometry} material={materials['Cupcake 1']} position={[0.04, 0, -0.07]} rotation={[-Math.PI / 2, 0, Math.PI / 3]} scale={0} />
//         <mesh geometry={nodes.Box_1_2.geometry} material={materials['Cupcake 1']} position={[-0.04, 0, -0.07]} rotation={[-Math.PI / 2, 0, 2.09]} scale={0} />
//         <mesh geometry={nodes.Box_1_3.geometry} material={materials['Cupcake 1']} position={[-0.08, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={0} />
//         <mesh geometry={nodes.Box_1_4.geometry} material={materials['Cupcake 1']} position={[-0.04, 0, 0.07]} rotation={[-Math.PI / 2, 0, -2.09]} scale={0} />
//         <mesh geometry={nodes.Box_1_5.geometry} material={materials['Cupcake 1']} position={[0.04, 0, 0.07]} rotation={[-Math.PI / 2, 0, -Math.PI / 3]} scale={0} />
//         <mesh geometry={nodes.Polyhedron.geometry} material={materials['Amelia 2']} rotation={[-Math.PI / 2, 0, 0]} scale={0} />
//         <mesh geometry={nodes.Plane.geometry} material={materials.Tuscan} rotation={[-Math.PI / 2, 0, 0]} scale={0} />
//       </group>
//     )
//   }

export function CustomShape() {
  const { setSize, scene, camera } = useThree();

  addEventListener("resize", () => {
    setSize(innerWidth, innerHeight);
  });

  const light = new PointLight(0xff0000, 1.4, 1000);
  light.position.set(0, 15, 15);

  scene.clear();
  scene.add(light);

  const mtl = useLoader(MTLLoader, "customShape/center.mtl");

  const obj = useLoader(OBJLoader, "customShape/center.obj", (l: any) => {
    mtl.preload();
    l.setMaterials(mtl);
  });
  camera.position.z = 200;

  scene.add(obj);

  return <></>;
}
