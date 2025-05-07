const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ashishkumawat685:O1Z4yobotKhnbCUi@cluster0.jy87iul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected mongoose with mongdb");
  })
  .catch(() => {
    console.log("Cannot connect mongoose with  mongodb");
  });
