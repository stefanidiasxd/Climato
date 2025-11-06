/**
 * Salva uma cidade na lista de favoritos do localStorage.
 * @param {string} cidade 
 */
function salvarFavorito(cidade) {
    // 1. Pega a lista atual
    let favoritos = JSON.parse(localStorage.getItem('climaFavoritos')) || [];

    // 2. Verifica se a cidade já não está na lista
    if (!favoritos.includes(cidade)) {
        // 3. Adiciona a nova cidade
        favoritos.push(cidade);
        
        // 4. Salva a lista atualizada de volta no localStorage
        localStorage.setItem('climaFavoritos', JSON.stringify(favoritos));
        alert(cidade + ' adicionada aos favoritos!');
    } else {
        alert(cidade + ' já está nos favoritos.');
    }
}


// --- ONDE USAR ---
//
// Você precisa ter um botão "Salvar Favorito" (ex: <button id="btn-favorito">⭐</button>)
//
// document.getElementById('btn-favorito').addEventListener('click', () => {
//     const cidadeAtual = document.querySelector('.titulo').textContent.split(',')[0];
//     if (cidadeAtual) {
//         salvarFavorito(cidadeAtual);
//     }
// });
//
// Você deve chamar 'salvarFavorito(cidade)' quando o usuário clicar em "Favoritar".

document.addEventListener('DOMContentLoaded', () => {
    
    const listaUI = document.getElementById('lista-favoritos');
    const msgSemFavoritos = document.getElementById('sem-favoritos');
    
    // 1. Carrega os favoritos salvos
    const favoritos = JSON.parse(localStorage.getItem('climaFavoritos')) || [];

    // 2. Verifica se a lista está vazia
    if (favoritos.length === 0) {
        msgSemFavoritos.classList.remove('hidden'); // Mostra a mensagem
    } else {
        msgSemFavoritos.classList.add('hidden'); // Esconde a mensagem
        // 3. Cria o HTML para cada favorito
        favoritos.forEach(cidade => {
            criarItemFavorito(cidade, listaUI);
        });
    }
});

/**
 * Cria o <li> do favorito e adiciona na tela.
 */
function criarItemFavorito(cidade, listaUI) {
    const li = document.createElement('li');
    // 'data-cidade' ajuda a saber quem remover
    li.dataset.cidade = cidade; 

    // Span para o nome (clicável para ver o clima)
    const spanNome = document.createElement('span');
    spanNome.className = 'nome-cidade';
    spanNome.textContent = cidade;
    spanNome.addEventListener('click', () => {
        // Redireciona para a home passando a cidade na URL
        window.location.href = `index.html?cidade=${encodeURIComponent(cidade)}`;
    });

    // Botão de remover
    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = 'Remover';
    
    btnRemover.addEventListener('click', () => {
        removerFavorito(cidade, li);
    });

    li.appendChild(spanNome);
    li.appendChild(btnRemover);
    listaUI.appendChild(li);
}

/**
 * Remove o favorito do localStorage e da tela.
 */
function removerFavorito(cidade, elementoLI) {
    // 1. Lê a lista atual
    let favoritos = JSON.parse(localStorage.getItem('climaFavoritos')) || [];
    
    // 2. Cria uma *nova* lista filtrando o item removido
    favoritos = favoritos.filter(item => item !== cidade);
    
    // 3. Salva a nova lista no localStorage
    localStorage.setItem('climaFavoritos', JSON.stringify(favoritos));
    
    // 4. Remove o item da tela (DOM)
    elementoLI.remove();

    // 5. Se a lista ficar vazia, mostra a mensagem
    if (favoritos.length === 0) {
        document.getElementById('sem-favoritos').classList.remove('hidden');
    }
}