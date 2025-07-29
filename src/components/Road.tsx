const Road = () => {
  return (
    <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 50]} />
      <meshStandardMaterial color="#2f2f2f" />
    </mesh>
  );
};

export default Road;
