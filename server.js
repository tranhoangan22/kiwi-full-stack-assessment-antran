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
      "SELECT addresses.id, addresses.street, addresses.postal_code, addresses.city, doors.name, doors.sensor_uuid FROM addresses INNER JOIN doors ON addresses.id = doors.address_id"
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/sensorstatus/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    await redisClient.connect();
    const jsonData = await redisClient.GET(`last_communication_ts:${uuid}`);
    if (jsonData) {
      res.status(200).json(JSON.parse(jsonData));
    } else {
      res.status(204).json("no value found for such key");
    }
    await redisClient.disconnect();
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
