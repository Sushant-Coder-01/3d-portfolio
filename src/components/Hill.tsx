import * as THREE from "three";
import { useRef, useMemo } from "react";

interface HillProps {
  position?: [number, number, number]; // Position of the hill
  rotation?: [number, number, number];
  width?: number; // Width of the hill
  depth?: number; // Depth of the hill
  height?: number; // Height of the hill
  segments?: number; // Detail of the hill
  color?: string; // Hill color
  falloffStrength?: number; // Falloff strength for smoothness
  complexity?: number; // Complexity of terrain (how rough/smooth the hill looks)
}

const Hill: React.FC<HillProps> = ({
  position = [0, 0, 0],
  width = 50,
  depth = 50,
  height = 8,
  segments = 100,
  color = "#3E8E41",
  falloffStrength = 1.5,
  complexity = 0.1, // Roughness of the hill surface
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, depth, segments, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Calculate distance from center to apply falloff
      const distanceFromCenter = Math.sqrt(x * x + y * y);

      // Apply a smooth hill-like surface using sine/cosine
      const smoothHill =
        Math.sin(x * complexity) * Math.cos(y * complexity) * height * 0.5;

      // Falloff for edges of the hill (distance from center)
      const falloff = Math.max(
        0,
        1 - distanceFromCenter / (width / falloffStrength)
      );

      const z = smoothHill * falloff + Math.random() * 0.3; // Add some randomness to make it more natural
      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals(); // Smooth normals for shading
    return geo;
  }, [width, depth, height, segments, complexity, falloffStrength]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]} // Rotating so it lies flat
      position={position}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial color={color} flatShading={false} />
    </mesh>
  );
};

export default Hill;
