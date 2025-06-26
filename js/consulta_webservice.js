document.addEventListener("btnBuscar", function(event){
    buscarTempo();
});

async function buscartempo() {
    const cidade = document.getElementById('cidadeInput').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = "none";
    resultadoDiv.innerHTML = "Buscando...";

    const tempo = await getPrevisao(cidade);

    If (tempo) {
        resultadoDiv.innerHTML = '
        <h2>cidade</h2>
        <p><strong>Clima:</strong> ${tempo.main} (${tempo.description})</p>
        <p><strong>Temperatura:</strong> ${tempo.temp_min}°C - ${tempo.temp_max}°C</p></p>
        <p><strong>Vento:</strong> ${tempo.speed} m/s</p>
        <p><strong>Visibilidade:</strong> ${tempo.visibility} metros</p>
        <p><strong>Nascer do Sol:</strong> ${tempo.sunrise}</p>
        <p><strong>Pôr do Sol:</strong> ${tempo.sunset}</p>
        <p><strong>Latitude:</strong>${tempo.lat}, <strong>Longitude:</strong> 
        ${tempo.lon}</p>
    ';
     resultado.style.display = "block"; 
   } else {
      resultadoDiv.innert = "<p>Erro ao buscar dados. Verifique o nome da cidade.</p>";
      resultadoDiv.style.display = "block";
   }            
}


async fuction getPrevisao(cidade) {
    const chave = "6135072afe7f6cec1537d5cb08a5a1a2";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chave}';

    try {
        const resp = await fetch(url);
        if (!resp.ok) trow new Error("Erro ao obter dados da API");

        const dados = await resp.json();

        const surrise = new Date(dados.sys.surrise * 1000).toLocaleTimeString();
        const sunset = new Date(dados.sys.sunset * 1000).toLocaleTimeString();

        const tempo = {
            lat: dados.coord.lat,
            lon: dados.coord.lon,
            description: dados.weater[0].description,
            main: dados.weather[0].mais,
            temp_min: dados.main.temp_min,
            temp_max: dados.wind.speed,
            speed: dados.wind.speed
            visibility: dados.visibility,
            sunrise: sunrise,
            sunset: sunset
        };
    }            
}

