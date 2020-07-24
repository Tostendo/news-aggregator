export const formatDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
  } catch (err) {
    console.error("Could not parse date: ", err);
    return dateString;
  }
};
