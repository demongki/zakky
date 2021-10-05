const {
    WAConnection: _WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const fs = require('fs')
const { exec } = require('child_process')
const moment = require('moment-timezone')
const { banner, start, success } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const gcrevoke = JSON.parse(fs.readFileSync('./database/autorevoke.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
blocked = []

require('./Iqbal.js')
nocache('./Iqbal.js', module => console.log(`${module} is now updated!`))

const starts = async (iqbl = new WAConnection()) => {
    iqbl.logger.level = 'warn'
    iqbl.version = [2, 2123, 8]
    iqbl.browserDescription = [ 'Iqbalzz', 'Chrome', '3.0' ]
    console.log(banner.string)
    iqbl.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && iqbl.loadAuthInfo('./session.json')
    iqbl.on('connecting', () => {
        start('2', 'Connecting...')
    })
    iqbl.on('open', () => {
        success('2', 'Connected')
        setTimeout( () => {
        	console.log(bgcolor(`🌹Welcome To SelfBot`, 'red'))
            console.log(bgcolor(`🌹 Script Jangan Di Jual Belikan`, 'yellow'))
            console.log(bgcolor(`🌹Iqbalz, AdiOfficial, Usep, Fajar, Gesha, Dhnjing`, 'green'))
	    	console.log(bgcolor(`🌹Created By Iqbalzz`, 'blue'))
	    	}, 1000)    		    	     	
    })
    await iqbl.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(iqbl.base64EncodedAuthInfo(), null, '\t'))

iqbl.on('group-participants-update', async(chat) => {
        try {
            mem = chat.participants[0]
            try {
                var pp_user = await iqbl.getProfilePicture(mem)
            } catch (e) {
                var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
                var pp_group = await iqbl.getProfilePicture(chat.jid)
            } catch (e) {
                var pp_group = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (chat.action == 'add') {
                ini_user = iqbl.contacts[mem]
                group_info = await iqbl.groupMetadata(chat.jid)
                ini_img = await getBuffer(`https://hardianto-chan.herokuapp.com/api/tools/welcomer?nama=${ini_user}&namaGb=${group_info}&pepeGb=${pp_group}&totalMem=0&pepeUser=${pp_user}&bege=https://i.ibb.co/WyvDRgy/20210422-044002.jpg&apikey=hardianto`)
                welkam = `${ini_user.notify}, Welkam to ${group_info.subject}`
                await iqbl.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam })
            }
            if (chat.action == 'remove') {
                ini_user = iqbl.contacts[mem]
                group_info = await iqbl.groupMetadata(chat.jid)
                ini_img = await getBuffer(`https://hardianto-chan.herokuapp.com/api/tools/leave?nama=${ini_user}&namaGb=${group_info}&pepeGb=${pp_group}&totalMem=0&pepeUser=${pp_user}&bege=https://i.ibb.co/WyvDRgy/20210422-044002.jpg&apikey=hardianto`)
                ini_out = `${ini_user.notify}, Sayonara 👋`
                await iqbl.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam })
            }
        } catch (e) {
            console.log('Error :', e)
        }
    })
    antidel = true
iqbl.on('message-delete', async (m) => {
if (m.key.remoteJid == 'status@broadcast') return
if (!m.key.fromMe && m.key.fromMe) return
if (antidel === false) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
const type = Object.keys(m.message)[0]
iqbl.sendMessage(m.key.remoteJid, `\`\`\`「 Anti Delete 」\`\`\`
•> Nama : @${m.participant.split("@")[0]}
•> Waktu : ${jam} ${week} ${calender}
•> Type : ${type}`, MessageType.text, {quoted: m.message, contextInfo: {"mentionedJid": [m.participant], "externalAdReply": {"title": `Hayolo Ngapus Apaan?`, mediaType: 2, "thumbnailUrl": "https://telegra.ph/file/6b0259fd741e108910fbe.jpg","previewType": "VIDEO","mediaUrl": `https://youtu.be/5odMRQDrhoI`}}})

iqbl.copyNForward(m.key.remoteJid, m.message)
})
    iqbl.on('chat-update', async (message) => {
        require('./Iqbal.js')(iqbl, message)
    })
}
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
