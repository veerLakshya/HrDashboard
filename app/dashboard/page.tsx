import UserList from "@/components/userList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Page with user list.",
};

const getUsers = async () => {
  const res = await fetch("https://dummyjson.com/users?limit=5");
  const data = await res.json();
  return data;
};

const EmployeesPage = async () => {
  const data = await getUsers(); // full response
  const users = data.users;

  return (
    <div>
      {/* {users.map((user: any) => ( */}
      <UserList users={users} />
      {/* ))} */}
    </div>
  );
};

export default EmployeesPage;
