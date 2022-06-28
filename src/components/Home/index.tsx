import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CustomShape } from "./CustomShape";
import { MontainsMap } from "./MontainsMap";

export interface ICoord {
  x: number;
  y: number;
}

interface HomeProps {}

export function Home(props: HomeProps) {
  const {} = props;

  return (
    <Canvas style={{ width: innerWidth, height: innerHeight }}>
      {/* <MontainsMap /> */}
      <CustomShape />
    </Canvas>
  );
}
