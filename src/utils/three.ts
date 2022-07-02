import { Box3, Group, Mesh, MeshPhongMaterial, Scene } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export async function generateText(text: string = "APSIO") {
    const loader = new FontLoader();

    const textMesh: Mesh<TextGeometry, MeshPhongMaterial[]> = await new Promise((resolve) => {

        loader.load('font/Hyperjump_Regular.json', function (font) {
            const geometry = new TextGeometry(text, { font: font, size: 6, height: 2 })
            const textMesh = new Mesh(geometry, [
                new MeshPhongMaterial({ color: 0xFF0000 }),
                new MeshPhongMaterial({ color: 0xFFFFFF }),
            ])

            const textSize = new Box3().setFromObject(textMesh);
            const textWidth = textSize.max.x - textSize.min.x;

            textMesh.position.x = -textWidth / 2
            textMesh.position.y = 18

            resolve(textMesh)
        });
    })
    return textMesh;
}

export async function generateObject(matrix: number[][], nbElements: number, unit: number) {
    
    const groups: Group[] = []

    const objs:{ groups: Group[], letters: Mesh<TextGeometry, MeshPhongMaterial[]>[] } = await new Promise((resolve) => {

        for (let i = 0; i < nbElements; i++) {
            new MTLLoader().load(`apsio_3d/APSIO_logo.mtl`, mtl => {
                mtl.preload();

                const objLoader = new OBJLoader();
                objLoader.setMaterials(mtl);

                objLoader.load(`apsio_3d/APSIO_logo.obj`, async obj => {

                    obj.position.x = 0 + (matrix[i][0] * unit)
                    obj.position.y = 12 + (matrix[i][1] * unit)
                    obj.position.z = -1000

                    obj.name = `obj_${i}`
                    obj.userData = {
                        delta: 0,
                        animated: false
                    }

                    groups.push(obj)
                    console.log("je charge")

                    if (i == nbElements - 1) {

                        const letters = await generateText("APSIO");

                        console.log("fin loading")

                        resolve({groups,letters:[letters]})
                    }
                });
            });
        }
    })

    return objs;

}