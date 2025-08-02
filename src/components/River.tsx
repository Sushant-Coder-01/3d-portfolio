import React, { useMemo } from "react";
import * as THREE from "three";

interface RiverProps {
  width?: number;                      // River width
  length?: number;                     // River length
  color?: string;                       // Water color
  position?: [number, number, number];  // Position in world
  rotation?: [number, number, number];  // Rotation in world
  curvePoints?: [number, number, number][]; // Optional custom curve points
}

const River: React.FC<RiverProps> = ({
  width = 3,
  length = 30,
  color = "#1E90FF",
  position = [0, 0.01, 0],
  rotation = [0, 0, 0],
  curvePoints,
}) => {
  const curve = useMemo(() => {
    const points = curvePoints
      ? curvePoints.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      : [
          // Default: a slight curve
          new THREE.Vector3(-length / 2, 0, 0),
          new THREE.Vector3(-length / 4, 0, 2),
          new THREE.Vector3(length / 4, 0, -2),
          new THREE.Vector3(length / 2, 0, 0),
        ];

    return new THREE.CatmullRomCurve3(points);
  }, [curvePoints, length]);

  const tubeGeometry = useMemo(() => {
    const geo = new THREE.TubeGeometry(curve, 100, width / 2, 16, false);
    geo.scale(1, 0.2, 1); // Flatten to look like a river
    geo.computeVertexNormals();
    return geo;
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
        metalness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export default River;
