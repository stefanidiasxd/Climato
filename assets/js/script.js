// Cria uma tela inicial dinamicamente




document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    if(input !=='')
    {
        clearInfo();    
        showWarning('Carregando...')
        

        let url= `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`
       
        let results = await fetch(url);
        let json = await results.json();
      
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
        
                descri : json.weather[0].description,

            } 
            );
        }
        else{
            clearInfo();
            showWarning('Não encontramos essa localização');
        }
    }else{
        clearInfo();
    }
})


function showInfo(json){
    showWarning('');
    document.querySelector('.resultado').style.display= 'block';
    document.querySelector('.titulo').innerHTML= `${json.name}, ${json.country}`
    document.querySelector('.temperatura').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.tempInfo').innerHTML= `${json.descri} `;
    document.querySelector('.informacoes img').setAttribute('src',`assets/images/${json.tempIcon}.gif`);


}

function showWarning(msg)
{
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

 async function ijuí (){
    let input = 'Ijuí'
    if(input !=='')
    {
        clearInfo();    
        showWarning('Carregando...')
        

        let url= `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`
       
        let results = await fetch(url);
        let json = await results.json();
      
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
        
                descri : json.weather[0].description,

            } 
            );
        }
        else{
            clearInfo();
            showWarning('Não encontramos essa localização');
        }
    }else{
        clearInfo();
    }
}


/**
 * Salva a cidade na lista de favoritos do localStorage.
 */
function salvarFavorito(cidade) {
    let favoritos = JSON.parse(localStorage.getItem('climaFavoritos')) || [];

    // Verifica se a cidade já NÃO está na lista
    if (!favoritos.includes(cidade)) {
        favoritos.push(cidade);
        localStorage.setItem('climaFavoritos', JSON.stringify(favoritos));
        alert(cidade + ' adicionada aos favoritos!');
    } else {
        alert(cidade + ' já está nos favoritos.');
    }
}

ijuí();


