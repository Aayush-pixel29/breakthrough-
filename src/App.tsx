import VillageDashboard from "./components/VillageDashboard";
import VillageScene from "./canvas/VillageScene";
import { LoadingProvider } from "./context/LoadingProvider";
import { useGameStore } from "./store/useGameStore";

function GameLayer() {
  const { activeSection, setActiveSection } = useGameStore();
  
  return (
    <>
      <VillageScene activeSection={activeSection} setActiveSection={setActiveSection} />
      <VillageDashboard />
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <GameLayer />
    </LoadingProvider>
  );
}