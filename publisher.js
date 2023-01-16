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
        let message='{"mobile":"9890868345","type":"welcome"}'
        channel.assertQueue(queueName,{
            durable:false
        })
        channel.sendToQueue(queueName,Buffer.from(message));
        console.log("message",message)
        setTimeout(()=>{
            connection.close()
        },1000)
    })
})