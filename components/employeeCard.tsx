import React from "react";

type User = {
  [key: string]: any;
};

const EmployeeCard = ({ user }: { user: User }) => {
  return (
    <div className="container grid grid-cols-5">
      <div className="p-1">{user.id}</div>
      <div className="p-1">{user.firstName}</div>
      <div>{user.lastName}</div>
    </div>
  );
};

export default EmployeeCard;
