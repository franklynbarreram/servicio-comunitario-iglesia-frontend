import { LayoutDashboard } from "components/layout";
import React from "react";

export default function PermissionDeniedComponent() {
  return (
    <LayoutDashboard title="AVSOC">
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <h1 className="f-50 font-bold text-center">Permiso Denegado</h1>
        </div>
      </div>
    </LayoutDashboard>
  );
}
