import React, { useMemo } from "react";

interface TreeProps {
  position?: [number, number, number];
  height?: number;
  trunkRadius?: number;
  colorTrunk?: string;
  colorLeaves?: string;
}

const Tree: React.FC<TreeProps> = ({
  position = [0, 0, 0],
  height = 6,
  trunkRadius = 0.25,
  colorTrunk = "#8B4513",
  colorLeaves = "#228B22",
}) => {
  const trunkHeight = height * 0.3;
  const canopyHeight = height * 0.7;

  const rotationY = useMemo(() => Math.random() * Math.PI * 2, []);

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      castShadow
      receiveShadow
    >
      <mesh position={[0, trunkHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[trunkRadius, trunkRadius, trunkHeight]} />
        <meshStandardMaterial color={colorTrunk} />
      </mesh>

      <mesh position={[0, trunkHeight + canopyHeight * 0.25, 0]} castShadow>
        <coneGeometry args={[height * 0.5, canopyHeight * 0.5, 8]} />
        <meshStandardMaterial color={colorLeaves} />
      </mesh>
      <mesh position={[0, trunkHeight + canopyHeight * 0.55, 0]} castShadow>
        <coneGeometry args={[height * 0.4, canopyHeight * 0.4, 8]} />
        <meshStandardMaterial color={colorLeaves} />
      </mesh>
      <mesh position={[0, trunkHeight + canopyHeight * 0.8, 0]} castShadow>
        <coneGeometry args={[height * 0.3, canopyHeight * 0.3, 8]} />
        <meshStandardMaterial color={colorLeaves} />
      </mesh>
    </group>
  );
};

export default Tree;
