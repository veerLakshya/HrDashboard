"use client";

import { useParams } from "next/navigation";
import useUser from "@/Hooks/useEmployee";

export default function EmployeePage() {
  const params = useParams();
  const employeeId = params.id as string;
  const { user: employee, loading, error } = useUser(parseInt(employeeId));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading employee details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-600">Employee not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Employee Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Employee ID</h2>
            <p className="mt-1">{employee.id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
            <p className="mt-1">
              {employee.firstName} {employee.lastName}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Email</h2>
            <p className="mt-1">{employee.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
            <p className="mt-1">{employee.phone}</p>
          </div>{" "}
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Address</h2>
            <p className="mt-1">
              {employee.address?.address}, {employee.address?.city},{" "}
              {employee.address?.state} {employee.address?.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
