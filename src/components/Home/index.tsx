import { Canvas } from "@react-three/fiber";
import { MontainsMap } from "./MontainsMap";

export interface ICoord {
  x: number,
  y: number
}

interface HomeProps { }

export function Home(props: HomeProps) {
  const { } = props;

  return (
    <Canvas style={{ width: innerWidth, height: innerHeight }} >
      <MontainsMap />
    </Canvas>
  );
}



