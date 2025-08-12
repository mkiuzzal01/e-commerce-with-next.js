import React from "react";
import UpdateUser from "../components/UpdateUser";
import { PrivateRoute } from "@/utils/PrivateRoute";

export default function page() {
  return (
    <PrivateRoute>
      <UpdateUser />
    </PrivateRoute>
  );
}
