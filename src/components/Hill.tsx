// Hill.tsx
import * as THREE from "three";
import { useRef, useMemo } from "react";

const Hill = ({ position = [0, 0, 0] }: { position?: number[] }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const width = 35;
    const height = 35;
    const segments = 60;

    const geo = new THREE.PlaneGeometry(width, height, segments, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const edge = Math.abs(x) === width / 2 || Math.abs(y) === height / 2;

      const z = edge
        ? 0 // flatten edge
        : Math.sin(x * 0.3) * Math.cos(y * 0.3) * 3 + Math.random() * 0.5;

      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial color="#4CAF50" flatShading />
    </mesh>
  );
};

export default Hill;
