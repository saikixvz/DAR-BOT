/*
* © 2021 Darlyn, INC.
*/

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    rugaapi,
    GroupSettingChange
} = require('@adiwajshing/baileys')

/******COMIENZO DE LA ENTRADA DEL ARCHIVO******/
const { color, bgcolor } = require('./lib/color')
const { bahasa } = require('./src/bahasa')
const { negara } = require('./src/kodenegara')
const { virtex } = require('./src/virtex')
const { wait, pegatinas, musica, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
/******FIN DE ENTRADA DE ARCHIVO******/

/******COMIENZO DE LA ENTRADA DEL PAQUETE NPM******/
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const axios = require("axios")
const fetch = require('node-fetch')
/*const tiktod = require('tiktok-scraper')*/
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
/*const imgbb = require('imgbb-uploader')*/
const lolis = require('lolis.life')
const loli = new lolis()
const speed = require('performance-now')
/******FIN DE ENTRADA DEL PAQUETE NPM******/

/******COMIENZO DE LA ENTRADA JSON******/
const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/json/nsfw.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/json/level.json'))
const _reto = JSON.parse(fs.readFileSync('./src/reto.json'));
const _verdad = JSON.parse(fs.readFileSync('./src/verdad.json'));
/******FIN DE ENTRADA JSON******/

/******INICIO DE LA ENTRADA DEL MENÚ******/
const { help } = require('./src/help')
const { logomaker } = require('./database/menu/logomaker')
const { toinmenu } = require('./src/toinmenu')
const { menuadmin } = require('./src/menuadmin')
const { nsfwmenu } = require('./src/nsfwmenu')
const { desmenu } = require('./src/desmenu')
const { version } = require('./src/version')
const { juegos } = require('./src/juegos')
const { shantera } = require('./src/shantera')
const { antimenu } = require('./src/antimenu')
const { welmenu } = require('./src/welmenu')
const { banmenu } = require('./src/banmenu')
const { otak } = require('./src/otak')
const { levelmenu } = require('./src/levelmenu')
/******FIN DE ENTRADA DEL MENÚ******/

/******CARGA DE ENTRADA VCARD******/
const vcard = 'BEGIN:VCARD\n' // Tarjeta de contacto
            + 'VERSION:3.0\n' 
            + 'FN:Darlyn\n' // Nombre
            + 'ORG:Dar;\n' // Propietario
            + 'TEL;type=CELL;type=VOICE;waid=51956570030:+51 956 570 030\n' // ID de WhatsApp + número de teléfono
            + 'END:VCARD'
/******FIN DE ENTRADA VCARD******/

prefix = '/'
blocked = []
banChats = false

/******CONFIGURACION DE CARGA******/
const settingan = JSON.parse(fs.readFileSync('./admin/set.json'))
const {
	author,
	pack
} = settingan

/******INICIO DE FUNCIONES ENTRADA******/

/******ARCHIVOS ANTILINK POR SHANDUY******/

const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const antiface = JSON.parse(fs.readFileSync('./src/antiface.json'))
const antitik = JSON.parse(fs.readFileSync('./src/antitik.json'))
const antinsta = JSON.parse(fs.readFileSync('./src/antinsta.json'))
const antikwai = JSON.parse(fs.readFileSync('./src/antikwai.json'))
const antiwa = JSON.parse(fs.readFileSync('./src/antiwa.json'))
const antidiscord = JSON.parse(fs.readFileSync('./src/antidiscord.json'))

/******FIN DE ARCHIVOS ANTILINK POR SHANDUY******/


//LEVEL INICIO
const getLevelingXp = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].jid
            }
        }

        const addLevelingXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => {
            const obj = {jid: userId, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
        }
//LEVEL FIN
	
function addMetadata(packname, author) {	
	if (!packname) packname = 'SiaraBot'; if (!author) author = 'Drevill';	
	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	let name = `${author}_${packname}`
	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	const json = {	
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}
	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	let len = JSON.stringify(json).length	
	let last	

	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	

	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	

	const buf2 = Buffer.from(last, "hex")	
	const buf3 = Buffer.from(bytes)	
	const buf4 = Buffer.from(JSON.stringify(json))	

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	fs.writeFile(`./${name}.exif`, buffer, (err) => {	
		return `./${name}.exif`	
	})	

} 
	
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const client = new WAConnection()
	client.version = [2, 2126, 6]
        client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Escanea el codigo QR rapido!!!'))
	})

	fs.existsSync('./Nazwa.json') && client.loadAuthInfo('./Nazwa.json')
	client.on('connecting', () => {
		start('2', 'Estas desconectado')
	})
	client.on('open', () => {
		success('2', 'Conectado by darlyn')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Nazwa.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
	
client.on('group-participants-update', async (anu) => {
	const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/2ZHZCH4/bienvenida-Siarabotby-Drevill.jpg'
				}
				teks = ` ┌──┨ ☠ Dar-Bot☠┠──\n`
				teks += `▢ ${mdata.subject}\n`
				teks += `▢ BIENVENIDO(A)\n`
				teks += `▢ @${num.split('@')[0]}\n`
				teks += `▢ Presentate Con:\n`
				teks += `▢Foto ▢Nombre ▢Edad ▢País\n`
				teks += `▢ Respeta las reglas\n`
				teks += `└──┨ ☠️Darlyn☠️ ┠──\n`
				  let buff = await getBuffer(ppimg)
			client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/2ZHZCH4/bienvenida-Siarabotby-Drevill.jpg'
				}
				teks = `Bueno...Un pendejo menos @${num.split('@')[0]}`
				 let buff = await getBuffer(ppimg)
			client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'promote') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/2ZHZCH4/bienvenida-Siarabotby-Drevill.jpg'
				}
				teks = `≡ *NUEVO ADMIN*
┌───┨ ☠Dar-Bot☠ ┠────
▢ *Nombre* : @${num.split('@')[0]}
▢ *Número* : ${num.replace('@s.whatsapp.net', '')}
▢ *Mensaje* : Felicidades  Admin. 🎉
└────┨ ☠️Dar☠️ ┠────`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
				} else if (anu.action == 'demote') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/2ZHZCH4/bienvenida-Siarabotby-Drevill.jpg'
				}
				teks = `≡ *ADMIN DEGRADADO*
┌───┨ ☠𝖙Dar-Bot☠ ┠────
▢ *Nombre* : @${num.split('@')[0]}
▢ *Número* : ${num.replace('@s.whatsapp.net', '')}
▢ *Mensaje* : Lo siento
└────┨ ☠️Dar☠️ ┠────`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})	
			}
		} catch (e) {
			console.log('Error: %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const apikey = setting.apikey
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Guayaquil').format('HH:mm:ss')
			const date = moment.tz('America/Guayaquil').format('DD/MM/YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'Por favor no hacer spam',
				success: 'Listo',
                                levelon: '*Level activado*',
				leveloff: '*Level desactivado*',
				foto: 'Estoy cambiando la foto del grupo',
				unir: 'Estoy tratando de unirlo\n\n*Recuerda, si no lo uno es por que el usuario tiene bloqueado la funcion para unirlo a grupos*\n\n_*by shanduy*_',
                                levelnoton: '*Level no esta activado*',
				levelnol: '*Nivel* 0 ',
				error: {
					stick: 'Falló, se produjo un error al convertir la imagen en una pegatina',
					yt: 'Falló en el link o se produjo un error al momento de descargar el video',
					unire: 'Por favor, no coloques (+) solo pon el numero con el codigo de area de su pais\n\nEjemplo: *unir 52xxxxxxxxx',
					Iv: 'Este no es un link de youtube'
					},
				only: {
					group: 'Este comando es solo para grupos',
					ownerG: 'Este comando solo puede ser utilizado por un admins del grupo',
					ownerB: 'Este comando solo lo usa ShanBot',
					admin: 'Este comando solo puede ser utilizado por administradores del grupo',
					Badmin: 'Este comando solo se puede usar cuando el bot se convierte en administrador',
                                        pegatina: 'Estoy haciendo tu sticker, los stickersgif son de 6 segundos',
					attp: 'Estoy haciendo tu texto a sticker',
					imgs: 'Convirtiendo tu Sticker a Imagen',
					mpcancion: 'Convirtiendo de MP4 a MP3',
					mpa: 'Estoy descargando tu cancion',
                                        mpv: 'Estoy descargando tu video',
					insta: 'Estoy descargando tu post',
					musica: 'Estoy bucando tu canción\n\n*Recuerda colocar bien el nombre de la cancion',
					musica2: 'Estoy bucando tu canción\n\n*Recuerda colocar bien el nombre de la cancion',
					daftarB: '「NO ESTAS REGISTRADO」\n\nPara usar los comandos primero Registrate \n\n┌─⊷ *REGISTRO* ⊶\n▢ Escribe  ${prefix} daftrar y tu nombre \n▢ Ejemplo: /daftar Darlyn\n└─────────────',
				}
			}
    			const apakah = ['Si','No']
                        const kapankah = ['Otro día','Otra semana','Otro mes','Otro año']
			const botNumber = client.user.jid
			const ownerNumber = ["51956570030@s.whatsapp.net"] // replace this with your number
			const nomorOwner = [ownerNumber]
	                const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const isBanned = ban.includes(sender)
			const groupName = isGroup ? groupMetadata.subject : ''
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isAntiDiscord = isGroup ? antidiscord.includes(from) : false
			const isAntInsta = isGroup ? antinsta.includes(from) : false
			const isAntiTik = isGroup ? antitik.includes(from) : false
			const isAntiFace = isGroup ? antiface.includes(from) : false
			const isAntiKwai = isGroup ? antikwai.includes(from) : false
			const isAntiWa = isGroup ? antiwa.includes(from) : false
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
                        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
                        const isUser = user.includes(sender)
                        const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
                        const NomerOwner = '51956570030@s.whatsapp.net'
                        const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
                        const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
			
			//......................
			
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
           
//LINKS DE WHATSAPP	

if (budy.includes("https://wa.me/")){
		if (!isGroup) return
		if (!isAntiWa) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE WHATSAPP DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
			
	if (budy.includes("wa.me")){
		if (!isGroup) return
		if (!isAntiWa) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE WHATSAPP DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios mi loco")
		}, 0)
	}
			
			
//FIN DE LINKS DE WHATSAPP	
			
case 'inspeccionar':
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('*Este no es un link de WhatsApp...*')
if (!q) return reply('*🙄Y el link??...*')
sp = args[0]
jids = []
var net = sp.split('https://chat.whatsapp.com/')[1]
if (!net) return reply('Porfavor aegurate que el link sea de un grupo de whatsapp: *https://whatsapp.com/....*')
var { id, owner, subject, subjectOwner, desc, descId, participants, size, descOwner, descTime, creation} = await samu330.query({ 
json: ["query", "invite", net],
expect200:true })
let insSm = `_*Inspección by Dar*_
*Id* : _${id}_
Creador del grupo:* ${owner ? `Owner : @${owner.split('@')[0]}` : 'Owner : -'}
*° Nombre del Grupo:* _${subject}_
*° Fecha de creacion:* ${Date(creation * 1000)}
*° Total de Miembros:* ${size}
${desc ? `*Descripcion:* ${desc}` : 'Desc : Sin descripcion'}
*° Id de la Descripcion:* ${descId}
${descOwner ? `° Descripcion cambiada por @${descOwner.split('@')[0]}` : 'Descripcion cambiada por : -'}\n\n*Fecha* : ${descTime ? `${Date(descTime * 1000)}` : '-'}\n\n*° Contactos agendados*\n`
for ( let y of participants) {
insSm += `> @${y.id.split('@')[0]}\n*Admin* : ${y.isAdmin ? 'Si' : 'No'}\n`
jids.push(`${y.id.replace(/@c.us/g,'@s.whatsapp.net')}`)
}
jids.push(`${owner ? `${owner.replace(/@c.us/g,'@s.whatsapp.net')}` : '-'}`)
jids.push(`${descOwner ? `${descOwner.replace(/@c.us/g,'@s.whatsapp.net')}` : '-'}`)
samu330.sendMessage(from, insSm, MessageType.text, {quoted: fliveLoc})
break

case 'takestick':
case 'robar':
if (!isUser) return reply(mess.only.daftarB)
if (!isQuotedSticker) return reply(`Etiqueta un stiquer y escribe: *${prefix}takestick nombre|autor*`)
const encmediats = JSON.parse(JSON.stringify(sam).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var kls = q
var pack = kls.split("|")[0];
var author2 = kls.split("|")[1];
if (!q) return reply('*Y el nombre de autor y paquete?*')
if (!pack) return reply(`*Porfavor escribe bien el formato: ${prefix + command} nombre|autor*`)
if (!author2) return reply(`*Porfavor escribe bien el formato: ${prefix + command} nombre|autor*`)
const dlfile = await samu330.downloadMediaMessage(encmediats)
reply(mess.wait)
const bas64 = `data:image/jpeg;base64,${dlfile.toString('base64')}`
var mantap = await convertSticker(bas64, `${author2}`, `${pack}`)
var imageBuffer = new Buffer.from(mantap, 'base64');
samu330.sendMessage(from, imageBuffer, sticker, {quoted: sam})
addFilter(from)
break
					
case 'clima':
if (!isUser) return reply(mess.only.daftarB)
if (!q) return reply('*Y el lugar del que quieres ver el clima?*')
clima = `https://api.apiflash.com/v1/urltoimage?access_key=57fcd6384cff4e529b9ca76089f05992&url=https://pt.wttr.in/${q}`
sendFileFromUrl(clima, image, {quoted: fimg})
break

case 'timer':
if (!isUser) return reply(mess.only.daftarB)
if (args[1] == "segundos") {
var timer = args[0] + "000"
} else if (args[1] == "minutos") {
var timer = args[0] + "0000"
} else if (args[1] == "horas") {
var timer = args[0] + "00000"
} else {
return reply("Porfavor eliga entre: \nsegundos\nminutos\nhoras\n\nEjemplo: =timer 30 segundos")
}
addFilter(from)
reply(`*⏰Se ajusto su cronometro a ${q}*`)
setTimeout(() => {
reply(`⏰El tiempo de *${q}* a finalizado!`)
}, timer)
addFilter(from)
break
				
case 'blackpink':
if (!q) return reply('*Y el texto para crear el logo donde esta?*')
reply(`*Porfavor espera un momento, tu logo ${command} esta siendo creado con el texto ${q}!*`)		
logo = `https://api.zeks.xyz/api/logobp?apikey=apivinz&text=${q}`
sendFileFromUrl(logo, image, {quoted: fimg, caption: '*🔥 𝘓𝘰𝘨𝘰𝘴 𝘉𝘺 𝘚𝘢𝘮𝘶𝟥𝟥𝟢 🔥*', sendEphemeral: true})
break
			
case 'noprefix':
prefix = ''
reply(`*EL PREFIJO YA NO ES NECESARIO AHORA!*`)
break

case 'notificar':
if (!isAdmin) return reply(mess.only.admin)
samu330.updatePresence(from, Presence.composing)
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
teks = `Notificación dada por @${sender.split("@")[0]}\n*Mensaje : ${args.join(' ')}*`
const groupN = await samu330.groupMetadata(from);
member = groupN['participants']
jids = [];
member.map(async adm => {
jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
text: teks,
contextInfo: {
mentionedJid: jids, "forwardingScore": 9999, "isForwarded": true
},
quoted: faud
}
addFilter(from)
await samu330.sendMessage(from, options, MessageType.text)
break
case 'leermas':
samu330.updatePresence(from, Presence.composing)
if (!isRegister) return reply(mess.only.usrReg)

if (args.length < 1) return reply(`Escribe el texto\nEjemplo : ${prefix}readmore te amo/rdido un perro?`)
tels = body.slice(9)
var teksa = tels.split("/")[0];
var teks2 = tels.split("/")[1];
hasil = `${teksa}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${teks2}`
samu330.sendMessage(from, hasil, text, {
quoted: fimg
})
break

case 'enline':
case 'online':
if (!isUser) return reply(mess.only.daftarB)										  
if (!isGroup) return reply(`Solo para grupos`)
let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
let online = [...Object.keys(samu330.chats.get(ido).presences), samu330.user.jid]
samu330.sendMessage(from, '*Lista de usuarios en linea*:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, MessageType.text, {
quoted: ftoko,
contextInfo: { mentionedJid: online }
})
break

case 'emoji':

if (args.length == 0) return reply(`Ejemplo: ${prefix + command} 😭`)
emoji = args[0]
try {
emoji = encodeURIComponent(emoji[0])
} catch {
emoji = encodeURIComponent(emoji)
}
ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/smoji/${emoji}?apikey=${api}`)
await samu330.sendMessage(from, ini_buffer, sticker, { quoted: ftoko })
break


case 'clonar':
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.daftarB)
if (args.length < 1) return reply('Etiqueta a alguien para utilizar su foto!!!')
if (sam.message.extendedTextMessage === undefined || sam.message.extendedTextMessage === null) return reply('Etiqueta a alguien')
mentioned = sam.message.extendedTextMessage.contextInfo.mentionedJid[0]
let {jid, id1, notify } = groupMembers.find(x => x.jid === mentioned)
try {
pp = await samu330.getProfilePicture(id)
buffer = await getBuffer(pp)
samu330.updateProfilePicture(botNumber, buffer)
mentions(`La foto de perfil se actualizó correctamente con la foto de perfil de: @${id.split('@')[0]}`, [jid], true)
} catch (e) {
reply(mess.ferr)
}

case 'clearall':
if (!isOwner && !itsMe) return await reply('Este comando solo puede ser usado por *Dar* ⚙')
for (let chat of totalChat) {
await samu330.modifyChat(chat.jid, "delete")
}
await wa.sendFakeStatus(from, "Success clear all chat", "success")
break

case 'totag':
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.daftarB)
if ((isMedia && !sam.message.videoMessage || isQuotedSticker) && args.length == 0) {
encmediau = isQuotedSticker ? JSON.parse(JSON.stringify(sam).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : sam
file = await samu330.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group2 = await samu330.groupMetadata(from)
var member = group2['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
contextInfo: { mentionedJid: mem },
quoted: fvid
}
ini_buffer = fs.readFileSync(file)
samu330.sendMessage(from, ini_buffer, sticker, options)
fs.unlinkSync(file)
} else if ((isMedia && !sam.message.videoMessage || isQuotedImage) && args.length == 0) {
encmediau = isQuotedImage ? JSON.parse(JSON.stringify(sam).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : sam
file = await samu330.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group26 = await samu330.groupMetadata(from)
var member = group26['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
contextInfo: { mentionedJid: mem },
quoted: fvid
}
ini_buffer = fs.readFileSync(file)
samu330.sendMessage(from, ini_buffer, image, options)
fs.unlinkSync(file)
} else if ((isMedia && !sam.message.videoMessage || isQuotedAudio) && args.length == 0) {
encmediau = isQuotedAudio ? JSON.parse(JSON.stringify(sam).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : sam
file = await samu330.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group25 = await samu330.groupMetadata(from)
var member = group25['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'audio/mp4', duration: 9999999,
ptt : true,
contextInfo: { mentionedJid: mem },
quoted: faud
}
ini_buffer = fs.readFileSync(file)
samu330.sendMessage(from, ini_buffer, audio, options)
fs.unlinkSync(file)
} else if ((isMedia && !sam.message.videoMessage || isQuotedVideo) && args.length == 0) {
encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(sam).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : sam
file = await samu330.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group24 = await samu330.groupMetadata(from)
var member = group24['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'video/gif',
contextInfo: { mentionedJid: mem },
quoted: fvid
}
ini_buffer = fs.readFileSync(file)
samu330.sendMessage(from, ini_buffer, video, options)
fs.unlinkSync(file)
} else if ((isMedia && !sam.message.videoMessage || isQuotedDocument) && args.length == 0) {
encmediau = isQuotedDocument ? JSON.parse(JSON.stringify(sam).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : sam
file = await samu330.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group23 = await samu330.groupMetadata(from)
var member = group23['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'text/plain',
contextInfo: { mentionedJid: mem },
quoted: fdoc
}
ini_buffer = fs.readFileSync(file)
denz.sendMessage(from, ini_buffer, document, options)
fs.unlinkSync(file)
}  else if ((isMedia && !sam.message.videoMessage || isQuotedVideo) && args.length == 0) {
encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(sam).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : sam
file = await samu330.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group21 = await samu330.groupMetadata(from)
var member = group21['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'video/mp4', duration: 555555555,
contextInfo: { mentionedJid: mem },
quoted: fvid
}
ini_buffer = fs.readFileSync(file)
samu330.sendMessage(from, ini_buffer, video, options)
fs.unlinkSync(file)
} else{
reply(`Etiqueta un texto/documento/gif/sticker/audio/video con el comando: ${prefix}totag`)
}
break		
			
			
//ANTILINKS FACEBOOK GRUPOS PERFILES PUBLICACIONES
			
if (budy.includes("https://www.facebook.com/")){
		if (!isGroup) return
		if (!isAntiFace) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE FACEBOOK DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}			
			
if (budy.includes("https://m.facebook.com/")){
		if (!isGroup) return
		if (!isAntiFace) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE FACEBOOK DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
			
			
//FIN ANTILINKS FACEBOOK GRUPOS PERFILES PUBLICACIONES			
			
//FUNCION ANTILINK
	     	
	if (budy.includes("https://discord.com/")){
		if (!isGroup) return
		if (!isAntiDiscord) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE DISCORD DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
			
	if (budy.includes("https://s.kwai.app/")){
		if (!isGroup) return
		if (!isAntiKwai) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE KWAI DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}

	if (budy.includes("https://www.instagram.com/")){
		if (!isGroup) return
		if (!isAntInsta) return
	        if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE INSTAGRAM DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}		
	
	if (budy.includes("https://vm.tiktok.com/")){
		if (!isGroup) return
		if (!isAntiTik) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE TIK TOK DETECTADO 📢* ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
	
       if (budy.includes("://chat.whatsapp.com/")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE WHATSAPP DETECTADO 📢* ${sender.split("@")[0]} Usted será expulsado del grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}

//FIN DE ANTI LINKS 
		

//FUNCION DE LEVEL
            
     if (isGroup && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await reply(`*「 FELICIDADES LEVEL UP 🆙🥳 」*\n\nFelicidades subiste de nivel sigue asi\n\n*NOMBRE*\n${pushname}\n*XP*: ${getLevelingXp(sender)}\n*NIVEL*: ${getLevel} ⟿ ${getLevelingLevel(sender)}\n\n_*Para ver tu XP en tiempo real coloca el comando ${prefix}level*_`)
                }
            } catch (err) {
                console.error(err)
            }
        }

//FIN DE FUNCION DE LEVEL
			
         		
                        colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
         if (isCmd && isBanned) {
        return console.log(color('[ USUÁRIO BANEADO ] Ignorando Comando', 'blue'), color(moment.tz('America/Guayaquil').format('HH:mm:ss'), 'yellow'), color(`${command}`),'DE:', color(pushname))}
    	if (!isGroup && isCmd) console.log('\x1b[1;37m>', '[ \x1b[1;36mMensaje\x1b[1;37m ]', time, color(command), 'De', color(sender.split('@')[0]))
        if (isCmd && isGroup) console.log('\x1b[1;37m>', '[ \x1b[1;36mMensaje\x1b[1;37m ]', time, color(command), 'De', color(sender.split('@')[0]), 'En', color(groupName))

/******ENTRADA FIN DE FUNCIONES******/
			function addMetadata(packname, author) {	
				if (!packname) packname = 'SiaraBot'; if (!author) author = 'Drevill';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
		case 'help':
				case 'menu':
				case 'menú':
				case 'h':			
	        client.sendMessage(from, help(prefix, sender), text, {quoted: mek})
		break
                case 'otak':
		client.sendMessage(from, otak(prefix, sender), text, {quoted: mek})
		break
		case 'juegos':
		client.sendMessage(from, juegos(prefix, sender), text, {quoted: mek})
		break
		case 'idioma':
		client.sendMessage(from, bahasa(prefix, sender), text, {quoted: mek})
		break
		case 'levelmenu':
		client.sendMessage(from, levelmenu(prefix, sender), text, {quoted: mek})
		break
		case 'siaramenu':
		client.sendMessage(from, toinmenu(prefix, sender), text, {quoted: mek})
		break
		case 'menuadmin':
		client.sendMessage(from, menuadmin(prefix, sender), text, {quoted: mek})
		break
		case 'nsfwmenu':
		client.sendMessage(from, nsfwmenu(prefix, sender), text, {quoted: mek})
		break
		case 'banmenu':
		client.sendMessage(from, banmenu(prefix, sender), text, {quoted: mek})
		break
		case 'desmenu':
		client.sendMessage(from, desmenu(prefix, sender), text, {quoted: mek})
		break
		case 'versión':
		case 'version':
		client.sendMessage(from, version(prefix, sender), text, {quoted: mek})
		break
		case 'antimenu':
		client.sendMessage(from, antimenu(prefix, sender), text, {quoted: mek})
		break
                case 'welmenu':
		client.sendMessage(from, welmenu(prefix, sender), text, {quoted: mek})
		break
		case 'interac':
		client.sendMessage(from, shantera(prefix, sender), text, {quoted: mek})
		break
					
		case 'virtex':
	       case 'troleo':
               client.sendMessage(from, virtex(prefix, sender), text, {quoted: mek})
               break
                            


//FUNCIONES DE BAN Y DESBAN			
			
case 'ban':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.push(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `『 BANEADO 🚫 』\n\n◉Nombre: @${mentioned[0].split('@')[0]}\n◉Razon: Por mamaguevazo\n\n*Usted a sido baneado del uso del bot, no podra usar el bot hasta nuevo aviso*`
mentions(`${susp}`, mentioned, true)   
break

case 'desban':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.splice(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `『 DESBANEADO ✅ 』\n\n◉Nombre: @${mentioned[0].split('@')[0]}\n\n*Se te a retirado el BAN ya puedes usar el bot*`
mentions(`${susp}`, mentioned, true)   
break		

		
//FIN DE FUNCIONES BAN Y DESBAN					
					
					
/******JUEGOS DE DREVILL******/		
case 'gay':
if (!isUser) return reply(mess.only.daftarB)
rate = body.slice(5)
client.updatePresence(from, Presence.composing) 
random = `${Math.floor(Math.random() * 100)}`
gay = random
if (gay < 20 ) {ga = 'Usted es hetero 🤪🤙'} else if (gay == 21 ) {ga = 'Mas o menos 🤔'} else if (gay == 23 ) {ga = 'Mas o menos 🤔'} else if (gay == 24 ) {ga = 'Mas o menos 🤔'} else if (gay == 25 ) {ga = 'Mas o menos 🤔'} else if (gay == 26 ) {ga = 'Mas o menos 🤔'} else if (gay == 27 ) {ga = 'Mas o menos 🤔'} else if (gay == 28 ) {ga = 'Mas o menos 🤔'} else if (gay == 29 ) {ga = 'Mas o menos 🤔'} else if (gay == 30 ) {ga = 'Mas o menos 🤔'} else if (gay == 31 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 32 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 33 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 34 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 35 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 36 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 37 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 38 ) {ga = 'TTengo mi dudas 😑'} else if (gay == 39 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 40 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 41 ) {ga = 'Tengo razon? 😏'} else if (gay == 42 ) {ga = 'Tengo razon? 😏'} else if (gay == 43 ) {ga = 'Tengo razon? 😏'} else if (gay == 44 ) {ga = 'Tengo razon? 😏'} else if (gay == 45 ) {ga = 'Tengo razon? 😏'} else if (gay == 46 ) {ga = 'Tengo razon? 😏'} else if (gay == 47 ) {ga = 'Tengo razon? 😏'} else if (gay == 48 ) {ga = 'Tengo razon? 😏'} else if (gay == 49 ) {ga = 'Tengo razon? 😏'} else if (gay == 50 ) {ga = 'Eres o no? 🧐'} else if (gay > 51) {ga = 'Usted es gay 🥸'}
hasil = `${rate} Usted es ${random}% gay\n\n${ga}`
reply(hasil)
break

case 'pendejo':
if (!isUser) return reply(mess.only.daftarB)
rate = body.slice(9)
client.updatePresence(from, Presence.composing) 
random = `${Math.floor(Math.random() * 100)}`
gay = random
if (gay < 20 ) {ga = 'Usted es pendejito 🤪🤙'} else if (gay == 21 ) {ga = 'Mas o menos 🤔'} else if (gay == 23 ) {ga = 'Mas o menos 🤔'} else if (gay == 24 ) {ga = 'Mas o menos 🤔'} else if (gay == 25 ) {ga = 'Mas o menos 🤔'} else if (gay == 26 ) {ga = 'Mas o menos 🤔'} else if (gay == 27 ) {ga = 'Mas o menos 🤔'} else if (gay == 28 ) {ga = 'Mas o menos 🤔'} else if (gay == 29 ) {ga = 'Mas o menos 🤔'} else if (gay == 30 ) {ga = 'Mas o menos 🤔'} else if (gay == 31 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 32 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 33 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 34 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 35 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 36 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 37 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 38 ) {ga = 'TTengo mi dudas 😑'} else if (gay == 39 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 40 ) {ga = 'Tengo mi dudas 😑'} else if (gay == 41 ) {ga = 'Tengo razon? 😏'} else if (gay == 42 ) {ga = 'Tengo razon? 😏'} else if (gay == 43 ) {ga = 'Tengo razon? 😏'} else if (gay == 44 ) {ga = 'Tengo razon? 😏'} else if (gay == 45 ) {ga = 'Tengo razon? 😏'} else if (gay == 46 ) {ga = 'Tengo razon? 😏'} else if (gay == 47 ) {ga = 'Tengo razon? 😏'} else if (gay == 48 ) {ga = 'Tengo razon? 😏'} else if (gay == 49 ) {ga = 'Tengo razon? 😏'} else if (gay == 50 ) {ga = 'Eres o te haces? 🧐'} else if (gay > 51) {ga = 'Usted es pendejo 🥸'}
hasil = `${rate} Usted es ${random}% Pendejo \n\n${ga}`
reply(hasil)
break

case 'cuties':
if (!isUser) return reply(mess.only.daftarB)
rate = body.slice(9)
client.updatePresence(from, Presence.composing) 
random = `${Math.floor(Math.random() * 100)}`
cuties = random
if (cuties < 20 ) {cu = 'Mi loco usted va para el cielo 👏'} else if (cuties == 21 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 23 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 24 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 25 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 26 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 27 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 28 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 29 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 30 ) {cu = 'Te salvaste ramirez 😎'} else if (cuties == 31 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 32 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 33 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 34 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 35 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 36 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 37 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 38 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 39 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 40 ) {cu = 'Ramirez que hace viendo cuties 🤔'} else if (cuties == 41 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 42 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 43 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 44 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 45 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 46 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 47 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 48 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 49 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties == 50 ) {cu = 'Mmm sospechoso ramirez 🧐'} else if (cuties > 51) {cu = 'Señores un autentico FAN DE CUTIES esta en el grupo 🥸'}
hasil = `${rate}Resultado ${random}% fan de cuties\n\n${cu}`
reply(hasil)
break
				  
case 'rankgay':
try{
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
d = []
teks = 'Top 5 de los mas gays del grupo\n\n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
teks += `➔ @${groupMembers[r].jid.split('@')[0]}\n`
d.push(groupMembers[r].jid)
}
mentions(teks, d, true)
} catch (e) {
console.log(e)
reply('Hubo un error intentalo nuevamente :/')
}
break				

case 'rankpendejos':
try{
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
d = []
teks = 'Top 5 de los mas pendejos del grupo\n\n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
teks += `➔ @${groupMembers[r].jid.split('@')[0]}\n`
d.push(groupMembers[r].jid)
}
mentions(teks, d, true)
} catch (e) {
console.log(e)
reply('Hubo un error intentalo nuevamente :/')
}
break	

case 'lucky':
a = '🍇'
b = '🍎'
c = '🍓'
e = '🍑'
f = '💰'
g = '🥝'
pw = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck = pw[Math.floor(Math.random() * pw.length)]
pw1 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck1 = pw1[Math.floor(Math.random() * pw1.length)]
pw2 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck2 = pw2[Math.floor(Math.random() * pw2.length)]
pw3 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck3 = pw3[Math.floor(Math.random() * pw3.length)]
pw4 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck4 = pw4[Math.floor(Math.random() * pw4.length)]
pw5 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck5 = pw5[Math.floor(Math.random() * pw5.length)]
pw6 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck6 = pw6[Math.floor(Math.random() * pw6.length)]
pw7 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck7 = pw7[Math.floor(Math.random() * pw7.length)]
pw7 = [`${a}`, `${b}`, `${c}`, `${e}`, `${f}`, `${g}`]
luck7 = pw7[Math.floor(Math.random() * pw7.length)]
s = `┃ │  ${luck} │  ${luck1} │ ${luck2}`
a = `┃ │  ${luck3} │  ${luck4} │ ${luck5}`
m = `┃ │  ${luck6} │  ${luck7} │ ${luck7}`
u = `
╭──╼┥𝐂𝐀𝐒𝐒𝐈𝐍𝐎┝╾──╮
╽ ┌──────────┐ ┃
${s}
┃ ├──────────┤ ┃
${a}
┃ ├──────────┤ ┃
${m}
╿ └──────────┘ ╿
╰──┨⃞ Dar┠───╯`
reply(`${u}`)
break
					
case 'bot':
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
if (args.length < 1) return reply(`✳️ Ejemplo: *${prefix + command}* soy feo?`)
d = []
r = ["Si","No","En efecto"," Tal vez","No lo se","Quizas","Mañana","Jamas", "Un domingo", "no lo hace", "muy falso", "muy real", "Sí lo hace", "Simon al rato"]
random = r[Math.floor(Math.random() * (r.length))]
preg = `${random}`
reply(`${preg}`)
break
					
case 'reto':
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
  const reto = _reto[Math.floor(Math.random() * _reto.length)]
  reply(`‣ *Reto*\n\n${reto}`)
break

case 'verdad':
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
  const verdad = _verdad[Math.floor(Math.random() * _verdad.length)]
  reply(`‣ *Verdad*\n\n${verdad}`)
break					

/******JUEGOS SHANDUY LA PUTA MADRE NO TE OLVIDES******/					
					
					
       				case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *LINK WHATSAPP* 」\n\n_Solicitado por_ : @${sender.split("@s.whatsapp.net")[0]}\n\nSu link de Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*O ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
				if (data.error) return reply(data.error)
				reply(data.result)
				break
		
	
				case 'owner':
					client.sendMessage(from, { displayname: "Darlyn 🥸", vcard: vcard }, MessageType.contact, { quoted: mek })
					client.sendMessage(from, 'Darlyn se esta masturbando, por favor, hablale mas tarde, MessageType.text, { quoted: mek })
					break
	
	
				
					case 'hd':
                client.updatePresence(from, Presence.composing) 
                if (!isGroupAdmins) return reply(mess.only.Badmin)
		if (!isUser) return reply(mess.only.daftarB)
                if (!isGroup) return reply(mess.only.group)
                teks = body.slice(4)
                group = await client.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: mek
                }
              await client.sendMessage(from, options, text)
               break
					
			case 'hidetag':	
			     client.updatePresence(from, Presence.composing) 
                if (!isGroupAdmins) return reply(mess.only.Badmin)
		if (!isUser) return reply(mess.only.daftarB)
                if (!isGroup) return reply(mess.only.group)
                teks = body.slice(9)
                group = await client.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: mek
                }
              await client.sendMessage(from, options, text)
               break
					
		
							
		case 'notificar':
		case 'notify':				
			     client.updatePresence(from, Presence.composing) 
                if (!isGroupAdmins) return reply(mess.only.Badmin)
		if (!isUser) return reply(mess.only.daftarB)
                if (!isGroup) return reply(mess.only.group)
		if (args.length < 1) return reply(`Cual es el mensaje?`)
                teks = `Recibes un mensaje de notificación del admin @${sender.split("@")[0]}\n\n*Mensaje* : ${q}`
                group = await client.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: mek
                }
              await client.sendMessage(from, options, text)
               break
					
					
					
					
                               case 'tts':
				   client.updatePresence(from, Presence.recording) 
				   if (args.length < 1) return client.sendMessage(from, 'Cual es el código de idioma?\n\nPara saber el codigo de idioma coloque el comando ${prefix}idioma', text, {quoted: mek})
                                   if (!isUser) return reply(mess.only.daftarB)
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Y el texto?', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Texto muy largo weon')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
                                case 'listadmins':
				case 'adminlist':
					case 'admins':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					teks = `*Lista De Administradores Del Grupo*\n\n${groupMetadata.subject}\n\nTotal: ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
			case 'setprefix':
				case 'prefijo':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`El prefijo se ha cambiado correctamente a : ${prefix}`)
					break
			case 'todos':
			case 'tagall':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions('╔══✪〘 *TODOS* 〙✪══\n╠➥'+teks+'╚═〘 _*by dar*_ 〙', members_id, true)
					break
                                case 'send':
					var pc = body.slice(6)
					var nomor = pc.split("|")[0];
					var pesan = pc.split("|")[1];
					client.sendMessage(nomor+'@s.whatsapp.net', pesan, text)
					break
				case 'setppbot':
				case 'perfil':
				client.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Sube fotos con subtítulos ${prefix}Ok`)
					if (!isOwner) return reply(mess.only.ownerB)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Gracias por el nuevo perfil')
					break
				case 'bc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 TRANSMISIÓN 」*\n\n${body.slice(4)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 _*DREVILL*_ 」*\n\n${body.slice(4)}`)
						}
						reply('Transmisión exitosa')
					}
					break
					case 'bcgc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of groupMembers) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 GRUPO BC 」*\n*Grupo* : ${groupName}\n\n${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of groupMembers) {
							sendMess(_.jid, `*「 BC GROUP 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`)
						}
						reply('Grupo de transmisión exitoso')
					}
					
                     
				
		
                                       
				
			//ANTILINKS DE REDES SOCIALES FLACO ACEPTALO SOLO LO ESTAS EDITANDO REALMENTE SHANDUY TE HIZO TODO ESTO	
				
				case 'antiwa':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque !antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiWa) return reply('El antilink de Whatsapp ya esta activo')
						antiwa.push(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antiwa))
						reply('❬ ✅ ❭ La funcion de antilink de Whatsapp esta habilitada en este grupo')
						client.sendMessage(from,`Cualquier participante que envie un link de *Discord* a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antiwa.splice(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antiwa))
						reply('❬ ✅ ❭ La funcion de antilink de Whatsapp esta deshabilitada en este grupo')
					} else {
						reply('Coloque !antimenu para ver los comandos de activación de los antilinks')
					}
					break
					
				case 'antidiscord':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiDiscord) return reply('El antilink de Instagram ya esta activo')
						antidiscord.push(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antidiscord))
						reply('❬ ✅ ❭ La funcion de antilink de Discord esta habilitada en este grupo')
						client.sendMessage(from,`Cualquier participante que envie un link de *Discord* a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antidiscord.splice(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antidiscord))
						reply('❬ ✅ ❭ La funcion de antilink de Discord esta deshabilitada en este grupo')
					} else {
						reply('Coloque !antimenu para ver los comandos de activación de los antilinks')
					}
					break
				
				case 'antikwai':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiKwai) return reply('El antilink de Instagram ya esta activo')
						antikwai.push(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antikwai))
						reply('❬ ✅ ❭ La funcion de antilink de Kwai esta habilitada en este grupo')
						client.sendMessage(from,`Cualquier participante que envie un link de *Kwai* o de su perfil para pedir likes o followers a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antikwai.splice(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antikwai))
						reply('❬ ✅ ❭ La funcion de antilink de Kwai esta deshabilitada en este grupo')
					} else {
						reply('Coloque !antimenu para ver los comandos de activación de los antilinks')
					}
					break
				
				case 'antinsta':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntInsta) return reply('El antilink de Instagram ya esta activo')
						antinsta.push(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antinsta))
						reply('❬ ✅ ❭ La funcion de antilink de Instagram esta habilitada en este grupo')
						client.sendMessage(from,`Cualquier participante que envie un link de *Instagram* sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antinsta.splice(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antinsta))
						reply('❬ ✅ ❭ La funcion de antilink de Instagram esta deshabilitada en este grupo')
					} else {
						reply('Coloque !antimenu para ver los comandos de activación de los antilinks')
					}
					break
				
				
                                  case 'antitik':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiTik) return reply('El antilink de Tik Tok ya esta activo')
						antitik.push(from)
						fs.writeFileSync('./src/antitik.json', JSON.stringify(antitik))
						reply('❬ ✅ ❭ La funcion de antilink de Tik Tok esta habilitada en este grupo')
						client.sendMessage(from,`Cualquier participante que envia un link de *Tik Tok* sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antitik.splice(from)
						fs.writeFileSync('./src/antitik.json', JSON.stringify(antitik))
						reply('❬ ✅ ❭ La funcion de antilink de Tik Tok esta deshabilitada en este grupo')
					} else {
						reply('Coloque /antimenu para ver los comandos de activación de los antilinks')
					}
					break 
				
				
				case 'antiface':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiFace) return reply('El antilink de facebook ya esta activo')
						antiface.push(from)
						fs.writeFileSync('./src/antiface.json', JSON.stringify(antiface))
						reply('❬ ✅ ❭ La funcion de antilink de Facebook esta habilitada en este grupo')
						client.sendMessage(from,`Cualquier participante que envia un link de *Facebook* sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antiface.splice(from)
						fs.writeFileSync('./src/antiface.json', JSON.stringify(antiface))
						reply('❬ ✅ ❭ La funcion de antilink de Facebook esta deshabilitada en este grupo')
					} else {
						reply('Coloque /antimenu para ver los comandos de activación de los antilinks')
					}
					break
				        
			       case 'antilink':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('El antilink ya esta activo')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('❬ ✅ ❭ La funcion de antilink de Grupos De Whatsapp esta habilitada en este grupo')
						client.sendMessage(from,`El antilink esta activo\n\nY solo los admins de este grupo podran pasar el enlace\n\nSi algun participante que no se admin envía un enlace de este grupo u otro grupo sera expulsado de este grupo de inmediato`, text)
					} else if (Number(args[0]) === 0) {
						antilink.splice(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('❬ ✅ ❭ La funcion de antilink de Grupos De Whatsapp esta deshabilitada en este grupo')
					} else {
						reply('Coloque !antimenu para ver los comandos de activación de los antilinks')
					}
					break
			        
				
				//FIN DE ANTILINK HECHO POR SHANDUY
				
//ADMINISTRACION DE GRUPOS
		                
case 'leave':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
setTimeout( () => {
client.groupLeave (from) 
}, 2000)
setTimeout( () => {
client.updatePresence(from, Presence.composing) 
client.sendMessage(from, 'NOS VEMOS GILES ', text) // ur cods
}, 0)
break
       
case 'exe':
case 'bye':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
setTimeout( () => {
client.groupLeave (from) 
}, 2000)
setTimeout( () => {
client.updatePresence(from, Presence.composing) 
client.sendMessage(from, 'NOS VEMOS MAMAGUEVAZOS', text) // ur cods
}, 0)
break
					
case 'grupocr':
client.updatePresence(from, Presence.composing) 
options = {
text: `El creador de este grupo es: @${from.split("-")[0]}`, 
contextInfo: { mentionedJid: [from] }
}
client.sendMessage(from, options, text, { quoted: mek } )
break
                                      
                                        case 'kick':
				case 'pafuera':
					case'balazo':
					case 'alv':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marca al que vamos a funar')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Pedido recibido jefe, Adios popo 👋 :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
                                                }
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Pedido recibido jefe, Adios popo👋 : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					client.sendMessage(mentioned, 'Chao puta gorda', text)
					}
					break

case 'demote':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Flaco te falto agregar a la persona que voy a quitar el admin')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = ''
for (let _ of mentioned) {
teks += `Pedido recibido Jefe✅\n\nRetirando cargo como administrador :\n`
teks += `@_.split('@')[0]`
}
mentions(teks, mentioned, true)
client.groupDemoteAdmin(from, mentioned)
} else {
mentions(`Pedido recibido Jefe✅\n\nRetirando cargo como administrador @${mentioned[0].split('@')[0]}\n*${groupMetadata.subject}*_`, mentioned, true)
client.groupDemoteAdmin(from, mentioned)
}				
break

case 'promote':
client.updatePresence(from, Presence.composing) 
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('A quien voy a dar admin??\n\n*Ejemplo:* ${prefix}promote @xxxxxxx')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Pedido recibido Jefe✅\n\nAgregando cargo como administrador :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
client.groupMakeAdmin(from, mentioned)
} else {
mentions(`Pedido recibido Jefe✅\n\nAgregando cargo como administrador : @${mentioned[0].split('@')[0]}`, mentioned, true)
client.groupMakeAdmin(from, mentioned)
}
break				
				
case 'linkgc':
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.daftarB)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
linkgc = await client.groupInviteCode (from)
yeh = `Aqui esta el link del grupo\n\nhttps://chat.whatsapp.com/${linkgc}\n\nLink Del Grupo *${groupName}*`
client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
break

				case 'close':
					case'cerrar':
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var nomor = mek.participant
const close = {
text: `Grupo cerrado por el administrador @${nomor.split("@s.whatsapp.net")[0]}\nAhora *solo los administradores* puede enviar mensajes`,
contextInfo: { mentionedJid: [nomor] }
}
client.groupSettingChange (from, GroupSettingChange.messageSend, true);
reply(close)
break
                
case 'open':                
case'abrir':
client.updatePresence(from, Presence.composing)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
open = {
text: `Grupo abierto por el administrador @${sender.split("@")[0]}\nAhora *todos los participantes* pueden enviar mensajes`,
contextInfo: { mentionedJid: [sender] }
}
client.groupSettingChange (from, GroupSettingChange.messageSend, false)
client.sendMessage(from, open, text, {quoted: mek})
break
				                
case 'unir':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Para emocion ✋\nPara unir a una persona debes escribir el numero sin (+)\n\nEjemplo: *unir 52xxxxxxxxx')
if (args[0].startsWith('+')) return reply(mess.error.unire)
try {0
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
client.groupAdd(from, [num])
} catch (e) {
console.log('Error:', e)
reply('No se pudo agregar el destino, tal vez porque es privado')
}
break
				
case 'fotog': 
				case 'fgc':
reply(mess.foto)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
media = await client.downloadAndSaveMediaMessage(mek)
await client.updateProfilePicture (from, media)
reply('*⌊✅⌉ El cambio de foto del grupo fue exitoso*')
break						
				
case 'name':
				case 'ngc':
      if (!isGroup) return reply(mess.only.group)
      if (!isGroupAdmins) return reply(mess.only.admin)
      if (!isBotGroupAdmins) return reply(mess.only.Badmin)
      client.groupUpdateSubject(from, `${body.slice(6)}`)
      client.sendMessage(from, '*⌊✅⌉ El nombre del grupo fue cambiado*', text, {quoted: mek})
      break

				case 'dgc':
					case'descripg':
      if (!isGroup) return reply(mess.only.group)
      if (!isGroupAdmins) return reply(mess.only.admin)
      if (!isBotGroupAdmins) return reply(mess.only.Badmin)
      client.groupUpdateDescription(from, `${body.slice(5)}`)
      client.sendMessage(from, '*⌊✅⌉ La descripción del grupo fue cambiado*', text, {quoted: mek})
      break

case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.daftarB)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Para activar está funcion coloca !welcome 1')
if (Number(args[0]) === 1) {
if (isWelkom) return reply('Ya esta activada!!!')
welkom.push(from)
fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
reply('❬ ✅ ❭ La funcion de bienvenida esta habilitada en este grupo')
} else if (Number(args[0]) === 0) {
welkom.splice(from)
fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
reply('❬ ✅ ❭ La funcion de bienvenida esta deshabilitada en este grupo')
} else {
reply('Escribe el comando 1 para activarlo y 0 para desactivarlo Ejemplo: !welcome 1')
}
break					
					
case 'off':
if (!isOwner) return reply('Solo el jefe puede darme ordenes!')
if (!isOwner) return reply('Me apagare en 3 Segundos....')
await sleep(5000)
client.close()
break					
					
case 'restaurar':
if (!isOwner) return reply('Tu no eres el jefe para darme ordenesr!🤔')
if (!isOwner) return reply('*LA INFORMACION DE ESTE USUARIO SE RESTABLECERA PARA PODER USAR Y ESCANEAR EL CODIGO EN OTRO DISPOSITIVO*')
exec(`bash restore.sh`, (err, stdout) => {
if (err) return reply(err)
if (stdout) reply(stdout)
})
					
break

case 'actualizar':
case 'update':
if (!isOwner) return reply('Solo el jefe puede darme ordenes!')
reply('*ACTUALIZANDO LA BASE DE DATOS, POR FAVOR ESPERE...*')
exec(`bash update.sh`, (err, stdout) => {
if (err) return reply(err)
if (stdout) reply(`*YA ESTOY ACTUALIZADO*.✅`)
})
break
					
//FIN DE ADMINISTRACION DE GRUPOS				
				
				
				
//CREACION DE STICKERS Y VARIOS				
				
				case 's':
				case 'tucson':
				case 'opa':
			 	case 'dar':
				case 'sofi':
				case 'nefasto':
				case 'stiker':
				case 'sticker':
				case 'stickergif':
				case 'stikergif':
			        if (!isUser) return reply(mess.only.daftarB)
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
                                                if (!isUser) return reply(mess.only.daftarB)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
									 if (error) {    
										         fs.unlinkSync(media)	
											 fs.unlinkSync(ran)
											 }
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`[❗] Fallo, al momento de convertir la imagen a sticker`)
							})
							.on('end', function () {
								console.log('Finish')
							        exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
									if (error) {
											 fs.unlinkSync(media)	
											 fs.unlinkSync(ran)
											 }
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
						})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						}
						break
					
					case 'attp':
						if (!isUser) return reply(mess.only.daftarB)
					        if (args.length < 1) return reply(`¿Dónde está el texto?\n*Ejemplo:* ${prefix}attp shanduy`)
						reply(mess.only.attp)
					        attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
						client.sendMessage(from, attp2, MessageType.sticker, {quoted: mek})
						break
					
			          case 'qrcode':
                buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?data=${body.slice(8)}&size=1080%C3%971080`)
				client.sendMessage(from, buff, image, {quoted: mek})
				break  
				
				case 'toimg':
				    client.updatePresence(from, Presence.composing)
                                    if (!isUser) return reply(mess.only.daftarB)
					if (!isQuotedSticker) return reply('❌ Solo stickers')
					reply(mess.only.imgs)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ No se pudo convertir el sticker en imágenes')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '*⌈ Imagen convertida ✅ ⌉*\n\nby darlyn'})
						fs.unlinkSync(ran)
					})
					break
                        case 'tomp3':
                	client.updatePresence(from, Presence.composing) 
                        if (!isUser) return reply(mess.only.daftarB)
					if (!isQuotedVideo) return reply('❌ Solo videos')
					reply(mess.only.mpcancion)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ No se pudo convertir el video a mp3')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break
//CREACION DE STICKERS Y VARIOS	            
		
	//SERVICIO DE MUSICA Y VIDEO 			
				
				
	        case 'play':   
	        if (args.length < 1) return reply('Donde esta el nombre de la canción?\n\nEjemplo: /play Goteo - Duki')
		if (!isUser) return reply(mess.only.daftarB)
                reply(mess.only.musica)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.me/api/ytplaymp3?q=${play}&apikey=10hamilton`)
                if (anu.error) return reply(anu.error)
                infomp3 = `*「Cancion Encontrada ✅」*\n📌 *Título:* ${anu.result.title}\n🔗 *Fuente:* ${anu.result.source}\n📟 *Tamaño:* ${anu.result.size}\n\n*ESPERE ENVIANDO SU ARCHIVO MP3 ⚠*\n\n by darlyn`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                break
		
		case 'play2':   
	        if (args.length < 1) return reply('Donde esta el nombre de la canción?\n\nEjemplo: !play2 Ademas de mí - Rusher king')
		if (!isUser) return reply(mess.only.daftarB)
	        reply(mess.only.musica2)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.me/api/ytplaymp3?q=${play}&apikey=10hamilton`)
                if (anu.error) return reply(anu.error)
                infomp3 = `*「Cancion Encontrada ✅」*\n📌 *Título:* ${anu.result.title}\n🔗 *Fuente:* ${anu.result.source}\n📟 *Tamaño:* ${anu.result.size}\n\n*ESPERE ENVIANDO SU ARCHIVO MP3 ⚠*\n\n by Darlyn`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                break
                                
		case 'ytmp4':
		if (args.length < 1) return reply('Donde esta la url del video?\n\nEjemplo: *ytmp4 www.youtube.com/xxxxxxxxx')
		if (!isUser) return reply(mess.only.daftarB)
		reply(mess.only.mpv)
		if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
		anu = await fetchJson(`https://api.zeks.me/api/ytmp4?apikey=${apikey}&url=${args[0]}`, {method: 'get'})
		if (anu.error) return reply(anu.error.yt)
		teks = `*「VIDEO ENCONTRADO ✅」*\n📌 *Título:* ${anu.result.title} \n📟 *Tamaño:* ${anu.result.size}\n\n*ESPERE ENVIANDO SU ARCHIVO MP4 ⚠*\n\n by darlyn`
		lagu = await getBuffer(anu.result.thumbnail)
                client.sendMessage(from, lagu, image, {quoted: mek, caption: teks})
		buffer = await getBuffer(anu.result.url_video)
		client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: mek})
		break
						
				
	//FIN DE SERVICIO DE MUSICA Y VIDEO					
				
//REGISTRO				

case 'daftar':
case 'reg':
				case 'rg':
				case 'verify':
client.updatePresence(from, Presence.composing)
if (isUser) return reply('Ya estas registrado 🧐')
if (args.length < 1) return reply(`Incorrecto ❎\nComando: ${prefix}daftar Nombre\n\nEjemplo: ${prefix}daftar drevill`)
var reg = body.slice(8)
var nombre = reg.split("|")[0];
user.push(sender)
fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
client.sendMessage(from, ` 「*REGISTRADO* 」─\n\ ▢ *Nombre:* ${nombre}\n ▢ *Número:* wa.me/${sender.split("@")[0]}\n\ ▢ *Hora:* ${time}\n ▢ *Usuarios Verificados:* ${user.length} \n└────「 *☠️𝕾𝖎𝖆𝖗𝖆𝕭𝖔𝖙☠️*──\n\n Registro completo usa ${prefix}help para ver el Menu`, text, {quoted: mek})
break 
									
//FIN DE REGISTRO  
				
				case 'nsfwneko':
				    try{
						if (!isNsfw) return reply('❌ *NSFW NO ESTA ACTIVADO* ❌')
                                                if (!isUser) return reply(mess.only.daftarB)
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'mesum'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
                              	case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Digita 1 para activar los NSFW')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Recursos Activados ✅')
						nsfw.push(from)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('❬ ✅ ❭ La funcion NSFW esta habilitado en este grupo')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('❬ ✅ ❭ La funcion NSFW esta deshabilitado en este grupo')
					} else {
						reply('Digite 1 para activarlo, 0 para desactivarlo')
					}
					break	
				case 'waifu':
					gatauda = body.slice(7)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://arugaz.my.id/api/nekonime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image,{quoted: mek})
					break
				case 'randomanime':
					gatauda = body.slice(13)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break						
                             case 'delete':
					case 'del':
					if (!isGroup)return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
		                        client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
                 case 'level':
                if (!isLevelingOn) return reply(mess.levelnoton)
                if (!isGroup) return reply(mess.only.group)
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
		sem = sender.replace('@s.whatsapp.net','')
		if (userLevel === undefined && userXp === undefined) return reply(mess.levelnol)
                resul = `『 *TUS ESTADISTICAS 🆙* 』\n\nTus estadisticas en tiempo real 🕐\n\n├─ ❏ *NOMBRE:* ${sem}\n├─ ❏ *XP 🆙:* ${userXp}\n└─ ❏ *NIVEL:* ${userLevel}`
               client.sendMessage(from, resul, text, { quoted: mek})
                .catch(async (err) => {
                        console.error(err)
                        await reply(`Error!\n${err}`)
                    })
            break
				
            case 'leveling':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.admin)
                if (args.length < 1) return reply('Digita *leveling 1 para activar este recurso')
                if (args[0] === '1') {
                    if (isLevelingOn) return reply('*La función de nivel ya estaba activa*')
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                     reply(mess.levelon)
                } else if (args[0] === '0') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                     reply(mess.leveloff)
                } else {
                    reply(` *Digita el comando 1 para activar, 0 para desactivar *\n * Ejemplo: ${prefix}leveling 1*`)
                }
            break
                                /*case 'nsfwtrap':
                                        try{
                                                if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
                                                if (!isUser) return reply(mess.only.daftarB)
                                                res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=APIKEYLU`, {method: 'get'})
                                                buffer = await getBuffer(res.result)
                                                client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Estas enfermo flaco NEFASTOOOOO'})
                                        } catch (e) {
                                                console.log(`*Error* :`, color(e,'red'))
                                                reply('❌ *ERROR* ❌')
                                        }
										break*/
										case 'randomhentaio': 
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Otaku que se esperaba'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					/*case 'nsfwloli':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://api.lolis.life/random?nsfw=true`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Alto pedofilo socio'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break*/
					case 'nsfwbobs': 
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/biganimetiddies`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Quiero ver tetas'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwblowjob':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'No antojen'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwneko':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://api.computerfreaker.cf/v1/neko`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Pero que wea?'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					/*case 'nsfwyuri':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://api.computerfreaker.cf/v1/yuri`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'NEFASTOOOOOOO'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
					break*/
				case 'nsfwass':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`'https://meme-api.herokuapp.com/gimme/animebooty`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ese es el culo que querías?'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwsidebobs':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/sideoppai`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'La vieja de gabo, tremenda puta'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
					    break
					case 'nsfwahegao':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/ahegao`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Joder, quisiera follarmela'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwthighs':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animethighss`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Por que muslos?'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwfeets':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animefeets`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'MMMMM PATAS'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌') 
						}
						break
					case 'nsfwarmpits':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animearmpits`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'A?'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
						case 'nsfwtoin':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desactivado* ❌')
							res = await fetchJson(`https://tobz-api.herokuapp.com/nsfwtrap?apikey=BotWeA`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Bro....'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
                                case 'ping':    
			   	        if (!isUser) return reply(mess.only.userB)
                                        const timestamp = speed();
                                        const latensi = speed() - timestamp
                                        client.updatePresence(from, Presence.composing) 
				        uptime = process.uptime()
                                        client.sendMessage(from, `Velocidad: ${latensi.toFixed(4)} Second`, text, { quoted: mek})
                                        break
                                case 'ttp':
					if (args.length < 1) return reply('Y el texto flaco?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(4).trim()
					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${BarBarKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
                default:
                
	if (budy.includes(`Todo bien`)) {
                  reply(`Si amigo todo bien, todo correcto`)
                  }

		if (budy.includes(`Buenos días`)) {
                  reply(`Buenos puto`)
                  }

		if (budy.includes(`Bot`)) {
                  reply(`Eu que quieres`)
                  }

		if (budy.includes(`Gracias`)) {
                  reply(`Cual gracias, encuerate`)
                  }

		if (budy.includes(`trece`)) {
                  reply(`Entre mas me la mamas, mas me creece`)
                  }
					
		if (budy.includes(`Opa`)) {
                  reply(`opaaaaa`)
                  }
                 
		if (budy.includes(`Te amo bot`)) {
                  reply(`Yo tambien te amo, cogemos?`)
                  }
	
	if (budy.startsWith(`Itzy`)) {
        const none = fs.readFileSync('./aja/loco.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Sad`)) {
        const none = fs.readFileSync('./aja/nostalgia.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Pillowtalk`)) {
        const none = fs.readFileSync('./mp3/PILLOWTALK.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Twice`)) {
        const none = fs.readFileSync('./mp3/Feel Special.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`kkk`)) {
        const none = fs.readFileSync('./mp3/Parado no Bailão.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Pene`)) {
        const none = fs.readFileSync('./mp3/INTERNET.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Hora del sexito`)) {
        const none = fs.readFileSync('./mp3/maau1.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
        if (budy.startsWith(`Cuentate un chiste`)) {
        const none = fs.readFileSync('./mp3/dylan2.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Admin party`)) {
        const none = fs.readFileSync('./mp3/fiesta.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
        if (budy.startsWith(`Fiesta del admin`)) {
        const none = fs.readFileSync('./mp3/admin.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Viernes`)) {
        const none = fs.readFileSync('./mp3/viernes.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`pacman`)) {
        const none = fs.readFileSync('./mp3/viejo1.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`La toca 7w7`)) {
        const none = fs.readFileSync('./anishan/anime5.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Quien es tu sempai botsito`)) {
        const none = fs.readFileSync('./anishan/anime4.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Me gimes 7u7`)) {
        const none = fs.readFileSync('./anishan/anime3.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Te amo botsito uwu`)) {
        const none = fs.readFileSync('./anishan/anime2.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Onichan`)) {
        const none = fs.readFileSync('./anishan/anime1.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Pasen sexo`)) {
        const none = fs.readFileSync('./mp3/fernan.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Paraguayo`)) {
        const none = fs.readFileSync('./mp3/gaspi11.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Venezolano`)) {
        const none = fs.readFileSync('./mp3/gaspi10.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Gaspi corte`)) {
        const none = fs.readFileSync('./mp3/gaspi12.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Gaspi buenos dias`)) {
        const none = fs.readFileSync('./mp3/gaspi13.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Enano`)) {
        const none = fs.readFileSync('./mp3/gaspi14.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Buenas noches`)) {
        const none = fs.readFileSync('./mp3/gaspi15.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
        if (budy.startsWith(`Peruano`)) {
        const none = fs.readFileSync('./mp3/gaspi16.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Alto temazo`)) {
        const none = fs.readFileSync('./mp3/sombare14.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`GOOOOD`)) {
        const none = fs.readFileSync('./mp3/sombare13.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Ya me voy a dormir`)) {
        const none = fs.readFileSync('./mp3/sombare12.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
        if (budy.startsWith(`Calefon`)) {
        const none = fs.readFileSync('./mp3/sombare11.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Bot de mierda`)) {
        const none = fs.readFileSync('./mp3/sombare10.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Apurate bot`)) {
        const none = fs.readFileSync('./mp3/sombare9.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Un chino`)) {
        const none = fs.readFileSync('./mp3/sombare7.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }				
        if (budy.startsWith(`No funciona`)) {
        const none = fs.readFileSync('./mp3/sombare8.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Boliviano`)) {
        const none = fs.readFileSync('./mp3/gaspi3.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Corte`)) {
        const none = fs.readFileSync('./mp3/gaspi2.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Gaspi me saludas`)) {
        const none = fs.readFileSync('./mp3/gaspi4.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Gaspi y las minitas`)) {
        const none = fs.readFileSync('./mp3/gaspi6.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Gaspi todo bien`)) {
        const none = fs.readFileSync('./mp3/gaspi7.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Me quiero suicidar`)) {
        const none = fs.readFileSync('./mp3/gaspi81.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Gaspi ya no aguanto`)) {
        const none = fs.readFileSync('./mp3/gaspi9.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Contate algo bot`)) {
        const none = fs.readFileSync('./mp3/gaspi5.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
               if (budy.startsWith(`Sexo`)) { 
        const none = fs.readFileSync('./mp3/sexo.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (budy.startsWith(`Pongan cuties`)) { 
        const none = fs.readFileSync('./mp3/neymar1.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
                 if (budy.startsWith(`Momento epico`)) {
        const none = fs.readFileSync('./mp3/sombare1.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
		if (budy.startsWith(`El bot del orto no funciona`)) {
        const none = fs.readFileSync('./mp3/sombare2.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
		if (budy.startsWith(`Epicardo`)) {
        const none = fs.readFileSync('./mp3/sombare3.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
		if (budy.startsWith(`Insta de la minita`)) {
        const none = fs.readFileSync('./mp3/sombare4.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
                 if (budy.startsWith(`Una mierda de bot`)) {
        const none = fs.readFileSync('./mp3/sombare5.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
		 if (budy.startsWith(`Ultimo momento`)) {
        const none = fs.readFileSync('./mp3/sombare6.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
                if (budy.startsWith(`nayeon`)) {
        const none = fs.readFileSync('./webp/nayeon.webp');
		client.sendMessage(from, none, MessageType.sticker, {quoted: mek, mimetype: 'sticker/webp'})
                  }	
		if (budy.startsWith(`Nefasto`)) {
        const none = fs.readFileSync('./mp3/gaspi1.mp3');
		client.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  }
	if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
