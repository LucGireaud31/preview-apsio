import { Box, HStack, Text, Image, Flex } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { Outlet } from "react-router-dom";
import { Apsio3d } from "../Apsio3d";
import { ApsioLogo } from "../Apsio3d/ApsioLogo";

interface LayoutProps {
};

export function Layout(props: LayoutProps) {
    const { } = props;

    return (
            <Box px={300} fontSize={20}>
                <Flex h={100}>
                    <Image src="icons/logo.png" />
                    {/* <Apsio3d h="300px" bg="red"/> */}
                    <HStack mx="auto" align="center" w="fit-content" spacing={8}>
                        <Text>Accueil</Text>
                        <Text>La blockchain</Text>
                        <Text>Le fonctionnement</Text>
                        <Text>Je veux des APSIO coins</Text>
                        <Text>Contacts</Text>
                    </HStack>
                </Flex>
                <Outlet />
            </Box>
    );
}