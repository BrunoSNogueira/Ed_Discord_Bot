module.exports = {
    name: 'advert',
    description: 'Ta advertido, sem vergonha',
    async execute(usuario)  {

        if (usuario.advertedId) {
            if(!usuario.advertedId.adverts){
                usuario.message.channel.send('O usuário <@' + usuario.adverted.id + '> foi advertido pela primeira vez!');
                usuario.advertedId.adverts = 1;
            }
            else{
                usuario.advertedId.adverts++;
                usuario.message.channel.send('O usuário <@' + usuario.adverted.id + '> foi advertido ' + usuario.advertedId.adverts + ' vezes!');
            }
            await global.conn.collection("usuarios").updateOne({_id:usuario.advertedId._id}, {$set: {adverts:usuario.advertedId.adverts}});
        }  
        else{     
            await global.conn.collection("usuarios").insertOne({id:usuario.adverted.id, adverts: 1});
            usuario.message.channel.send('O usuário <@' + usuario.adverted.id + '> foi advertido pela primeira vez!');
        }
    }
}