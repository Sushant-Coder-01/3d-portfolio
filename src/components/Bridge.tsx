const Bridge = () => {
  return (
    <group position={[0, 0.2, -10]}>
      <mesh>
        <boxGeometry args={[4, 0.3, 3]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Side Rails */}
      <mesh position={[-1.8, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.6, 3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[1.8, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.6, 3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
};

export default Bridge;
