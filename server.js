const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const redis = require("redis");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;
app.use(express.json());

const redisClient = redis.createClient({
  socket: {
    port: 6379,
    host: "redis",
  },
});

const postgresClient = new Pool({
  host: "postgres",
  user: "kiwi",
  database: "kiwi",
});

// ROUTES

app.get("/doors", async (req, res) => {
  try {
    const data = await postgresClient.query(
      "SELECT addresses.id AS address_id, addresses.street, addresses.postal_code, addresses.city, doors.id AS door_id, doors.name, doors.sensor_uuid FROM addresses INNER JOIN doors ON addresses.id = doors.address_id"
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("internal server error");
  }
});

app.get("/door/:door_id", async (req, res) => {
  const { door_id } = req.params;
  try {
    const doorInfo = await postgresClient.query(
      "SELECT addresses.id, addresses.street, addresses.postal_code, addresses.city, doors.name, doors.sensor_uuid, doors.installation_time FROM addresses INNER JOIN doors ON addresses.id = doors.address_id AND doors.id = $1",
      [door_id]
    );
    const doorUser = await postgresClient.query(
      "SELECT user_door_permissions.user_id, user_door_permissions.creation_time, users.email, users.first_name, users.last_name FROM user_door_permissions INNER JOIN users ON user_door_permissions.user_id = users.id AND user_door_permissions.door_id = $1",
      [door_id]
    );
    res.json({ doorInfo: doorInfo.rows, doorUsers: doorUser.rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("internal server error");
  }
});

app.post("/userpermission", async (req, res) => {
  const { userId, doorId } = req.body;
  const currentTimestamp = new Date().toISOString();
  let isUserPermittedToDoor = false;

  try {
    const response = await postgresClient.query(
      "SELECT user_id FROM user_door_permissions WHERE door_id = $1",
      [doorId]
    );

    for (let user of response.rows) {
      console.log(user.user_id);
      if (user.user_id == userId) {
        isUserPermittedToDoor = true;
      }
    }

    if (!isUserPermittedToDoor) {
      await postgresClient.query(
        "INSERT INTO user_door_permissions (user_id, door_id, creation_time) VALUES ($1, $2, $3)",
        [userId, doorId, currentTimestamp]
      );
      const userName = await postgresClient.query(
        "SELECT first_name, last_name FROM users WHERE id = $1",
        [userId]
      );

      res.status(200).json({ userName: userName.rows });
    } else {
      res
        .status(201)
        .json(
          `user id of ${userId} already has permission to door id of ${doorId}`
        );
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("internal server error");
  }
});

app.get("/lastdooropening/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    await redisClient.connect();
    const jsonData = await redisClient.GET(`last_opening_ts:${uuid}`);
    if (jsonData) {
      res.status(200).json(jsonData);
    } else {
      res.status(204).json("no value found for such key");
    }
    await redisClient.disconnect();
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/lastsensorcommunication/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    await redisClient.connect();
    const jsonData = await redisClient.GET(`last_communication_ts:${uuid}`);
    if (jsonData) {
      res.status(200).json(jsonData);
    } else {
      res.status(204).json("no value found for such key");
    }
    await redisClient.disconnect();
  } catch (error) {
    console.log(error.message);
  }
});

// Get both last door opening and last sensor communication
app.get("/sensorstatus/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    await redisClient.connect();
    const jsonData = await redisClient.MGET([
      `last_opening_ts:${uuid}`,
      `last_communication_ts:${uuid}`,
    ]);
    if (jsonData) {
      res.status(200).json(jsonData);
    } else {
      res.status(204).json("no value found for such key");
    }
    await redisClient.disconnect();
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/sensorstatuses", async (req, res) => {
  const sensorUUIDs = Object.values(req.query).map(
    (key) => "last_communication_ts:" + key
  );
  try {
    await redisClient.connect();
    const jsonData = await redisClient.MGET(sensorUUIDs);
    if (jsonData) {
      res.status(200).json(jsonData);
    } else {
      res.status(204).json("no values found for such keys");
    }
    await redisClient.disconnect();
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
