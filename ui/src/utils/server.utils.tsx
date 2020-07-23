export const getServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "something";
  } else {
    return "http://localhost:5057";
  }
};
