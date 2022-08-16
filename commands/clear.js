module.exports = {
    name: 'clear',
    description: 'Limpa as advertências de um usuário',
    async execute(usuario)  {

        if(!usuario.advertedId){
            await global.conn.collection("usuarios").insertOne({id:usuario.adverted.id, adverts: 0});
            message.channel.send('O usuário <@' + usuario.adverted.id + '> não possui mais advertências!');            
        }
        else{
            message.channel.send('O usuário <@' + usuario.adverted.id + '> não possui mais advertências!');
            usuario.advertedId.adverts = 0;
            await global.conn.collection("usuarios").updateOne({_id:usuario.advertedId._id}, {$set: {adverts:usuario.advertedId.adverts}});
        }
    }
}