const House = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2, 1.5, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <coneGeometry args={[2.2, 1.5, 4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
    </group>
  );
};

export default House;
