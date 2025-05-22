import React from "react";

type User = {
  [key: string]: any;
};

const EmployeeCard = ({ user }: { user: User }) => {
  return (
    <div className="container">
      <div>
        <div>{user.id}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
      </div>
    </div>
  );
};

export default EmployeeCard;
