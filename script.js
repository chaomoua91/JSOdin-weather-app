const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ad80c83c62944a4cbc111505242905";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a City");
  }
});

async function getWeatherData(city) {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    location: { name },
    current: {
      temp_f,
      humidity,
      condition: { text },
    },
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("img");

  cityDisplay.textContent = name;
  tempDisplay.textContent = `${temp_f}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = text;
  weatherEmoji.textContent = getGiphy(text);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

async function getGiphy(text) {
  try {
    const img = document.querySelector("img");
    let keyWord = text;
    if (keyWord == "Clear") {
      keyWord = "Clear Sky";
    }

    const response = await fetch(
      "https://api.giphy.com/v1/gifs/translate?api_key=RVtCd0LhavcjcRbA3EQUbYWsRoEdLwSI&s=" +
        keyWord,
      { mode: "cors" }
    );
    const giphyResponse = await response.json();
    console.log(giphyResponse);
    img.style.display = "";
    img.src = giphyResponse.data.images.original.url;
  } catch (err) {
    displayError("cannot find gif");
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
