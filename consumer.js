const amqp=require('amqplib/callback_api')

amqp.connect('amqp://localhost',(err,connection)=>{
    if(err){
        throw err
    }
    connection.createChannel((err,channel)=>{
        if(err){
            throw err
        }
        let queueName='smsqueue'
   
        channel.assertQueue(queueName,{
            durable:false
        })
        channel.consume(queueName,(msg)=>{
            var message = JSON.parse(msg.content.toString())
            console.log("message",message)
            console.log("Received",message.mobile)
            channel.ack(msg)
        })
    })
})