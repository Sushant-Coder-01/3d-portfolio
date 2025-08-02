interface BridgeProps {
  position?: [number, number, number];
  span?: number;    // Auto length to match river width
  width?: number;
  height?: number;
  color?: string;
  railColor?: string;
  rotation?: [number, number, number];
}

const Bridge: React.FC<BridgeProps> = ({
  position = [0, 0.5, 0],
  span = 6,
  width = 2,
  height = 0.3,
  color = "#8B5A2B",
  railColor = "#333",
  rotation = [0, 0, 0],
}) => {
  const length = span; // alias for clarity
  const railHeight = 0.6;
  const railThickness = 0.1;

  return (
    <group position={position} rotation={rotation} castShadow receiveShadow>
      {/* Deck */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Side Rails */}
      <mesh position={[-length / 2 + 0.2, railHeight / 2, 0]}>
        <boxGeometry args={[railThickness, railHeight, width]} />
        <meshStandardMaterial color={railColor} />
      </mesh>
      <mesh position={[length / 2 - 0.2, railHeight / 2, 0]}>
        <boxGeometry args={[railThickness, railHeight, width]} />
        <meshStandardMaterial color={railColor} />
      </mesh>

      {/* Support pillars */}
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

export default Bridge