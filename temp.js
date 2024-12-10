document.addEventListener("DOMContentLoaded", () => {
    const convertButton = document.getElementById("convert-button");
    const resultDisplay = document.getElementById("result");
    const weatherLocation = document.getElementById("weather-location");
    const weatherDesc = document.getElementById("weather-desc");
    const weatherTemp = document.getElementById("weather-temp");
    const body = document.body;

    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
            const data = await response.json();

            const temperature = data.main.temp;
            weatherLocation.textContent = `${data.name}, ${data.sys.country}`;
            weatherDesc.textContent = capitalizeFirstLetter(data.weather[0].description);
            weatherTemp.textContent = `Temperature: ${temperature}°C`;

            updateBackground(temperature);
        } catch {
            weatherLocation.textContent = "Unable to fetch weather data.";
        }
    };

    const updateBackground = (temperature) => {
        if (temperature < 10) {
            body.style.background = "linear-gradient(to bottom, #1e3c72, #2a5298)";
        } else if (temperature > 25) {
            body.style.background = "linear-gradient(to bottom, #ff7300, #ff4500)";
        } else {
            body.style.background = "linear-gradient(to bottom, #91eae4, #86a8e7)";
        }
    };

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    fetchWeather();

    convertButton.addEventListener("click", () => {
        const temp = parseFloat(document.getElementById("temperature-input").value);
        const fromUnit = document.getElementById("unit-from").value;
        const toUnit = document.getElementById("unit-to").value;

        if (isNaN(temp)) {
            resultDisplay.textContent = "Please enter a valid temperature!";
            return;
        }

        let convertedTemp;

        if (fromUnit === toUnit) {
            convertedTemp = temp;
        } else if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
            convertedTemp = temp * 9 / 5 + 32;
        } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
            convertedTemp = temp + 273.15;
        } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
            convertedTemp = (temp - 32) * 5 / 9;
        } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
            convertedTemp = (temp - 32) * 5 / 9 + 273.15;
        } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
            convertedTemp = temp - 273.15;
        } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
            convertedTemp = (temp - 273.15) * 9 / 5 + 32;
        }

        resultDisplay.textContent = `Converted Temperature: ${convertedTemp.toFixed(2)}° ${toUnit}`;
    });
});
