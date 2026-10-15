let respostaTabela = document.getElementById("respostaTabela")
let resposta = document.getElementById("resposta")
let btn_listar = document.getElementById("btn_listar")

btn_listar.addEventListener("click", (e) => {
	e.preventDefault()

	fetch("http://localhost:3000/usuarios", {
		headers: { Authorization: localStorage.getItem("token") }
	})
		.then((res) => res.json())
		.then((dados) => {
			resposta.innerHTML = ""
			respostaTabela.innerHTML = ""

			if (dados.message) {
				resposta.innerHTML = `<p>${dados.message}</p>`
				return
			}

			respostaTabela.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
		})
		.catch((err) => {
			console.error("Erro ao listar os dados", err)
			resposta.innerHTML = "<p>Erro ao listar os dados.</p>"
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
                <th>Telefone</th>
            </tr>
        </thead>
    `
	return cabecalho
}
