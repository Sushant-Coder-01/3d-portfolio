import { useGLTF } from "@react-three/drei";

type TreeProps = {
    scale?: number;
};

export default function BanyanTree({ position = [0, 0, 0], scale = 1, ...props }: TreeProps) {
    const { scene } = useGLTF("/banyan_tree.glb"); // put banyan_tree.glb in public/models

    return (
        <primitive
            object={scene}
            position={position}
            scale={[scale, scale, scale]}
            {...props}
        />
    );
}
