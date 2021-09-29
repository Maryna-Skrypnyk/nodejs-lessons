const express = require("express");
const morgan = require("morgan");
const got = require("got");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8081;
const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;

app.use(morgan("tiny")); // for log
app.use(cors());
// app.use("/api", router);

app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude) {
      return res
        .status(400)
        .json({ message: "latitude parameter is mandatory" });
    }
    if (!longitude) {
      return res
        .status(400)
        .json({ message: "longitude parameter is mandatory" });
    }

    const response = await got(thirdPartyBaseUrl, {
      searchParams: {
        key: thirdPartyApiKey,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });
    const [weatherData] = response.body.data;

    // const weatherData = response.body.data[0]; // or

    // if (!weatherData) {
    //   console.log("There is no data for this query!");
    // }
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;
    res.json({ city_name, description, temp });
  } catch (err) {
    res.status(500).json({ massage: err.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch:", err);
  }
  console.log(`Server works at port ${PORT}`);
});
