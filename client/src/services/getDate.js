export const getDate = (timestamp) => {
  if (timestamp) {
    const fullDateTime = new Date(timestamp);
    return (
      fullDateTime.toLocaleDateString("en-de") +
      " " +
      fullDateTime.toLocaleTimeString("en-de")
    );
  }
  return "Not Found";
};
