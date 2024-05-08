const ampqlib = require("amqplib")
require("dotenv").config()

module.exports.CreateChannel = async()=>{
    try{
        const connection = await ampqlib.connect(process.env.MESSAGE_BROKER_URL)
        const channel = await connection.createChannel();
        await channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', false)
        return channel;
    }catch(error){
        throw error
    }
}



module.exports.PublishMessage=async(channel, binding_key, message)=>{
    try{
        await channel.publish(process.env.EXCHANGE_NAME, binding_key, Buffer.from(message))
        console.log("Message has been sent " + message)
    }catch(error){
        throw error
    }
}


module.exports.SubscribeMessage = async (channel, service)=>{
    const appQueue = await channel.assertQueue(process.env.QUEUE_NAME);
    channel.bindQueue(appQueue.queue,process.env.EXCHANGE_NAME, process.env.EMAIL_BINDING_KEY)
    channel.consume(appQueue.queue, data=>{
        console.log("Received data")
        console.log(data.content.toString())    
        service.SubscribeEvents(data.content.toString())
        channel.ack(data)
    })
}