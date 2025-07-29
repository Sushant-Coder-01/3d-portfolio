const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
    </>
  );
};

export default Lights;
