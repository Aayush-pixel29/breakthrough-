import VillageDashboard from "./components/VillageDashboard";
import { LoadingProvider } from "./context/LoadingProvider";

export default function App() {
  return (
    <LoadingProvider>
      <VillageDashboard />
    </LoadingProvider>
  );
}