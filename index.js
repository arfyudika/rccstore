const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
const starts = async (dha = new WAConnection()) => {
	dha.logger.level = 'warn'
	console.log(color(figlet.textSync('RCC BOT', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	dha.browserDescription = ["RCC STORE", "Chrome", "3.0.0"];

	// Menunggu QR
	dha.on('qr', () => {
		console.log(color('[', 'pink'), color('!', 'red'), color(']', 'pink'), color('SCAN SEKARANG! AUTO GENERATE 20 SEC'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && dha.loadAuthInfo(`./${setting.sessionName}.json`)
	dha.on('connecting', () => {
		console.log(color('[ ARFYUDIKA ]', 'purple'), color('WAITING FOR ACTIVE'));
	})
const spinner = { 
  "interval": 120,
  "frames": [
    "A",
    "AR",
    "ARF",
    "ARF Y",
    "ARF YU",
    "ARF YUD",
    "ARF YUDI",
    "ARF YUDIK",
    "ARF YUDIKA",
  ]}

	//connect
	dha.on('open', () => {
		console.log(color('[ ARFYUDIKA ]', 'purple'), color('BOT ACTIVE!'));
	})

	// session
	await dha.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(dha.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	dha.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	dha.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	dha.on('group-participants-update', async (anu) => {
		await welcome(dha, anu)
	})

	dha.on('chat-update', async (message) => {
		require('./dha.js')(dha, message)
	})
}

starts()