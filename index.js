const express = require("express");
const data = require("./MOCK_DATA.json"); // JSON file import

const app = express();
const corss = require("cors");

app.use(corss((origin = "*")));
const port = 4000;

app.use(express.json()); // JSON body parse करने के लिए

const filePath = "./data.json";

// 📌 GET - All Users
app.get("/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

// 📌 POST - Add User
app.post("/users", (req, res) => {
  const newUser = req.body;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "User added successfully", data });
});

// 📌 DELETE - Delete User by ID
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.filter((user) => user.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: `User with id ${id} deleted`, data });
});

// 📌 PATCH - Update User by ID
app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const updatedData = data.map((user) => {
    if (user.id === id) {
      return { ...user, ...updates };
    }
    return user;
  });
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  res.json({ message: `User with id ${id} updated`, data: updatedData });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json(data);
});
