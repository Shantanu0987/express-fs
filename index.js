const users = require("./MOCK_DATA.json");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 5000;

//middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//get users
app.get("/users", (req, res) => {
  res.json(users);
});
//get user with id
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});
///add a user with post method
app.post("/users", (req, res) => {
  const newUser = req.body;

  users.push({ id: users.length + 1, ...newUser });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving data" });
    }
    res.status(201).json({ message: "User created", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log("server started at " + PORT + " PORT");
});
