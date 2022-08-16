// Atribui a biblioteca discord.js a uma const para facilitar o uso
const Discord = require('discord.js');

//loga no mongodb
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://rogerio:banana@localhost:27017/admin", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("listaDeAdvertencias"))
            .catch(err => console.log(err));

// cria o cliente, ou seja o bot
const client = new Discord.Client();

// define o prefixo do bot
const prefix = '/';

// cria um json (chamou de fs por ser file search)
const fs = require('fs');


//  
client.commands = new Discord.Collection();

// abre a pasta commands, da search nas files, sendo cada uma um comando
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

// Confirmação no console de que está rodando
client.once('ready', () => {
    console.log('Ed ta vindo pra dar advert!')
});

// le as mensagens no canal e verifica se ta usando / ou se foi o proprio bot que mandou a mensagem
client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // args => slice serve pra comandos que tenham espaço no meio, tipo /advert @zamora
    // command => transforma em lower case e tira 1a parte da mensagem de args pra armazenar em command

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // sender = autor da mensagem, adverted = usuário que recebeu a advertencia
    const sender = message.author;
    const senderId = await global.conn.collection("usuarios").findOne({id:sender.id});
    const adverted = message.mentions.users.first();
    let advertedId;
    if(adverted){
        advertedId = await global.conn.collection("usuarios").findOne({id:adverted.id});
    }

    let usuario = await require(`./commands/sub-commands/infousuarios`).execute(message, args, sender, senderId, adverted, advertedId);

    await require(`./commands/sub-commands/verify`).execute(usuario);                     
});

// faz o login do bot usando essa token gigantesca
client.login('-Removed Token-');


// TO-DO
    // Adicionar roles de acordo com curso e turno
    // Lista de adverts, com ranking
    // Roles de advert
    // Gimmic de soltar rojão