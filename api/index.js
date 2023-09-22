const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const corsOptions = {
  origin: "https://incredible-macaron-e82056.netlify.app",
};
app.use(cors(corsOptions));
app.use(express.json()); //to enable sending json object

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const filePath = path.join(__dirname, "/images", req.file.filename);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // Automatically detect resource type (image, video, raw, etc.)
    });
    fs.unlinkSync(filePath);
    res.status(200).json(result.secure_url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", catRoute);

const port = 5000;
app.listen(port, () => {
  console.log("Backend is runnning");
});
