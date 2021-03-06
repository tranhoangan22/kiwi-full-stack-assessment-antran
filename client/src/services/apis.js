import axios from "axios";

export const fetchDoors = async () => {
  return axios.get("http://localhost:4000/doors");
};

export const fetchLastDoorOpening = async (sensorUUID) => {
  return axios.get(`http://localhost:4000/lastdooropening/${sensorUUID}`);
};

export const fetchLastSensorCommunication = async (sensorUUID) => {
  return axios.get(
    `http://localhost:4000/lastsensorcommunication/${sensorUUID}`
  );
};

// Get both last door opening and last sensor communication
export const fetchLastDoorStatus = async (sensorUUID) => {
  return axios.get(`http://localhost:4000/sensorstatus/${sensorUUID}`);
};

export const fetchMultipleLastSensorCommunications = async (sensorUUIDs) => {
  return axios.get("http://localhost:4000/sensorstatuses", {
    params: sensorUUIDs,
  });
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
