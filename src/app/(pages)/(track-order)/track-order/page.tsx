import TrackOrder from "../components/TrackOrder";
import { PrivateRoute } from "@/utils/PrivateRoute";

export default function page() {
  return (
    <PrivateRoute>
      <TrackOrder />
    </PrivateRoute>
  );
}
