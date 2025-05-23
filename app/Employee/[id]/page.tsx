import { useRouter } from "next/router";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Details",
  description: "Employee Details Page.",
};

const EmployeePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Employee Details</h1>
      <p className="mt-4">Employee ID: {id}</p>
    </div>
  );
};

export default EmployeePage;
