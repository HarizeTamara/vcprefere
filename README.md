# @Você prefere? 🤔

Olá, esse projeto é um estudo sobre discord.js de um bot para Discord permite interação divertida nos servidores que gera uma pergunta aleatória em um embed com duas reações!
##
 
<div> 
  <a href="https://www.youtube.com/@eusouivypoison" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
  <a href="https://instagram.com/eusouivypoison" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
 	<a href="https://www.twitch.tv/eusouivypoison" target="_blank"><img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" target="_blank"></a>
 <a href="https://discord.gg/Xyzss5nxPk" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" target="_blank"></a> 
  <a href = "mailto:harizetamara@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/harizetamara/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  
</div>

## Instalando

Instale 'npm istall discord.js'
Instale 'npm install dotenv'

## Crie
Crie o diretório '.env'
```
A=123
B=456
DISCORD_TOKEN=seu-token-discord
CLIEND_ID=sua-cliend-id
GUILD_ID=sua-guild-id
```

Crie o diretório '.gitgnore'
```
node_modules
.env
config.json
```

Crie o diretório 'config.json'
```
{
	"cliendId": "sua-cliend-id",
	"guildId": "sua-guild-id",
	"token": "seu-token-discord"
}
```

em 'index.js' na linha 20 substitua 'sua pergunta aqui' pela mensagem que deseja.
```
const questions = [
    'sua pergunta aqui',
];
```

## Links
* [Discord.js](https://discord.js.org/) Biblioteca para integração com o discord
* [Discordjs](https://discordjs.guide/#before-you-begin) Biblioteca para integração com o discord
* [Discord Developer Portal](https://discord.com/developers/applications): site para registrar sua aplicação/bot;
