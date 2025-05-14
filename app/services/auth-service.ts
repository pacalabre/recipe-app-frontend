import axios from "axios";

export const registerUser = async (
  registerName: string,
  registerEmail: string,
  registerPassword: string,
  registerIsAdmin: boolean
) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        isAdmin: registerIsAdmin,
      },
      {
        withCredentials: true,
      }
    );
    return { data, status };
  } catch (error) {
    console.log(`There was an error getting users: ${error}`);
  }
};

export const loginUser = async (loginEmail: string, loginPassword: string) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        email: loginEmail,
        password: loginPassword,
      },
      {
        withCredentials: true,
      }
    );
    return { data, status };
  } catch (error) {
    console.log(`There was an error logging in the user: ${error}`);
  }
};

export const getLoggedinUserInfo = async () => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error getting logged in user info: ${error}`);
  }
};

export const logoutUser = async () => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return { data, status };
  } catch (error) {
    console.log(`There was an error getting users: ${error}`);
  }
};
