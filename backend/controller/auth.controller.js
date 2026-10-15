const Usuario = require("../models/Usuario")

const cryptoJs = require("crypto-js")
const segredo = "segredo" // deve ficar no arquivo .env

const logar = async (req, res) => {
	const valores = req.body

	console.log("logando")

	if (!valores.email || !valores.senha) {
		return res.status(400).json({ message: "Campos email e senha obrigatórios!" })
	}

	try {
		const usuario = await Usuario.findOne({ where: { email: valores.email } })

		if (!usuario) {
			return res.status(404).json({ message: "Usuario não encontrado!" })
		}

		const bytes = cryptoJs.AES.decrypt(usuario.senha, segredo)
		const senha = bytes.toString(cryptoJs.enc.Utf8)

		console.log(valores)
		console.log(senha)

		if (valores.senha !== senha) {
			return res.status(401).json({ message: "Senha incorreta, não autorizado!" })
		}

		const tresHorasEmMs = 3 * 60 * 60 * 1000
		const tempoExpirar = Date.now() + tresHorasEmMs

		const payload = {
			idUsuario: usuario.codUsuario,
			nome: usuario.nome,
			expiraEm: tempoExpirar
		}

		const token = cryptoJs.AES.encrypt(JSON.stringify(payload), segredo).toString()

		return res.status(200).json({
			message: "Login realizado com sucesso",
			nome: usuario.nome,
			token: token
		})
	} catch (err) {
		console.error("Não foi possível fazer o login!", err)
		res.status(500).json({ message: "Não foi possível fazer o login!" })
	}
}
module.exports = { logar }
