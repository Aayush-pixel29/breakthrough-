import StoryModeDashboard from "./components/StoryModeDashboard";
import { LoadingProvider } from "./context/LoadingProvider";

export default function App() {
  return (
    <LoadingProvider>
      <StoryModeDashboard />
    </LoadingProvider>
  );
}