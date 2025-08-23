import * as THREE from "three";

type TreeProps = {
    position: [number, number, number];
};

export function Tree({ position }: TreeProps) {
    // 🌳 Randomized jungle proportions
    const trunkHeight = THREE.MathUtils.randFloat(4, 8);      // tall trunks
    const trunkRadius = THREE.MathUtils.randFloat(0.3, 0.6);  // thick trunks
    const leafHeight = THREE.MathUtils.randFloat(6, 10);      // large leaves
    const leafRadius = THREE.MathUtils.randFloat(3, 6);       // wide canopy

    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, trunkHeight / 2, 0]}>
                <cylinderGeometry args={[trunkRadius, trunkRadius * 1.2, trunkHeight, 16]} />
                <meshStandardMaterial color="#8B5A2B" />
            </mesh>

            {/* Leaves - multiple layers for realism */}
            <mesh position={[0, trunkHeight + leafHeight * 0.3, 0]}>
                <coneGeometry args={[leafRadius, leafHeight, 16]} />
                <meshStandardMaterial color="#1B5E20" /> {/* dark green */}
            </mesh>
            <mesh position={[0, trunkHeight + leafHeight * 0.7, 0]}>
                <coneGeometry args={[leafRadius * 0.8, leafHeight * 0.8, 16]} />
                <meshStandardMaterial color="#2E7D32" /> {/* medium green */}
            </mesh>
        </group>
    );
}

type ForestProps = {
    count?: number;
    areaSize?: number; // how big the jungle spreads
    position?: [number, number, number];
};

export default function Forest({ count = 50, areaSize = 80, position = [0, 0, 0] }: ForestProps) {
    // Random positions
    const positions = Array.from({ length: count }, () => [
        position[0] + THREE.MathUtils.randFloatSpread(areaSize), // X
        position[1],
        position[2] + THREE.MathUtils.randFloatSpread(areaSize), // Z
    ] as [number, number, number]);

    return (
        <group>
            {positions.map((pos, i) => (
                <Tree key={i} position={pos} />
            ))}
        </group>
    );
}
