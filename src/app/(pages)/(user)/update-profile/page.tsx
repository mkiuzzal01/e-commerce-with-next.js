import UpdateUser from "../components/UpdateUserForm";
import { PrivateRoute } from "@/utils/PrivateRoute";

export default function page() {
  return (
    <PrivateRoute>
      <UpdateUser />
    </PrivateRoute>
  );
}
