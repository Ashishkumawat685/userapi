const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const connectdata = require("./Schema/Connect");
const Qschema = require("./Schema/Users");

app.use(cors());
app.use(bodyparser.json());
const port = 4000;

// 📌 GET - All Users
app.get("/users", async (req, res) => {
  const Datta = await Qschema.find();
  res.json(Datta);
});

// 📌 post - All Users

app.post("/users", async (req, res) => {
  const mydata = new Qschema();
  mydata.first_name = req.body.first_name;
  mydata.last_name = req.body.last_name;
  mydata.email = req.body.email;
  mydata.gender = req.body.gender;
  mydata.ip_address = req.body.ip_address;

  const datavalue = await mydata.save();
  if (datavalue) {
    console.log(`successfull post data for `);
    res.status(200).json({ message: "User created successfully" }); //jab backend se msg dena ho/ya alert me dikhana ho post hone pr
  } else {
    console.log("cannot successfull post data");
  }
});

// 📌 patch - All Users

app.patch("/users/:id", async (req, res) => {
  try {
    const datta = await Qschema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (datta) {
      res.status(200).json({
        message: "Data updated successfully",
        data: datta,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 📌 delete - All Users
app.delete("/users/:id", async (req, res) => {
  const datta = await Qschema.findByIdAndDelete(req.params.id);
  if (datta) {
    res.status(200).json({
      message: "succefully delete",
    });
  } else {
    res.status(404).json({ message: "User not delete" });
  }
});

app.listen(port, (req, res) => {
  console.log("website successfully run", port);
});
