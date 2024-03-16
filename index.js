const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config(); // <-- To use.env file
app.use(express.json());

const processFile = require("./processFile");

const path = require("path");
app.use("/files", express.static(path.join(__dirname, "upload")));

const cors = (req, res, next) => {
  const origin = "*"; // <-- change this in production
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
};
app.use(cors);

app.post("/upload", processFile, (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const file = url + "/files/" + req.file.filename;
  res.status(201).json({
    message: "Success",
    file: file,
  });
});
// app.post("/upload", processFile, (req, res, next) => {
//   const files = [];
//   const url = req.protocol + "://" + req.get("host");
//   req.files.forEach((file) => {
//     const file_url = url + "/files/" + file.filename;
//     files.push({
//       url: file_url,
//     });
//   });
//   res.status(201).json({
//     message: "files saved successfully!",
//     files,
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
