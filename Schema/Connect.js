const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ashishkumawat685:Ashish%402001@cluster0.jy87iul.mongodb.net/userlive?retryWrites=true&w=majority",
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

// const mongoose = require("mongoose");

let isConnected;

const connectdata = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};

module.exports = connectdata;
