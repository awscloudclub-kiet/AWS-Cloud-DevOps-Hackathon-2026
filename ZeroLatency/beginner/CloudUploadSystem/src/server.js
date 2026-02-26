require("dotenv").config();

const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const app = express();

// serve frontend
app.use(express.static("public"));

// AWS configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// multer + S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    message: "File uploaded successfully ✅",
    fileUrl: req.file.location,
  });
});

// start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
