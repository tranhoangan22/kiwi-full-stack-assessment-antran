import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Door from "../../components/Door/Door";

import {
  fetchDoors,
  fetchMultipleLastSensorCommunications,
} from "../../services/apis";
import { compare } from "../../services/compare";
import { getDate } from "../../services/getDate";

const Container = styled.div`
  max-width: 80%;
  margin: 16px auto;
  padding: 0 16px;

  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const ListHeader = styled.div`
  font-size: 22px;
  line-height: 24px;
  width: 100%;
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    font-size: 17px;
  }
`;

const ListHeaderblock = styled.div`
  :first-child {
    width: 10%;
  }
  :nth-child(2) {
    width: 20%;
  }
  width: 35%;
`;

const ButtonContainer = styled.button`
  width: 100%;
  border: none;
  color: white;
  font-size: 19px;
  line-height: 24px;
  padding: 12px;
  margin-top: 12px;
  border-radius: 5px;
  background-color: #85c88a;
  font-weight: 700;
  transition: opacity 120ms ease-in-out 0s, transform 120ms ease-in-out 0s,
    visibility 120ms ease-in-out 0s;

  &:hover {
    cursor: pointer;
    background-color: #019267;
  }

  &:active {
    background-color: #019267;
  }
`;

const DoorsList = () => {
  const [doors, setDoors] = useState([]);
  const [
    doorsWithSensorLastCommunications,
    setDoorWithSensorLastCommunications,
  ] = useState([]);
  const [numberOfDoorsShown, setNumberOfDoorsShown] = useState(10);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  const handleClick = () => {
    if (doors.length > numberOfDoorsShown + 10) {
      setNumberOfDoorsShown(numberOfDoorsShown + 10);
    } else {
      setNumberOfDoorsShown(doors.length);
      setShowLoadMoreButton(false);
    }
  };

  useEffect(() => {
    if (doors && doors.length > 0) {
      fetchMultipleLastSensorCommunications(
        doors.map((door) => door.sensor_uuid)
      ).then((result) => {
        const doorsWithSensorsInfo = [];
        for (let i = 0; i < doors.length; i++) {
          doorsWithSensorsInfo[i] = {
            ...doors[i],
            sensorLastCommunication: getDate(result.data[i] * 1000),
          };
        }
        setDoorWithSensorLastCommunications(doorsWithSensorsInfo);
      });
    }
  }, [doors]);

  useEffect(() => {
    fetchDoors().then((response) => setDoors(response.data.sort(compare)));
  }, []);

  return (
    <Container>
      <Heading>All Doors</Heading>
      <ListHeader>
        <ListHeaderblock>
          <span>ID</span>
        </ListHeaderblock>
        <ListHeaderblock>
          <span>Name</span>
        </ListHeaderblock>
        <ListHeaderblock>
          <span>Address</span>
        </ListHeaderblock>
        <ListHeaderblock>
          <span>Last Communication</span>
        </ListHeaderblock>
      </ListHeader>
      {doorsWithSensorLastCommunications &&
        doorsWithSensorLastCommunications
          .slice(0, numberOfDoorsShown)
          .map((door) => (
            <Door
              key={door.door_id}
              id={door.door_id}
              name={door.name}
              street={door.street}
              postal_code={door.postal_code}
              city={door.city}
              lastSensorCommunication={door.sensorLastCommunication}
            />
          ))}
      {showLoadMoreButton && (
        <ButtonContainer onClick={handleClick}>Load More</ButtonContainer>
      )}
    </Container>
  );
};

export default DoorsList;
