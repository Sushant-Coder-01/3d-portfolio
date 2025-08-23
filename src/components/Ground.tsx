import { RigidBody } from "@react-three/rapier";
import React from "react";

interface GroundProps {
  size?: number;
  color?: string;
}

const Ground: React.FC<GroundProps> = ({ size = 100, color = "#228B22" }) => {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10.01, 0]} receiveShadow>
        <boxGeometry args={[size, size, 20]} />
        <meshStandardMaterial color={"#cda171"} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
