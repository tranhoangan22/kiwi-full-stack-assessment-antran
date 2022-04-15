import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { fetchDoors, fetchLastSensorCommunication } from "../../services/apis";

const Container = styled.div`
  max-width: 880px;
  margin: 16px auto;
  padding: 0 16px;
`;

const Heading = styled.h1`
  font-size: "42px";
  line-height: "48px";
  font-weight: 700;
  margin-bottom: 24px;
`;

const DoorsList = () => {
  const [doors, setDoors] = useState([]);
  const [doorsPlus, setDoorsPlus] = useState([]);

  const updateSensorPlus = useCallback(async () => {
    if (doors && doors.length !== 0) {
      const plus = await Promise.all(
        doors.map(async (door) => {
          const sensorStatus = await fetchLastSensorCommunication(
            door.sensor_uuid
          );
          return Promise.resolve({ ...door, sensorStatus });
        })
      );
      setDoorsPlus(plus);
    }
  }, [doors]);

  useEffect(() => {
    fetchDoors().then((response) => setDoors(response.data));
  }, []);

  useEffect(() => {
    updateSensorPlus();
  }, [doors, updateSensorPlus]);

  console.log(doors);
  console.log(doorsPlus);

  return (
    <Container>
      <Heading>All Doors</Heading>
      {doors &&
        doors.map((door) => (
          <div key={door.id}>
            {door.street} - {door.postal_code} - {door.city} - {door.name}
          </div>
        ))}
    </Container>
  );
};

export default DoorsList;
