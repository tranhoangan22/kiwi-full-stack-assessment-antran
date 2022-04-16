import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DoorContainer = styled.div`
  max-width: 50%;
  margin: 16px auto;
  padding: 0 16px;

  @media screen and (max-width: 800px) {
    max-width: 80%;
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const DoorDetailEntry = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  border-bottom: 1px solid darkgrey;
`;

const Key = styled.span``;

const Value = styled.span``;

const DoorDetail = () => {
  const { id } = useParams();
  return (
    <DoorContainer>
      <Heading>Details - Door ID: {id}</Heading>
      <DoorDetailEntry>
        <span>Key</span>
        <span>Value</span>
      </DoorDetailEntry>
      <DoorDetailEntry>
        <span>Key</span>
        <span>Value</span>
      </DoorDetailEntry>
    </DoorContainer>
  );
};

export default DoorDetail;

// name
// sensor_uuid
// address
// country_code
// geolocation
// address_id
// installation_time
// user_list
//  - user_id, name, email, user_door_permission_creation time
