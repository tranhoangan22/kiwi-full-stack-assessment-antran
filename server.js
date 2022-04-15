const express = require("express");
const app = express();
const Pool = require("pg").Pool;

const PORT = process.env.PORT || 4000;
app.use(express.json());

const pool = new Pool({
  host: "postgres",
  user: "kiwi",
  database: "kiwi",
});

app.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM addresses");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
