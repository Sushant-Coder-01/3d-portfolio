const River = () => {
  return (
    <mesh position={[0, 0.005, -10]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 3]} />
      <meshStandardMaterial color="#1E90FF" roughness={0.4} metalness={0.3} />
    </mesh>
  );
};

export default River;
