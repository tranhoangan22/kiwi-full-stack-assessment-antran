// compare function to sort doors by id
export const compare = (door1, door2) => {
  if (door1.door_id < door2.door_id) {
    return -1;
  }
  if (door1.door_id > door2.door_id) {
    return 1;
  }
  return 0;
};
