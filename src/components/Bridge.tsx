import React from "react";

interface BridgeProps {
  position?: [number, number, number];
  length?: number;
  width?: number;
  height?: number;
  color?: string;
  railColor?: string;
}

const Bridge: React.FC<BridgeProps> = ({
  position = [0, 0.5, 0],
  length = 4,
  width = 2,
  height = 0.3,
  color = "#8B5A2B",
  railColor = "#333",
}) => {
  const railHeight = 0.6;
  const railThickness = 0.1;

  return (
    <group position={position} castShadow receiveShadow>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[-length / 2 + 0.2, railHeight / 2, 0]}>
        <boxGeometry args={[railThickness, railHeight, width]} />
        <meshStandardMaterial color={railColor} />
      </mesh>
      <mesh position={[length / 2 - 0.2, railHeight / 2, 0]}>
        <boxGeometry args={[railThickness, railHeight, width]} />
        <meshStandardMaterial color={railColor} />
      </mesh>

      <mesh position={[-length / 4, -0.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[length / 4, -0.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
};

export default Bridge;
