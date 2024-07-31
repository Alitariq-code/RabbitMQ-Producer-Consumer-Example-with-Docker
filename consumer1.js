const amqp = require('amqplib');

async function consume() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);

    console.log('Consumer 1 waiting for messages.');

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Consumer 1 received ${JSON.stringify(message)}`);
        setTimeout(() => {
          channel.ack(msg);
        }, 1000); // Simulate processing time
      }
    });
  } catch (error) {
    console.error(error);
  }
}

consume();
