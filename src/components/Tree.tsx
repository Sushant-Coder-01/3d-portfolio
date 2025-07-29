const Tree = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.9, 1.5, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

export default Tree;
