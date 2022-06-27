import { useThree } from "@react-three/fiber";
import { useMemo, useState, useEffect } from "react";
import { PlaneGeometry, MeshPhongMaterial, DoubleSide, Mesh, BufferAttribute, Raycaster, DirectionalLight, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ICoord } from ".";

export function MontainsMap() {
    // Constantes
    const {camera,scene,gl} = useThree();
    
    const plane = new PlaneGeometry(30, 30, 20, 20);
    const material = new MeshPhongMaterial({
      side: DoubleSide,
      flatShading: true,
      vertexColors: true
    });
    const mesh = new Mesh(plane, material);
    const randoms = useMemo(() => {
      return Array.from({
        length: mesh.geometry.attributes.position.
          array.length
      })
        .map(() => Math.random()-0.5)
    }
      , [])
    const [mouse, setMouse] = useState<ICoord | null>(null);
  
    const meshColor = {r:0, g:.19,b: .4}
    const hoverColor = {r:.1, g:.5, b:1}
  
    // Each frames
    // useFrame((state, delta) => {
    //   mesh.rotation.y += 0.01;
    // });
  
  
    // Color on each coordinates
    const colors: number[] = []
  
    for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
      colors.push(meshColor.r,meshColor.g,meshColor.b);
    }
  
    mesh.geometry.setAttribute("color",
      new BufferAttribute(new Float32Array(colors), 3)) // 3 car liste regroupé par 3 (r,g,b,r,g,b,etc...)
  
  
    // intersect
    if (mouse) {
      const raycaster = new Raycaster()
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(mesh);
      if (intersects.length > 0) {
        const attributColor = mesh.geometry.attributes.color;
  
  
        // // animation
        // gsap.to(hoverColor, {
        //   r: meshColor.r,
        //   g: meshColor.g,
        //   b: meshColor.b,
        //   onUpdate: () => {
            attributColor.setX(intersects[0].face!.a, hoverColor.r);
            attributColor.setX(intersects[0].face!.b, hoverColor.r);
            attributColor.setX(intersects[0].face!.c, hoverColor.r);
            attributColor.setY(intersects[0].face!.a, hoverColor.g);
            attributColor.setY(intersects[0].face!.b, hoverColor.g);
            attributColor.setY(intersects[0].face!.c, hoverColor.g);
            attributColor.setZ(intersects[0].face!.a, hoverColor.b);
            attributColor.setZ(intersects[0].face!.b, hoverColor.b);
            attributColor.setZ(intersects[0].face!.c, hoverColor.b);
            attributColor.needsUpdate = true
        //   }
        // })
      }
    }
  
    // Relief
    const positions = (mesh.geometry.attributes.position.array ??
      []) as number[];
  
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
  
    //   positions[i ] = x + randoms[i] * 2;
    //   positions[i + 1] = y + randoms[i] * 2;
      positions[i + 2] = z + randoms[i] * 2;
    }
  
    // lumières
    const light = new DirectionalLight();
    light.position.set(0, 0, -1);
    const light2 = new DirectionalLight();
    light2.position.set(0, 0, 1);
  
    // orbital control
    new OrbitControls(camera, gl.domElement);
  
    // three consts
    useEffect(() => {
      camera.position.z = 30
  
      // Events listeners
      gl.domElement.addEventListener("mousemove", (e) => {
        setMouse({
          x: e.clientX / innerWidth * 2 - 1,
          y: -e.clientY / innerHeight * 2 + 1
        })
      })
    }, [])
  
    scene.clear();
    scene.add(mesh);
    scene.add(light);
    scene.add(light2);
  
    return <></>;
  }