import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

type FieldProps = {
    rows?: number;
    cols?: number;
    spacing?: number;
    position?: [number, number, number]; // ✅ Explicit tuple type
};

// 🌾 Rice Field with Ground
export function RiceField({
    rows = 10,
    cols = 10,
    spacing = 0.5,
    position = [0, 0, 0],
}: FieldProps) {
    const { scene } = useGLTF("/rice_plant/scene.gltf");

    // ✅ Memoize rice model setup so it’s not re-created every render
    const riceModel = useMemo(() => {
        const clone = scene.clone();
        clone.traverse((child: any) => {
            if (child.isMesh) {
                const green = new THREE.Color("#228B22"); // dark green
                const gold = new THREE.Color("#FFD700"); // golden yellow

                // Mix mostly green, small touch of gold
                const mixedColor = green.clone().lerp(gold, Math.random() * 0.4);

                child.material = new THREE.MeshStandardMaterial({
                    color: mixedColor,
                    roughness: 0.8,
                    metalness: 0.2,
                });
            }
        });
        return clone;
    }, [scene]);

    return (
        <group position={position}>
            {/* Ground Plane */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[
                    (rows - 1) * spacing / 2,
                    0.02,
                    (cols - 1) * spacing / 2,
                ]}
            >
                <planeGeometry args={[rows * spacing, cols * spacing]} />
                <meshStandardMaterial color="#654321" />
            </mesh>

            {/* Rice Plants */}
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: cols }).map((_, col) => (
                    <primitive
                        key={`${row}-${col}`}
                        object={riceModel.clone()}
                        position={[row * spacing, 0, col * spacing]}
                        scale={[0.01, 0.01, 0.01]}
                        rotation={[0, Math.random() * Math.PI * 2, 0]}
                    />
                ))
            )}
        </group>
    );
}

// 🌱 Sugarcane Field with Ground
export function SugarcaneField({
    rows = 10,
    cols = 10,
    spacing = 2,
    position = [0, 0, 0],
}: FieldProps) {
    const { scene } = useGLTF("/sugarcane/scene.gltf");

    // ✅ Memoize sugarcane model too
    const sugarcaneModel = useMemo(() => scene.clone(), [scene]);

    return (
        <group position={position}>
            {/* Ground Plane */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[
                    (rows - 3) * spacing / 2,
                    1.02,
                    -(cols - 3) * spacing / 2,
                ]}
            >
                <planeGeometry args={[rows * spacing, cols * spacing]} />
                <meshStandardMaterial color="#654321" />
            </mesh>

            {/* Sugarcane Plants */}
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: cols }).map((_, col) => (
                    <primitive
                        key={`${row}-${col}`}
                        object={sugarcaneModel.clone()}
                        position={[col * spacing, 0, row * -spacing]}
                        scale={[0.6, 0.6, 0.6]}
                    />
                ))
            )}
        </group>
    );
}
