import axios from "axios";

export const fetchDoors = async () => {
  return axios.get("http://localhost:4000/doors");
};

export const fetchLastSensorCommunication = async (sensor_uuid) => {
  return axios.get(`http://localhost:4000/sensorstatus/${sensor_uuid}`);
};
