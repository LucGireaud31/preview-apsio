import { useFrame, useThree } from "@react-three/fiber"
import { Box3, Group, Mesh, MeshPhongMaterial, PointLight, Raycaster } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import { generateObject, generateText } from "../../utils/three";


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

    const { gl, scene, camera } = useThree()

    const [objs, setObjs] = useState<null | { groups: Group[], letters: any[] }>(null);

    useEffect(() => {
        (async () => {
            // Static params
            camera.position.z = 50;

            // Generate objects
            setObjs(await generateObject(matrix, nbElements, unit))

            // Events listeners
            gl.domElement.addEventListener("mousemove", (e) => {
                const x = e.offsetX
                const y = e.offsetY

                coord = ([
                    x / gl.domElement.width * 2 - 1,
                    -y / gl.domElement.height * 2 + 1
                ])
            })

        })()
    }, [])

    console.log("je me rendons")

    const light = new PointLight();
    light.position.set(0, 15, 15);

    scene.clear();

    scene.add(light);
    objs?.groups.map(group => scene.add(group))
    objs?.letters.map(letter => scene.add(letter))


    // Custom obj
    useFrame((state) => {
        objs?.groups.map(obj => {
            if (obj.userData.animated) {
                // Logo animated so just spining

                const delta = obj.userData.delta;
                const newX = Math.cos((delta % (2 * Math.PI))) * 0.1

                obj.translateX(newX)
                obj.rotateY(0.01)

                // Check if mouse hover item
                if (coord) {
                    const raycaster = new Raycaster()

                    raycaster.setFromCamera({ x: coord[0], y: coord[1] }, camera);
                    const intersects = raycaster.intersectObject(obj);
                    if (intersects.length > 0) {
                        gsap.to(obj.rotation, {
                            x: 2 * Math.PI,
                            duration: 0.6,
                        })
                    }
                }

                obj.userData.delta += 0.05
            } else {
                // Logo is animating
                gsap.to(obj.position, {
                    z: 0,
                    duration: 0.3,
                })
                obj.userData.animated = true;
            }
        })
    })

    return <></>
}