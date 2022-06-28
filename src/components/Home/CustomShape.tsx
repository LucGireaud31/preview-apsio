import { useThree } from "@react-three/fiber";
import {MaterialLoader, ObjectLoader, PointLight } from "three";
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

 export function Model({ ...props }) {
    const group = useRef(null)
    const { nodes, materials } = useGLTF('customShape/shape.glb')
    return (
      <group ref={group} {...props} dispose={null} scale={1}>
        <mesh geometry={nodes.Box_1.geometry} material={materials['Cupcake 1']} position={[0.08, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0} />
        <mesh geometry={nodes.Box_1_1.geometry} material={materials['Cupcake 1']} position={[0.04, 0, -0.07]} rotation={[-Math.PI / 2, 0, Math.PI / 3]} scale={0} />
        <mesh geometry={nodes.Box_1_2.geometry} material={materials['Cupcake 1']} position={[-0.04, 0, -0.07]} rotation={[-Math.PI / 2, 0, 2.09]} scale={0} />
        <mesh geometry={nodes.Box_1_3.geometry} material={materials['Cupcake 1']} position={[-0.08, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={0} />
        <mesh geometry={nodes.Box_1_4.geometry} material={materials['Cupcake 1']} position={[-0.04, 0, 0.07]} rotation={[-Math.PI / 2, 0, -2.09]} scale={0} />
        <mesh geometry={nodes.Box_1_5.geometry} material={materials['Cupcake 1']} position={[0.04, 0, 0.07]} rotation={[-Math.PI / 2, 0, -Math.PI / 3]} scale={0} />
        <mesh geometry={nodes.Polyhedron.geometry} material={materials['Amelia 2']} rotation={[-Math.PI / 2, 0, 0]} scale={0} />
        <mesh geometry={nodes.Plane.geometry} material={materials.Tuscan} rotation={[-Math.PI / 2, 0, 0]} scale={0} />
      </group>
    )
  }


export function CustomShape() {


const {setSize,scene} = useThree();

addEventListener("resize",()=>{
    setSize(innerWidth,innerHeight)
    
})

const light = new PointLight(0xFFFFFF,1.4,1000);
light.position.set(0,15,15)

scene.clear()
scene.add(light)

// const mtl = new MaterialLoader();
// mtl.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.mtl",(materials)=>{
//     {console.log("salut")}
//     materials.preload();

//     const obj = new ObjectLoader();
//     obj.setMaterials(materials)
//     obj.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.obj",(obj)=>{
//         scene.add(obj)
//     })


// })

return (
<></>
);
}