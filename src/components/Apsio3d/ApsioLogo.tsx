import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Group, Object3D, PointLight, Raycaster, Vector3 } from "three";
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
    [-3, -3.5], [-1, -3.5], [1, -3.5], [3, -3.5],
    [-3.9, -4.8], [-1.95, -4.8], [0, -4.8], [1.9, -4.8], [3.9, -4.8],
    [-4.8, -6.5], [-2.86, -6.5], [-0.93, -6.5], [0.93, -6.5], [2.86, -6.5], [4.8, -6.5],
    [-5.4, -8.2], [-3.7, -8.2], [-2, -8.2], [0, -8.2], [2, -8.2], [3.7, -8.2], [5.4, -8.2],
    [-6, -10.2], [-4.2, -10.2], [-2.5, -10.2], [-0.8, -10.2], [0.8, -10.2], [2.6, -10.2], [4.5, -10.2], [6, -10.2],
    [-3.2, -12], [-1.75, -12], [0, -12], [1.75, -12], [3.2, -12],
    [-0.8, -13.5], [0.8, -13.5],
]
const nbElements = matrix.length;

let coord: [number, number] | null = null

export function ApsioLogo() {

    const { gl, scene, camera, size } = useThree()
    console.log(gl.domElement.clientWidth)
    // const [coord, setCoord] = useState<[number, number]>([0, 12])

    const [isLoading, setIsLoading] = useState(true)


    function generateObject(index: number) {

        new MTLLoader().load(`apsio_3d/APSIO_logo_${index}.mtl`, mtl => {
            mtl.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(mtl);

            objLoader.load(`apsio_3d/APSIO_logo_${index}.obj`, obj => {

                obj.position.x = 0 + (matrix[index][0] * unit)
                obj.position.y = 12 + (matrix[index][1] * unit)
                obj.position.z = -1000

                obj.name = `obj_${index}`
                obj.userData = {
                    delta: 0
                }

                if (!isLoading) {
                    gsap.to(obj.position, {
                        z: 0,
                        duration: 0.3,
                    })
console.log("ajout ")
                    scene.add(obj);
                }
            });
        });
    }
    console.log("je me rendons")
    const light = new PointLight();
    light.position.set(0, 15, 15);

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

                const newX = Math.cos((delta % (2 * Math.PI))) * 0.1

                obj.translateX(newX)
                obj.rotateY(0.01)

                const raycaster = new Raycaster()
                // console.log(coord)

                if (coord) {

                    raycaster.setFromCamera({ x: coord[0], y: coord[1] }, camera);
                    const intersects = raycaster.intersectObject(obj);

                    if (intersects.length > 0) {
                        gsap.to(obj.rotation, {
                            x: 2*Math.PI,
                            duration: 0.6,
                        })
                    }
                }

                obj.userData.delta += 0.05
            }
        }
    })

    useEffect(() => {
        camera.position.z = 50;

        // for (let i = 0; i < nbElements; i++) {
        //     const obj = scene.getObjectByName(`obj_${i}`)
        //     if (obj) {
        //         gsap.to(obj.position, {
        //             y: 0,
        //             duration: 2,
        //         })
        //     }
        // }

        gl.domElement.addEventListener("mousemove", (e) => {
            const x = e.offsetX
            const y = e.offsetY
            const coef = 1

            // coord = ([(x * 2 / gl.domElement.width - 1) * size.width * coef / 2, (y * 2 / gl.domElement.height - 1) * -(size.height * coef / 2) - 0])

            coord = ([
                x / gl.domElement.width * 2 - 1,
                -y / gl.domElement.height * 2 + 1
            ])
        })
        console.log("fin loading")
        setIsLoading(false)
    }, [])

    return <></>
}