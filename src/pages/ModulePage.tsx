import { useParams } from "react-router-dom";
import Placeholder from "../components/ui/Placeholder";

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  return (
    <Placeholder title={`Module: ${id ?? "unknown"}`}>
      <p className="text-slate">Module reading view and formative quiz go here.</p>
    </Placeholder>
  );
}
