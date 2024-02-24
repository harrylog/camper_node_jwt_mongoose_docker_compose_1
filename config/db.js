const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URI_ATLAS, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));

  console.log("MongoDB is connected");
};

module.exports = connectDB;
