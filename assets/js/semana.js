const apiKey = "ef60a79c9c3ca99f2edfad01fd9badb3";
const cidadeElemento = document.getElementById("cidadeSelecionada");
const previsaoContainer = document.getElementById("previsaoSemana");

const params = new URLSearchParams(window.location.search);
const cidade = params.get("cidade");

cidadeElemento.textContent = cidade || 'Cidade desconhecida';

async function carregarPrevisao() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();

    previsaoContainer.innerHTML = '';

    if (data.cod != "200") {
      previsaoContainer.innerHTML = '<p>Não foi possível carregar a previsão.</p>';
      return;
    }

    // Agrupa previsões diárias (a API retorna de 3h em 3h)
    const diasAgrupados = {};

    data.list.forEach(item => {
      const dataDia = item.dt_txt.split(' ')[0];
      if (!diasAgrupados[dataDia]) diasAgrupados[dataDia] = [];
      diasAgrupados[dataDia].push(item);
    });

    const dias = Object.keys(diasAgrupados).slice(0, 7);

    dias.forEach(dataDia => {
      const diaItems = diasAgrupados[dataDia];
      const temps = diaItems.map(i => i.main.temp);
      const descr = diaItems[Math.floor(diaItems.length / 2)].weather[0].description;
      const icon = diaItems[Math.floor(diaItems.length / 2)].weather[0].icon;
      const tempMin = Math.min(...temps);
      const tempMax = Math.max(...temps);

      const card = document.createElement("div");
      card.classList.add("dia-card");

      const dataFormatada = new Date(dataDia).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });

      card.innerHTML = `
        <h3>${dataFormatada}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${descr}">
        <p>${descr}</p>
        <p><strong>Máx:</strong> ${tempMax.toFixed(1)}°C</p>
        <p><strong>Mín:</strong> ${tempMin.toFixed(1)}°C</p>
      `;

      previsaoContainer.appendChild(card);
    });
  } catch (error) {
    previsaoContainer.innerHTML = "<p>Erro ao carregar a previsão 😢</p>";
    console.error(error);
  }
}

function voltar() {
  window.history.back();
}

carregarPrevisao();
