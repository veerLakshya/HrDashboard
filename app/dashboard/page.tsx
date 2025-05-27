import UserList from "@/components/userList";
import { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Flam | Hr Dashboard",
  description: "Employee management dashboard for Flam",
};

const getUsers = async () => {
  const res = await fetch("https://dummyjson.com/users?limit=20");
  const data = await res.json();
  return data;
};

const EmployeesPage = async () => {
  const data = await getUsers();
  const users = data.users;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* header */}
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-[#D6FF00]" />
        <div>
          <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>
          <p className="text-gray-300 mt-1">
            View and manage all employee information
          </p>
        </div>
      </div>

      <UserList users={users} />
    </div>
  );
};

export default EmployeesPage;
