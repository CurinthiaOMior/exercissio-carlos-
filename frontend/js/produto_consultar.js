let respostaTabela = document.getElementById('respostaTabela')
let respostaTabela_nome = document.getElementById('respostaTabela_nome')
let resposta = document.getElementById('resposta')
let resposta_nome = document.getElementById('resposta_nome')
let btn_consultar = document.getElementById('btn_consultar')
let btn_consultar_nome = document.getElementById('btn_consultar_nome')

btn_consultar.addEventListener('click', (e) => {
     e.preventDefault()
    
    const codProduto = document.getElementById('codProduto').value

    fetch(`http://localhost:3000/produto/${codProduto}`, {
		headers: { "Authorization": localStorage.getItem("token") }
	})
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''
        respostaTabela.innerHTML = ''
        respostaTabela_nome.innerHTML = ''

        if (!dados || dados.message) {
            resposta.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        respostaTabela.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
        resposta.innerHTML = '<p>Erro ao consultar os dados.</p>'
    })
})

btn_consultar_nome.addEventListener('click', (e) => {
     e.preventDefault()
    
    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/produto/buscar/${nome}`, {
		headers: { "Authorization": localStorage.getItem("token") }
	})
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''
        respostaTabela.innerHTML = ''
        respostaTabela_nome.innerHTML = ''

        if (!dados || dados.message) {
            resposta_nome.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        respostaTabela_nome.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
        resposta_nome.innerHTML = '<p>Erro ao consultar os dados.</p>'
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codProduto}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.categoria}</td>`
        corpo += `<td>${el.numero}</td>`
        corpo += `<td>${el.quantidade}</td>`
        corpo += `<td>R$ ${el.precoUnit}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Número</th>
                <th>Qtd</th>
                <th>Preço</th>
            </tr>
        </thead>
    `
}
