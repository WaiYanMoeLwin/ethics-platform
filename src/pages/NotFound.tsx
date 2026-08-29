import { Link } from "react-router-dom";
import Placeholder from "../components/ui/Placeholder";

export default function NotFound() {
  return (
    <Placeholder title="404">
      <Link className="text-ethical underline font-mono text-sm" to="/">
        Back to home
      </Link>
    </Placeholder>
  );
}
