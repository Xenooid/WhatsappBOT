const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const { getSystemErrorMap } = require('util');
const { Configuration, OpenAIApi } = require("openai");
const { url } = require('inspector');
const axios = require("axios");
const ytdl = require('ytdl-core');
const { SocketAddress } = require('net');
const configuration = new Configuration({
  apiKey: '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',
});


const openai = new OpenAIApi(configuration);
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});
 

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('ready', () => {
    console.log("ready to message")
});

function man(){
    client.on('message', async message => {
        if(message.body.includes('/ask')) {
            let text = message.body.split('/ask')[1];
            var qst = `Q: ${text}\nA:`;
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: qst,
                temperature: 0,
                max_tokens: 3000,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            message.reply(response.data.choices[0].text);
        }
        else if(message.body.includes('/draw')) {
          client.sendMessage(message.from, '_Fitur draw gw matiin sementara karena fantasi kalian terlalu diluar nalar dan bikit botnya rusak/mokad_ 😥                                                                                                                                                                                                                                                                                                                                                                                 *~Vidi (Owner)*')
        
          
          }
    });
}

man();

client.on('message', message => {
	if(message.body === '!desah') {
		message.reply('ahhhhhh ahhh ahhhhhhh');
	}
});

client.on('message', message => {
	if(message.body === '!help') {
		message.reply ('Hallo! Nama saya *Vidi,* Saya adalah robot dengan _Kecerdasan Buatan_ *(AI).*                                                                                                                                                                                                                                   Dengan beberapa *_Utility_* yang saya miliki, Mungkin saya bisa membantu anda dalam beberapa hal.                                                                                                                                                                                                                   List *_Command_* untuk memulai perintah bisa langsung ketik *"!cmd"* 🙂👌                                                                                                                                                                                                                                                                      -                                                                                                                                                                                                                                                    *_PS : Botnya masih dalam tahap pengembangan, Jadi harap maklumi jika ada bug dan respon AI yang kurang masuk akal/Ga nyambung._*                                                                                                                                                                                                                                                      *~Vidi (Owner)*');

    }
});

client.on('message', message => {
	if(message.body === '!cmd') {
		message.reply(`
_*List Command :*_

_*[Utility]*_
        
 *- !say <prompt>*
Contoh : _"!say Aku Ultramen"_
        
 *- !sticker <Kirim bersama Foto/gif>*
Contoh : *Kirim foto atau GIF lalu kasih Caption _"!sticker"_
        
 *- !join <Kode Grup>*
Contoh : _"!join DckcBvVpVRB2PJx0MOiHs"_


_*[Slash and AI]*_

*- /draw <prompt>*
Contoh : _"!draw Kucing Oren"_
        
*- /ask <prompt>*
Contoh : _"!ask Bagaimana cara menjadi Ketua DPR?"_

*- /quote*
_Dapet quotes random._
        
        
_*[Group]*_
        
*- !groupinfo*


_*PS : COMMAND DRAW GW TUTUP SEMENTARA.*_
_~Vidi (Owner)_
        `);
	
    }
});

const prefix = "!";

client.on('message', async msg => {
 
    if (msg.body[0] == prefix){
        
        var [cmd, ...args] = msg.body.slice(1).split(" ");
        args = args.join(" ");
 
        if (cmd == "say"){
            client.sendMessage(msg.from, args);
        }
        
        if (cmd === "sticker") {
            const attachmentData = await msg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, {sendMediaAsSticker: true, stickerAuthor: 'Cinta Elaina Wangy 💕', stickerName: 'Vidi'});
        
        }
    }
});

client.on('message', async msg => {
    if (msg.body.startsWith('!join ')) {
    const inviteCode = msg.body.split(' ')[1];
    try {
        await client.acceptInvite(inviteCode);
        msg.reply('Joined the group!');
    } catch (e) {
        msg.reply('That invite code seems to be invalid.');

        }
    }
    
    else if (msg.body === '!groupinfo') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`
_*Group Details*_

*Name:* ${chat.name}

*Description:*
${chat.description}

*Created At:*
${chat.createdAt.toString()}

*Participant count:*
${chat.participants.length}

            `);      
        } else {
            msg.reply('This command can only be used in a group!');
           
        }}
        
      else if (msg.body === "/quote") {
            const apiData = await axios.get("https://type.fit/api/quotes");
            const randomNumber = Math.floor(Math.random() * apiData.data.length);
            msg.reply(`*${apiData.data[randomNumber].text}*`);      
    }
}); 

e
