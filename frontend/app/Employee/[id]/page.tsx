import { Metadata } from "next";
import EmployeePageClient from "./EmployeePageClient";

export const metadata: Metadata = {
  title: "Employees | Flam HR Dashboard",
  description:
    "Browse and manage your company's employees in the HR Dashboard.",
};

export default function EmployeesPage() {
  return <EmployeePageClient />;
}
