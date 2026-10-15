let nomeUsuario = document.getElementById("nomeUsuario")
let btn_logout = document.getElementById("btn_logout")
let btn_login = document.getElementById("btn_login")

let token = localStorage.getItem("token")
let nome = localStorage.getItem("nomeUsuario")
let textoUser = `${nome}`

if (!nome) textoUser = ""

if (token) {
	btn_logout.style.display = "inline-block"
	btn_login.style.display = "none"
	nomeUsuario.textContent = textoUser
} else {
	btn_logout.style.display = "none"
	btn_login.style.display = "inline-block"
	nomeUsuario.textContent = ""
}

btn_logout.addEventListener("click", (e) => {
	e.preventDefault()

	localStorage.clear()
	window.location.reload()
})
