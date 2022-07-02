import { Box, Center, Flex } from "@chakra-ui/react";
import { Apsio3d } from "../Apsio3d";

export function Home() {

  return (
    <Box w="full" h="100vh" >
      <Flex>
        <Center w="50%">
          Du texte...
        </Center>

        <Apsio3d h="calc(100vh * 0.7)" w="50%" rounded="50px" />
      </Flex>
    </Box>
  );
}
