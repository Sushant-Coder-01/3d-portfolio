import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";

type AnimalProps = {
    path: string; // Path to .glb file
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    animationName?: string; // Optionally choose which animation to play
};

export default function Animal({
    path,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    animationName,
}: AnimalProps) {
    const group = useRef<Group>(null);

    // Load GLTF model once per path
    const { scene, animations } = useGLTF(path);

    // Animations tied to this group
    const { actions } = useAnimations(animations, group);

    // Pick animation safely
    useEffect(() => {
        if (!actions) return;

        // Select given animation or first available
        const action =
            (animationName && actions[animationName]) ||
            Object.values(actions)[0];

        if (action) {
            action.reset().fadeIn(0.5).play();
        }

        // Cleanup on unmount
        return () => {
            if (action) {
                action.fadeOut(0.5);
            }
        };
    }, [actions, animationName]);

    // Memoized scaling
    const scaled = useMemo(() => [scale, scale, scale] as [number, number, number], [scale]);

    return (
        <group ref={group} position={position} rotation={rotation} scale={scaled}>
            <primitive object={scene} />
        </group>
    );
}

// Ensure GLTF is cached & not reloaded unnecessarily
useGLTF.preload("/path/to/your/model.glb");
