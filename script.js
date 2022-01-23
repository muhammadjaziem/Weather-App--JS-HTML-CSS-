const apikey = "3265874a2c77ae4a04bb96236a642d2f"; //api key for the weather

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("searchWeather");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`; 

    //functions to retrieve the API data based on the location
async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json(); //convert the outcome to json

    //console.log(respData);

    addWeatherToPage(respData); //map the data to weather
}

function addWeatherToPage(data) {
    const temp = KelvintoCelcius(data.main.temp);

    const weather = document.createElement("div"); //create a new div
    weather.classList.add("weather");  //add css to the weather element

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

//to convert to Celcius
function KelvintoCelcius(K) {
    return Math.floor(K - 273.15);
}

//when enter button is pressed, this function will be ex
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city); //call the async function
    }
});
