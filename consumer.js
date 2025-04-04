const { kafka } = require('./client');
const groupId = process.argv[2];


async function init() {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect()

    await consumer.subscribe({ topics: ['rider-updates'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${groupId}: [${topic}]: partition ${partition}:`, message.value.toString())
        }
    });

    
}

init();

// PS E:\z Placement\Mosh\React 18\Project\Kafka> node .\consumer.js group-1
// PS E:\z Placement\Mosh\React 18\Project\Kafka> node .\consumer.js group-2