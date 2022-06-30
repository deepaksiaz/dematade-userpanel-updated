export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("authToken");
  return token;
};

export const geUserIdFromLocalStorage = () => {
  const user_id = localStorage.getItem("user_id");
  return user_id;
};
