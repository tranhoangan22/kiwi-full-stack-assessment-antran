import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { fetchLastSensorCommunication } from "../../services/apis";
import { getDate } from "../../services/getDate";

const DoorContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #d8dde1;
  padding: 24px 24px;
  background-color: #ffffff;
  box-shadow: rgba(12, 15, 20, 0.02) 0px 0px 0px 1px,
    rgba(12, 15, 20, 0.06) 0px 0px 1px 0px,
    rgba(12, 15, 20, 0.06) 0px 2px 2px 0px;

  cursor: pointer;

  :hover {
    background-color: #d8dde1;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
const ItemContainer = styled.div`
  :first-child {
    width: 10%;
  }
  :nth-child(2) {
    width: 20%;
  }
  width: 35%;
`;

const Door = ({ id, name, street, postal_code, city, sensor_uuid }) => {
  const [lastCommunication, setLastCommunication] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => navigate(`./door/${id}`);

  useEffect(() => {
    if (sensor_uuid) {
      fetchLastSensorCommunication(sensor_uuid).then((result) => {
        if (result.status === 200) {
          setLastCommunication(getDate(result.data * 1000));
        } else {
          setLastCommunication("Not Found");
        }
      });
    }
  }, [sensor_uuid]);

  return (
    <DoorContainer onClick={handleClick}>
      <ItemContainer>{id}</ItemContainer>
      <ItemContainer>{name}</ItemContainer>
      <ItemContainer>
        {street}, {postal_code} {city}
      </ItemContainer>
      <ItemContainer>
        {lastCommunication
          ? lastCommunication
          : "Loading last communication..."}
      </ItemContainer>
    </DoorContainer>
  );
};

export default Door;
