const mongosee = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongosee
      .connect("mongodb+srv://user:user@cluster0.7t0dnwd.mongodb.net/")
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log(error);

  }
};

conn();
