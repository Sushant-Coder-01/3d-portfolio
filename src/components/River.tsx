import React, { useMemo } from "react";
import * as THREE from "three";

interface RiverProps {
  width?: number;
  length?: number;
  color?: string;
  curvePoints?: [number, number, number][];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const River: React.FC<RiverProps> = ({
  width = 3,
  length = 30,
  color = "#1E90FF",
  curvePoints,
  position = [0, 0.01, 0],
  rotation = [0, 0, 0],
}) => {
  const curve = useMemo(() => {
    const points = curvePoints?.map((p) => new THREE.Vector3(...p)) || [
      new THREE.Vector3(-length / 2, 0, 0),
      new THREE.Vector3(-length / 4, 0, 2),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(length / 4, 0, -2),
      new THREE.Vector3(length / 2, 0, 0),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, [length, curvePoints]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, width / 2, 16, false);
  }, [curve, width]);

  return (
    <mesh
      geometry={tubeGeometry}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export default River;
