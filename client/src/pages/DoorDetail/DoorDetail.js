import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchDoorDetails } from "../../services/apis";
import { getDate } from "../../services/getDate";
import {
  fetchLastDoorStatus,
  fetchLastDoorOpening,
  fetchLastSensorCommunication,
  updateUserPermission,
} from "../../services/apis";

import CustomButton from "../../components/CustomButton";

const DoorContainer = styled.div`
  max-width: 60%;
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

const GrantPermissionContainer = styled.div`
  @media screen and (min-width: 800px) {
    padding-left: 10%;
  }
`;

const DoorDetailsContainer = styled.div`
  margin-bottom: 32px;
`;

const DoorDetailEntry = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-bottom: 1px solid darkgrey;
`;

const DateContainer = styled.div`
  width: 40%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: right;
  padding-bottom: 5px;

  & button {
    width: 40%;
  }

  @media screen and (max-width: 800px) {
    & button {
      width: 50%;
    }
  }
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

  & button {
    width: 30%;
  }

  @media screen and (max-width: 800px) {
    & button {
      width: 40%;
    }
  }
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

const MessageContainer = styled.div`
  color: ${(props) => (props.status === "success" ? "green" : "red")};
  display: ${(props) => (props.status === "none" ? "none" : "unset")};
`;

const DoorDetail = () => {
  const { id } = useParams();
  const [sensorUUID, setSensorUUID] = useState("");
  const [addedUserID, setAddedUserId] = useState("");
  const [doorDetails, setDoorDetails] = useState(null);
  const [doorUsers, setDoorUsers] = useState([]);
  const [lastCommunication, setLastCommunication] = useState(null);
  const [lastOpening, setLastOpening] = useState(null);
  const [updateUserPermissionStatus, setUpdateUserPermissionStatus] =
    useState("none");

  const handleChange = (e) => setAddedUserId(e.target.value);

  const handleGetLastDoorOpening = (e) => {
    fetchLastDoorOpening(sensorUUID).then((result) => {
      setLastOpening(getDate(result.data * 1000));
    });
  };

  const handleGetLastSensorCommunication = (e) => {
    fetchLastSensorCommunication(sensorUUID).then((result) => {
      setLastCommunication(getDate(result.data * 1000));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddedUserId("");
    updateUserPermission(addedUserID, id).then((result) => {
      if (result.status === 200) {
        setUpdateUserPermissionStatus("success");
        setDoorUsers([
          ...doorUsers,
          `${result.data.userName[0].first_name} ${result.data.userName[0].last_name}`,
        ]);
      } else {
        setUpdateUserPermissionStatus("failure");
      }
    });
  };

  useEffect(() => {
    fetchDoorDetails(id).then((result) => {
      setDoorDetails(result.data);
      setSensorUUID(result.data.doorInfo[0].sensor_uuid);
      setDoorUsers(
        result.data.doorUsers.map(
          (user) => user.first_name + " " + user.last_name
        )
      );
    });
  }, [id]);

  useEffect(() => {
    if (doorDetails && doorDetails.doorInfo && doorDetails.doorInfo[0]) {
      fetchLastDoorStatus(doorDetails.doorInfo[0].sensor_uuid).then(
        (result) => {
          if (result.status === 200) {
            setLastOpening(getDate(result.data[0] * 1000));
            setLastCommunication(getDate(result.data[1] * 1000));
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
          <span>{sensorUUID && sensorUUID}</span>
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
          <span>Last Door Opening</span>
          <DateContainer>
            <CustomButton onClick={handleGetLastDoorOpening}>
              Refresh
            </CustomButton>
            <span>{lastOpening && lastOpening}</span>
          </DateContainer>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>Last Sensor Communication</span>
          <DateContainer>
            <CustomButton onClick={handleGetLastSensorCommunication}>
              Refresh
            </CustomButton>
            <span>{lastCommunication && lastCommunication}</span>
          </DateContainer>
        </DoorDetailEntry>
        <DoorDetailEntry>
          <span>List of Users with Permission</span>
          <UserListContainer>
            {doorUsers &&
              doorUsers.map((user, index) => <span key={index}>{user}</span>)}
          </UserListContainer>
        </DoorDetailEntry>
      </DoorDetailsContainer>
      <Heading>Grant Permission</Heading>
      <GrantPermissionContainer>
        <FormContainer onSubmit={handleSubmit}>
          <LabelContainer htmlFor="search-input">
            Existing User ID
          </LabelContainer>
          <InputButtonContainer>
            <InputContainer
              onChange={handleChange}
              name="search-input"
              value={addedUserID}
              type="search"
              placeholder="Enter an ID..."
            />
            <CustomButton type="submit">Grant Permission</CustomButton>
          </InputButtonContainer>
        </FormContainer>
        <MessageContainer status={updateUserPermissionStatus}>
          {updateUserPermissionStatus === "success" && (
            <span>User has been granted permission to this door!</span>
          )}
          {updateUserPermissionStatus === "failure" && (
            <span>User of this ID already has permission to this door!</span>
          )}
        </MessageContainer>
      </GrantPermissionContainer>
    </DoorContainer>
  );
};

export default DoorDetail;
