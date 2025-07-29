const PortfolioPlates = () => {
  const plates = [
    { label: "About Me", position: [-4, 2, 6] },
    { label: "Skills", position: [0, 2, 8] },
    { label: "Projects", position: [4, 2, 6] },
    { label: "Contact", position: [0, 2, 12] },
  ];

  return (
    <>
      {plates.map(({ label, position }, i) => (
        <group
          position={position}
          key={i}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        >
          <mesh>
            <boxGeometry args={[2, 0.1, 1]} />
            <meshStandardMaterial color="#fffacd" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            {/* <textGeometry args={[label, { size: 0.3, height: 0.05 }]} /> */}
            <meshStandardMaterial color="#000" />
          </mesh>
        </group>
      ))}
    </>
  );
};

export default PortfolioPlates;
