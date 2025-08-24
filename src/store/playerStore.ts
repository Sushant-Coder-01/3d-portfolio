import {create} from "zustand";

interface MoveInput {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
}

interface GameState {
  cameraAttached: boolean;
  playerSpeed: number;
  moveInput: MoveInput;
  setCameraAttached: (attached: boolean) => void;
  setPlayerSpeed: (speed: number) => void;
  setMoveInput: (input: MoveInput) => void;
}

export const useGameStore = create<GameState>((set) => ({
  cameraAttached: true,
  playerSpeed: 5,
  moveInput: { forward: false, back: false, left: false, right: false },
  setCameraAttached: (attached) => set({ cameraAttached: attached }),
  setPlayerSpeed: (speed) => set({ playerSpeed: speed }),
  setMoveInput: (input) => set({ moveInput: input }),
}));
