let form_login = document.getElementById("form_login")
let resposta = document.getElementById("resposta")

form_login.addEventListener("submit", (e) => {
	e.preventDefault()

	let email = document.getElementById("email").value
	let senha = document.getElementById("senha").value

	fetch(`http://localhost:3000/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
			senha: senha
		})
	})
		.then((res) => {
			return res.json().then((dados) => {
				if (res.ok) {
					localStorage.setItem("token", dados.token)
					localStorage.setItem("nomeUsuario", dados.nome)
					window.location.href = "../index.html"
				} else {
					resposta.textContent = dados.message
				}
			})
		})
		.catch((err) => {
			console.error("Erro ao realizar o login", err)
			resposta.textContent = "Erro ao realizar o login."
		})
})
