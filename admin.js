const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "my-app",
    brokers:["192.168.179.197:9092"]
});


async function init(){
    const admin = kafka.admin();
    console.log(`⏳ Admin Connecting...`);
    admin.connect();
    console.log(`✅ Admin Connection Success`);


    console.log(`⏳ Creating Topic ['rider-updates']`);

    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,

        }]
    });

    console.log(`✅ Topic created ['rider-updates']`);
    
    await admin.disconnect();
    console.log(`🟠 Admin Disconneted`);
    
}

init();