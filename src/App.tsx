import CinematicVillage from "./canvas/CinematicVillage";
import TourOverlay from "./components/TourOverlay";
import "./index.css";

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <CinematicVillage />
      <TourOverlay />
    </div>
  );
}