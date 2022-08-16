const ms = require('ms')
module.exports = {
    name: 'amongus',
    description: 'Controla o mute do pessoal',
    execute(message, comando){

        if(message.member.voice.channel){

            let amongus = message.guild.channels.cache.get(message.member.voice.channel.id);

            //if(amongus.id == '755911136108478506'){

            function setMute(mute){

                let amongus = message.guild.channels.cache.get(message.member.voice.channel.id);

                for (const [memberId, member] of amongus.members) {
                    member.voice.setMute(mute)
                    .then(() => console.log( mute + `Amongus está rodando.`))
                    .catch(console.error);
                }
            };
            
            // Condicionais do jogo
            if(comando === 'play'){
                message.channel.send('Iniciando a partida de Among Us! Digite /amongus start para começar');
            }
            else if(comando === 'start'){
                message.channel.send('Mutando todos os jogadores, digite /amongus meet para iniciar a reunião');
                setMute(true);
            }
            else if(comando === 'meet'){
                setMute(false);
                setTimeout(function(){
                    setMute(true)
                }, ms ('123s'));
            }
            else if(comando === 'stop'){
                message.channel.send('Desmutando todos os jogadores!');
                setMute(false)
            }
            else
                message.channel.send('Comando inválido!');
            }
        else
            message.channel.send('É necessário estar num canal de voz!');
        // }
        // else
            // message.channel.send('Utilize o canal de voz Among Us!');
    }
}