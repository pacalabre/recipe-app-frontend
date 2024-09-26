import axios from "axios";
type GetUsersResponse = {
  data: any[];
};
export const getUsers = async () => {
  try {
    const { data, status } = await axios.get<GetUsersResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error getting users: ${error}`);
  }
};
