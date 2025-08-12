const key = '62f3a367512d4266b6225520241003';

function getWeather() {
    const city = document.getElementById('city').value;
    
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('result');
            
            if (data.error) {
                result.innerHTML = '<p>City not found</p>';
            } else {
                const cityName = data.location.name;
                const icon = data.current.condition.icon;
                const temp = Math.round(data.current.temp_c);
                const condition = data.current.condition.text;
                
                result.innerHTML = `
                    <div class="weather">
                        <h2>${cityName}</h2>
                        <img src="https:${icon}">
                        <p class="temp">${temp}°C</p>
                        <p>${condition}</p>
                    </div>
                `;
            }
        });
}

function searchCities() {
    const text = document.getElementById('city').value;
    const suggestions = document.getElementById('suggestions');

    
    const url = `https://api.weatherapi.com/v1/search.json?key=${key}&q=${text}`;
    
    fetch(url)
        .then(response => response.json())
        .then(cities => {
            const cityList = cities.map(city => {
                return `<div onclick="selectCity('${city.name}')">${city.name}</div>`;
            }).join('');
            
            suggestions.innerHTML = cityList;
            
            if (cities.length > 0) {
                suggestions.style.display = 'block';
            } else {
                suggestions.style.display = 'none';
            }
        });
}

function selectCity(name) {
    const cityInput = document.getElementById('city');
    const suggestions = document.getElementById('suggestions');
    
    cityInput.value = name;
    suggestions.style.display = 'none';
    getWeather();
}