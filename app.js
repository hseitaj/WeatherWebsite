const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

  //res.send("Server is running!");
});

app.post("/", function (req, res) {

  const query = req.body.cityName;
  const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "d&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<html>");
      res.write("<h3>The weather is currently " + weatherDesc + "</h3>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.write("</html>");
      res.send();
    });

  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});



//});
