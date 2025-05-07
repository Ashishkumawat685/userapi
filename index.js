const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const Qschema = require("./Schema/Users");

// Middleware
app.use(cors());
app.use(bodyparser.json());

const port = 4000;

// ✅ MongoDB URI (encoded '@' as %40)
const MONGO_URI =
  "mongodb+srv://ashishkumawat685:Ashish%402001@cluster0.jy87iul.mongodb.net/userlive?retryWrites=true&w=majority";

// ✅ Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB से सफलतापूर्वक कनेक्ट हो गया"))
  .catch((err) => console.log("❌ MongoDB कनेक्शन में त्रुटि:", err));

// ✅ GET - सभी यूज़र्स
app.get("/users", async (req, res) => {
  try {
    const users = await Qschema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "यूज़र्स को लाने में त्रुटि", error });
  }
});

// ✅ POST - नया यूज़र बनाना
app.post("/users", async (req, res) => {
  try {
    const user = new Qschema(req.body);
    await user.save();
    console.log("✅ नया यूज़र सफलतापूर्वक बनाया गया");
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log("❌ यूज़र को सेव करने में त्रुटि:", error);
    res.status(500).json({ message: "User creation failed", error });
  }
});

// ✅ PATCH - यूज़र को अपडेट करना
app.patch("/users/:id", async (req, res) => {
  try {
    const updatedUser = await Qschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", data: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// ✅ DELETE - यूज़र को हटाना
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await Qschema.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found for deletion" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// ✅ Server Listen
app.listen(port, () => {
  console.log(`🚀 Server चालू हो गया है: http://localhost:${port}`);
});
