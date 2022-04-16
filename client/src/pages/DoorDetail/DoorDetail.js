import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchDoorDetails } from "../../services/apis";
import { getDate } from "../../services/getDate";
import {
  fetchLastSensorCommunication,
  updateUserPermission,
} from "../../services/apis";

const DoorContainer = styled.div`
  max-width: 50%;
  margin: 16px auto;
  padding: 0 16px;

  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
  margin-bottom: 32px;
`;

const DoorDetailsContainer = styled.div`
  margin-bottom: 32px;
`;

const DoorDetailEntry = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  border-bottom: 1px solid darkgrey;
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  margin-bottom: 2px;
  padding-left: 25px;
  width: 100%;
`;

const LabelContainer = styled.label`
  font-size: 17px;
  line-height: 24px;
  margin: 0 0 4px 0;
`;

const InputButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const InputContainer = styled.input`
  padding: 8px;
  margin-right: 12px;
  border-radius: 5px;
  font-size: 17px;
  line-height: 24px;
  border: none;
  width: 60%;
  box-shadow: rgb(153 153 153) 0px 0px 0px 1px;
`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  font-size: 16px;
  line-height: 24px;
  padding: 4px;
  border-radius: 5px;
  background-color: #85c88a;
  font-weight: 700;
  width: 30%;

  &:hover {
    cursor: pointer;
    background-color: #019267;
  }

  &:active {
    background-color: #019267;
  }
`;

const MessageContainer = styled.div`
  padding-left: 25px;
  color: ${(props) => (props.status === "success" ? "green" : "red")};
  display: ${(props) => (props.status === "none" ? "none" : "unset")};
`;

const DoorDetail = () => {
  const { id } = useParams();
  const [doorDetails, setDoorDetails] = useState(null);
  const [lastCommunication, setLastCommunication] = useState(null);
  const [addedUserID, setAddedUserId] = useState("");
  const [updateUserPermissionStatus, setUpdateUserPermissionStatus] =
    useState("none");

  const handleChange = (e) => setAddedUserId(e.target.value);

  const handleSubmit = (e) => {
    console.log(addedUserID);
    e.preventDefault();
    setAddedUserId("");
    updateUserPermission(addedUserID, id).then((result) => {
      if (result.status === 200) {
        setUpdateUserPermissionStatus("success");
      } else {
        setUpdateUserPermissionStatus("failure");
      }
    });
  };

  useEffect(() => {
    fetchDoorDetails(id).then((result) => setDoorDetails(result.data));
  }, [id]);

  useEffect(() => {
    if (doorDetails && doorDetails.doorInfo && doorDetails.doorInfo[0]) {
      fetchLastSensorCommunication(doorDetails.doorInfo[0].sensor_uuid).then(
        (result) => {
          if (result.status === 200) {
            setLastCommunication(getDate(result.data * 1000));
          } else {
            setLastCommunication("Not Found");
          }
        }
      );
    }
  }, [doorDetails]);

  return (
    <DoorContainer>
      <Heading>Details - Door ID: {id}</Heading>
      <DoorDetailsContainer>
        <DoorDetailEntry>
          <span>Name</span>
          <span>
            {doorDetails &&
              doorDetails.doorInfo &&
              doorDetails.doorInfo[0] &&
              doorDetails.doorInfo[0].name}
          </span>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>Sensor UUID</span>
          <span>
            {doorDetails &&
              doorDetails.doorInfo &&
              doorDetails.doorInfo[0] &&
              doorDetails.doorInfo[0].sensor_uuid}
          </span>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>Installation Time</span>
          <span>
            {doorDetails &&
              doorDetails.doorInfo &&
              doorDetails.doorInfo[0] &&
              getDate(doorDetails.doorInfo[0].installation_time)}
          </span>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>Address</span>
          <span>
            {doorDetails && doorDetails.doorInfo && doorDetails.doorInfo[0] && (
              <p>
                {doorDetails.doorInfo[0].street},{" "}
                {doorDetails.doorInfo[0].postal_code}{" "}
                {doorDetails.doorInfo[0].city}
              </p>
            )}
          </span>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>Last Sensor Communication</span>
          <span>{lastCommunication && lastCommunication}</span>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>List of Users with Permission</span>
          <UserListContainer>
            {doorDetails &&
              doorDetails.doorUsers &&
              doorDetails.doorUsers.map((user) => (
                <span key={user.user_id}>
                  {user.first_name} {user.last_name}
                </span>
              ))}
          </UserListContainer>
        </DoorDetailEntry>
      </DoorDetailsContainer>
      <Heading>Grant Permission</Heading>
      <FormContainer onSubmit={handleSubmit}>
        <LabelContainer htmlFor="search-input">Existing User ID</LabelContainer>
        <InputButtonContainer>
          <InputContainer
            onChange={handleChange}
            name="search-input"
            value={addedUserID}
            type="search"
            placeholder="Enter an ID..."
          />
          <ButtonContainer type="submit">Grant Permission</ButtonContainer>
        </InputButtonContainer>
      </FormContainer>
      <MessageContainer status={updateUserPermissionStatus}>
        {updateUserPermissionStatus === "success" && (
          <span>User has been granted permission to this door!</span>
        )}
        {updateUserPermissionStatus === "failure" && (
          <span>User of ID already has permission to this door!</span>
        )}
      </MessageContainer>
    </DoorContainer>
  );
};

export default DoorDetail;
