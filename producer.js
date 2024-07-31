const amqp = require('amqplib');

async function produce() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: true });

    setInterval(() => {
      const message = { data: Math.floor(Math.random() * 100) + 1 };
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
      console.log(`Sent ${JSON.stringify(message)}`);
    }, 1000); // Send a message every second

  } catch (error) {
    console.error(error);
  }
}

produce();
