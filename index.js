const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const basicAuth = require("express-basic-auth");
const multer = require("multer");
const bodyParser = require("body-parser");
dotenv.config();

const UserRouter = require("./routes/UserRouter");
const AnnounceRouter = require("./routes/AnnounceRouter");
const NewsRouter = require("./routes/NewsRouter");
const CommunityRouter = require("./routes/CommunityRouter");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authBasic = basicAuth({
  users: { ApiKey: "hup91P^EveCq001ba@7aR6qOan5KWmH#96NW" },
  hallenge: true,
  unauthorizedResponse: (req) => {
    return req.auth
      ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
      : "No credentials provided";
  },
});

app.use(express.static(path.join(__dirname, "uploads")));


// ตั้งค่าการอัปโหลดภาพ
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", UserRouter);
app.use("/api/announce", AnnounceRouter);
app.use("/api/news", upload.single("file"), NewsRouter);
app.use("/api/community", CommunityRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} || http://localhost:${process.env.PORT}`
  );
});

