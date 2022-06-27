import { useEffect, useRef, useState } from "react";
import {
  BufferGeometry,
  DirectionalLight,
  DoubleSide,
  FlatShading,
  Material,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
} from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

interface HomeProps {}

export function Home(props: HomeProps) {
  const {} = props;

  return (
    <Canvas style={{ width: innerWidth, height: innerHeight }}>
      <Plane />
    </Canvas>
  );
}

function Plane() {
  // Constantes
  const three = useThree();
  const plane = new PlaneGeometry(3, 3, 10, 10);
  const material = new MeshPhongMaterial({
    color: "orange",
    side: DoubleSide,
    flatShading: true,
  });
  const mesh = new Mesh(plane, material);

  // Each frames
  useFrame((state, delta) => {
    mesh.rotation.y += 0.01;
  });

  useEffect(() => {
    const positions = (mesh.geometry.attributes.position.array ??
      []) as number[];

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      positions[i + 2] = z + Math.random();
    }

    const light = new DirectionalLight();
    light.position.set(0, 0, 1);

    three.scene.clear();
    three.scene.add(mesh);
    three.scene.add(light);
  }, [mesh]);

  return <></>;
}
