import { Canvas } from "@react-three/fiber";
import { CustomShape } from "./CustomShape";
import { MontainsMap } from "./MontainsMap";
import { MouseControl } from "./MouseControl";

export interface ICoord {
  x: number;
  y: number;
}

interface HomeProps {}

export function Home(props: HomeProps) {
  const {} = props;

  return (
    <Canvas style={{ width: innerWidth, height: innerHeight,background:"#c9c9c9" }}>
      {/* <MontainsMap /> */}
      {/* <CustomShape /> */}
      <MouseControl/>
    </Canvas>
  );
}
