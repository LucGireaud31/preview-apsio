import { useLoader, useThree } from "@react-three/fiber"
import { Group, PointLight } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState } from "react";


const nbElements = 2;

export function MouseControl() {

    const { gl, scene, camera } = useThree()

    const [coord, setCoord] = useState([0, 0])

    gl.domElement.addEventListener("mousemove", (e) => {
        const x = e.clientX
        const y = e.clientY

        setCoord([(x * 2 / gl.domElement.width - 1) * 610, (y * 2 / gl.domElement.height - 1) * -400 - 50])
    })

    console.log(coord)

    const light = new PointLight();
    light.position.set(0, 150, 150);

    scene.clear();
    scene.add(light);

    new OrbitControls(camera, gl.domElement);

    // Custom obj



        const mtl = useLoader(MTLLoader, "customShape/center.mtl");
        const obj = useLoader(OBJLoader, "customShape/center.obj",
            (l: any) => {
                mtl.preload();
                l.setMaterials(mtl);



                //   gsap.to(obj.position,{
                //       y:0,
                //       duration:2.5,
                //       ease:"elastic.out(0.5, 0.3)"
                //   })
            });

        obj.position.x = coord[0] + (0*100)
        obj.position.y = coord[1] + (0*10)
        scene.add(obj)
    
        const mtl2 = useLoader(MTLLoader, "customShape/center.mtl");
        const obj2 = useLoader(OBJLoader, "customShape/center.obj",
            (l: any) => {
                mtl2.preload();
                l.setMaterials(mtl2);



                //   gsap.to(obj.position,{
                //       y:0,
                //       duration:2.5,
                //       ease:"elastic.out(0.5, 0.3)"
                //   })
            });

        obj.position.x = coord[0] + (1*100)
        obj.position.y = coord[1] + (1*10)
        scene.add(obj2)
    

    useEffect(() => {
        camera.position.z = 500;
    }, [])

    return <></>
}