export const getServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://news-me-backend.herokuapp.com";
  } else {
    return "http://127.0.0.1:5000";
  }
};
