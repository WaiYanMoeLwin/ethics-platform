import { Link } from "react-router-dom";
import Placeholder from "../components/ui/Placeholder";

export default function Home() {
  return (
    <Placeholder title="DataEthics">
      <p className="mb-4 text-slate">
        Learning ethical data collection in personalized software.
      </p>
      <ul className="font-mono text-sm space-y-1">
        <li>
          <Link className="text-ethical underline" to="/module/tradeoff">
            /module/tradeoff
          </Link>
        </li>
        <li>
          <Link className="text-ethical underline" to="/scenarios">
            /scenarios
          </Link>
        </li>
        <li>
          <Link className="text-ethical underline" to="/study">
            /study
          </Link>
        </li>
      </ul>
    </Placeholder>
  );
}
