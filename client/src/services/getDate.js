export const getDate = (unixTimestamp) => {
  const fullDateTime = new Date(unixTimestamp * 1000);
  return (
    fullDateTime.toLocaleDateString("en-de") +
    " " +
    fullDateTime.toLocaleTimeString("en-de")
  );
};
