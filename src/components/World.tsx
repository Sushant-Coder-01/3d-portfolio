import Lights from "./Lights";
import Controls from "./Controls";
import Ground from "./Ground";
import Road from "./Road";
import House from "./House";
import River from "./River";
import Bridge from "./Bridge";
import Hill from "./Hill";
import Tree from "./Tree";
import Player from "./Player";
import DebugAnimations from "./DebugAnimation";

const World = () => {
  return (
    <>
      <Lights />
      <Controls />
      <Ground size={200} color="#3CB371" />

      <Road width={4} length={50} />
      <Road width={6} length={150} color="#333" position={[0, 0.01, -10]} />
      <Road width={2} length={30} color="#555" position={[0, 0.01, -20]} />

      <House position={[-10, 0, -5]} width={6} depth={5} height={3.5} />
      <House
        position={[12, 0, -3]}
        width={7}
        depth={6}
        height={4}
        roofColor="#a52a2a"
      />
      <House
        position={[0, 0, 10]}
        width={3}
        depth={3}
        height={2.5}
        color="#deb887"
      />

      <River width={4} length={40} position={[0, -2.2, -15]} />
      <River
        width={5}
        length={40}
        curvePoints={[
          [-20, 0, 0],
          [-10, 0, 4],
          [0, 0, 0],
          [10, 0, -3],
          [20, 0, 2],
        ]}
        position={[0, -2.2, -30]}
      />

      <Bridge position={[0, 0.5, -15]} length={6} width={2.5} color="#8B4513" />
      <Bridge
        position={[5, 0.5, -30]}
        length={8}
        width={3}
        color="#A9A9A9"
        railColor="#555"
      />

      <Hill
        position={[0, 0, 0]}
        width={80}
        depth={80}
        height={12}
        color="#4CAF50"
      />
      <Hill
        position={[40, 0, -30]}
        width={40}
        depth={40}
        height={8}
        color="#3E8E41"
      />
      <Hill position={[-50, 0, -40]} width={60} depth={60} height={10} />

      <Tree position={[6, 0, 4]} height={6} />
      <Tree position={[2, 0, 12]} height={7} />
      <Tree position={[-8, 0, -2]} height={5} trunkRadius={0.2} />

      {Array.from({ length: 10 }).map((_, i) => (
        <Tree
          key={i}
          position={[Math.random() * 30 - 15, 0, Math.random() * 30 - 15]}
          height={5 + Math.random() * 3}
        />
      ))}

      <Player />

      <DebugAnimations />
    </>
  );
};

export default World;
