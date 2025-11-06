// Evento de busca manual
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                descri: json.weather[0].description,
            });
        } else {
            clearInfo();
            showWarning('Não encontramos essa localização');
        }
    } else {
        clearInfo();
    }
});


// Mostra as informações na tela
function showInfo(json) {
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.temperatura').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.tempInfo').innerHTML = `${json.descri}`;
    document.querySelector('.informacoes img').setAttribute('src', `assets/images/${json.tempIcon}.gif`);
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


// 🔥 Função que pega localização atual do usuário e busca o clima
async function carregarLocalizacaoAtual() {
    if (navigator.geolocation) {
        showWarning('Obtendo sua localização...');
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            try {
                showWarning('Carregando clima local...');
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`;
                const results = await fetch(url);
                const json = await results.json();

                if (json.cod === 200) {
                    showInfo({
                        name: json.name,
                        country: json.sys.country,
                        temp: json.main.temp,
                        tempIcon: json.weather[0].icon,
                        windSpeed: json.wind.speed,
                        descri: json.weather[0].description,
                    });
                } else {
                    showWarning('Não foi possível obter o clima da sua localização.');
                }
            } catch (error) {
                showWarning('Erro ao carregar o clima local.');
                console.error(error);
            }
        }, (error) => {
            // Caso o usuário negue a permissão
            showWarning('Não foi possível acessar sua localização. Mostrando Ijuí por padrão.');
            ijuí();
        });
    } else {
        showWarning('Seu navegador não suporta geolocalização. Mostrando Ijuí por padrão.');
        ijuí();
    }
}


// 🔁 Função reserva (Ijuí) caso geolocalização falhe
async function ijuí() {
    let input = 'Ijuí';
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            descri: json.weather[0].description,
        });
    } else {
        clearInfo();
        showWarning('Não encontramos essa localização');
    }
}

document.getElementById("btnSemana").addEventListener("click", () => {
  const cidade = document.getElementById("searchInput").value || "Ijuí";
  window.location.href = `semana.html?cidade=${encodeURIComponent(cidade)}`;
});

// 🚀 Ao abrir o site, tenta pegar o clima da localização atual
carregarLocalizacaoAtual();
