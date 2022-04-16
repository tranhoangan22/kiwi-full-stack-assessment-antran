import axios from "axios";

export const fetchDoors = async () => {
  return axios.get("http://localhost:4000/doors");
};

export const fetchLastSensorCommunication = async (sensor_uuid) => {
  return axios.get(`http://localhost:4000/sensorstatus/${sensor_uuid}`);
};

export const fetchDoorDetails = async (door_id) => {
  return axios.get(`http://localhost:4000/door/${door_id}`);
};

export const updateUserPermission = async (userId, doorId) => {
  const request = {
    method: "post",
    url: "http://localhost:4000/userpermission",
    data: {
      userId,
      doorId,
    },
  };
  return axios(request);
};
