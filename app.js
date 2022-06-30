const express = require ("express");
const https = require ("https");
const app = express();
const ejs = require("ejs");
const _=require("lodash");
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req,res){

res.render("home");

})

app.post("/", function (req,res){


  const query = _.capitalize(req.body.cityName);
  const apiKey = process.env.API_Key;
  const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey + "&units="+unit;
    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function (data){
        const weatherData = JSON.parse(data);
        const weatherTemp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icon +"@2x.png";

        console.log(weatherDescription);
        console.log(weatherTemp);
        res.render("weatherupdate",{
          weatherDescription : weatherDescription,
          query : query,
          weatherTemp : weatherTemp,
          imageURL : imageURL

        })
        // res.write("<p>The weather is "+weatherDescription+ " today.</p>");
        // res.write("<h1>The temperature in "+query+ " is "+ weatherTemp +" degree celsius.</h1>");
        // res.write("<img src="+ imageURL+ ">'");
        res.send();


      })
    });

})

app.listen (3000, function(){
  console.log("Server is running on port 3000");
});
