export const getServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://news-me.tostendo.de";
  } else {
    return "http://localhost:5555";
  }
};
