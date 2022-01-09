const express = require("express");
const moongose = require("mongoose");
const router = require("./routes");

moongose
  .connect(
    "mongodb://localhost:27017/products?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));
const PORT = 8080;

const app = express();
app.use(express.json());
app.use("/api", router);

// 에러 핸들러
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server is listening at localhost:${PORT}`);
});

module.exports = app;
