import React from "react";
import UsersList from "../components/UsersList";

function Users(props) {
  const USERS = [
    {
      id: "u1",
      name: "Arusha",
      image: "some",
      places: 7,
    },
  ];
  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
}

export default Users;
