const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/running_races", async (req, res) => {
  if (req.cookies["x-Token"]) {
    let request;
    if (req.cookies["x-Expires"] < Date.now()) {
      request = await axios.get(
        `https://www.strava.com/api/v3/running_races?year=${req.query.year ||
          2019}`,
        {
          headers: { Authorization: `Bearer ${req.cookies["x-Token"]}` }
        }
      );
      res.send(request.data);
    } else {
      res.send("Token Expired");
    }
  }
});

module.exports = router;
