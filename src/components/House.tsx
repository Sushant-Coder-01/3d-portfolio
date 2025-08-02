import React from "react";

interface HouseProps {
  position?: [number, number, number];
  width?: number;
  depth?: number;
  height?: number;
  color?: string;
  roofColor?: string;
}

const House: React.FC<HouseProps> = ({
  position = [0, 0, 0],
  width = 6,
  depth = 6,
  height = 4,
  color = "#d2b48c",
  roofColor = "#8b0000",
}) => {
  const roofHeight = height * 0.6;

  return (
    <group position={position} castShadow receiveShadow>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh
        castShadow
        position={[0, height + roofHeight / 2, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <coneGeometry args={[Math.max(width, depth) * 0.8, roofHeight, 4]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      <mesh position={[0, 1, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[1, 2, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      <mesh position={[-width / 4, 2, depth / 2 + 0.02]}>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>

      <mesh position={[width / 4, 2, depth / 2 + 0.02]}>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
    </group>
  );
};

export default House;
