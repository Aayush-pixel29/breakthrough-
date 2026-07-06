import { create } from "zustand";

export type GamePhase = "INTRO" | "PLAYING" | "OVERLAY_ACTIVE" | "SKIP_MODE";

interface GameState {
  phase: GamePhase;
  activeSection: string;
  activeChallenge: string | null;
  completedChallenges: string[];
  skipMode: boolean;
  voiceEnabled: boolean;
  setPhase: (phase: GamePhase) => void;
  setActiveSection: (section: string) => void;
  enterZone: (zoneId: string) => void;
  exitZone: () => void;
  leaveZone: () => void;
  solveChallenge: (zoneId: string) => void;
  resetGame: () => void;
  toggleSkipMode: () => void;
  toggleVoice: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: "PLAYING",
  activeSection: "overview",
  activeChallenge: null,
  completedChallenges: JSON.parse(localStorage.getItem("completedChallenges") || "[]"),
  skipMode: false,
  voiceEnabled: true,
  
  setPhase: (phase) => {
    set({ phase });
  },

  setActiveSection: (section) => {
    set({ activeSection: section });
  },
  
  enterZone: (zoneId) => {
    set({ activeSection: zoneId, phase: "OVERLAY_ACTIVE" });
  },
  
  exitZone: () => {
    set({ activeSection: "overview", phase: "PLAYING" });
  },

  leaveZone: () => {
    set({ activeChallenge: null, phase: "PLAYING" });
  },
  
  solveChallenge: (zoneId) => {
    set((state) => {
      const nextCompleted = state.completedChallenges.includes(zoneId)
        ? state.completedChallenges
        : [...state.completedChallenges, zoneId];
      localStorage.setItem("completedChallenges", JSON.stringify(nextCompleted));
      return {
        completedChallenges: nextCompleted,
        activeChallenge: null,
        phase: "PLAYING",
      };
    });
  },

  resetGame: () => {
    localStorage.removeItem("completedChallenges");
    set({
      phase: "PLAYING",
      activeSection: "overview",
      activeChallenge: null,
      completedChallenges: [],
      skipMode: false,
    });
  },

  toggleSkipMode: () => {
    set((state) => ({ skipMode: !state.skipMode }));
  },
  
  toggleVoice: () => {
    set((state) => ({ voiceEnabled: !state.voiceEnabled }));
  }
}));
