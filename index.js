const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/auth", require("./routes/auth.routes"));
app.use("/test", require("./routes/test.routes"));

app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on ${process.env.PORT || 8080}`);
});
