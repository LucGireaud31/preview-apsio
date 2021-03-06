import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Group, Object3D, PointLight, Vector3 } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const nbElements = 9;

export function MouseControl() {

    const { gl, scene, camera, size } = useThree()

    const [coord, setCoord] = useState([0, 0])

    function generateObject(index: number) {

        const mtl = useLoader(MTLLoader, `customShape/center - Copie (${index}).mtl`);
        const obj = useLoader(OBJLoader, `customShape/center - Copie (${index}).obj`,
            (l: any) => {
                mtl.preload();
                l.setMaterials(mtl);

                //   gsap.to(obj.position,{
                //       y:0,
                //       duration:2.5,
                //       ease:"elastic.out(0.5, 0.3)"
                //   })
            });

        obj.position.x = coord[0] + (index * 100)
        obj.position.y = coord[1] + (index * 50)

        obj.name = `obj_${index}`
        obj.userData = {
            delta: 0
        }

        scene.add(obj);
    }

    const light = new PointLight();
    light.position.set(0, 150, 150);

    scene.clear();
    scene.add(light);

    // new OrbitControls(camera, gl.domElement);


    // Custom obj

    for (let i = 0; i < nbElements; i++) {
        generateObject(i)
    }
    useFrame((state) => {
        for (let i = 0; i < nbElements; i++) {
            const obj = state.scene.getObjectByName(`obj_${i}`)
            if (obj) {

                const delta = obj.userData.delta;

                const newX = Math.cos(delta) * 1
                const newZ = Math.sin(delta) * 1

                obj.translateX(newX)
                obj.translateZ(newZ)
                obj.rotateY(0.01)


                obj.userData.delta += 0.08
            }
        }
    })

    useEffect(() => {
        camera.position.z = 800;

        gl.domElement.addEventListener("mousemove", (e) => {
            const x = e.clientX
            const y = e.clientY
           
            setCoord([(x * 2 / gl.domElement.width - 1) * size.width * 1.30 / 2, (y * 2 / gl.domElement.height - 1) * -(size.height * 1.3 / 2) - 50])
        })
    }, [])

    return <></>
}