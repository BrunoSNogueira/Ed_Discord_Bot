module.exports = {
    name: 'infousuarios',
    description: 'Cria obj com as informações importantes a serem usadas pelo bot',

    async execute(message, args, sender, senderId, adverted, advertedId) {
        const usuario = {
            message,
            args,
            sender,
            senderId,
            adverted,
            advertedId,
        }
        return usuario;   
    }
}