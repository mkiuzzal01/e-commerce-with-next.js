import React from "react";
import ViewUser from "../components/ViewUser";
import { PrivateRoute } from "@/utils/PrivateRoute";

export default function () {
  return (
    <PrivateRoute>
      <ViewUser />
    </PrivateRoute>
  );
}
