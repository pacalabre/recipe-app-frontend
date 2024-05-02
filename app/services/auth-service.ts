import axios from "axios";

export const registerUser = (
  registerName: string,
  registerUsername: string,
  registerEmail: string,
  registerPassword: string
) => {
  axios({
    method: "POST",
    data: {
      name: registerName,
      userName: registerUsername,
      email: registerEmail,
      password: registerPassword,
    },
    withCredentials: true,
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
  }).then((res) => {
    return res;
  });
};

export const loginUser = (loginEmail: string, loginPassword: string) => {
  axios({
    method: "POST",
    data: {
      email: loginEmail,
      password: loginPassword,
    },
    withCredentials: true,
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
  }).then((res) => {
    return res;
  });
};

export const getLoggedinUserInfo = () => {
  axios({
    method: "GET",
    withCredentials: true,
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`,
  }).then((res) => {
    return res;
  });
};

export const logoutUser = () => {
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
  }).then((res) => {
    return res;
  });
};
