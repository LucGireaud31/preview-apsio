import { Box, BoxProps } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { ApsioLogo } from "./ApsioLogo";

interface Apsio3dProps extends BoxProps {
};

export function Apsio3d(props: Apsio3dProps) {
    const { ...rest } = props;

    return (
        <Box {...rest}>
            <Canvas style={{ width: "100%", height: "100%" }}>
                {/* <MontainsMap /> */}
                {/* <CustomShape /> */}
                {/* <MouseControl/> */}
                <ApsioLogo />
            </Canvas>
        </Box>
    );
}