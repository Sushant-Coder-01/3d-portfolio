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
import Forest from "./Forest";
import BanyanTree from "./BanyanTree";
import RockGroup from "./Rocks";
import Animal from "./Animals";
import Lake from "./Lake";
import { RiceField, SugarcaneField } from "./Farms";

const World = () => {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Lights />
      <Controls />
      <Ground size={200} color="#3CB371" />

      {/* Roads */}
      <RigidBody type="fixed">
        <Road width={6} length={80} color="#333" position={[-25, 0.1, -10]} />
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
        <River width={5} length={36} position={[-83, 0, -33]} rotation={[Math.PI, -0.5, 0]} />
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
        <Tree position={[15, 0, -40]} height={5} />
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

      {/* A small forest */}
      <Forest position={[-70, 0, -90]} count={30} areaSize={20} />

      {/* A big dense forest */}
      <RigidBody type="fixed" colliders="trimesh">
        <Forest count={100} areaSize={40} position={[-75, 0, 78]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <BanyanTree position={[73, 12, 52]} scale={20} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={8} area={10} sizeRange={[1, 2]} color="dimgray" center={[5, 0, 5]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={20} area={12} sizeRange={[0.2, 0.6]} color="darkgray" center={[5, 0, 5]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={8} area={10} sizeRange={[1, 2]} color="dimgray" center={[50, 0, 5]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={20} area={12} sizeRange={[0.2, 0.6]} color="darkgray" center={[50, 0, 5]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={8} area={10} sizeRange={[1, 2]} color="dimgray" center={[50, 0, -30]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={20} area={12} sizeRange={[0.2, 0.6]} color="darkgray" center={[50, 0, -30]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={30} area={30} sizeRange={[1, 5]} color="dimgray" center={[-30, 0, -80]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={30} area={12} sizeRange={[0.2, 1]} color="darkgray" center={[-30, 0, -80]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={15} area={10} sizeRange={[1, 3]} color="dimgray" center={[-80, 0, 30]} />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <RockGroup count={20} area={12} sizeRange={[0.2, 0.6]} color="darkgray" center={[-80, 0, 30]} />
      </RigidBody>

      {/* Dog */}
      <RigidBody type="fixed" colliders="trimesh">
        <Animal path="/dog/scene.gltf" position={[-15, 0, -5]} rotation={[0, Math.PI, 0]} scale={0.5} />
      </RigidBody>

      {/* Cow */}
      <RigidBody type="fixed" colliders="trimesh">
        <Animal path="/cow/scene.gltf" position={[10, 0.2, 10]} scale={1} />
      </RigidBody>

      {/* Buffalo */}
      <Animal path="/buffalo/scene.gltf" position={[5, 0, 4]} />

      {/* Big central lake */}
      <Lake position={[30, 0.02, 50]} width={60} height={60} waveStrength={0.01} />

      {/* Small pond */}
      <Lake position={[40, 0.02, -50]} width={30} height={30} waveStrength={0.01} />

      <Lake position={[-63, 0.02, -50]} width={25} height={20} waveStrength={0.01} />

      <Lake position={[-85, 0.02, -70]} width={30} height={26} waveStrength={0.01} />

      <RiceField cols={40} rows={40} spacing={0.5} position={[-75, 0, 8]} />
      <RiceField cols={40} rows={40} spacing={0.5} position={[-50, 0, 8]} />
      <RiceField cols={40} rows={40} spacing={0.5} position={[-25, 0, 8]} />
      <RiceField cols={40} rows={40} spacing={0.5} position={[-25, 0, 75]} />
      <RiceField cols={40} rows={40} spacing={0.5} position={[-50, 0, 75]} />


      <SugarcaneField cols={10} rows={10} position={[-10, -1, -80]} />
      <SugarcaneField cols={10} rows={10} position={[15, -1, -80]} />
      <SugarcaneField cols={10} rows={10} position={[40, -1, -80]} />
      <SugarcaneField cols={10} rows={10} position={[65, -1, -80]} />
      <SugarcaneField cols={10} rows={10} position={[15, -1, -80]} />
      <SugarcaneField cols={10} rows={10} position={[80, -1, -50]} />
      <SugarcaneField cols={10} rows={10} position={[80, -1, -20]} />


      {/* Player */}
      <Player position={[70, 12.8, 50]} rotation={[0, -Math.PI / 1.5, 0]} />

      {/* Debug Animations */}
      <DebugAnimations />
    </Physics>
  );
};

export default World;
