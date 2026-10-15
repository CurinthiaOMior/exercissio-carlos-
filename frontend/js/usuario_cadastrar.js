let resposta = document.getElementById("resposta")
let btn_cadastrar = document.getElementById("btn_cadastrar")

btn_cadastrar.addEventListener("click", (e) => {
	e.preventDefault()

	const usuario = {
		nome: document.getElementById("nome").value,
		email: document.getElementById("email").value,
		senha: document.getElementById("senha").value,
		cpf: document.getElementById("cpf").value,
		telefone: document.getElementById("telefone").value
	}

	fetch("http://localhost:3000/usuario", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(usuario)
	})
		.then((res) => res.json())
		.then((dados) => {
			console.log(dados.message)
			resposta.innerHTML = ""
			resposta.innerHTML += `<p>${dados.message}</p>`
			document.querySelector("form").reset()
		})
		.catch((err) => {
			console.error("Erro ao cadastrar o usuário", err)
			resposta.innerHTML = "<p>Erro ao tentar cadastrar o usuário.</p>"
		})
})
