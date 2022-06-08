
//linkg collaborator/worked together for javasciprt//

//using moment//
//declare variables w moment//
let Today = moment().format("LL"); 
let first = moment().add(1, "days").format("LL");
let second = moment().add(2, "days").format("LL");
let third = moment().add(3, "days").format("LL");
let fourth = moment().add(4, "days").format("LL");
let fifth = moment().add(5, "days").format("LL");
let city;
let cities; 
let wdata = document.getElementById("wdata")  
let submitbutton = document.getElementById("submitbutton")

//criteria needs 5 days w section and search//

runfiveday = function(event) {
    event.preventDefault();
    wdata.setAttribute("style", "display: block;");
    getCity();
    search();
    $("#ci").val("");
    listCities();
  };
   
 //have a recent searched location reloadable
 function loadMostRecent() {
    let lastSearch = localStorage.getItem("mostRecent");
    if (lastSearch) {
      city = lastSearch;
      search();
    } else {
      city = "Toronto";
      search();
    }
  }

  loadMostRecent()

//using local storage, save previous cities
  function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));

    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
  }

  loadRecentCities()



  //using local storage, save previous cities
  function saveToLocalStorage() {
    localStorage.setItem("mostRecent", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  //generate the location typed
  function getCity() {
    city = $("#ci").val();
    if (city && cities.includes(city) === false) {
      saveToLocalStorage();
      return city;
    } else if (!city) {
      alert("Please enter a valid city");
    }
  }


  // openweathermap API section
  function search() {
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cf4562348e68f3398ce03563de1c0e98";
    let coords = [];

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      coords.push(response.coord.lat);
      coords.push(response.coord.lon);
      let cityName = response.name;
      let cityCond = response.weather[0].description.toUpperCase();
      let cityTemp = response.main.temp;
      let cityHum = response.main.humidity;
      let cityWind = response.wind.speed;
      let icon = response.weather[0].icon;
      $("#icon").html(
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
      );
      $("#city-name").html(cityName + " " + "(" + Today + ")");
      $("#city-cond").text("Current Conditions: " + cityCond);
      $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
      $("#humidity").text("Humidity: " + cityHum + "%");
      $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
      $("#date1").text(first);
      $("#date2").text(second);
      $("#date3").text(third);
      $("#date4").text(fourth);
      $("#date5").text(fifth);

      getUV(response.coord.lat, response.coord.lon);
    }).fail(function (){
      alert("Data loading failed")
    });

    //5-day forecast and UV index
    function getUV(lat, lon) {
     
        
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=cf4562348e68f3398ce03563de1c0e98",
        method: "GET",
      }).then(function (response) {

        
        let uvIndex = response.current.uvi;
        $("#uv-index").text("UV Index:" + " " + uvIndex);
        if (uvIndex >= 8) {
          $("#uv-index").css("color", "red");
        } else if (uvIndex > 4 && uvIndex < 8) {
          $("#uv-index").css("color", "yellow");
        } else {
          $("#uv-index").css("color", "green");
        }
        let cityHigh = response.daily[0].temp.max;
        $("#high").text("Expected high (F): " + " " + cityHigh);

//declaring all variables based on array sequence
let firsttemp = response.daily[1].temp.max;
let secondtemp = response.daily[2].temp.max;
let thirdtemp = response.daily[3].temp.max;
let fourthtemp = response.daily[4].temp.max;
let fifthtemp = response.daily[5].temp.max;

let firsthum = response.daily[1].humidity;
let secondhum = response.daily[2].humidity;
let thirdhum = response.daily[3].humidity;
let fourthhum = response.daily[4].humidity;
let fifthhum = response.daily[5].humidity;

let icon1= response.daily[1].weather[0].icon;
let icon2 = response.daily[2].weather[0].icon;
let icon3 = response.daily[3].weather[0].icon;
let icon4 = response.daily[4].weather[0].icon;
let icon5 = response.daily[5].weather[0].icon;

      //altering text based on temp and humidity as per requirements
        
        $("#tone").text("Temp(F):" + " " + firsttemp.toFixed(1));
        $("#ttwo").text("Temp(F):" + " " + secondtemp.toFixed(1));
        $("#tthree").text("Temp(F):" + " " + thirdtemp.toFixed(1));
        $("#tfour").text("Temp(F):" + " " + fourthtemp.toFixed(1));
        $("#tfive").text("Temp(F):" + " " + fifthtemp.toFixed(1));

        $("#hm1").text("Hum:" + " " + firsthum + "%");
        $("#hm2").text("Hum:" + " " + secondhum + "%");
        $("#hm3").text("Hum:" + " " + thirdhum + "%");
        $("#hm4").text("Hum:" + " " + fourthhum + "%");
        $("#hm5").text("Hum:" + " " + fifthhum + "%");
    
        //images url from openweathermap

        $("#1").html(
          `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
        );
        $("#icon2").html(
          `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
        );
        $("#icon3").html(
          `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
        );
        $("#icon4").html(
          `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
        );
        $("#icon5").html(
          `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
        );
      });
    }
  }
//reload recently searched cities to page
  function listCities() {
    $("#CL").text("");
    cities.forEach((city) => {
      $("#CL").prepend("<tr><td>" + city + "</td></tr>");
    });
  }

  listCities();

//event listener for recently searched
  $(document).on("click", "td", (e) => {
    e.preventDefault();
    let listedCity = $(e.target).text();
    city = listedCity;
    search();
    wdata.setAttribute("style", "display: block;");
  });


//Event Listener for submitbutton //
 submitbutton.addEventListener("click", runfiveday);


