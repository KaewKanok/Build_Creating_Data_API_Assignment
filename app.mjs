import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4001;

app.use(express.json());

app.get("/users", async (req, res) => {
  const result = await connectionPool.query("select * from users");

  return res.json({
    data: result.rows,
  });
});

app.get("/assignments", async (req, res) => {
  const result = await connectionPool.query("select * from assignments");

  return res.json({
    data: result.rows,
  });
});

app.post("/assignments", async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({
      message:
        "Server could not create assignment because there are missing data from client",
    });
  }

  try {
    await connectionPool.query(
      `INSERT INTO assignments (title, content, category)
       VALUES ($1, $2, $3)`,
      [title, description, category]
    );
    return res.status(201).json({ message: "Created assignment successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Server could not create assignment due to a database connection error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
