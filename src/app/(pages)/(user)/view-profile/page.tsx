import ViewUser from "../components/ViewUser";
import { PrivateRoute } from "@/utils/PrivateRoute";

export default function Page() {
  return (
    <PrivateRoute>
      <ViewUser />
    </PrivateRoute>
  );
}
