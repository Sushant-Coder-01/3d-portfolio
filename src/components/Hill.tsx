import * as THREE from "three";
import { useRef, useMemo } from "react";

interface HillProps {
  position?: [number, number, number];
  width?: number;
  depth?: number;
  height?: number;
  segments?: number;
  color?: string;
}

const Hill: React.FC<HillProps> = ({
  position = [0, 0, 0],
  width = 50,
  depth = 50,
  height = 8,
  segments = 100,
  color = "#3E8E41",
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, depth, segments, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const smoothHill = Math.sin(x * 0.1) * Math.cos(y * 0.1) * height * 0.5;

      const falloff = Math.max(0, 1 - distanceFromCenter / (width / 1.5));

      const z = smoothHill * falloff + Math.random() * 0.3;
      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [width, depth, height, segments]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial color={color} flatShading={false} />
    </mesh>
  );
};

export default Hill;
