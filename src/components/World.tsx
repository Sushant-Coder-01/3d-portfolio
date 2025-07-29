import Lights from "./Lights";
import Controls from "./Controls";
import Ground from "./Ground";
import Road from "./Road";
import House from "./House";
import River from "./River";
import Bridge from "./Bridge";
import Hill from "./Hill";
import Tree from "./Tree";
import PortfolioPlates from "./PortfolioPlates";

const World = () => {
  return (
    <>
      <Lights />
      <Controls />
      <Ground />

      {/* Village Elements */}
      <Road />
      <House position={[-5, 0.5, -5]} />
      <House position={[8, 0.5, -3]} />
      <River />
      <Bridge />
      <Hill position={[25, 0, -25]} />
      <Tree position={[6, 0, 4]} />
      <Tree position={[2, 0, 10]} />
      <PortfolioPlates />
    </>
  );
};

export default World;
