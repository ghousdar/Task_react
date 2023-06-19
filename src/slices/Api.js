export const url = "http://localhost:5000/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
