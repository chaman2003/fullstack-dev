const key = '62f3a367512d4266b6225520241003';

async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    
    const response = await fetch(url);
    const data = await response.json();
    const result = document.getElementById('result');
    
    if (data.error) {
        result.innerHTML = '<p>City not found</p>';
    } else {
        const cityName = data.location.name;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const temp = data.current.temp_c;
        
        result.innerHTML = `
            <div class="weather">
                <h2>${cityName}</h2>
                <img src="https:${icon}">
                <p class="temp">${temp}°C</p>
                <p>${condition}</p>
            </div>
        `;
    }
}

async function searchCities() {
    const text = document.getElementById('city').value;
    const suggestions = document.getElementById('suggestions');
    
    const url = `https://api.weatherapi.com/v1/search.json?key=${key}&q=${text}`;
    
    const response = await fetch(url);
    const cities = await response.json();
    
    suggestions.innerHTML = cities.map(city => 
        `<div onclick="selectCity('${city.name}')">${city.name}</div>`
    ).join('');
    
    suggestions.style.display = cities.length > 0 ? 'block' : 'none';
}

function selectCity(name) {
    document.getElementById('city').value = name;
    document.getElementById('suggestions').style.display = 'none';
    getWeather();
}