import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three"

type AnimalProps = {
    path: string; // path to .glb file
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
};

export default function Animal({ path, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: AnimalProps) {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF(path);

    const { actions } = useAnimations(animations, group);

    React.useEffect(() => {
        if (actions) {
            // Pick the first animation (like idle/walk/run)
            const firstAction = Object.values(actions)[0];
            if (firstAction) firstAction.play();
        }
    }, [actions]);

    return (
        <group ref={group} position={position} rotation={rotation} scale={[scale, scale, scale]}>
            <primitive object={scene} />
        </group>
    );
}
