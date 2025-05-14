"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../services/user-service";
import { User } from "../types/userTypes";

const Users = () => {
  const [users, setUsers] = useState<User[]>();

  const getUserList = async () => {
    const response = await getUsers();
    setUsers(response);
    console.log("res", response);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <h1 className="page-title">Users</h1>
      {users?.length ? (
        users?.map((user: User, index: number) => (
          <div key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Users;
