import React from "react";

interface RoadProps {
  width?: number;
  length?: number;
  color?: string;
  position?: [number, number, number];
}

const Road: React.FC<RoadProps> = ({
  width = 4,
  length = 50,
  color = "#2f2f2f",
  position = [0, 0.01, 0],
}) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[length, width]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Road;
