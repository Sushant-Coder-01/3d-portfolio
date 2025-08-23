import Lights from "./Lights";
import Controls from "./Controls";
import Ground from "./Ground";
import Road from "./Road";
import House from "./House";
import River from "./River";
import Bridge from "./Bridge";
import Hill from "./Hill";
import Tree from "./Tree";
import DebugAnimations from "./DebugAnimation";
import { Physics, RigidBody } from "@react-three/rapier";
import Player from "./Player";

const World = () => {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Lights />
      <Controls />
        <Ground size={200} color="#3CB371" />

      {/* Roads */}
      <RigidBody type="fixed">
        <Road width={4} length={50} position={[-30, 0.02, 5]} />
      </RigidBody>
      <RigidBody type="fixed">
        <Road width={6} length={150} color="#333" position={[0, 0.01, -10]} />
      </RigidBody>
      <RigidBody type="fixed">
        <Road width={2} length={30} color="#555" position={[-60, 0.01, 20]} />
      </RigidBody>

      {/* Houses */}
      <RigidBody type="fixed">
        <House position={[-30, 0, -18]} width={6} depth={5} height={3.5} />
      </RigidBody>
      <RigidBody type="fixed">
        <House position={[-8, 0, -18]} width={7} depth={6} height={4} roofColor="#a52a2a" />
      </RigidBody>
      <RigidBody type="fixed">
        <House position={[-50, 0, -18]} width={3} depth={3} height={2.5} color="#deb887" />
      </RigidBody>

      <RigidBody type="fixed">
        <House position={[-8, 0, -2]} rotation={[0, Math.PI, 0]} width={7} depth={6} height={4} roofColor="#a52a2a" />
      </RigidBody>
      <RigidBody type="fixed">
        <House position={[-30, 0, -2]} rotation={[0, Math.PI, 0]} width={7} depth={6} height={4} roofColor="#a52a2a" />
      </RigidBody>
      <RigidBody type="fixed">
        <House position={[-50, 0, -2]} rotation={[0, Math.PI, 0]} width={7} depth={6} height={4} roofColor="#a52a2a" />
      </RigidBody>

      {/* Rivers */}
      <RigidBody type="fixed">
        <River width={10} length={100} position={[-50, 0, 50]} />
      </RigidBody>
      <RigidBody type="fixed">
        <River width={5} length={75} position={[-12, 0, -50]} />
      </RigidBody>
      <RigidBody type="fixed">
        <River width={5} length={30} position={[-85, 0, -36]} rotation={[Math.PI, -0.2, 0]} />
      </RigidBody>

      {/* Bridges */}
      <RigidBody type="fixed">
        <Bridge position={[5, 0.5, -52]} rotation={[0, Math.PI / 2, 0]} span={12} width={6} />
      </RigidBody>
      <RigidBody type="fixed">
        <Bridge position={[-20, 1, 48]} rotation={[0, -Math.PI / 2, 0]} span={16} width={12} color="#A9A9A9" railColor="#555" />
      </RigidBody>

      {/* Hills */}
      <RigidBody type="fixed" colliders="trimesh">
        <Hill position={[50, 0, -50]} width={50} depth={50} height={10} color="#3E8E41" />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Hill position={[50, 0, 50]} width={100} depth={100} height={50} complexity={0.05} falloffStrength={2} color="#4CAF50" />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Hill position={[-75, 0, -70]} rotation={[0, Math.PI, 0]} width={50} depth={60} height={20} complexity={0.12} color="#388E3C" />
      </RigidBody>

      {/* Trees */}
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[70, 0, -20]} height={6} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[60, 0, 0]} height={7} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[40, 1, 15]} height={5} trunkRadius={0.2} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[20, 0, -60]} height={5} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[5, 0, -40]} height={5} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[0, 0, 0]} height={5} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[10, 0.2, 20]} height={5} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[-50, 0, 30]} height={5} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[-20, 0, 0]} height={5} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <Tree position={[-40, 0, 0]} height={5} />
      </RigidBody>

      {/* Player */}
        <Player position={[70, 15, 50]} rotation={[0,-Math.PI /1.5, 0]}/>

      {/* Debug Animations */}
      <DebugAnimations />
    </Physics>
  );
};

export default World;
