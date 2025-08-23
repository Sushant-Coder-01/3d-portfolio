import { RigidBody } from "@react-three/rapier";
import React from "react";

interface BridgeProps {
  position?: [number, number, number];
  span?: number;
  width?: number;
  height?: number;
  color?: string;
  railColor?: string;
  rotation?: [number, number, number];
}

const Bridge: React.FC<BridgeProps> = ({
  position = [0, 0.5, 0],
  span = 6,
  width = 2,
  height = 0.15,
  color = "#8B5A2B",     // wood color
  railColor = "#333",    // dark rails
  rotation = [0, 0, 0],
}) => {
  const length = span;
  const plankCount = Math.floor(span * 2);
  const plankWidth = length / plankCount;

  const rampLength = 5;
  const rampAngle = 0.25; // slope angle

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position} rotation={rotation} castShadow receiveShadow>
        {/* Bridge deck planks */}
        {Array.from({ length: plankCount }).map((_, i) => (
          <mesh
            key={i}
            position={[
              -length / 2 + i * plankWidth + plankWidth / 2,
              0,
              0,
            ]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[plankWidth * 0.95, height, width]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}

        {/* Entry ramp (left side) */}
        <mesh
          position={[-length / 2 - rampLength / 2, -(Math.sin(rampAngle) * rampLength) / 2, 0]}
          rotation={[0, 0, rampAngle]}
        >
          <boxGeometry args={[rampLength, height, width]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Exit ramp (right side) */}
        <mesh
          position={[length / 2 + rampLength / 2, -(Math.sin(rampAngle) * rampLength) / 2, 0]}
          rotation={[0, 0, -rampAngle]}
        >
          <boxGeometry args={[rampLength, height, width]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Vertical posts */}
        {[-length / 2, -length / 4, length / 4, length / 2].map((x, i) => (
          <mesh key={i} position={[x, 0.8, width / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 1.5]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {[-length / 2, -length / 4, length / 4, length / 2].map((x, i) => (
          <mesh key={`r-${i}`} position={[x, 0.8, -width / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 1.5]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}

        {/* Rails */}
        <mesh position={[0, 1.3, width / 2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, length]} />
          <meshStandardMaterial color={railColor} />
        </mesh>
        <mesh position={[0, 1.3, -width / 2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, length]} />
          <meshStandardMaterial color={railColor} />
        </mesh>

        {/* Support pillars */}
        {[-length / 3, length / 3].map((x, i) => (
          <mesh key={i} position={[x, -0.75, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1.5]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        ))}
      </group>
    </RigidBody>
  );
};

export default Bridge;
