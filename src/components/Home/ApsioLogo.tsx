import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Group, Object3D, PointLight, Vector3 } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



const unit = 1.5
const matrix = [
[0, 0.8], 
[-1, -0.5], [1, -0.5], 
[0, -2], [-2, -2], [2, -2], 
[-3, -3.5], [-1, -3.5], [1,-3.5],[3,-3.5],
[-3.9,-4.8],[-1.95,-4.8],[0,-4.8],[1.9,-4.8],[3.9,-4.8],
[-4.8,-6.5],[-2.86,-6.5],[-0.93,-6.5],[0.93,-6.5],[2.86,-6.5],[4.8,-6.5],
[-5.4,-8.2],[-3.7,-8.2],[-2,-8.2],[0,-8.2],[2,-8.2],[3.7,-8.2],[5.4,-8.2],
[-6,-10.2],[-4.2,-10.2],[-2.5,-10.2],[-0.8,-10.2],[0.8,-10.2],[2.6,-10.2],[4.5,-10.2],[6,-10.2],
[-3.2,-12],[-1.75,-12],[0,-12],[1.75,-12],[3.2,-12],
[-0.8, -13.5], [0.8, -13.5], 

]
const nbElements = matrix.length;
console.log(nbElements)
export function ApsioLogo() {

    const { gl, scene, camera, size } = useThree()

    const [coord, setCoord] = useState<[number, number] | null>(null)

    function generateObject(index: number) {

        const mtl = useLoader(MTLLoader, `apsio_3d/APSIO_logo_${index}.mtl`);
        const obj = useLoader(OBJLoader, `apsio_3d/APSIO_logo_${index}.obj`,
            (l: any) => {
                mtl.preload();
                l.setMaterials(mtl);

            });
        obj.position.y = 100

        if (coord) {
            obj.position.x = coord[0] + (matrix[index][0] * unit)
            obj.position.y = coord[1] + (matrix[index][1] * unit)
        }

        obj.name = `obj_${index}`
        obj.userData = {
            delta: 0
        }
        obj.rotation.y = 0
        scene.add(obj);
    }
    console.log("je me rend")
    const light = new PointLight();
    light.position.set(0, 15, 15);

    scene.clear();
    scene.add(light);

    new OrbitControls(camera, gl.domElement);


    // Custom obj

    for (let i = 0; i < nbElements; i++) {
        generateObject(i)
    }
    useFrame((state) => {
        for (let i = 0; i < nbElements; i++) {
            const obj = state.scene.getObjectByName(`obj_${i}`)
            if (obj) {

                const delta = obj.userData.delta;

                const newX = Math.cos((delta%(2*Math.PI)))*0.1

                obj.translateX(newX)
                obj.rotateY(0.01)
                


                obj.userData.delta += 0.05
            }
        }
    })

    useEffect(() => {
        camera.position.z = 50;
        for (let i = 0; i < nbElements; i++) {
            const obj = scene.getObjectByName(`obj_${i}`)
            if (obj) {
                gsap.to(obj.position, {
                    y: 0,
                    duration: 1,
                })
            }
        }

        gl.domElement.addEventListener("mousemove", (e) => {
            const x = e.clientX
            const y = e.clientY
            const coef = 0.09
            setCoord([(x * 2 / gl.domElement.width - 1) * size.width * coef / 2, (y * 2 / gl.domElement.height - 1) * -(size.height * coef / 2) - 0])
        })
    }, [])

    return <></>
}