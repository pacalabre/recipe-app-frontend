"use client";

import { useUser } from "../contextApi/UserProvider";
const Profile = () => {
  const { user } = useUser();
  return (
    <>
      <h2>Profile</h2>
      <p>Username: {user?.userName}</p>
      <p>Email: {user?.email}</p>
      <p>Member since: {user?.dateCreated}</p>
      <p>Tags Used:</p>
      <p>Your Recipes:</p>
    </>
  );
};

export default Profile;
