import React from "react";
import * as THREE from "three";

type RockGroupProps = {
    count?: number; // how many rocks
    area?: number; // how wide to spread them
    sizeRange?: [number, number]; // min-max rock size
    color?: string; // rock color
    center?: [number, number, number]; // group center
};

export default function RockGroup({
    count = 10,
    area = 5,
    sizeRange = [0.3, 1],
    color = "gray",
    center = [0, 0, 0],
}: RockGroupProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                const scale =
                    sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

                const rotation: [number, number, number] = [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                ];

                const position: [number, number, number] = [
                    center[0] + (Math.random() - 0.5) * area,
                    center[1],
                    center[2] + (Math.random() - 0.5) * area,
                ];

                return (
                    <mesh
                        key={i}
                        position={position}
                        rotation={rotation}
                        scale={scale}
                        castShadow
                        receiveShadow
                    >
                        {/* Icosahedron gives a low-poly rock feel */}
                        <icosahedronGeometry args={[0.5, 0]} />
                        <meshStandardMaterial color={color} flatShading />
                    </mesh>
                );
            })}
        </>
    );
}
