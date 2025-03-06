const apiKey = '66beee696b8b4fa2bb9153843250503';
const baseUrl = `https://api.weatherapi.com/v1/`;
const container = document.querySelector('#container');
const searchInput = document.querySelector('input');
let weatherData = {}
const getDateDetails = (dates) => {
    const dateDetails = new Date(dates);
    const weekDay = dateDetails.toLocaleString('en-US', { weekday: "long" });
    const day = dateDetails.toLocaleString('en-US', { day: "numeric" });
    const month = dateDetails.toLocaleString('en-US', { month: "long" });
    return { weekDay, day, month };
}
const displayWeatherData = (array) => {
    let carton = ``;
    for (let i = 0; i < array.length; i++) {
        const { weekDay, day, month } = getDateDetails(array[i].date);
        carton += `<div class="col-md-6 col-lg-4">
    <div class="card text-white ">
        <div class="d-flex justify-content-between align-items-center fs-3">
            ${i === 0 ? `<p>${weekDay}</p>
            <p>${day} ${month} </p>` : `<p>${weekDay}</p>`}
        </div>
        <div class="fs-4">
            ${i == 0 ? `<p class="text-center">
                ${weatherData.location.name}
            </p>`: ``}
        </div>
        <div class="d-flex flex-column justify-content-between align-items-center">
            ${i === 0 ?
                `<p class="display-2 fw-bold">
                ${weatherData.current.temp_c}&deg;C
            </p>
            <img src="https:${weatherData.current.condition.icon}" alt="weatherLogo">` : `
            <img src="https:${array[i].day.condition.icon}">
            <h2>${array[i].day.maxtemp_c}&deg;C</h2>
            <p>${array[i].day.mintemp_c}&deg;C</p>

            `}
        </div>
        ${i == 0 ? `
        <p class="text-center fs-3">
            ${weatherData.current.condition.text}
        </p>
        `: `
        <p class="text-center fs-3">
            ${array[i].day.condition.text}
        </p>
        `}
        ${i == 0 ? `
        <div class="d-flex justify-content-between align-items-center py-2">
            <span><i class="fa-solid fa-umbrella"></i> ${array[0].day.daily_chance_of_rain}%</span>
            <span><i class="fa-solid fa-wind"></i>${array[0].day.maxwind_kph}Km/h</span>
            <span><i class="fa-solid fa-compass"></i>${weatherData.current.wind_dir}</span>
        </div>
        `: ``}
    </div>
</div>`
    }
    container.innerHTML = carton;

}
const getWeather = async (searchParameter = 'cairo') => {
    if (searchParameter.length === 0) getWeather();
    if (searchParameter.length < 3) return;
    try {
        let response = await fetch(`${baseUrl}forecast.json?key=${apiKey}&q=${searchParameter}&days=3`);
        response = await response.json();
        weatherData = response;
        displayWeatherData(weatherData.forecast.forecastday)

    } catch (error) {
        console.log(error);
    }

}
getWeather();
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();
    getWeather(value);
})
navigator
    .geolocation.getCurrentPosition((data) => {
        getWeather(`${data.coords.latitude}`, `${data.coords.longitude}`);


    }, () => {
        getWeather();
    })