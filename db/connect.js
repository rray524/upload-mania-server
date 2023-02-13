const { default: mongoose } = require("mongoose");

const db_CONNECT = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected".underline.blue);
    })
    .catch((err) => console.log(err.underline.red));
};

module.exports = { db_CONNECT };
