export const getDate = (timestamp) => {
  const fullDateTime = new Date(timestamp);
  return (
    fullDateTime.toLocaleDateString("en-de") +
    " " +
    fullDateTime.toLocaleTimeString("en-de")
  );
};
