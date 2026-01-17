```javascript
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require('pino')

async function startKingMD() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true
    })

    conn.ev.on('creds.update', saveCreds)

    conn.ev.on('messages.upsert', async m => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text
        const from = msg.key.remoteJid

        // AI Chat / Educational Help
        if (text && !text.startsWith('.')) {
            // මෙතනට AI API එකක් දාලා උත්තර දෙන්න හදන්න පුළුවන්
            await conn.sendMessage(from, { text: 'මම King MD. ඔයාට උදව් කරන්නම් ඉගෙන ගන්න වැඩ වලට!' })
        }

        // Commands
        if (text.startsWith('.song')) {
            await conn.sendMessage(from, { text: 'ඔන්න සින්දුව හොයනවා... 🎶' })
            // Downloader function එක මෙතනට එන්න ඕනේ
        }
        
        if (text.startsWith('.video')) {
            await conn.sendMessage(from, { text: 'ඔන්න වීඩියෝ එක හොයනවා... 🎬' })
        }
    })
}

startKingMD()
```
