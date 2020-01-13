const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/callback", async (req, res) => {
  let request;
  if (req.query.code) {
    request = await axios.post("https://www.strava.com/api/v3/oauth/token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      grant_type: "authorization_code"
    });
    res.cookie("x-Token", request.data.access_token);
    res.cookie("x-Refresh", request.data.refresh_token);
    res.cookie("x-Expires", request.data.expires_at);
    res.send("Authorized");
  }
});

router.get("/info", (req, res) => {
  res.send({
    access_token: req.cookies["x-Token"],
    refresh_token: req.cookies["x-Refresh"],
    expires_at: req.cookies["x-Expires"]
  });
});

module.exports = router;
