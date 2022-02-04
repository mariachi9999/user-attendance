import amqp = require("amqplib/callback_api");

amqp.connect(
  {
    protocol: "amqp",
    hostname: "localhost",
    password: "123456",
    username: "admin",
    port: 5672,
  },
  function (error, connection) {
    if (error) {
      throw error;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = "hello";
      const message = "Hello World!!";
      const exchangeName = "direct-exchange";
      const consumerName = "direct-consumer";
      const routingKey = "routing";

      channel.assertExchange(exchangeName, "direct");
      channel.assertQueue(
        queue,
        {
          durable: false,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          channel.sendToQueue(queue, Buffer.from(message));
          channel.bindQueue(queue, exchangeName, "false");
          channel.publish(exchangeName, routingKey, Buffer.from(message));
          console.log(" [x] Sent %s: '%s'", routingKey, message);
          console.log("message sended: " + message);
          /* channel.bindExchange(consumerName,exchangeName,'false') */
          channel.consume(
            queue,
            function (message) {
              console.log("Received %s", message?.content.toString());
            },
            {
              noAck: true,
            }
          );
        }
      );
    });

    /*     setTimeout(function(){
        connection.close();
        process.exit();
    },500) */
  }
);
