let respostaTabela = document.getElementById("respostaTabela")
let respostaTabela_nome = document.getElementById("respostaTabela_nome")
let resposta = document.getElementById("resposta")
let resposta_nome = document.getElementById("resposta_nome")
let btn_consultar = document.getElementById("btn_consultar")
let btn_consultar_nome = document.getElementById("btn_consultar_nome")

btn_consultar.addEventListener("click", (e) => {
	e.preventDefault()

	const codUsuario = document.getElementById("codUsuario").value

	fetch(`http://localhost:3000/usuario/${codUsuario}`, {
		headers: { "Authorization": localStorage.getItem("token") }
	})
		.then((res) => res.json())
		.then((dados) => {
			resposta.innerHTML = ""
			resposta_nome.innerHTML = ""
			respostaTabela.innerHTML = ""
			respostaTabela_nome.innerHTML = ""

			// Se não encontrar o usuário ou vier mensagem de erro
			if (!dados || dados.message) {
				resposta.innerHTML = `<p>${dados?.message || "Usuário não encontrado!"}</p>`
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
			console.error("Erro ao consultar os dados", err)
			resposta.innerHTML = "<p>Erro ao consultar os dados.</p>"
		})
})

btn_consultar_nome.addEventListener("click", (e) => {
	e.preventDefault()

	const nome = document.getElementById("nome").value

	fetch(`http://localhost:3000/usuario/buscar/${nome}`, {
		headers: { "Authorization": localStorage.getItem("token") }
	})
		.then((res) => res.json())
		.then((dados) => {
			resposta.innerHTML = ""
			resposta_nome.innerHTML = ""
			respostaTabela.innerHTML = ""
			respostaTabela_nome.innerHTML = ""

			// Se não encontrar o usuário ou vier mensagem de erro
			if (!dados || dados.message) {
				resposta_nome.innerHTML = `<p>${dados?.message || "Usuário não encontrado!"}</p>`
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
			console.error("Erro ao consultar os dados", err)
			resposta_nome.innerHTML = "<p>Erro ao consultar os dados.</p>"
		})
})

function criarTbody(dados) {
	let corpo = ""
	corpo += `<tbody>`
	dados.forEach((el) => {
		corpo += `<tr>`
		corpo += `<td>${el.codUsuario}</td>`
		corpo += `<td>${el.nome}</td>`
		corpo += `<td>${el.email}</td>`
		corpo += `<td>${el.cpf}</td>`
		corpo += `<td>${el.telefone}</td>`
		corpo += `</tr>`
	})
	corpo += `</tbody>`
	return corpo
}

function criarThead() {
	let cabecalho = ""
	cabecalho += `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Telefone</th>
            </tr>
        </thead>
    `
	return cabecalho
}
