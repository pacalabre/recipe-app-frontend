"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../services/user-service";

const Users = () => {
  const [users, setUsers] = useState<any>([]);

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
      {users.length > 0 ? (
        users?.map((user: any) => (
          <div>
            <p>Name: {user.name}</p>
            <p>Username: {user.userName}</p>
          </div>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Users;
