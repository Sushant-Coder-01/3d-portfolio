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

      <River width={10} length={100} position={[-50, -1, 50]} />
      <River width={5} length={75} position={[-12, -2.2, -50]} />
      <River
        width={5}
        length={30}
        position={[-85, -2.2, -36]}
        rotation={[Math.PI, -0.2, 0]}
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
        position={[50, 0, -50]}
        width={50}
        depth={50}
        height={10}
        color="#3E8E41"
      />

      <Hill
        position={[50, 0, 50]}
        width={100}
        depth={100}
        height={50}
        complexity={0.05}
        falloffStrength={2}
        color="#4CAF50"
      />

      <Hill
        position={[-75, 0, -70]}
        rotation={[0, Math.PI, 0]}
        width={50}
        depth={60}
        height={20}
        complexity={0.12}
        color="#388E3C"
      />

      <Tree position={[70, 0, -20]} height={6} />
      <Tree position={[60, 0, 0]} height={7} />
      <Tree position={[40, 1, 15]} height={5} trunkRadius={0.2} />
      <Tree position={[20, 0, -60]} height={5} />
      <Tree position={[5, 0, -40]} height={5} />
      <Tree position={[0, 0, 0]} height={5} />
      <Tree position={[10, 0.2, 20]} height={5} />
      <Tree position={[-50, 0, 30]} height={5} />
      <Tree position={[-20, 0, 5]} height={5} />
      <Tree position={[-50, 0, 0]} height={5} />

      <Player />

      <DebugAnimations />
    </>
  );
};

export default World;
