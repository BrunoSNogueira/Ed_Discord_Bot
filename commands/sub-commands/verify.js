module.exports = {
    name: 'verify',
    description: 'Verifica se tem permissão, ou se utilizou roles e mentions erradas.',

    async execute(usuario) {

        if(usuario.message.member.roles.cache.some(r=>r.name == "Advert")){

            //verifica permissao
            if(!usuario.args[0] || !(usuario.args[0].startsWith('<') || usuario.args[0].startsWith('@'))) usuario.message.channel.send('Comando inválido! Utilize o comando da forma: /advert @Usuário');

            // Verifica @Role
            if(usuario.args[0] && usuario.args[0].startsWith('<@&')) usuario.message.channel.send('https://cutt.ly/tkyUaQR');

            // Verifica @here e @everyone
            if(usuario.args[0] && usuario.args[0].startsWith('@')){
                
                if(usuario.args[0].startsWith('@here')) usuario.message.channel.send('https://cutt.ly/UkyUfk7');

                if(usuario.args[0].startsWith('@everyone')) usuario.message.channel.send('https://cutt.ly/QkyUhVT');
            }

            // Verifica se marcou um BOT
            if(usuario.args[0] && usuario.message.mentions.users.first().bot) usuario.message.channel.send('https://cutt.ly/qkyUXEi');

            if(usuario.message.content.startsWith('/advert')) await require(`../advert`).execute(usuario);

            if(usuario.message.content.startsWith('/clear')) await require(`../clear`).execute(usuario);
        }
        else{
            if(!usuario.senderId){
                await global.conn.collection("usuarios").insertOne({id:usuario.sender.id, adverts: 1});
                usuario.message.channel.send('Você não tem permissão para utilizar este comando, toma um advert pra ficar esperto.');
                usuario.message.channel.send('O usuário <@' + usuario.sender.id + '> foi advertido pela primeira vez!');
            }
            else{
                usuario.senderId.adverts++;
                usuario.message.channel.send('Você não tem permissão para utilizar este comando, toma um advert pra ficar esperto.');
                usuario.message.channel.send('O usuário <@' + usuario.sender.id + '> foi advertido ' + usuario.senderId.adverts + ' vezes!');
                await global.conn.collection("usuarios").updateOne({_id:usuario.senderId._id}, {$set: {adverts:usuario.senderId.adverts}});            }
        }
    }
}