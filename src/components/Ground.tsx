const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#7CFC00" /> {/* grass green */}
    </mesh>
  );
};

export default Ground;
